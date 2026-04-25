import { propertyItems } from "@/data/properties";
import PropertyFilter from "@/components/properties/PropertyFilter";


export default function PropertiesPage() {
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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              margin: 0,
              color: "#666",
              fontSize: "50px",
              fontWeight: 300,
              textTransform: "uppercase",
            }}
          >
            Properties
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#888",
              fontSize: "16px",
            }}
          >
            Explore our featured real estate properties.
          </p>
        </div>

        <PropertyFilter items={propertyItems} />
      </div>
    </section>
  );
}