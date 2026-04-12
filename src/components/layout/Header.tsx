"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useRef, useState } from "react";
import { enterpriseItems } from "@/data/enterprises";

export default function Header() {
  const pathname = usePathname();
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [showEnterpriseMenu, setShowEnterpriseMenu] = useState(false);
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const aboutMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterpriseMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mediaMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
const [mobileMessageOpen, setMobileMessageOpen] = useState(false);
const [mobileEnterpriseOpen, setMobileEnterpriseOpen] = useState(false);
const [mobileMediaOpen, setMobileMediaOpen] = useState(false);
const [contactHovered, setContactHovered] = useState(false);

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
  fontSize: "14px",
  fontWeight: 600,
  color: "#ffffff",
  display: "flex" as const,
  alignItems: "center" as const,
  gap: "4px",
  padding: "6px 0",
  height: "100%",
  transition: "color 0.2s ease, transform 0.2s ease",
};

  const compactDropdownStyle = {
    position: "absolute" as const,
    top: "calc(100% - 2px)",
    left: 0,
    background: "#2f2f2f",
    boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
    border: "1px solid rgba(255,255,255,0.06)",
    zIndex: 100,
    padding: "4px 0",
    borderRadius: "0 0 8px 8px",
    overflow: "hidden" as const,
  };

  const compactLinkStyle = {
    display: "block",
    padding: "10px 14px",
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 400,
    background: "transparent",
    transition: "all 0.2s ease",
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link
          href="/"
          aria-label="Go to homepage"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "380px",
              height: "64px",
            }}
            className="header-logo-wrap"
          >
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
          ☰
        </button>

        <nav
          className="nav desktop-nav"
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
    color: showAboutMenu ? "#3aa0ff" : "#ffffff",
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
                  style={{
                    ...compactLinkStyle,
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Corporate Profile
                </Link>
                <Link
                  href="/about/mission-vision-values"
                  onClick={() => setShowAboutMenu(false)}
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
    color: showMessageMenu ? "#3aa0ff" : "#ffffff",
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
                  style={{
                    ...compactLinkStyle,
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Former Chairman
                </Link>
                <Link
                  href="/message/board-of-directors"
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
    color: showEnterpriseMenu ? "#3aa0ff" : "#ffffff",
  }}
>
  Enterprise ▼
</button>

            {showEnterpriseMenu && (
              <div
                onMouseEnter={openEnterpriseMenu}
                onMouseLeave={closeEnterpriseMenu}
                style={{ ...compactDropdownStyle, right: 0, left: "auto", width: "220px" }}
              >
                {enterpriseItems.map((item, index) => (
                  <Link
                    key={item.id}
                    href={`/enterprise/${item.slug}`}
                    onClick={() => setShowEnterpriseMenu(false)}
                    style={{
                      ...compactLinkStyle,
                      borderBottom:
                        index !== enterpriseItems.length - 1
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "none",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
    color: showMediaMenu ? "#3aa0ff" : "#ffffff",
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
                {[
                  { label: "News", href: "/media/project-and-customer-service-updates" },
                  { label: "Photos", href: "/media/photos" },
                  { label: "Videos", href: "/media/videos" },
                ].map((item, index, arr) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setShowMediaMenu(false)}
                    style={{
                      ...compactLinkStyle,
                      borderBottom:
                        index !== arr.length - 1
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "none",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

 <Link href="/contact" className="desktop-contact-link">
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
            <Link href="/about/corporate-profile" onClick={() => setMobileMenuOpen(false)}>
              Corporate Profile
            </Link>
            <Link href="/about/mission-vision-values" onClick={() => setMobileMenuOpen(false)}>
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
            <Link href="/message/former-chairman" onClick={() => setMobileMenuOpen(false)}>
              Former Chairman
            </Link>
            <Link href="/message/board-of-directors" onClick={() => setMobileMenuOpen(false)}>
              Board of Directors
            </Link>
          </div>
        )}

        <button
          type="button"
          className={`mobile-submenu-toggle ${mobileEnterpriseOpen ? "active" : ""}`}
          onClick={() => setMobileEnterpriseOpen((prev) => !prev)}
        >
          <span>Enterprise</span>
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
            <Link href="/media/project-and-customer-service-updates" onClick={() => setMobileMenuOpen(false)}>
              News
            </Link>
            <Link href="/media/photos" onClick={() => setMobileMenuOpen(false)}>
              Photos
            </Link>
            <Link href="/media/videos" onClick={() => setMobileMenuOpen(false)}>
              Videos
            </Link>
          </div>
        )}

        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
          Contact
        </Link>
      </div>
    </div>
  </div>
)}
    </header>
  );
}