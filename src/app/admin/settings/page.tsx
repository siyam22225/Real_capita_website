import Link from "next/link";

type SettingsItem = {
  title: string;
  description: string;
  href?: string;
  status: "AVAILABLE" | "COMING SOON";
  accentClass: string;
};

const settingsItems: SettingsItem[] = [
  {
    title: "Admin Login Settings",
    description: "Change admin login email and password securely.",
    href: "/admin/settings/account",
    status: "AVAILABLE",
    accentClass: "greenAccent",
  },
  {
    title: "Admin User Management",
    description:
      "View, create, disable, and delete normal admin accounts. Super admin accounts remain protected.",
    href: "/admin/settings/admin-users",
    status: "AVAILABLE",
    accentClass: "blueAccent",
  },
  {
    title: "Homepage Slider Settings",
    description:
      "Manage homepage hero slider images, order, active status, and button links.",
    href: "/admin/settings/home-slider",
    status: "AVAILABLE",
    accentClass: "purpleAccent",
  },
  {
    title: "Social Media Settings",
    description:
      "Update Facebook, Instagram, YouTube, LinkedIn, and X/Twitter links.",
    href: "/admin/settings/social",
    status: "AVAILABLE",
    accentClass: "pinkAccent",
  },
  {
    title: "Contact & Office Settings",
    description:
      "Update corporate office, sales office, phone, email, and map information.",
    href: "/admin/settings/contact-office",
    status: "AVAILABLE",
    accentClass: "orangeAccent",
  },
  {
    title: "Enterprise Settings",
    description:
      "Create and manage Real Capita Group concern / enterprise information.",
    href: "/admin/settings/enterprises",
    status: "AVAILABLE",
    accentClass: "darkAccent",
  },
  {
  title: "Client Login Button",
  description:
    "Update the client login button text, external URL, and visibility.",
  href: "/admin/settings/client-login",
  status: "AVAILABLE",
  accentClass: "blueAccent",
},
  {
  title: "Enterprise Projects",
  description:
    "Add, update, activate, and manage project pages under each concern.",
  href: "/admin/enterprise-projects",
  status: "AVAILABLE",
  accentClass: "darkAccent",
},
  {
    title: "Website Logos",
    description:
      "Update the main website logo and manage the homepage bottom logo slider.",
    href: "/admin/settings/logos",
    status: "AVAILABLE",
    accentClass: "blueAccent",
  },
  {
    title: "Website Settings",
    description:
      "Future option for website name, contact info, and general settings.",
    status: "COMING SOON",
    accentClass: "mutedAccent",
  },
  {
  title: "Board of Directors Settings",
  description:
    "Add, update, hide, and reorder Board of Directors profile cards.",
  href: "/admin/board-directors",
  status: "AVAILABLE",
  accentClass: "blueAccent",
},
  {
    title: "SEO Settings",
    description:
      "Future option for website title, meta description, and search visibility.",
    status: "COMING SOON",
    accentClass: "mutedAccent",
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="adminSettingsPage">
      <div className="adminSettingsShell">
        <div className="topBackRow">
          <Link href="/admin" className="backLink">
            ← Back to Dashboard
          </Link>
        </div>

        <section className="heroSection">
          <span className="eyebrow">ADMIN CONTROL</span>
          <h1 className="pageTitle">Settings</h1>
          <p className="pageSubtitle">
            Manage admin access and website configuration options from one
            organized place.
          </p>
        </section>

        <section className="settingsGrid">
          {settingsItems.map((item, index) => {
            const cardContent = (
              <div className={`settingsCard ${item.accentClass}`}>
                <div className="cardTop">
                  <span
                    className={`statusBadge ${
                      item.status === "AVAILABLE"
                        ? "statusAvailable"
                        : "statusSoon"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="cardBody">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="cardFooter">
                  {item.href ? (
                    <>
                      <span className="footerText">Open Settings</span>
                      <span className="footerArrow">→</span>
                    </>
                  ) : (
                    <span className="comingSoonText">
                      Feature will be added later
                    </span>
                  )}
                </div>
              </div>
            );

            if (item.href) {
              return (
                <Link
                  key={`${item.title}-${index}`}
                  href={item.href}
                  className="cardLinkWrap"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={`${item.title}-${index}`}
                className="cardLinkWrap staticCard"
              >
                {cardContent}
              </div>
            );
          })}
        </section>
      </div>

      <style>{`
        .adminSettingsPage {
          min-height: 100vh;
          padding: 30px 20px 48px;
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.55), transparent 28%),
            linear-gradient(135deg, #dff0f7 0%, #eaf7fb 52%, #d9edf5 100%);
        }

        .adminSettingsShell {
          max-width: 1180px;
          margin: 0 auto;
        }

        .topBackRow {
          margin-bottom: 18px;
        }

        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #15803d;
          font-size: 16px;
          font-weight: 800;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .backLink:hover {
          color: #166534;
          transform: translateX(-2px);
        }

        .heroSection {
          margin-bottom: 28px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.12);
          color: #15803d;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .pageTitle {
          margin: 16px 0 10px;
          font-size: clamp(44px, 5vw, 66px);
          line-height: 1;
          letter-spacing: -0.05em;
          font-weight: 900;
          color: #0f172a;
        }

        .pageSubtitle {
          margin: 0;
          max-width: 760px;
          font-size: 18px;
          line-height: 1.75;
          color: #5c6b83;
          font-weight: 500;
        }

        .settingsGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .cardLinkWrap {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .staticCard {
          cursor: default;
        }

        .settingsCard {
          position: relative;
          min-height: 250px;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 20px 42px rgba(15, 23, 42, 0.08);
          padding: 28px;
          overflow: hidden;
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease,
            border-color 0.28s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cardLinkWrap:hover .settingsCard {
          transform: translateY(-8px);
          box-shadow: 0 26px 52px rgba(15, 23, 42, 0.12);
          border-color: rgba(15, 23, 42, 0.12);
        }

        .staticCard:hover .settingsCard {
          transform: none;
          box-shadow: 0 20px 42px rgba(15, 23, 42, 0.08);
          border-color: rgba(15, 23, 42, 0.08);
        }

        .settingsCard::before {
          content: "";
          position: absolute;
          left: 28px;
          top: 0;
          width: 120px;
          height: 6px;
          border-radius: 999px;
          background: #dbe3ee;
        }

        .greenAccent::before {
          background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
        }

        .blueAccent::before {
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
        }

        .purpleAccent::before {
          background: linear-gradient(90deg, #8b5cf6 0%, #6d28d9 100%);
        }

        .pinkAccent::before {
          background: linear-gradient(90deg, #ec4899 0%, #db2777 100%);
        }

        .orangeAccent::before {
          background: linear-gradient(90deg, #f97316 0%, #f59e0b 100%);
        }

        .darkAccent::before {
          background: linear-gradient(90deg, #0f172a 0%, #334155 100%);
        }

        .mutedAccent::before {
          background: linear-gradient(90deg, #cbd5e1 0%, #94a3b8 100%);
        }

        .cardTop {
          display: flex;
          justify-content: flex-start;
          margin-top: 4px;
        }

        .statusBadge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 116px;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .statusAvailable {
          color: #15803d;
          background: rgba(34, 197, 94, 0.12);
        }

        .statusSoon {
          color: #7b8aa5;
          background: rgba(148, 163, 184, 0.14);
        }

        .cardBody {
          margin-top: 26px;
        }

        .cardBody h3 {
          margin: 0 0 14px;
          font-size: 24px;
          line-height: 1.25;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #0f172a;
        }

        .cardBody p {
          margin: 0;
          font-size: 16px;
          line-height: 1.85;
          color: #5b677f;
          font-weight: 500;
        }

        .cardFooter {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .footerText {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0f172a;
        }

        .footerArrow {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #22c55e 0%, #3b82f6 100%);
          color: #ffffff;
          font-size: 20px;
          font-weight: 900;
          box-shadow: 0 14px 24px rgba(59, 130, 246, 0.22);
        }

        .comingSoonText {
          font-size: 14px;
          font-weight: 700;
          color: #8a97ad;
        }

        @media (max-width: 980px) {
          .settingsGrid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .adminSettingsPage {
            padding: 20px 14px 36px;
          }

          .pageTitle {
            font-size: 44px;
          }

          .pageSubtitle {
            font-size: 16px;
          }

          .settingsCard {
            min-height: auto;
            padding: 22px;
            border-radius: 24px;
          }
        }
      `}</style>
    </div>
  );
}