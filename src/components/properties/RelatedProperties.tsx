import Image from "next/image";
import Link from "next/link";
import { propertyItems } from "@/data/properties";

type Props = {
  currentSlug: string;
  currentType: string;
};

export default function RelatedProperties({
  currentSlug,
  currentType,
}: Props) {
  const relatedItems = propertyItems
    .filter(
      (item) => item.slug !== currentSlug && item.type === currentType
    )
    .slice(0, 3);

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "36px",
        background: "#ffffff",
        padding: "24px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          margin: "0 0 20px 0",
          color: "#555",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        Related Properties
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {relatedItems.map((property) => (
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
                height: "180px",
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

            <div style={{ padding: "18px" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: "#555",
                  fontSize: "22px",
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

              <p style={{ margin: "0 0 14px 0", color: "#666" }}>
                Status: {property.status}
              </p>

              <Link
                href={`/properties/${property.slug}`}
                style={{
                  display: "inline-block",
                  background: "#ef4444",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "10px 18px",
                  fontWeight: 600,
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}