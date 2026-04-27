import { prisma } from "@/lib/prisma";

export type AboutPageContent = {
  title: string;
  imageUrl: string;
  paragraphs: string[];
};

const fallbackContent: Record<string, AboutPageContent> = {
  "corporate-profile": {
    title: "Corporate Profile",
    imageUrl: "/images/corporate-profile.jpg",
    paragraphs: [
      "Real Capita Group is a growing corporate organization committed to long-term development, structured planning, and value-driven enterprise expansion. The company focuses on building dependable projects, strengthening customer trust, and maintaining a professional business standard across its activities.",
      "Through its different business initiatives, Real Capita Group aims to create sustainable opportunities, improve service quality, and establish a strong institutional presence in the market. The organization continues to move forward with a vision of reliability, progress, and responsible growth.",
    ],
  },
  "mission-vision-values": {
    title: "Mission Vision & Values",
    imageUrl: "/images/mission-vision-values.jpg",
    paragraphs: [
      "Our mission is to develop trusted projects and business initiatives that create practical value for customers, partners, and communities. We work with a focus on service quality, long-term planning, and responsible growth.",
      "Our vision is to become a respected and dependable corporate group known for professional excellence, customer confidence, and sustainable progress. Our values are built on integrity, commitment, accountability, innovation, and continuous improvement.",
    ],
  },
};

function normalizeParagraphs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item).trim()).filter(Boolean);
}

export async function getAboutPageContent(
  pageKey: "corporate-profile" | "mission-vision-values"
): Promise<AboutPageContent> {
  try {
    const rows = await prisma.$queryRaw<
      {
        title: string;
        imageUrl: string;
        paragraphs: unknown;
        isActive: boolean;
      }[]
    >`
      SELECT "title", "imageUrl", "paragraphs", "isActive"
      FROM "AboutPageContent"
      WHERE "pageKey" = ${pageKey}
      LIMIT 1
    `;

    const row = rows[0];

    if (!row || row.isActive === false) return fallbackContent[pageKey];

    const paragraphs = normalizeParagraphs(row.paragraphs);

    return {
      title: row.title || fallbackContent[pageKey].title,
      imageUrl: row.imageUrl || fallbackContent[pageKey].imageUrl,
      paragraphs: paragraphs.length ? paragraphs : fallbackContent[pageKey].paragraphs,
    };
  } catch (error) {
    console.error("ABOUT_PAGE_CONTENT_ERROR", error);
    return fallbackContent[pageKey];
  }
}
