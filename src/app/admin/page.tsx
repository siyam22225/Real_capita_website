"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

type ModuleCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
  accentClass: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "News", href: "/admin/news" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Photos", href: "/admin/photos" },
  { label: "Videos", href: "/admin/videos" },
  { label: "Settings", href: "/admin/settings" },
];

const moduleCards: ModuleCard[] = [
  {
    title: "News",
    description: "Add, edit, and manage all latest website news and updates.",
    href: "/admin/news",
    badge: "Content",
    accentClass: "blueAccent",
    icon: "📰",
  },
  {
    title: "Messages",
    description: "Review visitor contact form submissions in one organized place.",
    href: "/admin/messages",
    badge: "Inbox",
    accentClass: "greenAccent",
    icon: "✉️",
  },
  {
    title: "Photos",
    description: "Maintain gallery photos, albums, and media presentation.",
    href: "/admin/photos",
    badge: "Gallery",
    accentClass: "purpleAccent",
    icon: "🖼️",
  },
  {
    title: "Videos",
    description: "Manage YouTube or uploaded video items and categories.",
    href: "/admin/videos",
    badge: "Media",
    accentClass: "redAccent",
    icon: "🎬",
  },
  {
    title: "Settings",
    description: "Control admin profile and future website configuration.",
    href: "/admin/settings",
    badge: "Control",
    accentClass: "darkAccent",
    icon: "⚙️",
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminDashboardPage() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("ADMIN_LOGOUT_ERROR", error);
    } finally {
      router.push("/admin/login");
      router.refresh();
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="adminDashboardPage">
      <div className="adminDashboardShell">
        <section className="topNavPanel">
          <div className="topNavLeft">
            {menuItems.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`navPill ${active ? "navPillActive" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="topNavRight">
            <button
              type="button"
              onClick={handleLogout}
              className="logoutButton"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </section>

        <section className="heroPanel">
          <div className="heroContent">
            <span className="sectionEyebrow">ADMIN PANEL</span>
            <h1 className="heroTitle">Dashboard</h1>
            <p className="heroSubtitle">
              Manage your website content from one clean, organized, and modern
              control panel.
            </p>
          </div>
        </section>

        <section className="cardsSection">
          <div className="sectionHeaderRow">
            <div>
              <h2 className="sectionTitle">Management Modules</h2>
              <p className="sectionDescription">
                Choose a section below to manage the related website content.
              </p>
            </div>
          </div>

          <div className="dashboardGrid">
            {moduleCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`moduleCard ${card.accentClass}`}
              >
                <div className="moduleCardInner">
                  <div className="moduleCardTop">
                    <span className="moduleIcon">{card.icon}</span>
                    <span className="moduleBadge">{card.badge}</span>
                  </div>

                  <div className="moduleCardBody">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>

                  <div className="moduleCardFooter">
                    <span className="moduleLinkText">Open Section</span>
                    <span className="moduleArrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .adminDashboardPage {
          min-height: 100vh;
          padding: 28px 20px 48px;
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.48), transparent 28%),
            linear-gradient(135deg, #dff0f7 0%, #eaf7fb 50%, #d9edf5 100%);
        }

        .adminDashboardShell {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .topNavPanel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 26px;
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(10px);
        }

        .topNavLeft {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .topNavRight {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .navPill {
          text-decoration: none;
          color: #182033;
          font-size: 15px;
          font-weight: 700;
          padding: 11px 18px;
          border-radius: 999px;
          border: 1px solid rgba(15, 23, 42, 0.1);
          background: #ffffff;
          transition: all 0.25s ease;
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.03);
        }

        .navPill:hover {
          transform: translateY(-2px);
          border-color: rgba(21, 31, 60, 0.18);
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
        }

        .navPillActive {
          background: linear-gradient(135deg, #0f172a 0%, #18223d 100%);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 14px 24px rgba(15, 23, 42, 0.18);
        }

        .logoutButton {
          border: none;
          outline: none;
          cursor: pointer;
          border-radius: 999px;
          padding: 12px 22px;
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 14px 24px rgba(220, 38, 38, 0.25);
          transition: all 0.25s ease;
        }

        .logoutButton:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 28px rgba(220, 38, 38, 0.32);
        }

        .logoutButton:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          transform: none;
        }

        .heroPanel {
          display: block;
        }

        .heroContent {
          background: rgba(255, 255, 255, 0.86);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 30px;
          box-shadow: 0 18px 44px rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(10px);
          padding: 30px 32px;
        }

        .sectionEyebrow {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.12);
          color: #1f8f46;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .heroTitle {
          margin: 16px 0 12px;
          font-size: clamp(40px, 5vw, 58px);
          line-height: 1;
          letter-spacing: -0.04em;
          color: #0f172a;
          font-weight: 900;
        }

        .heroSubtitle {
          max-width: 760px;
          margin: 0;
          font-size: 17px;
          line-height: 1.75;
          color: #5f6c86;
          font-weight: 500;
        }

        .cardsSection {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .sectionHeaderRow {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
        }

        .sectionTitle {
          margin: 0;
          font-size: 30px;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #0f172a;
        }

        .sectionDescription {
          margin: 8px 0 0;
          color: #667085;
          font-size: 15px;
          line-height: 1.7;
        }

        .dashboardGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .moduleCard {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .moduleCardInner {
          position: relative;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 28px;
          padding: 24px;
          min-height: 250px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
          backdrop-filter: blur(8px);
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease,
            border-color 0.28s ease;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .moduleCardInner:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
          border-color: rgba(15, 23, 42, 0.12);
        }

        .moduleCardInner::before {
          content: "";
          position: absolute;
          left: 24px;
          top: 18px;
          width: 78px;
          height: 6px;
          border-radius: 999px;
          background: #dbe3ee;
        }

        .blueAccent .moduleCardInner::before {
          background: linear-gradient(90deg, #4f67ff 0%, #3b82f6 100%);
        }

        .greenAccent .moduleCardInner::before {
          background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%);
        }

        .purpleAccent .moduleCardInner::before {
          background: linear-gradient(90deg, #9333ea 0%, #c026d3 100%);
        }

        .redAccent .moduleCardInner::before {
          background: linear-gradient(90deg, #dc2626 0%, #ef4444 100%);
        }

        .darkAccent .moduleCardInner::before {
          background: linear-gradient(90deg, #0f172a 0%, #334155 100%);
        }

        .moduleCardTop {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .moduleIcon {
          width: 56px;
          height: 56px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%);
          border: 1px solid rgba(15, 23, 42, 0.08);
          font-size: 25px;
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);
        }

        .moduleBadge {
          display: inline-flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 999px;
          background: #f3f7fb;
          color: #5f6b85;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .moduleCardBody {
          margin-top: 24px;
        }

        .moduleCardBody h3 {
          margin: 0 0 12px;
          font-size: 24px;
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -0.03em;
          color: #0f172a;
        }

        .moduleCardBody p {
          margin: 0;
          font-size: 16px;
          line-height: 1.8;
          color: #59657d;
          font-weight: 500;
        }

        .moduleCardFooter {
          margin-top: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid rgba(15, 23, 42, 0.08);
        }

        .moduleLinkText {
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0f172a;
        }

        .moduleArrow {
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

        @media (max-width: 1100px) {
          .dashboardGrid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .adminDashboardPage {
            padding: 18px 14px 36px;
          }

          .topNavPanel {
            flex-direction: column;
            align-items: stretch;
          }

          .topNavLeft,
          .topNavRight {
            width: 100%;
          }

          .logoutButton {
            width: 100%;
          }

          .heroContent {
            padding: 22px;
            border-radius: 24px;
          }

          .dashboardGrid {
            grid-template-columns: 1fr;
          }

          .sectionTitle {
            font-size: 24px;
          }

          .heroTitle {
            font-size: 42px;
          }
        }
      `}</style>
    </div>
  );
}