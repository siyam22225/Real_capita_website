"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type EnterpriseMenuItem = {
  id: string | number;
  slug: string;
  name: string;
  isActive?: boolean;
};

const mediaItems = [
  { label: "News", href: "/media/project-and-customer-service-updates" },
  { label: "Photos", href: "/media/photos" },
  { label: "Videos", href: "/media/videos" },
];

function normalizeEnterprises(data: unknown): EnterpriseMenuItem[] {
  const source = Array.isArray(data)
    ? data
    : Array.isArray((data as { data?: unknown[] })?.data)
      ? (data as { data: unknown[] }).data
      : Array.isArray((data as { enterprises?: unknown[] })?.enterprises)
        ? (data as { enterprises: unknown[] }).enterprises
        : [];

  return source
    .map((item) => {
      const enterprise = item as Partial<EnterpriseMenuItem>;
      return {
        id: enterprise.id || enterprise.slug || enterprise.name || "",
        slug: String(enterprise.slug || "").trim(),
        name: String(enterprise.name || "").trim(),
        isActive: enterprise.isActive,
      };
    })
    .filter((item) => item.slug && item.name && item.isActive !== false);
}

export default function Header() {
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [showEnterpriseMenu, setShowEnterpriseMenu] = useState(false);
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileMessageOpen, setMobileMessageOpen] = useState(false);
  const [mobileEnterpriseOpen, setMobileEnterpriseOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(false);

  const [enterpriseItems, setEnterpriseItems] = useState<EnterpriseMenuItem[]>([]);

  const aboutMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterpriseMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mediaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadEnterprises() {
      try {
        const response = await fetch("/api/enterprises", {
          cache: "no-store",
        });

        const json = await response.json();

        if (!mounted) return;

        setEnterpriseItems(normalizeEnterprises(json));
      } catch (error) {
        console.error("HEADER_ENTERPRISE_MENU_ERROR", error);
        if (mounted) setEnterpriseItems([]);
      }
    }

    loadEnterprises();

    return () => {
      mounted = false;
    };
  }, []);

  const openAboutMenu = () => {
    if (aboutMenuTimeout.current) clearTimeout(aboutMenuTimeout.current);
    setShowAboutMenu(true);
  };

  const closeAboutMenu = () => {
    aboutMenuTimeout.current = setTimeout(() => {
      setShowAboutMenu(false);
    }, 250);
  };

  const openMessageMenu = () => {
    if (messageMenuTimeout.current) clearTimeout(messageMenuTimeout.current);
    setShowMessageMenu(true);
  };

  const closeMessageMenu = () => {
    messageMenuTimeout.current = setTimeout(() => {
      setShowMessageMenu(false);
    }, 250);
  };

  const openEnterpriseMenu = () => {
    if (enterpriseMenuTimeout.current) clearTimeout(enterpriseMenuTimeout.current);
    setShowEnterpriseMenu(true);
  };

  const closeEnterpriseMenu = () => {
    enterpriseMenuTimeout.current = setTimeout(() => {
      setShowEnterpriseMenu(false);
    }, 250);
  };

  const openMediaMenu = () => {
    if (mediaMenuTimeout.current) clearTimeout(mediaMenuTimeout.current);
    setShowMediaMenu(true);
  };

  const closeMediaMenu = () => {
    mediaMenuTimeout.current = setTimeout(() => {
      setShowMediaMenu(false);
    }, 250);
  };

  const menuButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 800,
    color: "#111111",
    display: "flex" as const,
    alignItems: "center" as const,
    gap: "5px",
    padding: "6px 0",
    height: "100%",
    letterSpacing: "0.045em",
    textTransform: "uppercase" as const,
    fontFamily: "Arial, Helvetica, sans-serif",
    transition: "color 0.2s ease, transform 0.2s ease",
  };

  const compactDropdownStyle = {
    position: "absolute" as const,
    top: "calc(100% + 10px)",
    left: 0,
    right: "auto",
    minWidth: "220px",
    background: "#ffffff",
    border: "1px solid rgba(15, 23, 42, 0.08)",
    borderRadius: "16px",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
    padding: "8px 0",
    zIndex: 1000,
    overflow: "hidden",
  };

  const compactLinkStyle = {
    display: "block",
    padding: "12px 18px",
    color: "#111111",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 750,
    letterSpacing: "0.025em",
    textTransform: "capitalize" as const,
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#ffffff",
    transition: "all 0.2s ease",
  };

  return (
    <header className="header rcgHeader">
      <div className="container header-inner rcgHeaderInner">
        <Link
          href="/"
          aria-label="Go to homepage"
          className="rcgHeaderLogoLink"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div className="header-logo-wrap rcgHeaderLogoWrap">
            <Image
              src="/images/logos/Asset 14.png"
              alt="Real Capita Group"
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "left center" }}
            />
          </div>
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="mobile-menu-dot-badge" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <nav
          className="nav desktop-nav rcgDesktopNav"
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            position: "relative",
          }}
        >
          <div
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={openAboutMenu}
            onMouseLeave={closeAboutMenu}
          >
            <button
              type="button"
              onClick={() => setShowAboutMenu((prev) => !prev)}
              className="desktop-menu-btn"
              style={{
                ...menuButtonStyle,
                color: showAboutMenu ? "#3aa0ff" : "#111111",
              }}
            >
              About Us ▼
            </button>

            {showAboutMenu && (
              <div
                onMouseEnter={openAboutMenu}
                onMouseLeave={closeAboutMenu}
                style={{ ...compactDropdownStyle, width: "210px" }}
              >
                <Link
                  href="/about/corporate-profile"
                  onClick={() => setShowAboutMenu(false)}
                  className="dropdown-sub-link"
                  style={{
                    ...compactLinkStyle,
                    borderBottom: "1px solid rgba(15,23,42,0.08)",
                  }}
                >
                  Corporate Profile
                </Link>

                <Link
                  href="/about/mission-vision-values"
                  onClick={() => setShowAboutMenu(false)}
                  className="dropdown-sub-link"
                  style={compactLinkStyle}
                >
                  Mission Vision &amp; Values
                </Link>
              </div>
            )}
          </div>

          <div
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={openMessageMenu}
            onMouseLeave={closeMessageMenu}
          >
            <button
              type="button"
              onClick={() => setShowMessageMenu((prev) => !prev)}
              className="desktop-menu-btn"
              style={{
                ...menuButtonStyle,
                color: showMessageMenu ? "#3aa0ff" : "#111111",
              }}
            >
              Message ▼
            </button>

            {showMessageMenu && (
              <div
                onMouseEnter={openMessageMenu}
                onMouseLeave={closeMessageMenu}
                style={{ ...compactDropdownStyle, width: "210px" }}
              >
                <Link
                  href="/message/former-chairman"
                  onClick={() => setShowMessageMenu(false)}
                  className="dropdown-sub-link"
                  style={{
                    ...compactLinkStyle,
                    borderBottom: "1px solid rgba(15,23,42,0.08)",
                  }}
                >
                  Former Chairman
                </Link>

                <Link
                  href="/message/board-of-directors"
                  className="dropdown-sub-link"
                  onClick={() => setShowMessageMenu(false)}
                  style={compactLinkStyle}
                >
                  Board of Directors
                </Link>
              </div>
            )}
          </div>

          <div
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={openEnterpriseMenu}
            onMouseLeave={closeEnterpriseMenu}
          >
            <button
              type="button"
              onClick={() => setShowEnterpriseMenu((prev) => !prev)}
              className="desktop-menu-btn"
              style={{
                ...menuButtonStyle,
                color: showEnterpriseMenu ? "#3aa0ff" : "#111111",
              }}
            >
              Our Concern ▼
            </button>

            {showEnterpriseMenu && (
              <div
                onMouseEnter={openEnterpriseMenu}
                onMouseLeave={closeEnterpriseMenu}
                style={{ ...compactDropdownStyle, left: 0, right: "auto" }}
              >
                {enterpriseItems.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/enterprise/${item.slug}`}
                    className="dropdown-sub-link"
                    onClick={() => setShowEnterpriseMenu(false)}
                    style={{
                      ...compactLinkStyle,
                      borderBottom:
                        index !== enterpriseItems.length - 1
                          ? "1px solid rgba(15,23,42,0.08)"
                          : "none",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/properties"
            className="desktop-menu-btn"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.045em",
              textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Properties
          </Link>

          <div
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={openMediaMenu}
            onMouseLeave={closeMediaMenu}
          >
            <button
              type="button"
              onClick={() => setShowMediaMenu((prev) => !prev)}
              className="desktop-menu-btn"
              style={{
                ...menuButtonStyle,
                color: showMediaMenu ? "#3aa0ff" : "#111111",
              }}
            >
              Media ▼
            </button>

            {showMediaMenu && (
              <div
                onMouseEnter={openMediaMenu}
                onMouseLeave={closeMediaMenu}
                style={{ ...compactDropdownStyle, width: "190px" }}
              >
                {mediaItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="dropdown-sub-link"
                    onClick={() => setShowMediaMenu(false)}
                    style={{
                      ...compactLinkStyle,
                      borderBottom:
                        index !== mediaItems.length - 1
                          ? "1px solid rgba(15,23,42,0.08)"
                          : "none",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="desktop-contact-link"
            style={{
              textDecoration: "none",
              color: "#111111",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.045em",
              textTransform: "uppercase",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Contact
          </Link>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-panel">
            <div className="mobile-menu-top">
              <div className="mobile-menu-logo">
                <Image
                  src="/images/logos/Asset 14.png"
                  alt="Real Capita Group"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left center" }}
                />
              </div>

              <button
                type="button"
                className="mobile-menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mobile-menu-links">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>

              <button
                type="button"
                className={`mobile-submenu-toggle ${mobileAboutOpen ? "active" : ""}`}
                onClick={() => setMobileAboutOpen((prev) => !prev)}
              >
                <span>About Us</span>
                <span>▼</span>
              </button>

              {mobileAboutOpen && (
                <div className="mobile-submenu">
                  <Link
                    href="/about/corporate-profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Corporate Profile
                  </Link>
                  <Link
                    href="/about/mission-vision-values"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Mission Vision &amp; Values
                  </Link>
                </div>
              )}

              <button
                type="button"
                className={`mobile-submenu-toggle ${mobileMessageOpen ? "active" : ""}`}
                onClick={() => setMobileMessageOpen((prev) => !prev)}
              >
                <span>Messages</span>
                <span>▼</span>
              </button>

              {mobileMessageOpen && (
                <div className="mobile-submenu">
                  <Link
                    href="/message/former-chairman"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Former Chairman
                  </Link>
                  <Link
                    href="/message/board-of-directors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Board of Directors
                  </Link>
                </div>
              )}

              <button
                type="button"
                className={`mobile-submenu-toggle ${
                  mobileEnterpriseOpen ? "active" : ""
                }`}
                onClick={() => setMobileEnterpriseOpen((prev) => !prev)}
              >
                <span>Our Concern</span>
                <span>▼</span>
              </button>

              {mobileEnterpriseOpen && (
                <div className="mobile-submenu">
                  {enterpriseItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/enterprise/${item.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}

              <button
                type="button"
                className={`mobile-submenu-toggle ${mobileMediaOpen ? "active" : ""}`}
                onClick={() => setMobileMediaOpen((prev) => !prev)}
              >
                <span>Media</span>
                <span>▼</span>
              </button>

              {mobileMediaOpen && (
                <div className="mobile-submenu">
                  {mediaItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/properties" onClick={() => setMobileMenuOpen(false)}>
                Properties
              </Link>

              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .rcgHeaderInner {
          max-width: none !important;
          width: 100% !important;
          margin: 0 !important;
          padding-left: 78px !important;
          padding-right: 78px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
        }

        .rcgHeaderLogoWrap {
          position: relative;
          width: 380px;
          height: 64px;
        }

        .rcgDesktopNav {
          margin-left: auto !important;
          margin-right: 0 !important;
          justify-content: flex-end !important;
        }

        .mobile-menu-toggle {
          width: 56px !important;
          height: 56px !important;
          padding: 0 !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 18px !important;
          background: #050816 !important;
          box-shadow:
            0 14px 30px rgba(0, 0, 0, 0.22),
            0 0 0 4px rgba(255, 255, 255, 0.72) !important;
          display: none !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition:
            transform 0.24s ease,
            box-shadow 0.24s ease,
            background 0.24s ease,
            border-color 0.24s ease !important;
        }

        .mobile-menu-toggle:hover {
          transform: translateY(-3px) scale(1.04) !important;
          background: linear-gradient(135deg, #16a34a 0%, #2563eb 100%) !important;
          border-color: rgba(255, 255, 255, 0.22) !important;
          box-shadow:
            0 18px 34px rgba(37, 99, 235, 0.22),
            0 0 0 5px rgba(37, 99, 235, 0.12) !important;
        }

        .mobile-menu-dot-badge {
          width: 18px !important;
          height: 18px !important;
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          grid-template-rows: repeat(3, 1fr) !important;
          gap: 3px !important;
          place-items: center !important;
          align-content: center !important;
          justify-content: center !important;
          margin: 0 auto !important;
        }

        .mobile-menu-dot-badge span {
          width: 4px !important;
          height: 4px !important;
          border-radius: 999px !important;
          background: #ffffff !important;
          display: block !important;
          transition:
            background 0.24s ease,
            transform 0.24s ease,
            opacity 0.24s ease !important;
        }

        .mobile-menu-toggle:hover .mobile-menu-dot-badge span {
          background: #ffffff !important;
          transform: scale(1.08) !important;
        }

        @media (max-width: 1200px) {
          .rcgHeaderInner {
            padding-left: 34px !important;
            padding-right: 34px !important;
          }

          .rcgHeaderLogoWrap {
            width: 320px;
            height: 58px;
          }

          .rcgDesktopNav {
            gap: 20px !important;
          }
        }

        @media (max-width: 1024px) {
          .mobile-menu-toggle {
            display: inline-flex !important;
          }

          .desktop-nav,
          .rcgDesktopNav {
            display: none !important;
          }
        }

        @media (min-width: 1025px) {
          .mobile-menu-toggle {
            display: none !important;
          }

          .desktop-nav,
          .rcgDesktopNav {
            display: flex !important;
          }
        }

        @media (max-width: 900px) {
          .rcgHeaderInner {
            padding-left: 18px !important;
            padding-right: 18px !important;
          }

          .rcgHeaderLogoWrap {
            width: 250px;
            height: 54px;
          }
        }
          @media (max-width: 1024px) {
  .rcgHeaderInner {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    min-height: 86px !important;
    padding-left: 18px !important;
    padding-right: 18px !important;
  }

  .rcgHeaderLogoLink {
    margin-right: auto !important;
    flex-shrink: 1 !important;
  }

  .rcgHeaderLogoWrap {
    width: 240px !important;
    height: 56px !important;
  }

  .mobile-menu-toggle {
    display: inline-flex !important;
    margin-left: auto !important;
    margin-right: 0 !important;
    flex-shrink: 0 !important;
  }

  .desktop-nav,
  .rcgDesktopNav {
    display: none !important;
  }
}

@media (max-width: 520px) {
  .rcgHeaderInner {
    min-height: 82px !important;
    padding-left: 14px !important;
    padding-right: 14px !important;
  }

  .rcgHeaderLogoWrap {
    width: 220px !important;
    height: 52px !important;
  }

  .mobile-menu-toggle {
    width: 52px !important;
    height: 52px !important;
    border-radius: 17px !important;
  }
}
      `}</style>
    </header>
  );
}