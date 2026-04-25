import Image from "next/image";
import Link from "next/link";
import { propertyItems } from "@/data/properties";

export default function FeaturedProperties() {
  const featuredItems = propertyItems.slice(0, 3);

  return (
    <section
      style={{
        background: "transparent",
        padding: "30px 0 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2
            style={{
              margin: 0,
              color: "#555",
              fontSize: "42px",
              fontWeight: 300,
              textTransform: "uppercase",
            }}
          >
            Featured Properties
          </h2>

          <p
            style={{
              marginTop: "12px",
              color: "#777",
              fontSize: "16px",
            }}
          >
            Discover some of our featured real estate opportunities.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {featuredItems.map((property) => (
            <div
              key={property.id}
              style={{
                background: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  background: "#ddd",
                }}
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    color: "#555",
                    fontSize: "26px",
                    fontWeight: 500,
                  }}
                >
                  {property.title}
                </h3>

                <p style={{ margin: "0 0 8px 0", color: "#777", fontSize: "15px" }}>
                  {property.location}
                </p>

                <p style={{ margin: "0 0 8px 0", color: "#ef4444", fontWeight: 700 }}>
                  {property.price}
                </p>

                <p style={{ margin: "0 0 16px 0", color: "#666" }}>
                  Status: {property.status}
                </p>

                <Link
                  href={`/properties/${property.slug}`}
                  style={{
                    display: "inline-block",
                    background: "#ef4444",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "12px 20px",
                    fontWeight: 600,
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link
            href="/properties"
            style={{
              display: "inline-block",
              background: "#333",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 28px",
              fontWeight: 600,
            }}
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}