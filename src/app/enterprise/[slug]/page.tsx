import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { enterpriseItems } from "@/data/enterprises";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function EnterpriseDetailsPage({ params }: Props) {
  const { slug } = await params;

  const enterprise = enterpriseItems.find((item) => item.slug === slug);

  if (!enterprise) {
    notFound();
  }

  return (
    <section
      style={{
        background: "#f2f2f2",
        minHeight: "100vh",
        padding: "70px 0 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/enterprise"
            style={{
              textDecoration: "none",
              color: "#ef4444",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            ← Back to Enterprise
          </Link>
        </div>

        <div
          style={{
            background: "#ffffff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "420px",
              background: "#e5e7eb",
            }}
          >
            <Image
              src={enterprise.image}
              alt={enterprise.name}
              fill
              className="object-cover"
            />
          </div>

          <div style={{ padding: "32px" }}>
            <h1
              style={{
                margin: "0 0 12px 0",
                color: "#555",
                fontSize: "42px",
                fontWeight: 300,
                lineHeight: "1.2",
              }}
            >
              {enterprise.name}
            </h1>

            <p
              style={{
                margin: "0 0 20px 0",
                color: "#888",
                fontSize: "16px",
              }}
            >
              {enterprise.location}
            </p>

            <p
              style={{
                margin: "0 0 24px 0",
                color: "#666",
                fontSize: "18px",
                lineHeight: "1.8",
              }}
            >
              {enterprise.shortDescription}
            </p>

            <div style={{ color: "#666", fontSize: "17px", lineHeight: "1.9" }}>
              {enterprise.fullDescription.map((paragraph, index) => (
                <p key={index} style={{ margin: "0 0 18px 0" }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div style={{ marginTop: "30px" }}>
              <a
                href={enterprise.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "#ef4444",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "14px 28px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.14)",
                }}
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}