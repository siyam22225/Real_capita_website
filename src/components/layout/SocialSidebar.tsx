"use client";

import { useEffect, useState } from "react";

type SocialLink = {
  id?: string | number;
  label?: string | null;
  name?: string | null;
  title?: string | null;
  platform?: string | null;
  href?: string | null;
  url?: string | null;
  link?: string | null;
  isActive?: boolean;
};

function getLabel(item: SocialLink) {
  return String(item.label || item.name || item.title || item.platform || "").trim();
}

function getHref(item: SocialLink) {
  return String(item.href || item.url || item.link || "").trim();
}

function getPlatform(label: string) {
  const value = label.toLowerCase();

  if (value.includes("facebook")) return "facebook";
  if (value.includes("instagram")) return "instagram";
  if (value.includes("youtube")) return "youtube";
  if (value.includes("linkedin")) return "linkedin";
  if (value.includes("whatsapp")) return "whatsapp";
  if (value.includes("messenger")) return "messenger";
  if (value.includes("phone") || value.includes("call")) return "phone";
  if (value.includes("x") || value.includes("twitter")) return "x";

  return "default";
}

function getIcon(platform: string, label: string) {
  if (platform === "facebook") return "f";
  if (platform === "instagram") return "◎";
  if (platform === "youtube") return "▶";
  if (platform === "linkedin") return "in";
  if (platform === "whatsapp") return "☎";
  if (platform === "messenger") return "⌁";
  if (platform === "phone") return "☎";
  if (platform === "x") return "𝕏";

  return label.slice(0, 1).toUpperCase();
}

export default function SocialSidebar() {
  const [links, setLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadLinks() {
      try {
        const res = await fetch("/api/social-links", {
          cache: "no-store",
        });

        const json = await res.json();

        const data = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json?.socialLinks)
            ? json.socialLinks
            : [];

        if (!mounted) return;

        setLinks(
          data.filter((item: SocialLink) => {
            const href = getHref(item);
            return href && item.isActive !== false;
          })
        );
      } catch (error) {
        console.error("SOCIAL_SIDEBAR_ERROR", error);
        if (mounted) setLinks([]);
      }
    }

    loadLinks();

    return () => {
      mounted = false;
    };
  }, []);

  if (links.length === 0) return null;

  return (
    <div className="socialDock" aria-label="Social links">
      {links.map((item, index) => {
        const label = getLabel(item) || "Social";
        const href = getHref(item);
        const platform = getPlatform(label);

        return (
          <a
            key={item.id || `${href}-${index}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`socialBubble social-${platform}`}
            aria-label={label}
            title={label}
          >
            <span>{getIcon(platform, label)}</span>
          </a>
        );
      })}

      <style>{`
        .socialDock {
          position: fixed;
          right: 22px;
          bottom: 96px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
        }

        .socialBubble {
          width: 52px;
          height: 52px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #ffffff;
          background: #111827;
          border: 4px solid rgba(255, 255, 255, 0.92);
          box-shadow:
            0 14px 30px rgba(15, 23, 42, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.20);
          transition:
            transform 0.24s ease,
            box-shadow 0.24s ease,
            filter 0.24s ease,
            background 0.24s ease;
        }

        .socialBubble span {
          font-size: 22px;
          font-weight: 900;
          line-height: 1;
          transform: translateY(-1px);
        }

        .socialBubble:hover {
          transform: translateY(-6px) scale(1.08);
          box-shadow:
            0 22px 44px rgba(15, 23, 42, 0.32),
            0 0 0 7px rgba(255, 255, 255, 0.20);
          filter: saturate(1.18);
        }

        .social-facebook {
          background: linear-gradient(135deg, #1877f2 0%, #0f4fb8 100%);
        }

        .social-instagram {
          background: linear-gradient(135deg, #f58529 0%, #dd2a7b 45%, #515bd4 100%);
        }

        .social-youtube {
          background: linear-gradient(135deg, #ff0000 0%, #b91c1c 100%);
        }

        .social-linkedin {
          background: linear-gradient(135deg, #0a66c2 0%, #084c91 100%);
        }

        .social-whatsapp {
          background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        }

        .social-messenger {
          background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
        }

        .social-phone {
          background: linear-gradient(135deg, #111827 0%, #020617 100%);
          border-color: rgba(239, 68, 68, 0.92);
        }

        .social-x {
          background: linear-gradient(135deg, #111827 0%, #000000 100%);
        }

        .social-default {
          background: linear-gradient(135deg, #16a34a 0%, #2563eb 100%);
        }

        .social-facebook:hover {
          background: linear-gradient(135deg, #0f4fb8 0%, #38bdf8 100%);
        }

        .social-instagram:hover {
          background: linear-gradient(135deg, #f97316 0%, #ec4899 45%, #6366f1 100%);
        }

        .social-youtube:hover {
          background: linear-gradient(135deg, #b91c1c 0%, #ef4444 100%);
        }

        .social-linkedin:hover {
          background: linear-gradient(135deg, #075985 0%, #38bdf8 100%);
        }

        .social-whatsapp:hover {
          background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
        }

        .social-messenger:hover {
          background: linear-gradient(135deg, #2563eb 0%, #ec4899 100%);
        }

        .social-phone:hover {
          background: linear-gradient(135deg, #020617 0%, #dc2626 100%);
        }

        @media (max-width: 768px) {
          .socialDock {
            right: 14px;
            bottom: 78px;
            gap: 10px;
          }

          .socialBubble {
            width: 44px;
            height: 44px;
            border-width: 3px;
          }

          .socialBubble span {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}