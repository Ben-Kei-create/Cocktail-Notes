"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  cocktailId: string;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  cocktailId,
  size = "md",
}: FavoriteButtonProps) {
  const [faved, setFaved] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setFaved(isFavorite(cocktailId));
  }, [cocktailId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowFaved = toggleFavorite(cocktailId);
    setFaved(nowFaved);
    if (nowFaved) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 400);
    }
  };

  const iconSizes = { sm: 16, md: 20, lg: 24 };
  const iconSize = iconSizes[size];

  return (
    <button
      onClick={handleToggle}
      aria-label={faved ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: faved
          ? "rgba(123, 45, 62, 0.3)"
          : "rgba(255, 255, 255, 0.06)",
        border: `1px solid ${faved ? "rgba(155, 58, 78, 0.5)" : "rgba(201, 168, 76, 0.15)"}`,
        borderRadius: "50%",
        width: size === "lg" ? "48px" : size === "md" ? "40px" : "32px",
        height: size === "lg" ? "48px" : size === "md" ? "40px" : "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: animating ? "scale(1.3)" : "scale(1)",
        flexShrink: 0,
      }}
    >
      <Heart
        size={iconSize}
        fill={faved ? "#9b3a4e" : "none"}
        color={faved ? "#c14060" : "var(--ivory-muted)"}
        strokeWidth={1.5}
      />
    </button>
  );
}
