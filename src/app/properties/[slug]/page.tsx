import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { propertyItems } from "@/data/properties";
import BookVisitForm from "@/components/properties/BookVisitForm";
import EmiCalculator from "@/components/properties/EmiCalculator";
import RelatedProperties from "@/components/properties/RelatedProperties";
import CompareButton from "@/components/properties/CompareButton";
import PropertyMap from "@/components/properties/PropertyMap";
import PropertyEnquiryCTA from "@/components/properties/PropertyEnquiryCTA";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PropertyDetailsPage({ params }: Props) {
  const { slug } = await params;

  const property = propertyItems.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

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
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/properties"
            style={{
              textDecoration: "none",
              color: "#ef4444",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            ← Back to Properties
          </Link>
        </div>

        <div
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
              height: "420px",
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

          <div style={{ padding: "32px" }}>
            <h1
              style={{
                margin: "0 0 12px 0",
                color: "#555",
                fontSize: "40px",
                fontWeight: 300,
              }}
            >
              {property.title}
            </h1>

            <p style={{ margin: "0 0 10px 0", color: "#888" }}>{property.location}</p>
            <p style={{ margin: "0 0 10px 0", color: "#ef4444", fontWeight: 700 }}>
              {property.price}
            </p>
            <p style={{ margin: "0 0 10px 0", color: "#666" }}>Type: {property.type}</p>
            <p style={{ margin: "0 0 10px 0", color: "#666" }}>Size: {property.size}</p>
            <p style={{ margin: "0 0 10px 0", color: "#666" }}>
              Bedrooms: {property.bedrooms}
            </p>
            <p style={{ margin: "0 0 10px 0", color: "#666" }}>
              Bathrooms: {property.bathrooms}
            </p>
            <p style={{ margin: "0 0 24px 0", color: "#666" }}>
              Status: {property.status}
            </p>
            <div
  style={{
    margin: "20px 0 26px 0",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center",
  }}
>
  <CompareButton slug={property.slug} />

  <Link
    href="/properties/compare"
    style={{
      display: "inline-block",
      background: "#333",
      color: "#fff",
      textDecoration: "none",
      padding: "12px 20px",
      fontWeight: 600,
    }}
  >
    Go to Compare
  </Link>
</div>
<PropertyEnquiryCTA
  propertyTitle={property.title}
  propertySlug={property.slug}
/>

            <p
              style={{
                margin: "0 0 24px 0",
                color: "#666",
                fontSize: "18px",
                lineHeight: "1.8",
              }}
            >
              {property.shortDescription}
            </p>

            <div style={{ color: "#666", fontSize: "17px", lineHeight: "1.9" }}>
              {property.fullDescription.map((paragraph, index) => (
                <p key={index} style={{ margin: "0 0 18px 0" }}>
                  {paragraph}
                </p>
              ))}
            </div>

       <BookVisitForm
  propertyTitle={property.title}
  sectionId="book-visit-form"
/>
          <EmiCalculator
  propertyTitle={property.title}
  propertyPrice={property.price}
/>
<RelatedProperties
  currentSlug={property.slug}
  currentType={property.type}
/>
<PropertyMap
  title={property.title}
  mapEmbedUrl={property.mapEmbedUrl}
/>
          </div>
        </div>
      </div>
    </section>
  );
}