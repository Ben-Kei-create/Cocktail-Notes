import Link from "next/link";
import { Cocktail } from "@/types";
import FavoriteButton from "@/components/FavoriteButton";

interface CocktailCardProps {
  cocktail: Cocktail;
  variant?: "default" | "compact" | "featured";
}

export default function CocktailCard({
  cocktail,
  variant = "default",
}: CocktailCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/cocktail/${cocktail.id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          className="card"
          style={{
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Color dot */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: cocktail.color_hex,
              flexShrink: 0,
              opacity: 0.85,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                color: "var(--ivory)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                marginBottom: "2px",
              }}
            >
              {cocktail.name}
            </div>
            <div
              style={{
                color: "var(--ivory-muted)",
                fontSize: "0.8125rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {cocktail.one_line_descriptor}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                color: "var(--gold)",
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {cocktail.base_spirit}
            </span>
            <FavoriteButton cocktailId={cocktail.id} size="sm" />
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/cocktail/${cocktail.id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          className="card"
          style={{
            padding: "1.75rem",
            position: "relative",
            overflow: "hidden",
            minHeight: "200px",
          }}
        >
          {/* Background color accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "180px",
              height: "180px",
              background: cocktail.color_hex,
              opacity: 0.08,
              borderRadius: "0 16px 0 100%",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.75rem",
            }}
          >
            Featured Tonight
          </div>
          <h2
            style={{
              color: "var(--ivory)",
              fontSize: "2rem",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              margin: "0 0 0.5rem 0",
            }}
          >
            {cocktail.name}
          </h2>
          <p
            style={{
              color: "var(--ivory-dim)",
              fontSize: "0.9375rem",
              marginBottom: "1.25rem",
              lineHeight: 1.5,
            }}
          >
            {cocktail.one_line_descriptor}
          </p>
          <div
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}
          >
            {cocktail.taste_tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "var(--ivory-muted)",
                fontSize: "0.8125rem",
                letterSpacing: "0.04em",
              }}
            >
              {cocktail.origin_country} · {cocktail.base_spirit}
            </span>
            <span
              style={{
                color: "var(--gold)",
                fontSize: "0.8125rem",
                fontWeight: 500,
              }}
            >
              Explore →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/cocktail/${cocktail.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div className="card" style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "0.875rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: cocktail.color_hex,
                opacity: 0.85,
                flexShrink: 0,
              }}
            />
            <div>
              <h3
                style={{
                  color: "var(--ivory)",
                  fontSize: "1.0625rem",
                  fontWeight: 500,
                  margin: 0,
                  marginBottom: "2px",
                }}
              >
                {cocktail.name}
              </h3>
              <span
                style={{
                  color: "var(--gold)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {cocktail.base_spirit}
              </span>
            </div>
          </div>
          <FavoriteButton cocktailId={cocktail.id} size="sm" />
        </div>

        <p
          style={{
            color: "var(--ivory-dim)",
            fontSize: "0.875rem",
            lineHeight: 1.5,
            margin: "0 0 1rem 0",
          }}
        >
          {cocktail.one_line_descriptor}
        </p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {cocktail.taste_tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
          {cocktail.beginner_friendly_level >= 4 && (
            <span className="tag-navy tag">beginner-friendly</span>
          )}
        </div>
      </div>
    </Link>
  );
}
