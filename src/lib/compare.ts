const COMPARE_STORAGE_KEY = "rcg-property-compare";
const MAX_COMPARE_ITEMS = 3;

function uniqueSlugs(slugs: string[]) {
  return Array.from(new Set(slugs)).filter(Boolean).slice(0, MAX_COMPARE_ITEMS);
}

export function getComparedSlugs(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(COMPARE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? uniqueSlugs(parsed) : [];
  } catch {
    return [];
  }
}

export function saveComparedSlugs(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    COMPARE_STORAGE_KEY,
    JSON.stringify(uniqueSlugs(slugs))
  );
}

export function emitCompareChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("compareUpdated"));
}

export function isComparedSlug(slug: string) {
  return getComparedSlugs().includes(slug);
}

export function addComparedSlug(slug: string) {
  const current = getComparedSlugs();

  if (current.includes(slug)) {
    return { ok: true, reason: "exists" as const };
  }

  if (current.length >= MAX_COMPARE_ITEMS) {
    return { ok: false, reason: "limit" as const };
  }

  saveComparedSlugs([...current, slug]);
  emitCompareChange();

  return { ok: true, reason: "added" as const };
}

export function removeComparedSlug(slug: string) {
  const updated = getComparedSlugs().filter((item) => item !== slug);
  saveComparedSlugs(updated);
  emitCompareChange();
}

export function clearComparedSlugs() {
  saveComparedSlugs([]);
  emitCompareChange();
}