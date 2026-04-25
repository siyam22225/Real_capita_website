"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SocialLink = {
  label: string;
  href: string;
  iconUrl?: string | null;
  sortOrder?: number;
};

type SidebarSocialLink = {
  label: string;
  href: string;
  bg: string;
  icon: string;
};

const fallbackSocialLinks: SidebarSocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    bg: "#2c3561",
    icon: "/images/social/facebook.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    bg: "#ba5757",
    icon: "/images/social/instagram.svg",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    bg: "#763838",
    icon: "/images/social/youtube.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    bg: "#3f3e82",
    icon: "/images/social/linkedin.svg",
  },
  {
    label: "Twitter",
    href: "https://x.com/",
    bg: "#9383aa",
    icon: "/images/social/twitter.svg",
  },
];

function getSocialBg(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("facebook")) return "#2c3561";
  if (normalized.includes("instagram")) return "#ba5757";
  if (normalized.includes("youtube")) return "#763838";
  if (normalized.includes("linkedin")) return "#3f3e82";
  if (normalized.includes("twitter") || normalized.includes("x")) return "#9383aa";

  return "#0f172a";
}

export default function SocialSidebar() {
  const [socialLinks, setSocialLinks] =
    useState<SidebarSocialLink[]>(fallbackSocialLinks);

  useEffect(() => {
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
          .filter((item: SocialLink) => item.href && item.label)
          .sort(
            (a: SocialLink, b: SocialLink) =>
              (a.sortOrder || 0) - (b.sortOrder || 0)
          )
          .map((item: SocialLink) => ({
            label: item.label,
            href: item.href,
            bg: getSocialBg(item.label),
            icon:
              item.iconUrl ||
              fallbackSocialLinks.find((link) => link.label === item.label)?.icon ||
              "/images/social/facebook.svg",
          }));

        if (dynamicLinks.length > 0) {
          setSocialLinks(dynamicLinks);
        }
      } catch {
        setSocialLinks(fallbackSocialLinks);
      }
    }

    loadSocialLinks();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
      }}
    >
      {socialLinks.map((item) => (
        <SocialItem key={item.label} item={item} />
      ))}
    </div>
  );
}

function SocialItem({ item }: { item: SidebarSocialLink }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      title={item.label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isHovered ? "#f3f4f6" : item.bg,
        borderBottom: "1px solid #e5e7eb",
        borderLeft: "1px solid #e5e7eb",
        overflow: "hidden",
        transform: isHovered
          ? "translateX(-4px) scale(1.08)"
          : "translateX(0) scale(1)",
        boxShadow: isHovered ? "0 8px 18px rgba(0,0,0,0.20)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <Image
        src={item.icon}
        alt={item.label}
        width={20}
        height={20}
        style={{
          objectFit: "contain",
          transform: isHovered ? "scale(1.12)" : "scale(1)",
          transition: "transform 0.25s ease",
        }}
      />
    </a>
  );
}