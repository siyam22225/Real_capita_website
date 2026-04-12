import Image from "next/image";

export default function FormerChairmanPage() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #123a63 0%, #0f2744 100%)",
        padding: "70px 0",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.9fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#22c55e",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Who We Are
            </p>

            <h1
            className="section-title"
              style={{
                margin: "0 0 28px 0",
               
                lineHeight: "1.1",
                fontWeight: 800,
              }}
            >
              Former Chairman Message
            </h1>

            <div style={{ fontSize: "20px", lineHeight: "1.95", color: "rgba(255,255,255,0.92)" }}>
              <p>
                Bangladesh has experienced strong economic growth accompanied by rapid
                urbanization. With this growth, the demand for planned development and
                sustainable living solutions has increased significantly.
              </p>
              <p>
                Real Capita Group has always worked to create long-term value through
                organized planning, customer trust, and responsible development. Our
                effort is to make modern living more practical, accessible, and dependable.
              </p>
              <p>
                We believe a successful real estate initiative must combine location
                strength, proper planning, service excellence, and a future-ready vision.
                That belief continues to guide our work and commitment.
              </p>
              <p>
                Real Capita Group is dedicated to building projects that create confidence,
                improve lifestyle, and contribute to the next generation of growth.
              </p>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 18px 40px rgba(0,0,0,0.22)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "260px",
                height: "260px",
                margin: "0 auto 26px",
                borderRadius: "999px",
                overflow: "hidden",
                border: "6px solid rgba(255,255,255,0.9)",
                boxShadow: "0 14px 34px rgba(0,0,0,0.25)",
              }}
            >
              <Image
                src="/images/message/former-chairman.jpg"
                alt="Former Chairman"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <h2 style={{ margin: "0 0 8px 0", fontSize: "36px", lineHeight: "1.2", fontWeight: 800 }}>
              Late Alhaj Md. Anower Hossain
            </h2>

            <p style={{ margin: "0 0 22px 0", fontSize: "20px", color: "#dbeafe", fontWeight: 700 }}>
              1960 – 2020
            </p>

            <div style={{ fontSize: "18px", lineHeight: "1.9", color: "rgba(255,255,255,0.92)" }}>
              <p><strong>Position:</strong> Chairman</p>
              <p><strong>Education:</strong> B.Com (Hons), Management</p>
              <p><strong>Profession:</strong> Businessman &amp; Contractor</p>
              <p><strong>Achievements:</strong> Recognized for leadership, dedication, and development vision.</p>
              <p><strong>Legacy:</strong> A lasting contribution to structured growth and corporate trust.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}