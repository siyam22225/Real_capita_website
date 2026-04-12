"use client";

import Image from "next/image";
import { useState } from "react";

export default function SocialSidebar() {
  const socialLinks = [
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
      href: "https://twitter.com/",
      bg: "#9383aa",
      icon: "/images/social/twitter.svg",
    },
  ];

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

function SocialItem({ item }: { item: { label: string; href: string; bg: string; icon: string } }) {
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
        transform: isHovered ? "translateX(-4px) scale(1.08)" : "translateX(0) scale(1)",
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