import { socialLinks } from "@/data/socialLinks";

export default function SocialSidebar() {
  return (
    <aside className="social-sidebar" aria-label="Social links">
      {socialLinks.map((item) => (
        <a key={item.label} href={item.href} target="_blank" rel="noreferrer" title={item.label}>
          {item.shortLabel}
        </a>
      ))}
    </aside>
  );
}
