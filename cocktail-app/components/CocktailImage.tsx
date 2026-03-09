"use client";

import { useEffect, useState } from "react";
import { getCustomImage } from "@/lib/cocktailImages";

interface CocktailImageProps {
  cocktailId: string;
  thecocktaildbId?: number;
  colorHex: string;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
}

const SIZES = {
  sm: { width: 40, height: 40, borderRadius: "10px" },
  md: { width: 48, height: 48, borderRadius: "12px" },
  lg: { width: 64, height: 64, borderRadius: "16px" },
};

export default function CocktailImage({
  cocktailId,
  thecocktaildbId,
  colorHex,
  size = "md",
  style,
}: CocktailImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const dim = SIZES[size];

  useEffect(() => {
    const custom = getCustomImage(cocktailId);
    if (custom) {
      setImgSrc(custom);
      setImgError(false);
    } else if (thecocktaildbId) {
      setImgSrc(`/api/cocktail-image/${thecocktaildbId}`);
      setImgError(false);
    } else {
      setImgSrc(null);
    }
  }, [cocktailId, thecocktaildbId]);

  const containerStyle: React.CSSProperties = {
    width: dim.width,
    height: dim.height,
    borderRadius: dim.borderRadius,
    flexShrink: 0,
    overflow: "hidden",
    ...style,
  };

  if (imgSrc && !imgError) {
    return (
      <div style={containerStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt=""
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...containerStyle,
        background: colorHex,
        opacity: 0.85,
      }}
    />
  );
}
