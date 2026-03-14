import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/nav";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Go to homepage">
          <div
            style={{
              width: "64px",
              height: "64px",
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              flexShrink: 0,
              background: "#fff",
              border: "1px solid #e5e7eb",
            }}
          >
            <Image
              src="/images/logos/real-capita-logo.png"
              alt="Real Capita Group Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="brand-text">
            <strong style={{ fontSize: "1.2rem" }}>Real Capita Group</strong>
            <span>ISO 9001:2015 QMS Certified</span>
          </div>
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}