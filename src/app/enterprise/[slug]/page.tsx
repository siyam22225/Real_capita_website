import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { enterpriseItems } from "@/data/enterprises";
import { rcPropertyProjects } from "@/data/rcPropertyProjects";
import { rcHoldingsProjects } from "@/data/rcHoldingsProjects";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

type EnterpriseDetails = {
  slug: string;
  name: string;
  location: string;
  image: string;
  shortDescription: string;
  fullDescription: string[];
  website: string;
  buttonText: string;
  profileUrl?: string | null;
};

type ProjectItem = {
  slug: string;
  name: string;
  location: string;
  image: string;
};

function splitDescription(description: string) {
  return description
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

async function getEnterprise(slug: string): Promise<EnterpriseDetails | null> {
  try {
    const item = await prisma.enterprise.findFirst({
      where: {
        slug,
        isActive: true,
      },
      select: {
        slug: true,
        name: true,
        description: true,
        imageUrl: true,
        location: true,
        buttonText: true,
        buttonHref: true,
        profileUrl: true,
      },
    });

    if (item) {
      const paragraphs = splitDescription(item.description);

      return {
        slug: item.slug,
        name: item.name,
        location: item.location || "",
        image: item.imageUrl || "/images/enterprises/enterprise-1.jpg",
        shortDescription: paragraphs[0] || item.description,
        fullDescription: paragraphs.length > 0 ? paragraphs : [item.description],
        website: item.buttonHref || "#",
        buttonText: item.buttonText || "Visit Website",
        profileUrl: item.profileUrl,
      };
    }
  } catch (error) {
    console.error("ENTERPRISE_DETAIL_DYNAMIC_ERROR", error);
  }

  const fallback = enterpriseItems.find((item) => item.slug === slug);

  if (!fallback) return null;

  return {
    slug: fallback.slug,
    name: fallback.name,
    location: fallback.location,
    image: fallback.image,
    shortDescription: fallback.shortDescription,
    fullDescription: fallback.fullDescription,
    website: fallback.website,
    buttonText: "Visit Website",
    profileUrl: null,
  };
}

export default async function EnterpriseDetailsPage({ params }: Props) {
  const { slug } = await params;
  const enterprise = await getEnterprise(slug);

  if (!enterprise) {
    notFound();
  }

  const isRcProperty = enterprise.slug === "land-rpcdl";
  const isRcHoldings = enterprise.slug === "apartment-rchl";

  const projectItems: ProjectItem[] = isRcProperty
    ? rcPropertyProjects
    : isRcHoldings
      ? rcHoldingsProjects
      : [];

  const projectSectionTitle = isRcProperty
    ? "RC Property Projects"
    : isRcHoldings
      ? "RC Holdings Projects"
      : "";

  const projectSectionDescription = isRcProperty
    ? "Explore selected RC Property projects with location-focused development and long-term value."
    : isRcHoldings
      ? "Explore selected RC Holdings apartment projects with planned residential value and dependable development."
      : "";

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "72px 0 96px",
        background:
          "linear-gradient(180deg, #f8fbfd 0%, #eef8fb 48%, #eaf7fb 100%)",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              color: "#15803d",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 800,
              letterSpacing: "0.01em",
            }}
          >
            ← Back to Home
          </Link>
        </div>

        <article
          style={{
            overflow: "hidden",
            borderRadius: "28px",
            background: "#ffffff",
            border: "1px solid rgba(226, 232, 240, 0.95)",
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.14)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "440px",
              background: "#e5e7eb",
              overflow: "hidden",
            }}
          >
            <Image
              src={enterprise.image}
              alt={enterprise.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ padding: "42px 44px 46px" }}>
            <h1
              style={{
                margin: "0 0 12px",
                color: "#0f172a",
                fontSize: "52px",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.05em",
              }}
            >
              {enterprise.name}
            </h1>

            <p
              style={{
                margin: "0 0 26px",
                color: "#64748b",
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              {enterprise.location}
            </p>

            <p
              style={{
                margin: "0 0 24px",
                color: "#334155",
                fontSize: "18px",
                lineHeight: 1.9,
                maxWidth: "900px",
              }}
            >
              {enterprise.shortDescription}
            </p>

            <div
              style={{
                color: "#475569",
                fontSize: "17px",
                lineHeight: 1.95,
                maxWidth: "900px",
              }}
            >
              {enterprise.fullDescription.map((paragraph, index) => (
                <p key={index} style={{ margin: "0 0 18px" }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginTop: "34px",
              }}
            >
              {enterprise.website && enterprise.website !== "#" && (
                <a
                  href={enterprise.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "50px",
                    padding: "0 34px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    boxShadow: "0 16px 32px rgba(37, 99, 235, 0.24)",
                  }}
                >
                  {enterprise.buttonText}
                </a>
              )}

              {enterprise.profileUrl && (
                <a
                  href={enterprise.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "50px",
                    padding: "0 34px",
                    borderRadius: "999px",
                    background: "#0f172a",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 900,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  View Profile
                </a>
              )}
            </div>
          </div>
        </article>

        {projectItems.length > 0 && (
          <section
            style={{
              marginTop: "46px",
              padding: "42px",
              borderRadius: "28px",
              background: "#ffffff",
              border: "1px solid rgba(226, 232, 240, 0.95)",
              boxShadow: "0 22px 60px rgba(15, 23, 42, 0.11)",
            }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "720px",
                margin: "0 auto 34px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginBottom: "10px",
                  color: "#16a34a",
                  fontSize: "13px",
                  fontWeight: 900,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {projectSectionTitle}
              </span>

              <h2
                style={{
                  margin: "0 0 12px",
                  color: "#0f172a",
                  fontSize: "44px",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1.1,
                }}
              >
                Featured Projects
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "17px",
                  lineHeight: 1.8,
                }}
              >
                {projectSectionDescription}
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  projectItems.length === 3
                    ? "repeat(3, minmax(0, 1fr))"
                    : "repeat(2, minmax(0, 1fr))",
                gap: "22px",
              }}
            >
              {projectItems.map((project) => (
                <Link
                  key={project.slug}
                  href={`/enterprise/${enterprise.slug}/${project.slug}`}
                  style={{
                    position: "relative",
                    minHeight: "250px",
                    overflow: "hidden",
                    borderRadius: "22px",
                    textDecoration: "none",
                    background: "#0f172a",
                    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.18)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    style={{
                      objectFit: "cover",
                      opacity: 0.78,
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(15,23,42,0.08) 0%, rgba(15,23,42,0.82) 100%)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: "22px",
                      right: "22px",
                      bottom: "22px",
                      color: "#ffffff",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: "22px",
                        fontWeight: 900,
                        lineHeight: 1.18,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {project.name}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "rgba(255, 255, 255, 0.88)",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        fontWeight: 600,
                      }}
                    >
                      {project.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}