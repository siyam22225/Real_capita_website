import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getOtherNews } from "@/lib/news";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

 let news = null;
let otherNews = [];

try {
  news = await getNewsBySlug(slug);

  if (!news) {
    notFound();
  }

  otherNews = await getOtherNews(slug);
} catch (error) {
  console.error("MEDIA_NEWS_DETAIL_PAGE_ERROR", error);
  notFound();
}

  return (
    <section
      style={{
        padding: "56px 0 72px",
        background: "transparent",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1200px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 0.9fr)",
          gap: "30px",
        }}
      >
        <article
          style={{
            background: "#ffffff",
            border: "1px solid rgba(21,150,212,0.08)",
            boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "28px 28px 18px" }}>
            <h1
              style={{
                margin: "0 0 14px 0",
                color: "#111827",
                fontSize: "clamp(30px, 4vw, 58px)",
                fontWeight: 300,
                lineHeight: 1.15,
              }}
            >
              {news.title}
            </h1>

            <p
              style={{
                margin: 0,
                color: "#6b7280",
                fontSize: "16px",
              }}
            >
              {new Date(news.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              background: "#e5e7eb",
            }}
          >
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ padding: "28px" }}>
            <p
              style={{
                margin: "0 0 18px 0",
                color: "#475569",
                fontSize: "18px",
                lineHeight: 1.9,
              }}
            >
              {news.content}
            </p>
          </div>
        </article>

        <aside>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(21,150,212,0.08)",
              boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
              padding: "22px",
            }}
          >
            <h2
              style={{
                margin: "0 0 18px 0",
                color: "#ef4444",
                fontSize: "18px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Up Next
            </h2>

            <div
              style={{
                display: "grid",
                gap: "16px",
              }}
            >
              {otherNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/media/${item.slug}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 1fr",
                    gap: "12px",
                    textDecoration: "none",
                    color: "inherit",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 3",
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

                  <div>
                    <h3
                      style={{
                        margin: "0 0 6px 0",
                        color: "#1f2937",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: 1.35,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#6b7280",
                        fontSize: "13px",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <Link
                href="/media/news"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 18px",
                  background: "linear-gradient(90deg, #ef4444 0%, #e11d48 100%)",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Read All News
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}