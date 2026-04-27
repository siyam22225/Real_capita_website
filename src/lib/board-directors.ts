import { prisma } from "@/lib/prisma";
import { directors as fallbackDirectors } from "@/data/directors";

export const CORE_DIRECTOR_SLUGS = [
  "mohammad-arifuzzaman",
  "manzur-ahammad-sohan",
  "ishtiak-al-mamoon",
  "palash-hendry-sen",
  "md-ali-haider",
  "rabaya-akhter",
  "tania-tanjia",
  "sushmita-islam",
];

const STATIC_PROFILE_SLUGS = new Set([
  "mohammad-arifuzzaman",
  "manzur-ahammad-sohan",
]);

type BoardDirectorCard = {
  slug: string;
  profileEnabled: boolean;
  name: string;
  role: string;
  education: string;
  shortMessage: string;
  image: string;
  facebook: string;
  whatsapp: string;
};

function normalizeDirector(director: any): BoardDirectorCard {
  const slug = director.slug;

  return {
    slug,
    profileEnabled:
      STATIC_PROFILE_SLUGS.has(slug) && Boolean(director.profileEnabled),
    name: director.name,
    role: director.role,
    education: director.education ?? "",
    shortMessage: director.shortMessage ?? "",
    image: director.image ?? "/images/message/director-1.jpg",
    facebook: director.facebook ?? "#",
    whatsapp: director.whatsapp ?? "#",
  };
}

function isDirectorCard(
  director: BoardDirectorCard | null
): director is BoardDirectorCard {
  return director !== null;
}

export async function getBoardDirectorCards(): Promise<BoardDirectorCard[]> {
  try {
    const dbRows = await prisma.boardDirector.findMany({
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    });

    const dbBySlug = new Map(dbRows.map((director) => [director.slug, director]));
    const fallbackSlugs = new Set(fallbackDirectors.map((director) => director.slug));

    const baseDirectors = fallbackDirectors
      .map((fallbackDirector) => {
        const dbDirector = dbBySlug.get(fallbackDirector.slug);

        if (dbDirector?.isActive === false) return null;

        return normalizeDirector({
          ...fallbackDirector,
          ...(dbDirector || {}),
        });
      })
      .filter(isDirectorCard);

    const extraDirectors = dbRows
      .filter((director) => !fallbackSlugs.has(director.slug))
      .filter((director) => director.isActive)
      .map((director) =>
        normalizeDirector({
          ...director,
          profileEnabled: false,
        })
      );

    return [...baseDirectors, ...extraDirectors];
  } catch (error) {
    console.error("Board director DB load failed. Using fallback data.", error);
    return fallbackDirectors.map(normalizeDirector);
  }
}