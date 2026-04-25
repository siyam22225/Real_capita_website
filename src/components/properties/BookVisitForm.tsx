"use client";

import { useState } from "react";

type Props = {
  propertyTitle: string;
  sectionId?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message: string;
};
export default function BookVisitForm({ propertyTitle, sectionId }: Props) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        queryType: "Site Visit Request",
        subject: `Site visit request for ${propertyTitle}`,
        message: `Property: ${propertyTitle}
Preferred visit date: ${form.preferredDate}
Visitor message: ${form.message || "No extra message"}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to submit request");
      }

      setSuccessMessage("Your site visit request has been submitted.");
      setForm({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        message: "",
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    id={sectionId}
    style={{
      marginTop: "36px",
      background: "#ffffff",
      padding: "24px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
      <h2
        style={{
          margin: "0 0 18px 0",
          color: "#555",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        Book a Visit
      </h2>

      {successMessage ? (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 14px",
            background: "#dcfce7",
            color: "#166534",
            fontWeight: 500,
          }}
        >
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 14px",
            background: "#fee2e2",
            color: "#991b1b",
            fontWeight: 500,
          }}
        >
          {errorMessage}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <input
            type="text"
            name="phone"
            placeholder="Your phone"
            value={form.phone}
            onChange={handleChange}
            required
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            required
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              fontSize: "15px",
              outline: "none",
              background: "#fff",
            }}
          />
        </div>

        <textarea
          name="message"
          placeholder="Write a short message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "14px 16px",
            border: "1px solid #ddd",
            fontSize: "15px",
            outline: "none",
            resize: "vertical",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "18px",
            background: "#ef4444",
            color: "#fff",
            border: "none",
            padding: "14px 28px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Submitting..." : "Submit Visit Request"}
        </button>
      </form>
    </div>
  );
}