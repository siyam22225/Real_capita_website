"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_ENTERPRISE_PROJECT_KEYS } from "@/lib/default-enterprise-projects";

type MediaItem = {
  id: number;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  alt: string;
};

type Project = {
  id: string;
  enterpriseSlug: string;
  slug: string;
  name: string;
  location: string | null;
  image: string | null;
  shortDescription: string | null;
  fullDescription: string[] | null;
  media: MediaItem[] | null;
  profilePdf: string | null;
  websiteUrl: string | null;
  tour360Image: string | null;
  isActive: boolean;
  displayOrder: number;
};

type ConcernOption = {
  slug: string;
  name: string;
};

type FormState = {
  id: string;
  enterpriseSlug: string;
  slug: string;
  name: string;
  location: string;
  image: string;
  shortDescription: string;
  fullDescriptionText: string;
  mediaItems: MediaItem[];
  profilePdf: string;
  websiteUrl: string;
  tour360Image: string;
  isActive: boolean;
  displayOrder: number;
};

const DEFAULT_CONCERNS: ConcernOption[] = [
  { slug: "land-rpcdl", name: "RC Property" },
  { slug: "apartment-rchl", name: "RC Holdings" },
  { slug: "hotel-rc-bay", name: "RC-BAY" },
  { slug: "resda", name: "RESDA" },
  { slug: "afsen-group", name: "AFSEN Construction" },
  { slug: "abdf", name: "ABD Foundation" },
];

const emptyForm: FormState = {
  id: "",
  enterpriseSlug: "land-rpcdl",
  slug: "",
  name: "",
  location: "",
  image: "",
  shortDescription: "",
  fullDescriptionText: "",
  mediaItems: [],
  profilePdf: "",
  websiteUrl: "",
  tour360Image: "",
  isActive: true,
  displayOrder: 0,
};

