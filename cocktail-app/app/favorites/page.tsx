"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Compass } from "lucide-react";
import CocktailCard from "@/components/CocktailCard";
import { Cocktail } from "@/types";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      import("@/lib/cocktails"),
      import("@/lib/favorites"),
    ]).then(([{ cocktails }, { getFavorites }]) => {
      const favIds = getFavorites();
      const favCocktails = favIds
        .map((id) => cocktails.find((c) => c.id === id))
        .filter(Boolean) as Cocktail[];
      setFavorites(favCocktails);
      setLoading(false);
    });

    // Listen for storage changes (favorite toggles from other pages)
    const handleStorage = () => {
      import("@/lib/cocktails").then(({ cocktails }) => {
        import("@/lib/favorites").then(({ getFavorites }) => {
          const favIds = getFavorites();
          const favCocktails = favIds
            .map((id) => cocktails.find((c) => c.id === id))
            .filter(Boolean) as Cocktail[];
          setFavorites(favCocktails);
        });
      });
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          color: "var(--ivory-muted)",
        }}
      >
        <div className="animate-shimmer">Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 1rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ paddingTop: "3rem", paddingBottom: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--gold)",
            marginBottom: "0.5rem",
          }}
        >
          Favorites
        </div>
        <h1
          style={{
            color: "var(--ivory)",
            fontSize: "1.75rem",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            margin: "0 0 0.5rem 0",
          }}
        >
          Your collection
        </h1>
        <p style={{ color: "var(--ivory-muted)", fontSize: "0.875rem", margin: 0 }}>
          Cocktails you&apos;ve saved along the way
        </p>
      </div>

      {favorites.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 1rem",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(201, 168, 76, 0.08)",
              border: "1px solid rgba(201, 168, 76, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <Heart size={28} color="var(--ivory-muted)" strokeWidth={1.5} />
          </div>
          <h2
            style={{
              color: "var(--ivory)",
              fontSize: "1.25rem",
              fontWeight: 300,
              marginBottom: "0.75rem",
            }}
          >
            Your collection is empty
          </h2>
          <p
            style={{
              color: "var(--ivory-muted)",
              fontSize: "0.875rem",
              lineHeight: 1.6,
              marginBottom: "2rem",
              maxWidth: "280px",
              margin: "0 auto 2rem",
            }}
          >
            Start exploring and tap the heart icon on any cocktail to save it here.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <Link href="/explore" className="btn-primary">
              Start Exploring
            </Link>
            <Link href="/search" className="btn-ghost">
              Search
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              marginBottom: "1.75rem",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "var(--gold)",
                  fontSize: "1.75rem",
                  fontWeight: 300,
                  marginBottom: "4px",
                }}
              >
                {favorites.length}
              </div>
              <div style={{ color: "var(--ivory-muted)", fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                SAVED
              </div>
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "var(--gold)",
                  fontSize: "1.75rem",
                  fontWeight: 300,
                  marginBottom: "4px",
                }}
              >
                {new Set(favorites.map((c) => c.base_spirit)).size}
              </div>
              <div style={{ color: "var(--ivory-muted)", fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                SPIRITS
              </div>
            </div>
          </div>

          {/* Spirit breakdown */}
          {favorites.length > 2 && (
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ivory-muted)",
                  marginBottom: "0.75rem",
                }}
              >
                Your taste profile
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {Object.entries(
                  favorites.reduce((acc, c) => {
                    acc[c.base_spirit] = (acc[c.base_spirit] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                )
                  .sort((a, b) => b[1] - a[1])
                  .map(([spirit, count]) => (
                    <span key={spirit} className="tag">
                      {spirit} · {count}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Favorites list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {favorites.map((c) => (
              <CocktailCard key={c.id} cocktail={c} variant="default" />
            ))}
          </div>

          {/* Explore more */}
          <div
            style={{
              marginTop: "2rem",
              padding: "1.25rem",
              background: "rgba(201, 168, 76, 0.06)",
              border: "1px solid rgba(201, 168, 76, 0.12)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Compass size={20} color="var(--gold)" />
            <div style={{ flex: 1 }}>
              <div style={{ color: "var(--ivory)", fontSize: "0.9375rem", fontWeight: 500, marginBottom: "2px" }}>
                Keep exploring
              </div>
              <div style={{ color: "var(--ivory-muted)", fontSize: "0.8125rem" }}>
                Find more cocktails to add to your collection
              </div>
            </div>
            <Link href="/explore" style={{ color: "var(--gold)", fontSize: "0.875rem", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>
              Explore →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
