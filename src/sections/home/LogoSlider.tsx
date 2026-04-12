"use client";

import Image from "next/image";

const logos = [
  "/images/logos/logo-1.svg",
  "/images/logos/logo-2.svg",
  "/images/logos/logo-3.svg",
  "/images/logos/logo-4.svg",
  "/images/logos/logo-1.svg",
  "/images/logos/logo-2.svg",
  "/images/logos/logo-3.svg",
  "/images/logos/logo-4.svg",
];

export default function LogoSlider() {
  return (
    <section
      style={{
     background: "transparent",
    padding: "70px 0 90px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div className="logo-track">
          {logos.map((logo, index) => (
            <div key={index} className="logo-item">
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                width={140}
                height={70}
                style={{
                  objectFit: "contain",
                  width: "120px",
                  height: "60px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logo-track {
          display: flex;
          align-items: center;
          gap: 48px;
          width: max-content;
          animation: scrollLogos 22s linear infinite;
        }

        .logo-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.95;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .logo-item:hover {
          transform: scale(1.06);
          opacity: 1;
        }

        @keyframes scrollLogos {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}