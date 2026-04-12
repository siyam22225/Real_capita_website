import Image from "next/image";

export default function CorporateProfilePage() {
  return (
    <section style={{ background: "#f5f5f5", padding: "60px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", padding: "28px", boxShadow: "0 10px 24px rgba(0,0,0,0.10)" }}>
          <div style={{ position: "relative", width: "100%", height: "420px", marginBottom: "28px" }}>
            <Image
              src="/images/about/corporate-profile.jpg"
              alt="Corporate Profile"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <h1 style={{ margin: "0 0 18px 0", fontSize: "42px", color: "#111827" }}>
            Corporate Profile
          </h1>

          <p style={{ fontSize: "18px", lineHeight: "1.9", color: "#4b5563" }}>
            Real Capita Group is a growing corporate organization committed to long-term development,
            structured planning, and value-driven enterprise expansion. The company focuses on building
            dependable projects, strengthening customer trust, and maintaining a professional business
            standard across its activities.
          </p>

          <p style={{ fontSize: "18px", lineHeight: "1.9", color: "#4b5563" }}>
            Through its different business initiatives, Real Capita Group aims to create sustainable
            opportunities, improve service quality, and establish a strong institutional presence in the
            market. The organization continues to move forward with a vision of reliability, progress,
            and responsible growth.
          </p>
        </div>
      </div>
    </section>
  );
}