"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { enterpriseItems } from "@/data/enterprises";
type HeaderEnterpriseItem = {
  id: string | number;
  slug: string;
  name: string;
  sortOrder?: number;
};

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
const [headerEnterpriseItems, setHeaderEnterpriseItems] = useState<
  HeaderEnterpriseItem[]
>(
  enterpriseItems.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
  }))
);
useEffect(() => {
  let isMounted = true;

  async function loadEnterpriseMenu() {
    try {
      const res = await fetch("/api/enterprises", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok || !data.success || !Array.isArray(data.data)) {
        return;
      }

      const items = data.data
        .filter((item: HeaderEnterpriseItem) => item.slug && item.name)
        .sort(
          (a: HeaderEnterpriseItem, b: HeaderEnterpriseItem) =>
            (a.sortOrder || 0) - (b.sortOrder || 0)
        )
        .map((item: HeaderEnterpriseItem) => ({
          id: item.id,
          slug: item.slug,
          name: item.name,
          sortOrder: item.sortOrder || 0,
        }));

      if (isMounted && items.length > 0) {
        setHeaderEnterpriseItems(items);
      }
    } catch {
      // Keep static fallback if API fails.
    }
  }

  loadEnterpriseMenu();

  return () => {
    isMounted = false;
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
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
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
   color: showMediaMenu ? "#3aa0ff" : "#111111",
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
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
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
              {headerEnterpriseItems.map((item, index) => (
                  <Link
                  key={item.slug}
                    href={`/enterprise/${item.slug}`}
                    className="dropdown-sub-link"
                    onClick={() => setShowEnterpriseMenu(false)}
                    style={{
                      ...compactLinkStyle,
                      borderBottom:
                      index !== headerEnterpriseItems.length - 1
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
         <Link
  href="/properties"
  className="desktop-menu-btn"
  style={{
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
                {[
                  { label: "News", href: "/media/project-and-customer-service-updates" },
                  { label: "Photos", href: "/media/photos" },
                  { label: "Videos", href: "/media/videos" },
                ].map((item, index, arr) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="dropdown-sub-link"
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

 <Link
  href="/contact"
  className="desktop-contact-link"
  style={{
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
          <span>Our Concern </span>
          <span>▼</span>
        </button>
        {mobileEnterpriseOpen && (
          <div className="mobile-submenu">
        {headerEnterpriseItems.map((item) => (
              <Link
              key={item.slug}
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
    </header>
  );
}