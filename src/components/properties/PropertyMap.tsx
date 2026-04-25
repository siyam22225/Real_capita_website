type Props = {
  title: string;
  mapEmbedUrl: string;
};

export default function PropertyMap({ title, mapEmbedUrl }: Props) {
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
          margin: "0 0 18px 0",
          color: "#555",
          fontSize: "28px",
          fontWeight: 600,
        }}
      >
        Property Location
      </h2>

      <p
        style={{
          margin: "0 0 18px 0",
          color: "#666",
          fontSize: "16px",
        }}
      >
        Location map for {title}
      </p>

      <div
        style={{
          width: "100%",
          height: "380px",
          overflow: "hidden",
          background: "#f2f2f2",
        }}
      >
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${title} location map`}
        />
      </div>
    </div>
  );
}