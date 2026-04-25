"use client";

import { useEffect, useState } from "react";
import {
  addComparedSlug,
  isComparedSlug,
  removeComparedSlug,
} from "@/lib/compare";

type Props = {
  slug: string;
};

export default function CompareButton({ slug }: Props) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSelected(isComparedSlug(slug));
    };

    sync();
    window.addEventListener("compareUpdated", sync);

    return () => {
      window.removeEventListener("compareUpdated", sync);
    };
  }, [slug]);

  const handleClick = () => {
    if (selected) {
      removeComparedSlug(slug);
      return;
    }

    const result = addComparedSlug(slug);

    if (!result.ok) {
      window.alert("You can compare up to 3 properties only.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        background: selected ? "#333" : "#ffffff",
        color: selected ? "#ffffff" : "#333333",
        border: "1px solid #333",
        padding: "12px 20px",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {selected ? "Remove Compare" : "Add to Compare"}
    </button>
  );
}