import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectMediaGallery from "@/components/enterprise/ProjectMediaGallery";
import { enterpriseItems } from "@/data/enterprises";
import { rcPropertyProjects } from "@/data/rcPropertyProjects";
import { rcHoldingsProjects } from "@/data/rcHoldingsProjects";

type Props = {
  params: Promise<{
    slug: string;
    projectSlug: string;
  }>;
};

export default async function EnterpriseProjectDetailsPage({ params }: Props) {
  const { slug, projectSlug } = await params;

  const enterprise = enterpriseItems.find((item) => item.slug === slug);

  if (!enterprise) {
    notFound();
  }

  const isRcProperty = enterprise.slug === "land-rpcdl";
  const isRcHoldings = enterprise.slug === "apartment-rchl";

  const projects = isRcProperty
    ? rcPropertyProjects
    : isRcHoldings
      ? rcHoldingsProjects
      : [];

  const project = projects.find((item) => item.slug === projectSlug);

  if (!project) {
    notFound();
  }

  const backLabel = isRcProperty
    ? "Back to RC Property"
    : isRcHoldings
      ? "Back to RC Holdings"
      : "Back";

  const backHref = `/enterprise/${enterprise.slug}`;

  return (
    <section
      style={{
        minHeight: "100vh",
        padding: "70px 0 95px",
        background: "linear-gradient(180deg, #f4f8fb 0%, #eef6fa 100%)",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: "24px" }}>
          <Link
            href={backHref}
            style={{
              color: "#166534",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 800,
            }}
          >
            ← {backLabel}
          </Link>
        </div>

        <article
          style={{
            overflow: "hidden",
            borderRadius: "24px",
            background: "#ffffff",
            border: "1px solid rgba(226, 232, 240, 0.95)",
            boxShadow: "0 20px 55px rgba(15, 23, 42, 0.13)",
          }}
        >
          <ProjectMediaGallery
            projectName={project.name}
            projectLocation={project.location}
            media={project.media}
          />

          <div style={{ padding: "40px 42px 46px" }}>
            <div
              style={{
                width: "74px",
                height: "4px",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #16a34a, #2563eb)",
                marginBottom: "20px",
              }}
            />

            <h2
              style={{
                margin: "0 0 18px",
                color: "#0f172a",
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Project Overview
            </h2>

            <p
              style={{
                margin: "0 0 24px",
                color: "#334155",
                fontSize: "18px",
                lineHeight: 1.85,
              }}
            >
              {project.shortDescription}
            </p>

            <div style={{ color: "#475569", fontSize: "17px", lineHeight: 1.9 }}>
              {project.fullDescription.map((paragraph, index) => (
                <p key={index} style={{ margin: "0 0 18px" }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              style={{
                marginTop: "34px",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <a
                href={enterprise.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "50px",
                  padding: "0 30px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(135deg, #16a34a 0%, #2563eb 100%)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 14px 28px rgba(37, 99, 235, 0.24)",
                }}
              >
                Visit Website
              </a>

              <a
                href={project.profilePdf}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "50px",
                  padding: "0 30px",
                  borderRadius: "999px",
                  background: "#0f172a",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 900,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  boxShadow: "0 14px 28px rgba(15, 23, 42, 0.22)",
                }}
              >
                Download Profile
              </a>
            </div>

            <div
              style={{
                marginTop: "34px",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "18px",
              }}
            >
              {[
                ["Concern", enterprise.name],
                ["Location", project.location],
                ["Project Type", "Real Estate Development"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    borderRadius: "18px",
                    background: "#f8fafc",
                    border: "1px solid rgba(226, 232, 240, 0.95)",
                    padding: "20px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#64748b",
                      fontSize: "12px",
                      fontWeight: 900,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </span>

                  <strong
                    style={{
                      color: "#0f172a",
                      fontSize: "16px",
                      lineHeight: 1.45,
                    }}
                  >
                    {value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}