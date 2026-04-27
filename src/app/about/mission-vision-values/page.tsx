import Image from "next/image";
import { getAboutPageContent } from "@/lib/about-pages";

export const revalidate = 300;

export default async function MissionVisionValuesPage() {
  const content = await getAboutPageContent("mission-vision-values");

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #f4f8fb 0%, #eef6fa 100%)",
        padding: "70px 0",
      }}
    >
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            background: "#ffffff",
            padding: "34px",
            borderRadius: "22px",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
            border: "1px solid rgba(226, 232, 240, 0.9)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "430px",
              marginBottom: "34px",
              borderRadius: "18px",
              overflow: "hidden",
              background: "#e5e7eb",
              boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
            }}
          >
            <Image
              src={content.imageUrl}
              alt={content.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ maxWidth: "920px" }}>
            <div
              style={{
                width: "72px",
                height: "4px",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #16a34a, #2563eb)",
                marginBottom: "18px",
              }}
            />

            <h1
              style={{
                margin: "0 0 20px 0",
                fontSize: "42px",
                lineHeight: "1.15",
                letterSpacing: "-0.04em",
                color: "#0f172a",
                fontWeight: 800,
              }}
            >
              {content.title}
            </h1>

            {content.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  margin: index === content.paragraphs.length - 1 ? 0 : "0 0 20px 0",
                  fontSize: "18px",
                  lineHeight: "1.9",
                  color: "#475569",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
