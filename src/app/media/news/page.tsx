import Image from "next/image";
import Link from "next/link";
import { getAllNews } from "@/lib/news";

export default async function AllNewsPage() {
let newsItems: Awaited<ReturnType<typeof getAllNews>> = [];

try {
  newsItems = await getAllNews();
} catch (error) {
  console.error("MEDIA_NEWS_PAGE_ERROR", error);
}

  return (
    <section
      style={{
        padding: "56px 0 72px",
        background: "transparent",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              margin: 0,
              color: "#666",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 300,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            All News
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
             gap: "24px",
          }}
        >
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/media/${item.slug}`}
              style={{
                textDecoration: "none",
                background: "#ffffff",
                border: "1px solid rgba(21,150,212,0.08)",
                boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                overflow: "hidden",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10",
                  background: "#e5e7eb",
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "18px" }}>
                <h3
                 style={{
                    margin: "0 0 10px 0",
                    color: "#1f2937",
                    fontSize: "22px",
                    fontWeight: 800,
                    lineHeight: 1.35,
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    margin: "0 0 10px 0",
                    color: "#ef4444",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {new Date(item.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <p
                  style={{
                    margin: 0,
                     color: "#4b5563",
                    fontSize: "15px",
                    lineHeight: 1.7,
                  }}
                >
                  {item.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}