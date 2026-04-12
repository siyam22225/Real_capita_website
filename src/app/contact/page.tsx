"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  queryType: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    queryType: "General Inquiry",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send message");
      }

      setSuccessMessage("Your message has been sent successfully.");
      setForm({
        name: "",
        email: "",
        phone: "",
        queryType: "General Inquiry",
        subject: "",
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
    <section
      style={{
        padding: "56px 0 70px",
        background: "transparent",
      }}
    >
      <div className="container" style={{ maxWidth: "1180px" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              color: "#16a34a",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Get In Touch
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontWeight: 800,
              fontSize: "clamp(32px, 5vw, 54px)",
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "14px auto 0",
              color: "#475569",
              fontSize: "17px",
              lineHeight: 1.7,
            }}
          >
            Send your message directly to our team. We will review your query and
            respond as soon as possible.
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.94)",
            borderRadius: "30px",
            boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
            border: "1px solid rgba(21,150,212,0.08)",
            overflow: "hidden",
            marginBottom: "26px",
          }}
        >
          <div
            style={{
              padding: "22px 26px",
              background: "linear-gradient(90deg, #0f9d7a 0%, #1d9bf0 100%)",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              Customer Message Form
            </h2>
          </div>

          <div className="contact-form-grid">
            <div className="contact-form-left">
              {successMessage ? (
                <div className="contact-alert contact-alert-success">
                  {successMessage}
                </div>
              ) : null}

              {errorMessage ? (
                <div className="contact-alert contact-alert-error">
                  {errorMessage}
                </div>
              ) : null}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-two-col">
                  <div>
                    <label className="contact-label">
                      Your Name <span>*</span>
                    </label>
                    <input
                      className="contact-input"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="contact-label">
                      Email Address <span>*</span>
                    </label>
                    <input
                      className="contact-input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="contact-two-col">
                  <div>
                    <label className="contact-label">
                      Phone / Mobile <span>*</span>
                    </label>
                    <input
                      className="contact-input"
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div>
                    <label className="contact-label">
                      Your Query Is For <span>*</span>
                    </label>
                    <select
                      className="contact-input"
                      name="queryType"
                      value={form.queryType}
                      onChange={handleChange}
                      required
                    >
                      <option>General Inquiry</option>
                      <option>Corporate Office</option>
                      <option>Sales Office</option>
                      <option>Project Information</option>
                      <option>Customer Support</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="contact-label">
                    Subject <span>*</span>
                  </label>
                  <input
                    className="contact-input"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Write your subject"
                    required
                  />
                </div>

                <div>
                  <label className="contact-label">
                    Your Message <span>*</span>
                  </label>
                  <textarea
                    className="contact-textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                  />
                </div>

                <div>
                  <button className="contact-submit-btn" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            <div className="contact-form-right">
              <div className="contact-side-card">
                <h3>Corporate Office</h3>
                <p>
                  House# 05, Flat# C-4 &amp; C-5, Road# 21, Gulshan-1,
                  Dhaka-1212, Bangladesh
                </p>
                <p><strong>Tel:</strong> +88-02-226600699</p>
              </div>

              <div className="contact-side-card">
                <h3>Sales Office</h3>
                <p>
                  Level-19, Nafi Tower, 53, Gulshan-Avenue, Gulshan-1,
                  Dhaka-1212, Bangladesh
                </p>
                <p><strong>Tel:</strong> +88-02-8833232</p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.94)",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 16px 40px rgba(15,23,42,0.10)",
            border: "1px solid rgba(21,150,212,0.08)",
          }}
        >
          <div
            style={{
              padding: "18px 22px",
              background: "linear-gradient(90deg, #0f9d7a 0%, #1d9bf0 100%)",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "24px",
                fontWeight: 800,
              }}
            >
              Office Map
            </h2>
          </div>

          <div style={{ height: "460px" }}>
            <iframe
              title="Real Capita Group Map"
              src="https://www.google.com/maps?q=House%205%20Road%2021%20Gulshan%201%20Dhaka&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 0;
        }

        .contact-form-left {
          padding: 28px;
          background: #f8fbff;
        }

        .contact-form-right {
          padding: 28px;
          background: linear-gradient(180deg, #f9fdff 0%, #eef8ff 100%);
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .contact-form {
          display: grid;
          gap: 18px;
        }

        .contact-two-col {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .contact-label {
          display: block;
          margin-bottom: 8px;
          color: #0f172a;
          font-size: 15px;
          font-weight: 700;
        }

        .contact-label span {
          color: #ef4444;
        }

        .contact-input,
        .contact-textarea {
          width: 100%;
          border: 1px solid #dbe2ea;
          border-radius: 14px;
          background: #ffffff;
          color: #334155;
          font-size: 15px;
          padding: 14px 16px;
          outline: none;
          box-sizing: border-box;
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-color: #1d9bf0;
          box-shadow: 0 0 0 4px rgba(29, 155, 240, 0.12);
        }

        .contact-textarea {
          min-height: 180px;
          resize: vertical;
        }

        .contact-submit-btn {
          border: none;
          background: linear-gradient(90deg, #ef4444 0%, #e11d48 100%);
          color: #ffffff;
          padding: 15px 28px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 22px rgba(225, 29, 72, 0.22);
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
        }

        .contact-submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(225, 29, 72, 0.28);
        }

        .contact-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .contact-side-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 18px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
        }

        .contact-side-card h3 {
          margin: 0 0 12px 0;
          color: #0f172a;
          font-size: 20px;
          font-weight: 800;
        }

        .contact-side-card p {
          margin: 0 0 10px 0;
          color: #475569;
          font-size: 15px;
          line-height: 1.7;
        }

        .contact-alert {
          margin-bottom: 16px;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
        }

        .contact-alert-success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #86efac;
        }

        .contact-alert-error {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #fca5a5;
        }

        @media (max-width: 1024px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
          }

          .contact-form-right {
            border-left: none;
            border-top: 1px solid #e5e7eb;
          }
        }

        @media (max-width: 640px) {
          .contact-two-col {
            grid-template-columns: 1fr;
          }

          .contact-form-left,
          .contact-form-right {
            padding: 18px;
          }
        }
      `}</style>
    </section>
  );
}