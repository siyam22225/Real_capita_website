import Image from "next/image";

export default function MissionVisionValuesPage() {
  return (
    <section style={{ background: "#f5f5f5", padding: "60px 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ background: "#fff", padding: "28px", boxShadow: "0 10px 24px rgba(0,0,0,0.10)" }}>
          <div style={{ position: "relative", width: "100%", height: "420px", marginBottom: "28px" }}>
            <Image
              src="/images/about/mission-vision-values.jpg"
              alt="Mission Vision and Values"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <h1 style={{ margin: "0 0 18px 0", fontSize: "42px", color: "#111827" }}>
            Mission Vision &amp; Values
          </h1>

          <p style={{ fontSize: "18px", lineHeight: "1.9", color: "#4b5563" }}>
            Our mission is to develop trusted projects and business initiatives that create practical
            value for customers, partners, and communities. We work with a focus on service quality,
            long-term planning, and responsible growth.
          </p>

          <p style={{ fontSize: "18px", lineHeight: "1.9", color: "#4b5563" }}>
            Our vision is to become a respected and dependable corporate group known for professional
            excellence, customer confidence, and sustainable progress. Our values are built on integrity,
            commitment, accountability, innovation, and continuous improvement.
          </p>
        </div>
      </div>
    </section>
  );
}