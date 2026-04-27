"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName.toLowerCase();

  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    target.isContentEditable ||
    Boolean(target.closest("[data-allow-copy]"))
  );
}

export default function PublicContentProtection() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) return;

    const root = document.documentElement;
    root.classList.add("publicContentGuard");

    const blockContextMenu = (event: MouseEvent) => {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    const blockCopy = (event: ClipboardEvent) => {
      if (isEditableTarget(event.target)) return;
      event.preventDefault();
    };

    const blockDrag = (event: DragEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("img")) {
        event.preventDefault();
      }
    };

    const blockShortcuts = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const key = event.key.toLowerCase();
      const ctrlOrMeta = event.ctrlKey || event.metaKey;

      const blocked =
        event.key === "F12" ||
        (ctrlOrMeta && ["c", "x", "u", "s", "p", "a"].includes(key)) ||
        (ctrlOrMeta && event.shiftKey && ["i", "j", "c"].includes(key));

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("copy", blockCopy);
    document.addEventListener("cut", blockCopy);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("keydown", blockShortcuts);

    return () => {
      root.classList.remove("publicContentGuard");
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("cut", blockCopy);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("keydown", blockShortcuts);
    };
  }, [isAdminRoute]);

  if (isAdminRoute) return null;

  return (
    <style jsx global>{`
      html.publicContentGuard body {
        -webkit-touch-callout: none;
      }

      html.publicContentGuard body * {
        -webkit-user-select: none;
        user-select: none;
      }

      html.publicContentGuard input,
      html.publicContentGuard textarea,
      html.publicContentGuard select,
      html.publicContentGuard button,
      html.publicContentGuard label,
      html.publicContentGuard [contenteditable="true"],
      html.publicContentGuard [data-allow-copy] {
        -webkit-user-select: auto;
        user-select: auto;
      }

      html.publicContentGuard img {
        -webkit-user-drag: none;
        user-drag: none;
      }
    `}</style>
  );
}
