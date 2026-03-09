"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import CocktailCard from "@/components/CocktailCard";
import { Cocktail } from "@/types";

const SPIRIT_FILTERS = ["All", "Gin", "Rum", "Tequila", "Vodka", "Whiskey", "Wine", "Cognac", "Amaretto"];
const TASTE_FILTERS = ["All", "Citrusy", "Bitter", "Sweet", "Dry", "Herbal", "Sparkling", "Refreshing", "Floral"];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Cocktail[]>([]);
  const [allCocktails, setAllCocktails] = useState<Cocktail[]>([]);
  const [spiritFilter, setSpiritFilter] = useState("All");
  const [tasteFilter, setTasteFilter] = useState("All");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    import("@/lib/cocktails").then(({ cocktails }) => {
      setAllCocktails(cocktails);
      setResults(cocktails);
    });
  }, []);

  useEffect(() => {
    if (!allCocktails.length) return;

    let filtered = allCocktails;

    // Spirit filter
    if (spiritFilter !== "All") {
      filtered = filtered.filter((c) =>
        c.base_spirit.toLowerCase().includes(spiritFilter.toLowerCase())
      );
    }

    // Taste filter
    if (tasteFilter !== "All") {
      filtered = filtered.filter((c) =>
        c.taste_tags.some((t) => t.toLowerCase().includes(tasteFilter.toLowerCase())) ||
        c.mood_tags.some((t) => t.toLowerCase().includes(tasteFilter.toLowerCase()))
      );
    }

    // Query search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter((c) => {
        return (
          c.name.toLowerCase().includes(q) ||
          c.alternate_names.some((n) => n.toLowerCase().includes(q)) ||
          c.base_spirit.toLowerCase().includes(q) ||
          c.taste_tags.some((t) => t.toLowerCase().includes(q)) ||
          c.mood_tags.some((t) => t.toLowerCase().includes(q)) ||
          c.ingredients.some((i) => i.toLowerCase().includes(q)) ||
          c.origin_country.toLowerCase().includes(q)
        );
      });
    }

    setResults(filtered);
  }, [query, spiritFilter, tasteFilter, allCocktails]);

  const clearQuery = () => setQuery("");

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
          Search
        </div>
        <h1
          style={{
            color: "var(--ivory)",
            fontSize: "1.75rem",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            margin: "0 0 1.25rem 0",
          }}
        >
          Find your drink
        </h1>

        {/* Search Input */}
        <div style={{ position: "relative" }}>
          <Search
            size={18}
            color={focused ? "var(--gold)" : "var(--ivory-muted)"}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              transition: "color 0.2s ease",
              pointerEvents: "none",
            }}
          />
          <input
            className="search-input"
            type="text"
            placeholder="Cocktail name, spirit, or taste..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoComplete="off"
          />
          {query && (
            <button
              onClick={clearQuery}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--ivory-muted)",
                padding: "4px",
                display: "flex",
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Spirit Filter */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ivory-muted)",
            marginBottom: "0.5rem",
          }}
        >
          Base Spirit
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingBottom: "4px",
            scrollbarWidth: "none",
          }}
        >
          {SPIRIT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSpiritFilter(f)}
              style={{
                background: spiritFilter === f ? "rgba(201, 168, 76, 0.15)" : "transparent",
                border: `1px solid ${spiritFilter === f ? "rgba(201, 168, 76, 0.4)" : "var(--glass-border)"}`,
                borderRadius: "100px",
                padding: "0.35rem 0.875rem",
                color: spiritFilter === f ? "var(--gold)" : "var(--ivory-muted)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Taste Filter */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ivory-muted)",
            marginBottom: "0.5rem",
          }}
        >
          Taste
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            paddingBottom: "4px",
            scrollbarWidth: "none",
          }}
        >
          {TASTE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setTasteFilter(f)}
              style={{
                background: tasteFilter === f ? "rgba(201, 168, 76, 0.15)" : "transparent",
                border: `1px solid ${tasteFilter === f ? "rgba(201, 168, 76, 0.4)" : "var(--glass-border)"}`,
                borderRadius: "100px",
                padding: "0.35rem 0.875rem",
                color: tasteFilter === f ? "var(--gold)" : "var(--ivory-muted)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--ivory-muted)",
          marginBottom: "1rem",
          letterSpacing: "0.04em",
        }}
      >
        {results.length} cocktail{results.length !== 1 ? "s" : ""}
        {query ? ` matching "${query}"` : ""}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {results.map((c) => (
            <CocktailCard key={c.id} cocktail={c} variant="compact" />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            color: "var(--ivory-muted)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
          <p style={{ lineHeight: 1.6 }}>
            No cocktails found for{" "}
            <span style={{ color: "var(--ivory)" }}>&ldquo;{query}&rdquo;</span>.
            <br />
            Try a different name, spirit, or taste.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSpiritFilter("All");
              setTasteFilter("All");
            }}
            className="btn-ghost"
            style={{ marginTop: "1rem" }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
