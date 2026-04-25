"use client";

import Image from "next/image";

const logos = [
  { id: 1, src: "/images/logos/logo-1.png", alt: "Logo 01" },
  { id: 2, src: "/images/logos/logo-2.png", alt: "Logo 02" },
  { id: 3, src: "/images/logos/logo-3.png", alt: "Logo 03" },
  { id: 4, src: "/images/logos/logo-4.png", alt: "Logo 04" },
  
];

const loopLogos = [...logos, ...logos];

export default function LogoSlider() {
  return (
    <section
      style={{
        padding: "18px 0 28px",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ overflow: "hidden" }}>
        <div className="logo-marquee">
          <div className="logo-track">
            {loopLogos.map((logo, index) => (
              <div className="logo-item" key={`${logo.id}-${index}`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={70}
                  style={{
                    width: "auto",
                    height: "60px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-marquee {
          width: 100%;
          overflow: hidden;
          background: transparent;
          position: relative;
        }

        .logo-track {
          display: flex;
          align-items: center;
          width: max-content;
          gap: 56px;
          animation: scrollLogos 22s linear infinite;
          will-change: transform;
        }

        .logo-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
        }

        @keyframes scrollLogos {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 991px) {
          .logo-track {
            gap: 40px;
            animation-duration: 18s;
          }

          .logo-item :global(img) {
            height: 46px !important;
          }
        }

        @media (max-width: 575px) {
          .logo-track {
            gap: 28px;
            animation-duration: 14s;
          }

          .logo-item :global(img) {
            height: 38px !important;
          }
        }
      `}</style>
    </section>
  );
}