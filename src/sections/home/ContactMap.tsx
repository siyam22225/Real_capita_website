"use client";

export default function ContactMap() {
  return (
    <section
      style={{
        padding: "44px 0 36px",
        background: "transparent",
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: "22px",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
            border: "1px solid rgba(21,150,212,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            minHeight: "480px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#16a34a",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Here We Are
            </p>

            <h2
              className="section-title"
              style={{
                margin: "0 0 10px 0",
                color: "#0f172a",
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              Contact Us
              <br />
              Today
            </h2>

            <p
              style={{
                margin: 0,
                color: "#1d9bf0",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Corporate &amp; Sales Office
            </p>
          </div>

          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "18px 18px 16px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#0f172a",
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              Corporate Office
            </p>
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#475569",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              House# 05, Flat# C-4 &amp; C-5,
              <br />
              Road# 21, Gulshan-1, Dhaka-1212, Bangladesh
            </p>
            <p
              style={{
                margin: 0,
                color: "#334155",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              Tel: +88-02-226600699
            </p>
          </div>

          <div
            style={{
              background: "#f8fafc",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "18px 18px 16px",
            }}
          >
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#0f172a",
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              Sales Office
            </p>
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#475569",
                fontSize: "16px",
                lineHeight: 1.7,
              }}
            >
              Level-19, Nafi Tower, 53, Gulshan-Avenue,
              <br />
              Gulshan-1, Dhaka-1212, Bangladesh
            </p>
            <p
              style={{
                margin: 0,
                color: "#334155",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              Tel: +88-02-8833232
            </p>
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
            border: "1px solid rgba(21,150,212,0.08)",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "18px 22px",
              background: "linear-gradient(90deg, #0f9d7a 0%, #1d9bf0 100%)",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: 800,
              }}
            >
              Map Location
            </h3>
          </div>

          <div style={{ flex: 1, minHeight: "458px" }}>
            <iframe
              title="Real Capita Group Location"
              src="https://www.google.com/maps?q=House%205%20Road%2021%20Gulshan%201%20Dhaka&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}