import Link from "next/link";
import AdminLogoutButton from "./AdminLogoutButton";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "News", href: "/admin/news" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Photos", href: "/admin/photos" },
  { label: "Videos", href: "/admin/videos" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminNav() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "14px",
        flexWrap: "wrap",
        marginBottom: "28px",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "20px",
        padding: "16px 18px",
        border: "1px solid rgba(21,150,212,0.08)",
        boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              textDecoration: "none",
              padding: "10px 16px",
              borderRadius: "999px",
              background: link.href === "/admin/settings" ? "#0f172a" : "#ffffff",
              color: link.href === "/admin/settings" ? "#ffffff" : "#0f172a",
              fontWeight: 700,
              border:
                link.href === "/admin/settings"
                  ? "1px solid #0f172a"
                  : "1px solid #e5e7eb",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <AdminLogoutButton />
    </div>
  );
}