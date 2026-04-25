"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PropertyItem } from "@/data/properties";
import CompareBar from "@/components/properties/CompareBar";
import CompareButton from "@/components/properties/CompareButton";

type Props = {
  items: PropertyItem[];
};

function parsePrice(price: string) {
  return Number(price.replace(/[^\d]/g, "") || 0);
}

export default function PropertyFilter({ items }: Props) {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const propertyTypes = useMemo(() => {
    return ["All", ...Array.from(new Set(items.map((item) => item.type)))];
  }, [items]);

  const propertyStatuses = ["All", "Available", "Booked", "Sold Out"];

  const filteredItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const itemPrice = parsePrice(item.price);

      const matchesSearch =
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase());

      const matchesType =
        selectedType === "All" ? true : item.type === selectedType;

      const matchesStatus =
        selectedStatus === "All" ? true : item.status === selectedStatus;

      const matchesMinPrice = minPrice ? itemPrice >= Number(minPrice) : true;
      const matchesMaxPrice = maxPrice ? itemPrice <= Number(maxPrice) : true;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });

    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "priceHighToLow") {
      filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "titleAZ") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [
    items,
    searchText,
    selectedType,
    selectedStatus,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const handleReset = () => {
    setSearchText("");
    setSelectedType("All");
    setSelectedStatus("All");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  return (
    <>
      <CompareBar />

      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          marginBottom: "28px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Search by title or location"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "15px",
            }}
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "15px",
              background: "#fff",
            }}
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "15px",
              background: "#fff",
            }}
          >
            {propertyStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Minimum price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "15px",
            }}
          />

          <input
            type="number"
            placeholder="Maximum price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "15px",
            }}
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: "14px 16px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: "15px",
              background: "#fff",
            }}
          >
            <option value="default">Sort by</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="titleAZ">Title: A to Z</option>
          </select>
        </div>

        <div
          style={{
            marginTop: "18px",
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
              color: "#666",
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            {filteredItems.length} property found
          </p>

          <button
            type="button"
            onClick={handleReset}
            style={{
              background: "#333",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredItems.map((property) => (
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
              <h2
                style={{
                  margin: "0 0 10px 0",
                  color: "#555",
                  fontSize: "24px",
                  fontWeight: 500,
                }}
              >
                {property.title}
              </h2>

              <p style={{ margin: "0 0 8px 0", color: "#777", fontSize: "15px" }}>
                {property.location}
              </p>

              <p style={{ margin: "0 0 8px 0", color: "#ef4444", fontWeight: 700 }}>
                {property.price}
              </p>

              <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                Type: {property.type}
              </p>

              <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                Size: {property.size}
              </p>

              <p style={{ margin: "0 0 16px 0", color: "#666" }}>
                Status: {property.status}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
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
                    padding: "12px 20px",
                    fontWeight: 600,
                  }}
                >
                  View Details
                </Link>

                <CompareButton slug={property.slug} />
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              background: "#fff",
              padding: "30px",
              textAlign: "center",
              color: "#777",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            No property matched your search.
          </div>
        )}
      </div>
    </>
  );
}