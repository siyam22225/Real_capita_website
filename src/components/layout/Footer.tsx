"use client";

import { useEffect, useState } from "react";
import { officeInfo as staticOfficeInfo } from "@/data/offices";
import { socialLinks as staticSocialLinks } from "@/data/socialLinks";

type SocialLink = {
  label: string;
  href: string;
  iconUrl?: string | null;
  sortOrder?: number;
};

type OfficeSetting = {
  title: string;
  address: string;
  phone: string;
  email: string;
  sortOrder?: number;
};

export default function Footer() {
  const [officeInfo, setOfficeInfo] = useState<OfficeSetting[]>(
    staticOfficeInfo.map((item, index) => ({
      title: item.title,
      address: item.address,
      phone: item.phone,
      email: item.email,
      sortOrder: index + 1,
    }))
  );

  const [socialLinks, setSocialLinks] = useState(
    staticSocialLinks.map((item) => ({
      label: item.label,
      href: item.href,
    }))
  );

  useEffect(() => {
    async function loadOfficeInfo() {
      try {
        const res = await fetch("/api/office-settings", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success || !Array.isArray(data.data)) {
          return;
        }

        const dynamicOffices = data.data
          .filter((item: OfficeSetting) => item.title && item.address)
          .sort(
            (a: OfficeSetting, b: OfficeSetting) =>
              (a.sortOrder || 0) - (b.sortOrder || 0)
          )
          .map((item: OfficeSetting) => ({
            title: item.title,
            address: item.address,
            phone: item.phone,
            email: item.email,
            sortOrder: item.sortOrder || 0,
          }));

        if (dynamicOffices.length > 0) {
          setOfficeInfo(dynamicOffices);
        }
      } catch {
        // Keep static fallback office info if API fails.
      }
    }

    async function loadSocialLinks() {
      try {
        const res = await fetch("/api/social-links", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success || !Array.isArray(data.data)) {
          return;
        }

        const dynamicLinks = data.data
          .filter((item: SocialLink) => item.label && item.href)
          .sort(
            (a: SocialLink, b: SocialLink) =>
              (a.sortOrder || 0) - (b.sortOrder || 0)
          )
          .map((item: SocialLink) => ({
            label: item.label,
            href: item.href,
          }));

        if (dynamicLinks.length > 0) {
          setSocialLinks(dynamicLinks);
        }
      } catch {
        // Keep static fallback social links if API fails.
      }
    }

    loadOfficeInfo();
    loadSocialLinks();
  }, []);

  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, #061f19 0%, #0b2d24 48%, #071a22 100%)",
        color: "#ffffff",
        padding: "50px 0 24px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "26px",
            marginBottom: "34px",
          }}
        >
          {officeInfo.map((office) => {
            const phoneNumber = office.phone.replace("Tel:", "").trim();
            const phoneHref = `tel:${phoneNumber.replace(/[^\d+]/g, "")}`;

            return (
              <div
                key={office.title}
                style={{
                  borderRadius: "24px",
                  padding: "30px",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "0 18px 45px rgba(0,0,0,0.22)",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 18px",
                    fontSize: "24px",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                  }}
                >
                  {office.title}
                </h3>

                <div
                  style={{
                    display: "grid",
                    gap: "12px",
                    color: "rgba(226,232,240,0.78)",
                    fontSize: "16px",
                    lineHeight: 1.75,
                  }}
                >
                  <p style={{ margin: 0 }}>{office.address}</p>

                  <a
                    href={phoneHref}
                    style={{
                      color: "rgba(226,232,240,0.86)",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    {office.phone}
                  </a>

                  <a
                    href={`mailto:${office.email}`}
                    style={{
                      color: "rgba(226,232,240,0.86)",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    {office.email}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.12)",
            marginBottom: "24px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "rgba(226,232,240,0.72)",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            © 2026 Real Capita Group. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "42px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 800,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.045)",
                  transition: "all 0.22s ease",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}