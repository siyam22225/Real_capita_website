"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string | Date;
};

type Props = {
  items: NewsItem[];
};

export default function LatestNewsClient({ items }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
 const [cardsPerPage, setCardsPerPage] = useState(3);

useEffect(() => {
  const updateCardsPerPage = () => {
    const width = window.innerWidth;

    if (width < 640) {
      setCardsPerPage(2);
    } else {
      setCardsPerPage(3);
    }
  };

  updateCardsPerPage();
  window.addEventListener("resize", updateCardsPerPage);
  return () => window.removeEventListener("resize", updateCardsPerPage);
}, []);

  const pages = useMemo(() => {
    const chunks: NewsItem[][] = [];
    for (let i = 0; i < items.length; i += cardsPerPage) {
      chunks.push(items.slice(i, i + cardsPerPage));
    }
    return chunks;
  }, [items, cardsPerPage]);

  useEffect(() => {
    if (currentPage >= pages.length) {
      setCurrentPage(0);
    }
  }, [pages.length, currentPage]);

  useEffect(() => {
    if (pages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [pages.length]);

  const goPrev = () => {
    if (pages.length <= 1) return;
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const goNext = () => {
    if (pages.length <= 1) return;
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  if (!items.length) return null;

  return (
    <section className="latest-news-section">
      <div className="container latest-news-container">
        <h2 className="latest-news-title">LATEST NEWS</h2>

        <div className="latest-news-slider">
          {pages.length > 1 && (
            <button
              type="button"
              className="latest-news-arrow latest-news-arrow-left"
              onClick={goPrev}
              aria-label="Previous news"
            >
              ‹
            </button>
          )}

          <div className="latest-news-window">
            <div
              className="latest-news-track"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {pages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="latest-news-page"
                  style={{
                    gridTemplateColumns: `repeat(${cardsPerPage}, minmax(0, 1fr))`,
                  }}
                >
                  {page.map((item) => (
                    <Link
                      key={item.id}
                      href={`/media/${item.slug}`}
                      className="latest-news-card"
                    >
                      <div className="latest-news-image-wrap">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="latest-news-image"
                        />
                      </div>

                      <div className="latest-news-card-body">
                        <h3 className="latest-news-card-title">{item.title}</h3>

                        <p className="latest-news-card-date">
                          {new Date(item.publishedAt).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>

                        <p className="latest-news-card-excerpt">{item.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {pages.length > 1 && (
            <button
              type="button"
              className="latest-news-arrow latest-news-arrow-right"
              onClick={goNext}
              aria-label="Next news"
            >
              ›
            </button>
          )}
        </div>

        {pages.length > 1 && (
          <div className="latest-news-dots">
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`latest-news-dot ${currentPage === index ? "active" : ""}`}
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="latest-news-btn-wrap">
         <Link href="/media/news" className="latest-news-btn">
            Read All News
          </Link>
        </div>
      </div>

      <style jsx>{`
        .latest-news-section {
          padding: 56px 0 72px;
          background: transparent;
        }

        .latest-news-container {
          max-width: 1200px;
        }

        .latest-news-title {
          margin: 0 0 34px 0;
          text-align: center;
          color: #6b7280;
          font-size: clamp(40px, 5vw, 58px);
          font-weight: 300;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .latest-news-slider {
          position: relative;
        }

        .latest-news-window {
          overflow: hidden;
        }

        .latest-news-track {
          display: flex;
          transition: transform 0.65s ease;
        }

        .latest-news-page {
          min-width: 100%;
          display: grid;
          gap: 24px;
          align-items: stretch;
        }

        .latest-news-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          border: 1px solid rgba(21, 150, 212, 0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .latest-news-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 18px 38px rgba(15, 23, 42, 0.16);
        }

        .latest-news-image-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #e5e7eb;
          overflow: hidden;
        }

        .latest-news-image {
          object-fit: cover;
          filter: grayscale(100%);
          transition: transform 0.35s ease, filter 0.35s ease;
        }

        .latest-news-card:hover .latest-news-image {
          filter: grayscale(0%);
          transform: scale(1.04);
        }

        .latest-news-card-body {
          padding: 16px 14px 16px;
          background: #ffffff;
          min-height: 190px;
        }

        .latest-news-card-title {
          margin: 0 0 10px 0;
          color: #1f2937;
          font-size: 18px;
          font-weight: 800;
          line-height: 1.35;
        }

        .latest-news-card-date {
          margin: 0 0 10px 0;
          color: #ef4444;
          font-size: 14px;
          font-weight: 700;
        }

        .latest-news-card-excerpt {
          margin: 0;
          color: #4b5563;
          font-size: 15px;
          line-height: 1.7;
        }

        .latest-news-arrow {
          position: absolute;
          top: 34%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.94);
          color: #6b7280;
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
          z-index: 5;
          transition: all 0.2s ease;
        }

        .latest-news-arrow:hover {
          background: #ffffff;
          color: #111827;
          transform: translateY(-50%) scale(1.06);
        }

        .latest-news-arrow-left {
          left: -18px;
        }

        .latest-news-arrow-right {
          right: -18px;
        }

        .latest-news-dots {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
        }

        .latest-news-dot {
          width: 10px;
          height: 10px;
          border: none;
          border-radius: 999px;
          background: #d1d5db;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .latest-news-dot.active {
          background: #ef4444;
          transform: scale(1.15);
        }

        .latest-news-btn-wrap {
          text-align: center;
          margin-top: 26px;
        }

        .latest-news-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 30px;
          background: linear-gradient(90deg, #ef4444 0%, #e11d48 100%);
          color: #ffffff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 10px 22px rgba(225, 29, 72, 0.22);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .latest-news-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 28px rgba(225, 29, 72, 0.3);
        }

        @media (max-width: 1100px) {
          .latest-news-arrow-left {
            left: -10px;
          }

          .latest-news-arrow-right {
            right: -10px;
          }
        }

        @media (max-width: 640px) {
          .latest-news-title {
            margin-bottom: 24px;
          }

          .latest-news-arrow {
            width: 36px;
            height: 36px;
            font-size: 24px;
            top: 28%;
          }

          .latest-news-arrow-left {
            left: 4px;
          }

          .latest-news-arrow-right {
            right: 4px;
          }

          .latest-news-card-title {
            font-size: 17px;
          }

          .latest-news-card-excerpt {
            font-size: 14px;
          }

          .latest-news-card-body {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}