const emptyMediaDraft: MediaItem = {
  id: 1,
  type: "image",
  src: "",
  thumbnail: "",
  alt: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function descriptionToArray(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminEnterpriseProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [concerns, setConcerns] = useState<ConcernOption[]>(DEFAULT_CONCERNS);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [mediaDraft, setMediaDraft] = useState<MediaItem>(emptyMediaDraft);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(form.id);

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (a.enterpriseSlug !== b.enterpriseSlug) {
        return a.enterpriseSlug.localeCompare(b.enterpriseSlug);
      }
      return a.displayOrder - b.displayOrder;
    });
  }, [projects]);

  async function loadProjects() {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/enterprise-projects", {
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load projects.");

      setProjects(data.projects || []);
    } catch (error) {
      console.error(error);
      setMessage("Could not load enterprise projects.");
    } finally {
      setLoading(false);
    }
  }

  async function loadConcerns() {
    try {
      const res = await fetch(`/api/enterprises?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });
      const data = await res.json();

      const items = Array.isArray(data)
        ? data
        : data.data || data.enterprises || data.items || [];

      const loadedConcerns = items
        .filter((item: any) => item.slug && item.name)
        .map((item: any) => ({
          slug: String(item.slug).trim().replace(/\s+/g, "-").toLowerCase(),
          name: item.name,
        }));

      setConcerns(loadedConcerns.length ? loadedConcerns : DEFAULT_CONCERNS);
    } catch (error) {
      console.error(error);
      setConcerns(DEFAULT_CONCERNS);
    }
  }

  useEffect(() => {
    loadProjects();
    loadConcerns();
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "name" && !prev.id ? { slug: slugify(String(value)) } : {}),
    }));
  }

  function editProject(project: Project) {
    setForm({
      id: project.id,
      enterpriseSlug: project.enterpriseSlug,
      slug: project.slug,
      name: project.name,
      location: project.location || "",
      image: project.image || "",
      shortDescription: project.shortDescription || "",
      fullDescriptionText: Array.isArray(project.fullDescription)
        ? project.fullDescription.join("\n\n")
        : "",
      mediaItems: Array.isArray(project.media) ? project.media : [],
      profilePdf: project.profilePdf || "",
      websiteUrl: project.websiteUrl || "",
      tour360Image: project.tour360Image || "",
      isActive: project.isActive,
      displayOrder: project.displayOrder || 0,
    });

    const nextId =
      Array.isArray(project.media) && project.media.length
        ? Math.max(...project.media.map((item) => item.id || 0)) + 1
        : 1;

    setMediaDraft({ ...emptyMediaDraft, id: nextId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadFile(
    target:
      | "image"
      | "tour360Image"
      | "mediaSrc"
      | "mediaThumbnail"
      | "profilePdf",
    file: File
  ) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setMessage("Uploading...");
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed.");

      if (target === "image") updateField("image", data.url);
      if (target === "tour360Image") updateField("tour360Image", data.url);
      if (target === "mediaSrc") {
        setMediaDraft((prev) => ({ ...prev, src: data.url }));
      }
      if (target === "mediaThumbnail") {
        setMediaDraft((prev) => ({ ...prev, thumbnail: data.url }));
      }
      if (target === "profilePdf") updateField("profilePdf", data.url);

      setMessage("Upload complete.");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    }
  }

  function addMediaItem() {
    const src = mediaDraft.src.trim();
    const alt = mediaDraft.alt.trim() || "Project media";

    if (!src) {
      setMessage("Media URL is required.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      mediaItems: [
        ...prev.mediaItems,
        {
          id: mediaDraft.id,
          type: mediaDraft.type,
          src,
          thumbnail: mediaDraft.thumbnail?.trim() || undefined,
          alt,
        },
      ],
    }));

    setMediaDraft({
      ...emptyMediaDraft,
      id: mediaDraft.id + 1,
    });

    setMessage("Media item added.");
  }

  function removeMediaItem(id: number) {
    setForm((prev) => ({
      ...prev,
      mediaItems: prev.mediaItems.filter((item) => item.id !== id),
    }));
  }

  async function saveProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      enterpriseSlug: form.enterpriseSlug,
      slug: slugify(form.slug || form.name),
      name: form.name,
      location: form.location,
      image: form.image,
      shortDescription: form.shortDescription,
      fullDescription: descriptionToArray(form.fullDescriptionText),
      media: form.mediaItems,
      profilePdf: form.profilePdf,
      websiteUrl: form.websiteUrl,
      tour360Image: form.tour360Image,
      isActive: form.isActive,
      displayOrder: Number(form.displayOrder || 0),
    };

    try {
      const res = await fetch(
        isEditing
          ? `/api/admin/enterprise-projects/${form.id}`
          : "/api/admin/enterprise-projects",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Save failed.");

      setForm(emptyForm);
      setMediaDraft(emptyMediaDraft);
      setMessage(isEditing ? "Project updated." : "Project added.");
      await loadProjects();
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function handleProjectAction(project: Project) {
    const isDefaultProject = DEFAULT_ENTERPRISE_PROJECT_KEYS.includes(
      `${project.enterpriseSlug}:${project.slug}`
    );

    if (isDefaultProject) {
      const nextStatus = !project.isActive;
      const ok = window.confirm(
        nextStatus
          ? "Set this default project active again?"
          : "Set this default project inactive on public pages?"
      );

      if (!ok) return;

      try {
        const res = await fetch(`/api/admin/enterprise-projects/${project.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enterpriseSlug: project.enterpriseSlug,
            slug: project.slug,
            name: project.name,
            location: project.location || "",
            image: project.image || "",
            shortDescription: project.shortDescription || "",
            fullDescription: project.fullDescription || [],
            media: project.media || [],
            profilePdf: project.profilePdf || "",
            websiteUrl: project.websiteUrl || "",
            tour360Image: project.tour360Image || "",
            isActive: nextStatus,
            displayOrder: project.displayOrder || 0,
          }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "Status update failed.");

        setMessage(
          nextStatus
            ? "Default project activated."
            : "Default project set inactive."
        );
        await loadProjects();
      } catch (error) {
        console.error(error);
        setMessage("Could not update default project status.");
      }

      return;
    }

    const ok = window.confirm("Delete this extra project permanently?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/enterprise-projects/${project.id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Delete failed.");

      setMessage("Extra project deleted.");
      await loadProjects();
    } catch (error) {
      console.error(error);
      setMessage(
        error instanceof Error ? error.message : "Could not delete project."
      );
    }
  }

  return (
    <main className="adminEnterpriseProjects">
      <section className="headerBlock">
        <p>Enterprise Settings</p>
        <h1>Enterprise Projects</h1>
        <span>
          Manage all concern project content, media, profile PDF, and 360° tour
          image.
        </span>
      </section>

      {message ? <div className="messageBox">{message}</div> : null}

      <section className="adminGrid">
        <form className="formCard" onSubmit={saveProject}>
          <h2>{isEditing ? "Edit Project" : "Add Project"}</h2>

          <label>
            Concern
            <select
              value={form.enterpriseSlug}
              onChange={(e) => updateField("enterpriseSlug", e.target.value)}
            >
              {concerns.map((concern) => (
                <option key={concern.slug} value={concern.slug}>
                  {concern.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Project Name
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
            Location
            <input
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </label>

          <label>
            Main Image URL
            <input
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
            />
          </label>

          <label>
            Upload Main Image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile("image", file);
              }}
            />
          </label>

          <label>
            Short Description
            <textarea
              rows={3}
              value={form.shortDescription}
              onChange={(e) => updateField("shortDescription", e.target.value)}
            />
          </label>

          <label>
            Full Description
            <textarea
              rows={6}
              value={form.fullDescriptionText}
              onChange={(e) =>
                updateField("fullDescriptionText", e.target.value)
              }
              placeholder={"Paragraph 1\n\nParagraph 2"}
            />
          </label>

          <div className="mediaManager">
            <h3>Project Media</h3>
            <p>
              Add images or videos for the project gallery. No download button
              will be shown on public video player.
            </p>

            <div className="mediaDraftGrid">
              <label>
                Media Type
                <select
                  value={mediaDraft.type}
                  onChange={(e) =>
                    setMediaDraft((prev) => ({
                      ...prev,
                      type: e.target.value as "image" | "video",
                    }))
                  }
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </label>

              <label>
                Media URL
                <input
                  value={mediaDraft.src}
                  onChange={(e) =>
                    setMediaDraft((prev) => ({ ...prev, src: e.target.value }))
                  }
                  placeholder="/images/project.jpg or /uploads/videos/video.mp4"
                />
              </label>

              <label>
                Upload Media File
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,video/mp4,video/webm,video/quicktime"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile("mediaSrc", file);
                  }}
                />
              </label>

              <label>
                Thumbnail URL
                <input
                  value={mediaDraft.thumbnail || ""}
                  onChange={(e) =>
                    setMediaDraft((prev) => ({
                      ...prev,
                      thumbnail: e.target.value,
                    }))
                  }
                  placeholder="Optional, useful for videos"
                />
              </label>

              <label>
                Upload Thumbnail
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadFile("mediaThumbnail", file);
                  }}
                />
              </label>

              <label>
                Alt Text
                <input
                  value={mediaDraft.alt}
                  onChange={(e) =>
                    setMediaDraft((prev) => ({ ...prev, alt: e.target.value }))
                  }
                  placeholder="Project image or video description"
                />
              </label>
            </div>

            <button type="button" className="secondary" onClick={addMediaItem}>
              Add Media
            </button>

            <div className="mediaList">
              {form.mediaItems.length === 0 ? (
                <span className="emptyMedia">No media added yet.</span>
              ) : null}

              {form.mediaItems.map((item) => (
                <div className="mediaItem" key={item.id}>
                  <div>
                    <strong>
                      #{item.id} · {item.type.toUpperCase()}
                    </strong>
                    <span>{item.src}</span>
                    {item.thumbnail ? <small>{item.thumbnail}</small> : null}
                  </div>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => removeMediaItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label>
            Profile PDF URL
            <input
              value={form.profilePdf}
              onChange={(e) => updateField("profilePdf", e.target.value)}
            />
          </label>

          <label>
            Upload Profile PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile("profilePdf", file);
              }}
            />
          </label>

          <label>
            Website URL
            <input
              value={form.websiteUrl}
              onChange={(e) => updateField("websiteUrl", e.target.value)}
            />
          </label>

          <label>
            360° Tour Image URL
            <input
              value={form.tour360Image}
              onChange={(e) => updateField("tour360Image", e.target.value)}
            />
          </label>

          <label>
            Upload 360° Image
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile("tour360Image", file);
              }}
            />
          </label>

          <label className="checkLabel">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => updateField("isActive", e.target.checked)}
            />
            Active
          </label>

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

          <div className="actions">
            <button type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : isEditing
                  ? "Update Project"
                  : "Add Project"}
            </button>

            {isEditing ? (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setForm(emptyForm);
                  setMediaDraft(emptyMediaDraft);
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="listCard">
          <h2>Current Projects</h2>

          {loading ? <p>Loading...</p> : null}

          {!loading && sortedProjects.length === 0 ? (
            <p>No projects found.</p>
          ) : null}

          {sortedProjects.map((project) => {
            const isDefaultProject = DEFAULT_ENTERPRISE_PROJECT_KEYS.includes(
              `${project.enterpriseSlug}:${project.slug}`
            );

            return (
              <article className="projectCard" key={project.id}>
                <img
                  src={project.image || "/images/enterprises/enterprise-1.jpg"}
                  alt={project.name}
                />

                <div>
                  <p className="status">
                    {project.enterpriseSlug} · #{project.displayOrder} ·{" "}
                    {project.isActive ? "ACTIVE" : "INACTIVE"}
                  </p>
                  <h3>{project.name}</h3>
                  <strong>{project.location}</strong>
                  <p>{project.shortDescription}</p>

                  <div className="actions">
                    <button type="button" onClick={() => editProject(project)}>
                      Edit
                    </button>

                    {isDefaultProject ? (
                      <button
                        type="button"
                        className={project.isActive ? "danger" : "secondary"}
                        onClick={() => handleProjectAction(project)}
                      >
                        {project.isActive ? "Set Inactive" : "Set Active"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="danger"
                        onClick={() => handleProjectAction(project)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <style jsx>{`
        .adminEnterpriseProjects {
          min-height: 100vh;
          padding: 40px 24px 72px;
          background: linear-gradient(180deg, #eef8fd, #f8fbff);
          color: #0f172a;
        }

        .headerBlock,
        .messageBox,
        .adminGrid {
          max-width: 1180px;
          margin-left: auto;
          margin-right: auto;
        }

        .headerBlock {
          margin-bottom: 22px;
        }

        .headerBlock p {
          margin: 0 0 8px;
          color: #16a34a;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .headerBlock h1 {
          margin: 0 0 8px;
          color: #145fb3;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 1;
          letter-spacing: -0.05em;
        }

        .headerBlock span {
          color: #475569;
          line-height: 1.7;
        }

        .messageBox {
          margin-bottom: 18px;
          padding: 14px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          color: #075c9d;
          font-weight: 800;
        }

        .adminGrid {
          display: grid;
          grid-template-columns: 430px minmax(0, 1fr);
          gap: 24px;
          align-items: start;
        }

        .formCard,
        .listCard,
        .mediaManager {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 24px;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.08);
        }

        .formCard,
        .listCard {
          padding: 24px;
        }

        .listCard {
          display: grid;
          gap: 16px;
        }

        .mediaManager {
          margin: 18px 0;
          padding: 18px;
          background: #f8fbff;
        }

        .mediaManager h3 {
          margin: 0 0 8px;
          color: #075c9d;
          font-size: 20px;
        }

        .mediaManager p {
          margin: 0 0 14px;
          color: #64748b;
          line-height: 1.6;
        }

        .mediaDraftGrid {
          display: grid;
          gap: 12px;
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
        textarea,
        select {
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

        .checkLabel {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          border-radius: 14px;
          background: #f8fbff;
          border: 1px solid #d7e3ee;
        }

        .checkLabel input {
          width: auto;
        }

        .actions {
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

        .mediaList {
          display: grid;
          gap: 10px;
          margin-top: 14px;
        }

        .emptyMedia {
          color: #64748b;
          font-weight: 700;
        }

        .mediaItem {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 12px;
          border: 1px solid #d7e3ee;
          border-radius: 16px;
          background: #ffffff;
        }

        .mediaItem strong,
        .mediaItem span,
        .mediaItem small {
          display: block;
        }

        .mediaItem strong {
          color: #075c9d;
          margin-bottom: 4px;
        }

        .mediaItem span,
        .mediaItem small {
          color: #475569;
          overflow-wrap: anywhere;
          line-height: 1.5;
        }

        .projectCard {
          display: grid;
          grid-template-columns: 128px 1fr;
          gap: 16px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          background: #f8fbff;
        }

        .projectCard img {
          width: 128px;
          height: 110px;
          object-fit: cover;
          border-radius: 16px;
          background: #e2e8f0;
        }

        .status {
          margin: 0 0 6px;
          color: #16a34a;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .projectCard h3 {
          margin: 0 0 4px;
          color: #145fb3;
          font-size: 22px;
        }

        .projectCard strong {
          display: block;
          margin-bottom: 8px;
          color: #0f172a;
        }

        .projectCard p {
          color: #475569;
          line-height: 1.6;
        }

        @media (max-width: 980px) {
          .adminGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 620px) {
          .projectCard,
          .mediaItem {
            grid-template-columns: 1fr;
          }

          .projectCard img {
            width: 100%;
            height: 220px;
          }
        }
      `}</style>
    </main>
  );
}
