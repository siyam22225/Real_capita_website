import Link from "next/link";

type Props = {
  propertyTitle: string;
  propertySlug: string;
};

export default function PropertyEnquiryCTA({
  propertyTitle,
  propertySlug,
}: Props) {
  return (
    <div
      style={{
        margin: "28px 0 30px 0",
        background: "#ffffff",
        padding: "24px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        borderLeft: "4px solid #ef4444",
      }}
    >
      <h2
        style={{
          margin: "0 0 10px 0",
          color: "#555",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        Interested in this property?
      </h2>

      <p
        style={{
          margin: "0 0 18px 0",
          color: "#666",
          fontSize: "16px",
          lineHeight: "1.8",
        }}
      >
        Contact us for pricing, visit schedule, and full project details for{" "}
        <strong>{propertyTitle}</strong>.
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
       <Link
  href={`/contact?property=${encodeURIComponent(propertyTitle)}`}
          style={{
            display: "inline-block",
            background: "#ef4444",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 20px",
            fontWeight: 600,
          }}
        >
          Send Enquiry
        </Link>

        <a
          href="#book-visit-form"
          style={{
            display: "inline-block",
            background: "#333",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 20px",
            fontWeight: 600,
          }}
        >
          Book a Visit
        </a>

        <a
          href={`/brochures/${propertySlug}.pdf`}
          download
          style={{
            display: "inline-block",
            background: "#0f766e",
            color: "#fff",
            textDecoration: "none",
            padding: "12px 20px",
            fontWeight: 600,
          }}
        >
          Download Brochure
        </a>
      </div>
    </div>
  );
}