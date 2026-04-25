import Link from "next/link";

const settingsItems = [
  {
    title: "Admin Login Settings",
    description: "Change admin login email and password securely.",
    href: "/admin/settings/account",
    status: "Available",
  },
  {
    title: "Website Settings",
    description: "Future option for website name, contact info, and general settings.",
    href: "#",
    status: "Coming Soon",
  },
  {
  title: "Homepage Slider Settings",
  description: "Manage homepage hero slider images, order, active status, and button links.",
  href: "/admin/settings/home-slider",
  status: "Available",
},
{
  title: "Social Media Settings",
  description: "Update Facebook, Instagram, YouTube, LinkedIn and X/Twitter links.",
  href: "/admin/settings/social",
  status: "Available",
},
  {
    title: "SEO Settings",
    description: "Future option for website title, meta description, and search visibility.",
    href: "#",
    status: "Coming Soon",
  },
  {
  title: "Contact & Office Settings",
  description: "Update corporate office, sales office, phone, email, and map information.",
  href: "/admin/settings/contact-office",
  status: "Available",
},
{
  title: "Enterprise / Concern Settings",
  description: "Manage concern name, image, location, description, order, and active status.",
  href: "/admin/settings/enterprises",
  status: "Available",
},
];

export default function AdminSettingsHomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef8fb 0%, #dff4fb 100%)",
        padding: "64px 24px",
      }}
    >
      <section style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <Link
            href="/admin"
            style={{
              display: "inline-flex",
              marginBottom: "18px",
              color: "#15803d",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 800,
            }}
          >
            ← Back to Dashboard
          </Link>

          <span
            style={{
              display: "block",
              marginBottom: "10px",
              color: "#16a34a",
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Admin Control
          </span>

          <h1
            style={{
              margin: "0 0 10px",
              color: "#0f172a",
              fontSize: "44px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
            }}
          >
            Settings
          </h1>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "17px",
              lineHeight: 1.7,
              maxWidth: "720px",
            }}
          >
            Manage admin access and future website configuration options from one place.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "22px",
          }}
        >
          {settingsItems.map((item) => {
            const isAvailable = item.href !== "#";

            const CardContent = (
              <div
                style={{
                  minHeight: "190px",
                  borderRadius: "26px",
                  background: "#ffffff",
                  border: "1px solid rgba(226, 232, 240, 0.95)",
                  boxShadow: "0 18px 50px rgba(15, 23, 42, 0.10)",
                  padding: "28px",
                  cursor: isAvailable ? "pointer" : "not-allowed",
                  opacity: isAvailable ? 1 : 0.72,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    marginBottom: "18px",
                    borderRadius: "999px",
                    padding: "7px 13px",
                    background: isAvailable ? "#ecfdf5" : "#f1f5f9",
                    color: isAvailable ? "#15803d" : "#64748b",
                    fontSize: "12px",
                    fontWeight: 900,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.status}
                </span>

                <h2
                  style={{
                    margin: "0 0 10px",
                    color: "#0f172a",
                    fontSize: "24px",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "15px",
                    lineHeight: 1.75,
                  }}
                >
                  {item.description}
                </p>

                {isAvailable && (
                  <p
                    style={{
                      margin: "22px 0 0",
                      color: "#2563eb",
                      fontSize: "14px",
                      fontWeight: 900,
                    }}
                  >
                    Open Settings →
                  </p>
                )}
              </div>
            );

            return isAvailable ? (
              <Link
                key={item.title}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                {CardContent}
              </Link>
            ) : (
              <div key={item.title}>{CardContent}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}