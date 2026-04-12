import Link from "next/link";
import { enterpriseItems } from "@/data/enterprises";

export default function EnterprisePage() {
  return (
    <section
      style={{
        background: "#f2f2f2",
        minHeight: "100vh",
        padding: "70px 0 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
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
          <h1
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
            Enterprise
          </h1>
        </div>

        <div
          style={{
            background: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            padding: "30px",
          }}
        >
          {enterpriseItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                borderBottom:
                  index !== enterpriseItems.length - 1
                    ? "1px solid #e5e7eb"
                    : "none",
              }}
            >
              <Link
                href={`/enterprise/${item.slug}`}
                style={{
                  display: "block",
                  padding: "18px 0",
                  textDecoration: "none",
                  color: "#555",
                  fontSize: "22px",
                  fontWeight: 500,
                }}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}