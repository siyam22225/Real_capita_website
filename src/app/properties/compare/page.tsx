"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { propertyItems } from "@/data/properties";
import {
  clearComparedSlugs,
  getComparedSlugs,
  removeComparedSlug,
} from "@/lib/compare";

type PropertyData = (typeof propertyItems)[number];

export default function ComparePropertiesPage() {
  const [selectedItems, setSelectedItems] = useState<PropertyData[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const syncCompare = () => {
      const slugs = getComparedSlugs();

      const orderedItems = slugs
        .map((slug) => propertyItems.find((item) => item.slug === slug))
        .filter(Boolean) as PropertyData[];

      setSelectedItems(orderedItems);
    };

    const syncScreen = () => {
      setIsMobile(window.innerWidth < 900);
    };

    syncCompare();
    syncScreen();

    window.addEventListener("compareUpdated", syncCompare);
    window.addEventListener("resize", syncScreen);

    return () => {
      window.removeEventListener("compareUpdated", syncCompare);
      window.removeEventListener("resize", syncScreen);
    };
  }, []);

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

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              margin: 0,
              color: "#666",
              fontSize: "48px",
              fontWeight: 300,
              textTransform: "uppercase",
            }}
          >
            Compare Properties
          </h1>

          <p
            style={{
              marginTop: "12px",
              color: "#888",
              fontSize: "16px",
            }}
          >
            Compare selected properties side by side.
          </p>
        </div>

        {selectedItems.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "40px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ margin: "0 0 18px 0", color: "#666", fontSize: "18px" }}>
              No property selected for comparison.
            </p>

            <Link
              href="/properties"
              style={{
                display: "inline-block",
                background: "#ef4444",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 22px",
                fontWeight: 600,
              }}
            >
              Go to Properties
            </Link>
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#555",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {selectedItems.length} property selected
              </p>

              <button
                type="button"
                onClick={clearComparedSlugs}
                style={{
                  background: "#333",
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Clear Compare
              </button>
            </div>

            {selectedItems.length < 2 && (
              <div
                style={{
                  background: "#fff7ed",
                  color: "#9a3412",
                  padding: "14px 16px",
                  marginBottom: "18px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
                }}
              >
                Select at least 2 properties for a meaningful comparison.
              </div>
            )}

            {isMobile ? (
              <div
                style={{
                  display: "grid",
                  gap: "20px",
                }}
              >
                {selectedItems.map((property) => (
                  <div
                    key={property.slug}
                    style={{
                      background: "#fff",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
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
                      <h2
                        style={{
                          margin: "0 0 10px 0",
                          color: "#555",
                          fontSize: "28px",
                          fontWeight: 600,
                        }}
                      >
                        {property.title}
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                          marginBottom: "18px",
                        }}
                      >
                        <Link
                          href={`/properties/${property.slug}`}
                          style={{
                            display: "inline-block",
                            background: "#ef4444",
                            color: "#fff",
                            textDecoration: "none",
                            padding: "10px 16px",
                            fontWeight: 600,
                          }}
                        >
                          View Details
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeComparedSlug(property.slug)}
                          style={{
                            background: "#333",
                            color: "#fff",
                            border: "none",
                            padding: "10px 16px",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                          gap: "12px",
                        }}
                      >
                        {[
                          ["Price", property.price],
                          ["Location", property.location],
                          ["Type", property.type],
                          ["Size", property.size],
                          ["Bedrooms", String(property.bedrooms)],
                          ["Bathrooms", String(property.bathrooms)],
                          ["Status", property.status],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            style={{
                              background: "#f8f8f8",
                              padding: "14px",
                              borderLeft: "4px solid #ef4444",
                            }}
                          >
                            <p
                              style={{
                                margin: "0 0 6px 0",
                                color: "#777",
                                fontSize: "13px",
                                fontWeight: 600,
                              }}
                            >
                              {label}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                color: "#333",
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          marginTop: "16px",
                          background: "#f8f8f8",
                          padding: "14px",
                        }}
                      >
                        <p
                          style={{
                            margin: "0 0 6px 0",
                            color: "#777",
                            fontSize: "13px",
                            fontWeight: 600,
                          }}
                        >
                          Short Description
                        </p>
                        <p
                          style={{
                            margin: 0,
                            color: "#555",
                            lineHeight: "1.7",
                          }}
                        >
                          {property.shortDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  overflowX: "auto",
                  background: "#fff",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    minWidth: "900px",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={cellLabelStyle}>Property</td>

                      {selectedItems.map((property) => (
                        <td
                          key={property.slug}
                          style={{
                            padding: "18px",
                            borderBottom: "1px solid #eee",
                            verticalAlign: "top",
                          }}
                        >
                          <Image
                            src={property.image}
                            alt={property.title}
                            width={220}
                            height={140}
                            style={{
                              width: "100%",
                              height: "140px",
                              objectFit: "cover",
                              marginBottom: "12px",
                            }}
                          />

                          <h3
                            style={{
                              margin: "0 0 10px 0",
                              color: "#555",
                              fontSize: "24px",
                            }}
                          >
                            {property.title}
                          </h3>

                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexWrap: "wrap",
                            }}
                          >
                            <Link
                              href={`/properties/${property.slug}`}
                              style={{
                                display: "inline-block",
                                background: "#ef4444",
                                color: "#fff",
                                textDecoration: "none",
                                padding: "10px 16px",
                                fontWeight: 600,
                              }}
                            >
                              View Details
                            </Link>

                            <button
                              type="button"
                              onClick={() => removeComparedSlug(property.slug)}
                              style={{
                                background: "#333",
                                color: "#fff",
                                border: "none",
                                padding: "10px 16px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Price</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.price}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Location</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.location}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Type</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.type}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Size</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.size}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Bedrooms</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.bedrooms}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Bathrooms</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.bathrooms}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Status</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.status}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={cellLabelStyle}>Short Description</td>
                      {selectedItems.map((property) => (
                        <td key={property.slug} style={cellValueStyle}>
                          {property.shortDescription}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

const cellLabelStyle = {
  padding: "16px 18px",
  fontWeight: 700,
  color: "#333",
  borderBottom: "1px solid #eee",
  background: "#fafafa",
  verticalAlign: "top" as const,
  width: "180px",
};

const cellValueStyle = {
  padding: "16px 18px",
  color: "#555",
  borderBottom: "1px solid #eee",
  verticalAlign: "top" as const,
};