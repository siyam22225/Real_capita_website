"use client";

import { useEffect, useMemo, useState } from "react";

type BoardDirector = {
  id: string;
  slug: string;
  name: string;
  role: string;
  education: string | null;
  shortMessage: string | null;
  image: string | null;
  facebook: string | null;
  whatsapp: string | null;
  profileEnabled: boolean;
  isActive: boolean;
  displayOrder: number;
};

type FormState = {
  id: string;
  slug: string;
  name: string;
  role: string;
  education: string;
  shortMessage: string;
  image: string;
  facebook: string;
  whatsapp: string;
  profileEnabled: boolean;
  isActive: boolean;
  displayOrder: number;
};

const emptyForm: FormState = {
  id: "",
  slug: "",
  name: "",
  role: "",
  education: "",
  shortMessage: "",
  image: "",
  facebook: "#",
  whatsapp: "#",
  profileEnabled: false,
  isActive: true,
  displayOrder: 0,
};
const CORE_DIRECTOR_SLUGS = new Set([
  "mohammad-arifuzzaman",
  "manzur-ahammad-sohan",
  "ishtiak-al-mamoon",
  "palash-hendry-sen",
  "md-ali-haider",
  "rabaya-akhter",
  "tania-tanjia",
  "sushmita-islam",
]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminBoardDirectorsPage() {
  const [directors, setDirectors] = useState<BoardDirector[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const isEditing = Boolean(form.id);

  const sortedDirectors = useMemo(
    () => [...directors].sort((a, b) => a.displayOrder - b.displayOrder),
    [directors]
  );

  async function loadDirectors() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/board-directors", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load board directors.");
      }

      const data = await res.json();
      setDirectors(data.directors || []);
    } catch (error) {
      console.error(error);
      setMessage("Could not load board directors.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDirectors();
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "name" && !prev.id ? { slug: slugify(String(value)) } : {}),
    }));
  }

  function editDirector(director: BoardDirector) {
    setForm({
      id: director.id,
      slug: director.slug,
      name: director.name,
      role: director.role,
      education: director.education || "",
      shortMessage: director.shortMessage || "",
      image: director.image || "",
      facebook: director.facebook || "#",
      whatsapp: director.whatsapp || "#",
      profileEnabled: director.profileEnabled,
      isActive: director.isActive,
      displayOrder: director.displayOrder || 0,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setMessage("");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      updateField("image", data.url);
      setMessage("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      slug: slugify(form.slug || form.name),
      name: form.name,
      role: form.role,
      education: form.education,
      shortMessage: form.shortMessage,
      image: form.image,
      facebook: form.facebook,
      whatsapp: form.whatsapp,
      profileEnabled: form.profileEnabled,
      isActive: form.isActive,
      displayOrder: Number(form.displayOrder || 0),
    };

    try {
      const res = await fetch(
        isEditing
          ? `/api/admin/board-directors/${form.id}`
          : "/api/admin/board-directors",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Save failed.");
      }

      setForm(emptyForm);
      setMessage(isEditing ? "Director updated." : "Director added.");
      await loadDirectors();
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

 async function toggleCoreDirectorStatus(director: BoardDirector) {
  const nextStatus = !director.isActive;

  try {
    const res = await fetch(`/api/admin/board-directors/${director.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: director.slug,
        name: director.name,
        role: director.role,
        education: director.education || "",
        shortMessage: director.shortMessage || "",
        image: director.image || "",
        facebook: director.facebook || "#",
        whatsapp: director.whatsapp || "#",
        profileEnabled: director.profileEnabled,
        isActive: nextStatus,
        displayOrder: director.displayOrder,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Status update failed.");
    }

    setMessage(nextStatus ? "Director activated." : "Director set inactive.");
    await loadDirectors();
  } catch (error) {
    console.error(error);
    setMessage("Could not update director status.");
  }
}

async function deleteExtraDirector(id: string) {
  const ok = window.confirm("Delete this extra director permanently?");
  if (!ok) return;

  try {
    const res = await fetch(`/api/admin/board-directors/${id}`, {
      method: "DELETE",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || "Delete failed.");
    }

    setMessage("Extra director deleted.");
    await loadDirectors();
  } catch (error) {
    console.error(error);
    setMessage(error instanceof Error ? error.message : "Could not delete director.");
  }
}

  return (
    <main className="admin-board-page">
      <section className="admin-board-header">
        <p>Admin Settings</p>
        <h1>Board of Directors</h1>
        <span>
          Manage the public Board of Directors cards. Detail pages remain fixed
          for the first two leadership profiles.
        </span>
      </section>

      {message ? <div className="admin-message">{message}</div> : null}

      <section className="admin-board-grid">
        <form className="admin-board-form" onSubmit={submitForm}>
          <h2>{isEditing ? "Edit Director" : "Add Director"}</h2>

          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </label>

          <label>
            Slug
            <input
              value={form.slug}
              onChange={(e) => updateField("slug", slugify(e.target.value))}
              required
            />
          </label>

          <label>
            Role
            <input
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              required
            />
          </label>

          <label>
            Education
            <textarea
              value={form.education}
              onChange={(e) => updateField("education", e.target.value)}
              rows={2}
            />
          </label>

          <label>
            Short Message
            <textarea
              value={form.shortMessage}
              onChange={(e) => updateField("shortMessage", e.target.value)}
              rows={4}
            />
          </label>

          <label>
            Image URL
            <input
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              placeholder="/images/message/director-1.jpg"
            />
          </label>

          <label>
            Upload Image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file);
              }}
            />
            {uploading ? <small>Uploading...</small> : null}
          </label>

          <label>
            Facebook Link
            <input
              value={form.facebook}
              onChange={(e) => updateField("facebook", e.target.value)}
            />
          </label>

          <label>
            WhatsApp Link
            <input
              value={form.whatsapp}
              onChange={(e) => updateField("whatsapp", e.target.value)}
            />
          </label>

          <div className="admin-check-row">
            <label>
              <input
                type="checkbox"
                checked={form.profileEnabled}
                onChange={(e) =>
                  updateField("profileEnabled", e.target.checked)
                }
              />
              Show View Profile button
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField("isActive", e.target.checked)}
              />
              Active
            </label>
          </div>

          <label>
            Display Order
            <input
              type="number"
              value={form.displayOrder}
              onChange={(e) =>
                updateField("displayOrder", Number(e.target.value))
              }
            />
          </label>

          <div className="admin-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : isEditing ? "Update Director" : "Add Director"}
            </button>

            {isEditing ? (
              <button
                type="button"
                className="secondary"
                onClick={() => setForm(emptyForm)}
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-board-list">
          <h2>Current Directors</h2>

          {loading ? <p>Loading...</p> : null}

          {!loading && sortedDirectors.length === 0 ? (
            <p>No directors found.</p>
          ) : null}

          {sortedDirectors.map((director) => (
            <article className="admin-director-card" key={director.id}>
              <img
                src={director.image || "/images/message/director-1.jpg"}
                alt={director.name}
              />

              <div>
                <p className="status-line">
                  #{director.displayOrder} ·{" "}
                  {director.isActive ? "Active" : "Hidden"}
                </p>
                <h3>{director.name}</h3>
                <strong>{director.role}</strong>
                <p>{director.shortMessage}</p>

                <div className="card-actions">
                  <button type="button" onClick={() => editDirector(director)}>
                    Edit
                  </button>
                 {CORE_DIRECTOR_SLUGS.has(director.slug) ? (
  <button
    type="button"
    className={director.isActive ? "danger" : "secondary"}
    onClick={() => toggleCoreDirectorStatus(director)}
  >
    {director.isActive ? "Set Inactive" : "Set Active"}
  </button>
) : (
  <button
    type="button"
    className="danger"
    onClick={() => deleteExtraDirector(director.id)}
  >
    Delete
  </button>
)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style jsx>{`
        .admin-board-page {
          min-height: 100vh;
          padding: 40px 24px 70px;
          background: linear-gradient(180deg, #eef8fd, #f8fbff);
          color: #0f172a;
        }

        .admin-board-header {
          max-width: 1180px;
          margin: 0 auto 22px;
        }

        .admin-board-header p {
          margin: 0 0 8px;
          color: #16a34a;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .admin-board-header h1 {
          margin: 0 0 8px;
          color: #145fb3;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .admin-board-header span {
          color: #475569;
          line-height: 1.7;
        }

        .admin-message {
          max-width: 1180px;
          margin: 0 auto 18px;
          padding: 14px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          color: #075c9d;
          font-weight: 800;
        }

        .admin-board-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 420px minmax(0, 1fr);
          gap: 24px;
          align-items: start;
        }

        .admin-board-form,
        .admin-board-list {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
        }

        h2 {
          margin: 0 0 18px;
          color: #075c9d;
          font-size: 24px;
        }

        label {
          display: grid;
          gap: 7px;
          margin-bottom: 14px;
          color: #334155;
          font-size: 14px;
          font-weight: 800;
        }

        input,
        textarea {
          width: 100%;
          border: 1px solid #d7e3ee;
          border-radius: 14px;
          padding: 12px 13px;
          color: #0f172a;
          font: inherit;
          outline: none;
          background: #f8fbff;
        }

        textarea {
          resize: vertical;
        }

        small {
          color: #16a34a;
          font-weight: 800;
        }

        .admin-check-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .admin-check-row label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border-radius: 14px;
          background: #f8fbff;
          border: 1px solid #d7e3ee;
        }

        .admin-check-row input {
          width: auto;
        }

        .admin-actions,
        .card-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        button {
          border: 0;
          border-radius: 999px;
          padding: 12px 18px;
          background: linear-gradient(135deg, #0ea5e9, #16a34a);
          color: #ffffff;
          font-weight: 900;
          cursor: pointer;
        }

        button.secondary {
          background: #334155;
        }

        button.danger {
          background: #ef4444;
        }

        button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .admin-board-list {
          display: grid;
          gap: 16px;
        }

        .admin-director-card {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 16px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          background: #f8fbff;
        }

        .admin-director-card img {
          width: 110px;
          height: 130px;
          object-fit: cover;
          border-radius: 16px;
          background: #e2e8f0;
        }

        .status-line {
          margin: 0 0 6px;
          color: #16a34a;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .admin-director-card h3 {
          margin: 0 0 4px;
          color: #145fb3;
          font-size: 22px;
        }

        .admin-director-card strong {
          display: block;
          margin-bottom: 8px;
          color: #0f172a;
        }

        .admin-director-card p {
          color: #475569;
          line-height: 1.6;
        }

        @media (max-width: 980px) {
          .admin-board-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 620px) {
          .admin-director-card {
            grid-template-columns: 1fr;
          }

          .admin-director-card img {
            width: 100%;
            height: 220px;
          }

          .admin-check-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
