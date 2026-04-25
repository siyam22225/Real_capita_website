"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";

type OfficeSetting = {
  id?: string;
  key: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  mapUrl?: string | null;
  sortOrder: number;
  isActive: boolean;
};

export default function ContactOfficeSettingsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [offices, setOffices] = useState<OfficeSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOffices() {
      try {
        const res = await fetch("/api/admin/office-settings", {
          credentials: "include",
        });

        const data = await res.json();

        if (res.status === 401) {
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
          return;
        }

        if (!res.ok || !data.success) {
          setError(data.message || "Failed to load office settings");
          return;
        }

        setOffices(data.data || []);
      } catch {
        setError("Failed to load office settings");
      } finally {
        setLoading(false);
      }
    }

    loadOffices();
  }, [router, pathname]);

  function updateOffice(
    index: number,
    field: keyof OfficeSetting,
    value: string | number | boolean
  ) {
    setOffices((current) =>
      current.map((office, officeIndex) =>
        officeIndex === index ? { ...office, [field]: value } : office
      )
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/admin/office-settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          offices: offices.map((office) => ({
            key: office.key,
            title: office.title,
            address: office.address,
            phone: office.phone,
            email: office.email,
            mapUrl: office.mapUrl || null,
            sortOrder: Number(office.sortOrder) || 0,
            isActive: office.isActive,
          })),
        }),
      });

      const data = await res.json();

      if (res.status === 401) {
        router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      if (!res.ok || !data.success) {
        setError(data.message || "Failed to update office settings");
        return;
      }

      setOffices(data.data || offices);
      setMessage("Contact and office settings updated successfully.");
    } catch {
      setError("Failed to update office settings");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <section style={styles.wrapper}>
          <div style={styles.card}>Loading contact and office settings...</div>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.wrapper}>
        <a href="/admin/settings" style={styles.backLink}>
          ← Back to Settings
        </a>

        <div style={styles.header}>
          <span style={styles.badge}>Contact</span>
          <h1 style={styles.title}>Contact & Office Settings</h1>
          <p style={styles.subtitle}>
            Update corporate office, sales office, phone, email, and map related
            information from one place.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.card}>
          {message && <div style={styles.successBox}>{message}</div>}
          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.list}>
            {offices.map((office, index) => (
              <div key={office.key} style={styles.officeCard}>
                <div style={styles.officeTop}>
                  <div>
                    <h2 style={styles.officeTitle}>{office.title}</h2>
                    <p style={styles.officeKey}>{office.key}</p>
                  </div>

                  <label style={styles.checkWrap}>
                    <input
                      type="checkbox"
                      checked={office.isActive}
                      onChange={(event) =>
                        updateOffice(index, "isActive", event.target.checked)
                      }
                    />
                    Active
                  </label>
                </div>

                <div style={styles.formGrid}>
                  <div>
                    <label style={styles.label}>Office Title</label>
                    <input
                      value={office.title}
                      onChange={(event) =>
                        updateOffice(index, "title", event.target.value)
                      }
                      style={styles.input}
                      required
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Sort Order</label>
                    <input
                      type="number"
                      value={office.sortOrder}
                      onChange={(event) =>
                        updateOffice(index, "sortOrder", Number(event.target.value))
                      }
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.full}>
                    <label style={styles.label}>Address</label>
                    <textarea
                      value={office.address}
                      onChange={(event) =>
                        updateOffice(index, "address", event.target.value)
                      }
                      style={styles.textarea}
                      required
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Phone</label>
                    <input
                      value={office.phone}
                      onChange={(event) =>
                        updateOffice(index, "phone", event.target.value)
                      }
                      style={styles.input}
                      required
                    />
                  </div>

                  <div>
                    <label style={styles.label}>Email</label>
                    <input
                      type="email"
                      value={office.email}
                      onChange={(event) =>
                        updateOffice(index, "email", event.target.value)
                      }
                      style={styles.input}
                      required
                    />
                  </div>

                  <div style={styles.full}>
                    <label style={styles.label}>Map URL / Embed Link</label>
                    <input
                      value={office.mapUrl || ""}
                      onChange={(event) =>
                        updateOffice(index, "mapUrl", event.target.value)
                      }
                      style={styles.input}
                      placeholder="Optional Google Map link"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.actions}>
            <button type="submit" disabled={saving} style={styles.primaryBtn}>
              {saving ? "Saving..." : "Save Office Settings"}
            </button>

            <a href="/admin/settings" style={styles.darkBtn}>
              Back
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #eef8fb 0%, #dff4fb 100%)",
    padding: "64px 24px",
  },
  wrapper: {
    maxWidth: "980px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    marginBottom: "22px",
    color: "#15803d",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 800,
  },
  header: {
    marginBottom: "26px",
  },
  badge: {
    display: "inline-block",
    marginBottom: "10px",
    color: "#16a34a",
    fontSize: "13px",
    fontWeight: 900,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0 0 10px",
    color: "#0f172a",
    fontSize: "44px",
    fontWeight: 900,
    letterSpacing: "-0.04em",
  },
  subtitle: {
    margin: 0,
    color: "#475569",
    fontSize: "17px",
    lineHeight: 1.7,
  },
  card: {
    borderRadius: "28px",
    background: "#ffffff",
    border: "1px solid rgba(226,232,240,0.95)",
    boxShadow: "0 24px 70px rgba(15,23,42,0.12)",
    padding: "34px",
  },
  list: {
    display: "grid",
    gap: "24px",
  },
  officeCard: {
    borderRadius: "24px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "24px",
  },
  officeTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "18px",
    alignItems: "flex-start",
    marginBottom: "20px",
  },
  officeTitle: {
    margin: "0 0 5px",
    color: "#0f172a",
    fontSize: "24px",
    fontWeight: 900,
  },
  officeKey: {
    margin: 0,
    color: "#64748b",
    fontSize: "13px",
    fontWeight: 800,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 160px",
    gap: "16px",
  },
  full: {
    gridColumn: "1 / -1",
  },
  label: {
    display: "block",
    marginBottom: "7px",
    color: "#334155",
    fontSize: "13px",
    fontWeight: 900,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "13px",
    border: "1px solid #cbd5e1",
    padding: "13px 14px",
    fontSize: "15px",
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "96px",
    boxSizing: "border-box",
    borderRadius: "13px",
    border: "1px solid #cbd5e1",
    padding: "13px 14px",
    fontSize: "15px",
    color: "#0f172a",
    background: "#ffffff",
    outline: "none",
    resize: "vertical",
  },
  checkWrap: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#334155",
    fontSize: "14px",
    fontWeight: 800,
  },
  actions: {
    display: "flex",
    gap: "14px",
    marginTop: "28px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    minHeight: "50px",
    border: "none",
    borderRadius: "999px",
    padding: "0 30px",
    background: "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 900,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  darkBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50px",
    borderRadius: "999px",
    padding: "0 30px",
    background: "#0f172a",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 900,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  successBox: {
    marginBottom: "22px",
    borderRadius: "14px",
    border: "1px solid #bbf7d0",
    background: "#ecfdf5",
    color: "#15803d",
    padding: "14px 16px",
    fontSize: "14px",
    fontWeight: 800,
  },
  errorBox: {
    marginBottom: "22px",
    borderRadius: "14px",
    border: "1px solid #fecaca",
    background: "#fef2f2",
    color: "#b91c1c",
    padding: "14px 16px",
    fontSize: "14px",
    fontWeight: 800,
  },
};