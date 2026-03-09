"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, Search, ArrowRight } from "lucide-react";
import CocktailCard from "@/components/CocktailCard";
import SectionTitle from "@/components/SectionTitle";
import { Cocktail } from "@/types";

const curatedCollections = [
  {
    title: "First Cocktails to Know",
    description: "The classics every bar visitor should recognise",
    ids: ["gin-and-tonic", "mojito", "margarita", "aperol-spritz"],
    emoji: "🌟",
  },
  {
    title: "Bitter Classics",
    description: "For those who dare to go beyond sweetness",
    ids: ["negroni", "paper-plane", "last-word", "aperol-spritz"],
    emoji: "🌑",
  },
  {
    title: "Elegant Gin Cocktails",
    description: "Botanical, refined, and quintessentially sophisticated",
    ids: ["martini", "aviation", "white-lady", "clover-club"],
    emoji: "🍸",
  },
  {
    title: "Drinks With Strong Stories",
    description: "Every sip carries a piece of history",
    ids: ["old-fashioned", "french-75", "sidecar", "last-word"],
    emoji: "📖",
  },
];

export default function HomePage() {
  const [featured, setFeatured] = useState<Cocktail | null>(null);
  const [recentCocktails, setRecentCocktails] = useState<Cocktail[]>([]);
  const [allCocktails, setAllCocktails] = useState<Cocktail[]>([]);
  const [collection, setCollection] = useState<Cocktail[]>([]);
  const [selectedCollection, setSelectedCollection] = useState(0);

  useEffect(() => {
    import("@/lib/cocktails").then(({ cocktails, getFeaturedCocktail }) => {
      import("@/lib/favorites").then(({ getRecentlyViewed }) => {
        setAllCocktails(cocktails);
        setFeatured(getFeaturedCocktail());
        const viewedIds = getRecentlyViewed();
        const viewed = viewedIds
          .map((id) => cocktails.find((c) => c.id === id))
          .filter(Boolean) as Cocktail[];
        setRecentCocktails(viewed);
        updateCollection(0, cocktails);
      });
    });
  }, []);

  function updateCollection(idx: number, cList: Cocktail[]) {
    const col = curatedCollections[idx];
    const items = col.ids
      .map((id) => cList.find((c) => c.id === id))
      .filter(Boolean) as Cocktail[];
    setCollection(items);
    setSelectedCollection(idx);
  }

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 1rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>
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
          Cocktail Notes
        </div>
        <h1
          style={{
            color: "var(--ivory)",
            fontSize: "2rem",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          Where would you like{" "}
          <span style={{ color: "var(--gold)" }}>to travel</span>{" "}
          tonight?
        </h1>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        <Link href="/explore" style={{ textDecoration: "none" }}>
          <div
            className="card"
            style={{
              padding: "1.25rem",
              background: "linear-gradient(135deg, #172540 0%, #1e3050 100%)",
              borderColor: "rgba(201, 168, 76, 0.25)",
            }}
          >
            <Compass size={24} color="var(--gold)" style={{ marginBottom: "0.75rem" }} />
            <div
              style={{
                color: "var(--ivory)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                marginBottom: "4px",
              }}
            >
              Explore
            </div>
            <div style={{ color: "var(--ivory-muted)", fontSize: "0.8125rem" }}>
              Follow branching paths
            </div>
          </div>
        </Link>
        <Link href="/search" style={{ textDecoration: "none" }}>
          <div
            className="card"
            style={{ padding: "1.25rem" }}
          >
            <Search size={24} color="var(--ivory-muted)" style={{ marginBottom: "0.75rem" }} />
            <div
              style={{
                color: "var(--ivory)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                marginBottom: "4px",
              }}
            >
              Search
            </div>
            <div style={{ color: "var(--ivory-muted)", fontSize: "0.8125rem" }}>
              Find by name or taste
            </div>
          </div>
        </Link>
      </div>

      {/* Featured Cocktail */}
      {featured && (
        <div style={{ marginBottom: "2rem" }}>
          <SectionTitle title="Featured Tonight" />
          <CocktailCard cocktail={featured} variant="featured" />
        </div>
      )}

      {/* Start Exploration by Mood */}
      <div style={{ marginBottom: "2rem" }}>
        <SectionTitle title="Start Exploring" subtitle="Choose how you feel right now" />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { label: "Something refreshing", emoji: "🌿", node: "mood-refreshing" },
            { label: "Something bold & strong", emoji: "🔥", node: "mood-bold" },
            { label: "Something elegant", emoji: "🥂", node: "mood-elegant" },
            { label: "Easy & beginner-friendly", emoji: "🌸", node: "mood-easy" },
            { label: "Surprise me — adventure", emoji: "🗺️", node: "mood-adventurous" },
          ].map(({ label, emoji, node }) => (
            <Link
              key={node}
              href={`/explore?start=${node}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="card"
                style={{
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span style={{ fontSize: "1.25rem" }}>{emoji}</span>
                <span style={{ color: "var(--ivory)", fontSize: "0.9375rem", flex: 1 }}>
                  {label}
                </span>
                <ArrowRight size={16} color="var(--ivory-muted)" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recently Viewed */}
      {recentCocktails.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <SectionTitle title="Recently Viewed" />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {recentCocktails.slice(0, 3).map((c) => (
              <CocktailCard key={c.id} cocktail={c} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {/* Curated Collections */}
      <div style={{ marginBottom: "2rem" }}>
        <SectionTitle title="Collections" subtitle="Curated paths through the cocktail world" />

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingBottom: "0.75rem",
            marginBottom: "1rem",
            scrollbarWidth: "none",
          }}
        >
          {curatedCollections.map((col, idx) => (
            <button
              key={idx}
              onClick={() => updateCollection(idx, allCocktails)}
              style={{
                background: idx === selectedCollection ? "rgba(201, 168, 76, 0.15)" : "transparent",
                border: `1px solid ${idx === selectedCollection ? "rgba(201, 168, 76, 0.4)" : "rgba(201, 168, 76, 0.15)"}`,
                borderRadius: "100px",
                padding: "0.4rem 1rem",
                color: idx === selectedCollection ? "var(--gold)" : "var(--ivory-muted)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {col.emoji} {col.title}
            </button>
          ))}
        </div>

        <p
          style={{
            color: "var(--ivory-muted)",
            fontSize: "0.875rem",
            marginBottom: "1rem",
            lineHeight: 1.5,
          }}
        >
          {curatedCollections[selectedCollection].description}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {collection.map((c) => (
            <CocktailCard key={c.id} cocktail={c} variant="compact" />
          ))}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "2rem 0",
          color: "var(--ivory-muted)",
          fontSize: "0.8125rem",
          letterSpacing: "0.04em",
          lineHeight: 1.7,
        }}
      >
        <div
          style={{
            width: "32px",
            height: "1px",
            background: "var(--gold-dim)",
            margin: "0 auto 1rem",
          }}
        />
        Discover cocktails by following the path,
        <br />
        not just searching the name.
      </div>
    </div>
  );
}
