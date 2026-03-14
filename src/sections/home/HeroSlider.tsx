"use client";

import { useEffect, useState } from "react";

const slides = [
  "/images/hero/slide-1.jpg",
  "/images/hero/slide-2.jpg",
  "/images/hero/slide-3.jpg",
  "/images/hero/slide-4.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => setCurrent(index);
  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const goNext = () => setCurrent((prev) => (prev + 1) % slides.length);

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
            width: `${slides.length * 100}%`,
            transform: `translateX(-${current * (100 / slides.length)}%)`,
            transition: "transform 0.8s ease-in-out",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              style={{
                width: `${100 / slides.length}%`,
                flexShrink: 0,
                height: "clamp(260px, 55vw, 700px)",
              }}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
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
          {slides.map((_, index) => (
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
                background: index === current ? "#ffffff" : "rgba(255,255,255,0.55)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}