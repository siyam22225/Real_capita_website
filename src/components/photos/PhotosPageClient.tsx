"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type PhotoItem = {
  id: string;
  title: string;
  imageUrl: string;
  category: string | null;
};

type Props = {
  initialPhotos?: PhotoItem[];
};

const demoAlbums = ["All", "Office", "Event", "Community", "Projects", "Directors"];

export default function PhotosPageClient({ initialPhotos = [] }: Props) {
  const [activeAlbum, setActiveAlbum] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeAlbum === "All") return initialPhotos;
    return initialPhotos.filter((photo) => photo.category === activeAlbum);
  }, [activeAlbum, initialPhotos]);

  return (
    <section
      style={{
        padding: "56px 0 72px",
        background: "transparent",
      }}
    >
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <h1
            style={{
              margin: 0,
              color: "#1565c0",
              fontSize: "clamp(34px, 5vw, 56px)",
              fontWeight: 800,
            }}
          >
            Photos
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          {demoAlbums.map((album) => {
            const active = activeAlbum === album;

            return (
              <button
                key={album}
                type="button"
                onClick={() => setActiveAlbum(album)}
                style={{
                  border: active ? "none" : "1px solid #e5e7eb",
                  padding: "12px 18px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "14px",
                  background: active
                    ? "linear-gradient(90deg, #0f9d7a 0%, #1d9bf0 100%)"
                    : "#ffffff",
                  color: active ? "#ffffff" : "#0f172a",
                  boxShadow: active
                    ? "0 10px 24px rgba(29,155,240,0.18)"
                    : "0 6px 16px rgba(15,23,42,0.06)",
                  transition: "all 0.2s ease",
                }}
              >
                {album}
              </button>
            );
          })}
        </div>

        {filteredPhotos.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            No photos found in this album.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredPhotos.map((photo) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 12px 28px rgba(15,23,42,0.08)",
                  border: "1px solid rgba(21,150,212,0.08)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease",
                  padding: 0,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    background: "#e5e7eb",
                  }}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "16px" }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      color: "#0f172a",
                      fontSize: "20px",
                      fontWeight: 800,
                    }}
                  >
                    {photo.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: "14px",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {photo.category || "General"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.82)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(100%, 1000px)",
              background: "#ffffff",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a",
                    fontSize: "24px",
                    fontWeight: 800,
                  }}
                >
                  {selectedPhoto.title}
                </h2>
                <p
                  style={{
                    margin: "6px 0 0 0",
                    color: "#64748b",
                    fontSize: "14px",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {selectedPhoto.category || "General"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                style={{
                  border: "none",
                  background: "#fee2e2",
                  color: "#b91c1c",
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  fontSize: "22px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 10",
                background: "#e5e7eb",
              }}
            >
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}