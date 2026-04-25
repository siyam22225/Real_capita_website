"use client";

import { useEffect, useMemo, useState } from "react";

type HomeSlide = {
  id: string;
  title?: string | null;
  subtitle?: string | null;
  imageUrl: string;
  buttonText?: string | null;
  buttonHref?: string | null;
  sortOrder?: number;
};

const fallbackSlides: HomeSlide[] = [
  {
    id: "fallback-1",
    imageUrl: "/images/hero/slide-1.jpg",
  },
  {
    id: "fallback-2",
    imageUrl: "/images/hero/slide-2.jpg",
  },
  {
    id: "fallback-3",
    imageUrl: "/images/hero/slide-3.jpg",
  },
  {
    id: "fallback-4",
    imageUrl: "/images/hero/slide-4.jpg",
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<HomeSlide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);

  const activeSlides = useMemo(() => {
    return slides.length > 0 ? slides : fallbackSlides;
  }, [slides]);

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch("/api/home-slides", {
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok || !data.success || !Array.isArray(data.data)) {
          return;
        }

        const dynamicSlides = data.data
          .filter((item: HomeSlide) => item.imageUrl)
          .sort(
            (a: HomeSlide, b: HomeSlide) =>
              (a.sortOrder || 0) - (b.sortOrder || 0)
          );

        if (dynamicSlides.length > 0) {
          setSlides(dynamicSlides);
          setCurrent(0);
        }
      } catch {
        setSlides(fallbackSlides);
      }
    }

    loadSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const goToSlide = (index: number) => setCurrent(index);

  const goPrev = () =>
    setCurrent((prev) =>
      prev === 0 ? activeSlides.length - 1 : prev - 1
    );

  const goNext = () =>
    setCurrent((prev) => (prev + 1) % activeSlides.length);

  return (
    <section style={{ width: "100%", background: "#fff" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${activeSlides.length * 100}%`,
            transform: `translateX(-${current * (100 / activeSlides.length)}%)`,
            transition: "transform 0.8s ease-in-out",
          }}
        >
          {activeSlides.map((slide, index) => (
            <div
              key={slide.id || index}
              style={{
                width: `${100 / activeSlides.length}%`,
                flexShrink: 0,
                height: "clamp(260px, 55vw, 700px)",
                position: "relative",
              }}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title || `Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(7,178,75,0.18) 0%, rgba(21,150,212,0.22) 55%, rgba(255,255,255,0.10) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={goPrev}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            width: "52px",
            height: "52px",
            borderRadius: "999px",
            border: "none",
            background: "rgba(255,255,255,0.75)",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ‹
        </button>

        <button
          onClick={goNext}
          aria-label="Next slide"
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            width: "52px",
            height: "52px",
            borderRadius: "999px",
            border: "none",
            background: "rgba(255,255,255,0.75)",
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          ›
        </button>

        <div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
          }}
        >
          {activeSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                background:
                  index === current ? "#ffffff" : "rgba(255,255,255,0.55)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}