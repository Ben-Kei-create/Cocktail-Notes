"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ImagePlus, Trash2, RotateCcw, X } from "lucide-react";
import {
  getCustomImage,
  setCustomImage,
  removeCustomImage,
  compressImageFile,
} from "@/lib/cocktailImages";

interface CustomImageManagerProps {
  cocktailId: string;
  thecocktaildbId?: number;
  colorHex: string;
  cocktailName: string;
}

export default function CustomImageManager({
  cocktailId,
  thecocktaildbId,
  colorHex,
  cocktailName,
}: CustomImageManagerProps) {
  const [customImage, setCustomImageState] = useState<string | null>(null);
  const [defaultError, setDefaultError] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCustomImageState(getCustomImage(cocktailId));
    setDefaultError(false);
  }, [cocktailId]);

  const defaultSrc = thecocktaildbId ? `/api/cocktail-image/${thecocktaildbId}` : null;
  const displaySrc = customImage ?? (defaultSrc && !defaultError ? defaultSrc : null);
  const hasCustom = customImage !== null;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const compressed = await compressImageFile(file);
      setCustomImage(cocktailId, compressed);
      setCustomImageState(compressed);
    } catch {
      // ignore compression errors
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSheetOpen(false);
    }
  }

  function handleRemove() {
    removeCustomImage(cocktailId);
    setCustomImageState(null);
    setSheetOpen(false);
  }

  function triggerFilePicker() {
    fileInputRef.current?.click();
    setSheetOpen(false);
  }

  return (
    <>
      {/* Image container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "260px",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        {/* Image or color fallback */}
        {displaySrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displaySrc}
            alt={cocktailName}
            onError={() => {
              if (!customImage) setDefaultError(true);
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${colorHex}cc 0%, ${colorHex}55 100%)`,
            }}
          />
        )}

        {/* Gradient overlay at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, rgba(13,27,42,0.85) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Action button */}
        {loading ? (
          <div
            style={{
              position: "absolute",
              bottom: "0.75rem",
              right: "0.75rem",
              background: "rgba(13,27,42,0.8)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "100px",
              padding: "0.4rem 0.875rem",
              color: "var(--ivory-muted)",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <span className="animate-shimmer">Processing...</span>
          </div>
        ) : hasCustom ? (
          <button
            onClick={() => setSheetOpen(true)}
            style={{
              position: "absolute",
              bottom: "0.75rem",
              right: "0.75rem",
              background: "rgba(13,27,42,0.8)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "100px",
              padding: "0.4rem 0.875rem",
              color: "var(--ivory-dim)",
              fontSize: "0.75rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <Camera size={13} />
            Photo options
          </button>
        ) : (
          <button
            onClick={triggerFilePicker}
            style={{
              position: "absolute",
              bottom: "0.75rem",
              right: "0.75rem",
              background: "rgba(13,27,42,0.8)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "100px",
              padding: "0.4rem 0.875rem",
              color: "var(--gold)",
              fontSize: "0.75rem",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <ImagePlus size={13} />
            Add your photo
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Bottom action sheet */}
      {sheetOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setSheetOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
            }}
          />

          {/* Sheet */}
          <div
            style={{
              position: "relative",
              background: "var(--navy-card)",
              borderTop: "1px solid var(--glass-border)",
              borderRadius: "24px 24px 0 0",
              padding: "1rem 1rem calc(1rem + env(safe-area-inset-bottom, 0px))",
              maxWidth: "480px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Handle */}
            <div
              style={{
                width: "36px",
                height: "4px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "2px",
                margin: "0 auto 1.25rem",
              }}
            />

            <div
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ivory-muted)",
                marginBottom: "0.875rem",
                textAlign: "center",
              }}
            >
              Your Photo
            </div>

            <button
              onClick={triggerFilePicker}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--glass-border)",
                borderRadius: "14px",
                padding: "1rem",
                color: "var(--ivory)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              <RotateCcw size={18} color="var(--gold)" />
              Replace photo
            </button>

            <button
              onClick={handleRemove}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--glass-border)",
                borderRadius: "14px",
                padding: "1rem",
                color: "var(--ivory-dim)",
                fontSize: "0.9375rem",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              <Trash2 size={18} color="var(--ivory-muted)" />
              Remove photo
            </button>

            <button
              onClick={() => setSheetOpen(false)}
              style={{
                width: "100%",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "14px",
                padding: "1rem",
                color: "var(--ivory-muted)",
                fontSize: "0.9375rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
