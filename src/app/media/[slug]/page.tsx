import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsItems } from "@/data/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailsPage({ params }: Props) {
  const { slug } = await params;

  const article = newsItems.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const upNext = newsItems.filter((item) => item.slug !== slug).slice(0, 8);

  return (
    <section
      style={{
        background: "#f3f3f3",
        minHeight: "100vh",
        padding: "50px 0 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 2.2fr) minmax(280px, 0.9fr)",
          gap: "36px",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 20px 0",
              fontSize: "54px",
              lineHeight: "1.15",
              fontWeight: 300,
              color: "#555",
            }}
          >
            {article.title}
          </h1>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "420px",
              background: "#ddd",
              marginBottom: "18px",
            }}
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          <div
            style={{
              marginBottom: "24px",
              color: "#777",
              fontSize: "14px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "14px",
            }}
          >
            {article.date}
          </div>

          <div style={{ color: "#666", fontSize: "18px", lineHeight: "1.9" }}>
            {article.fullContent.map((paragraph, index) => (
              <p key={index} style={{ margin: "0 0 22px 0" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside>
          <h2
            style={{
              margin: "0 0 24px 0",
              color: "#ef4444",
              fontSize: "34px",
              fontWeight: 300,
            }}
          >
            Up Next
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {upNext.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "block",
                  background: "#fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "110px",
                    background: "#ddd",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div style={{ padding: "10px" }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      lineHeight: "1.4",
                      color: "#666",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}