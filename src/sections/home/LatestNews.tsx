"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import { newsItems } from "@/data/news";

const AUTO_SLIDE_MS = 4000;

function getItemsPerView(width: number) {
  if (width < 640) return 1;   // mobile
  if (width < 1024) return 2;  // tablet
  return 3;                    // desktop
}

export default function LatestNews() {
  // desktop-e 3 করে slide বুঝাতে কমপক্ষে 6 news রাখো
  const previewNews = newsItems.slice(0, 6);

  const [itemsPerView, setItemsPerView] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      setItemsPerView(getItemsPerView(window.innerWidth));
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const pages = useMemo(() => {
    const groups = [];
    for (let i = 0; i < previewNews.length; i += itemsPerView) {
      groups.push(previewNews.slice(i, i + itemsPerView));
    }
    return groups;
  }, [previewNews, itemsPerView]);

  useEffect(() => {
    if (currentPage > pages.length - 1) {
      setCurrentPage(0);
    }
  }, [pages.length, currentPage]);

  useEffect(() => {
    if (pages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, AUTO_SLIDE_MS);

    return () => clearInterval(timer);
  }, [pages.length]);

  const goPrev = () => {
    setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  return (
    <section
      style={{
        background: "#f2f2f2",
        padding: "70px 0 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#666",
              fontSize: "54px",
              fontWeight: 300,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Latest News
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          {pages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous news"
                style={{
                  position: "absolute",
                  left: "-14px",
                  top: "38%",
                  zIndex: 10,
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#efefef",
                  color: "#666",
                  fontSize: "22px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                }}
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next news"
                style={{
                  position: "absolute",
                  right: "-14px",
                  top: "38%",
                  zIndex: 10,
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  border: "none",
                  background: "#efefef",
                  color: "#666",
                  fontSize: "22px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                  cursor: "pointer",
                }}
              >
                ›
              </button>
            </>
          )}

          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                width: `${pages.length * 100}%`,
                transform: `translateX(-${currentPage * (100 / pages.length)}%)`,
                transition: "transform 0.7s ease-in-out",
              }}
            >
              {pages.map((group, pageIndex) => (
                <div
                  key={pageIndex}
                  style={{
                    width: `${100 / pages.length}%`,
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        itemsPerView === 1
                          ? "1fr"
                          : itemsPerView === 2
                          ? "repeat(2, 1fr)"
                          : "repeat(3, 1fr)",
                      gap: "24px",
                    }}
                  >
                    {group.map((item) => (
                      <Card key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {pages.length > 1 && (
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to news page ${index + 1}`}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "999px",
                  border: "none",
                  background: currentPage === index ? "#ef4444" : "#d1d5db",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        )}

        <div style={{ marginTop: "40px", textAlign: "center" }}>
      <Link
  href="/media/project-and-customer-service-updates"
  style={{
    display: "inline-block",
    background: "#ef4444",
    color: "#fff",
    padding: "16px 40px",
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textDecoration: "none",
    boxShadow: "0 6px 14px rgba(0,0,0,0.14)",
  }}
>
  Read All News
</Link>
        </div>
      </div>
    </section>
  );
}