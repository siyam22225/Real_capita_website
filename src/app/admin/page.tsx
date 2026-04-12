import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/require-admin";

const adminCards = [
  {
    title: "News",
    description: "Add, edit, and delete news updates.",
    href: "/admin/news",
    accent: "#2563eb",
  },
  {
    title: "Messages",
    description: "View contact form submissions from visitors.",
    href: "/admin/messages",
    accent: "#16a34a",
  },
  {
    title: "Photos",
    description: "Manage gallery photos and albums.",
    href: "/admin/photos",
    accent: "#9333ea",
  },
  {
    title: "Videos",
    description: "Manage YouTube videos and categories.",
    href: "/admin/videos",
    accent: "#dc2626",
  },
];

export default async function AdminDashboardPage() {
    await requireAdmin();
  return (
    <section style={{ padding: "48px 0 70px", background: "transparent" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        <AdminNav />

        <div style={{ marginBottom: "28px" }}>
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
            Admin Panel
          </p>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontWeight: 800,
              fontSize: "clamp(30px, 5vw, 54px)",
            }}
          >
            Dashboard
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
          }}
        >
          {adminCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              style={{
                textDecoration: "none",
                background: "rgba(255,255,255,0.96)",
                borderRadius: "24px",
                padding: "24px",
                border: `1px solid ${card.accent}22`,
                boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
                display: "block",
                minHeight: "170px",
              }}
            >
              <div
                style={{
                  width: "54px",
                  height: "6px",
                  borderRadius: "999px",
                  background: card.accent,
                  marginBottom: "18px",
                }}
              />

              <h2
                style={{
                  margin: "0 0 10px 0",
                  color: "#0f172a",
                  fontSize: "30px",
                  fontWeight: 800,
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  fontSize: "15px",
                  lineHeight: 1.7,
                }}
              >
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}