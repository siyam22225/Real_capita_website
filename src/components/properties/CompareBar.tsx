"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearComparedSlugs, getComparedSlugs } from "@/lib/compare";

export default function CompareBar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      setCount(getComparedSlugs().length);
    };

    sync();
    window.addEventListener("compareUpdated", sync);

    return () => {
      window.removeEventListener("compareUpdated", sync);
    };
  }, []);

  if (count === 0) {
    return null;
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "18px 20px",
        marginBottom: "20px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
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
          fontSize: "15px",
          fontWeight: 600,
        }}
      >
        {count} property selected for comparison
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/properties/compare"
          style={{
            display: "inline-block",
            background: "#ef4444",
            color: "#fff",
            textDecoration: "none",
            padding: "10px 18px",
            fontWeight: 600,
          }}
        >
          View Compare
        </Link>

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
    </div>
  );
}