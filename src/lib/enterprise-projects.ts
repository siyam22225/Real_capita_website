import { prisma } from "@/lib/prisma";
import { rcPropertyProjects } from "@/data/rcPropertyProjects";
import { rcHoldingsProjects } from "@/data/rcHoldingsProjects";

export type EnterpriseProjectCard = {
  id?: number | string;
  slug: string;
  name: string;
  location: string;
  image: string;
  shortDescription: string;
  fullDescription: string[];
  media: {
    id: number;
    type: "image" | "video";
    src: string;
    thumbnail?: string;
    alt: string;
  }[];
  profilePdf: string;
  websiteUrl?: string;
  tour360Image?: string;
};

const fallbackProjects: Record<string, EnterpriseProjectCard[]> = {
  "land-rpcdl": rcPropertyProjects,
  "apartment-rchl": rcHoldingsProjects,
  "rc-holdings": rcHoldingsProjects,
};

function normalizeProject(project: any): EnterpriseProjectCard {
  return {
    id: project.id,
    slug: project.slug,
    name: project.name,
    location: project.location ?? "",
    image: project.image ?? "",
    shortDescription: project.shortDescription ?? "",
    fullDescription: Array.isArray(project.fullDescription)
      ? project.fullDescription
      : [],
    media: Array.isArray(project.media) ? project.media : [],
    profilePdf: project.profilePdf ?? "",
    websiteUrl: project.websiteUrl ?? "",
    tour360Image: project.tour360Image ?? "",
  };
}

export async function getEnterpriseProjects(enterpriseSlug: string) {
  const fallback = fallbackProjects[enterpriseSlug] ?? [];

  try {
    const rows = await prisma.enterpriseProject.findMany({
      where: { enterpriseSlug },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });

    const dbBySlug = new Map(rows.map((row) => [row.slug, row]));
    const fallbackSlugs = new Set(fallback.map((project) => project.slug));

    const baseProjects = fallback
      .map((project) => {
        const dbProject = dbBySlug.get(project.slug);
        if (dbProject?.isActive === false) return null;
        return normalizeProject({ ...project, ...(dbProject || {}) });
      })
      .filter(Boolean) as EnterpriseProjectCard[];

    const extraProjects = rows
      .filter((row) => !fallbackSlugs.has(row.slug))
      .filter((row) => row.isActive)
      .map(normalizeProject);

    return [...baseProjects, ...extraProjects];
  } catch (error) {
    console.error("Enterprise projects DB load failed. Using fallback.", error);
    return fallback;
  }
}

export async function getEnterpriseProject(
  enterpriseSlug: string,
  projectSlug: string
) {
  const projects = await getEnterpriseProjects(enterpriseSlug);
  return projects.find((project) => project.slug === projectSlug) ?? null;
}