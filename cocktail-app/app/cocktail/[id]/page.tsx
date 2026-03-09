"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, AlertCircle } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import FlavorProfile from "@/components/FlavorProfile";
import CocktailCard from "@/components/CocktailCard";
import { Cocktail } from "@/types";

export default function CocktailDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [related, setRelated] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/lib/cocktails").then(({ getCocktailById, getRelatedCocktails }) => {
      import("@/lib/favorites").then(({ addRecentlyViewed }) => {
        const c = getCocktailById(id);
        if (!c) {
          setLoading(false);
          return;
        }
        setCocktail(c);
        setRelated(getRelatedCocktails(c));
        addRecentlyViewed(id);
        setLoading(false);
      });
    });
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          color: "var(--ivory-muted)",
        }}
      >
        <div className="animate-shimmer">Loading...</div>
      </div>
    );
  }

  if (!cocktail) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <AlertCircle size={48} color="var(--ivory-muted)" style={{ marginBottom: "1rem" }} />
        <h2 style={{ color: "var(--ivory)", marginBottom: "0.5rem" }}>Cocktail not found</h2>
        <p style={{ color: "var(--ivory-muted)", marginBottom: "1.5rem" }}>
          This cocktail doesn&apos;t exist in our collection yet.
        </p>
        <Link href="/search" className="btn-primary">
          Browse cocktails
        </Link>
      </div>
    );
  }

  const strengthLabel = (level: number) => {
    if (level >= 5) return "Very Strong";
    if (level >= 4) return "Strong";
    if (level >= 3) return "Medium";
    if (level >= 2) return "Light";
    return "Very Light";
  };

  const beginnerLabel = (level: number) => {
    if (level >= 5) return "Perfect for beginners";
    if (level >= 4) return "Beginner-friendly";
    if (level >= 3) return "Accessible";
    if (level >= 2) return "Some experience helpful";
    return "For seasoned drinkers";
  };

  const certaintyNote = {
    certain: null,
    likely: "The exact origins of this cocktail are somewhat uncertain.",
    disputed: "The true origin of this cocktail is disputed among historians.",
    unknown: "The precise origins of this cocktail remain unclear.",
  }[cocktail.origin_certainty_level];

  const confidenceColor = {
    easy: "var(--gold)",
    moderate: "var(--ivory-dim)",
    ask: "var(--ivory-muted)",
  }[cocktail.ordering_confidence];

  const strengthValue = 6 - cocktail.dryness; // invert dryness as proxy for strength

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", paddingBottom: "5rem" }}>
      {/* Hero Section */}
      <div
        style={{
          position: "relative",
          padding: "3rem 1rem 2rem",
          background: `linear-gradient(to bottom, ${cocktail.color_hex}18 0%, var(--navy) 100%)`,
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "none",
            color: "var(--ivory-muted)",
            cursor: "pointer",
            fontSize: "0.875rem",
            marginBottom: "2rem",
            padding: 0,
          }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Color accent */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: cocktail.color_hex,
            opacity: 0.85,
            marginBottom: "1.25rem",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                color: "var(--ivory)",
                fontSize: "2.25rem",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                margin: "0 0 0.375rem 0",
                lineHeight: 1.1,
              }}
            >
              {cocktail.name}
            </h1>
            {cocktail.alternate_names.length > 0 && (
              <div
                style={{
                  color: "var(--ivory-muted)",
                  fontSize: "0.8125rem",
                  marginBottom: "0.75rem",
                }}
              >
                Also known as: {cocktail.alternate_names.join(", ")}
              </div>
            )}
            <p
              style={{
                color: "var(--ivory-dim)",
                fontSize: "1rem",
                lineHeight: 1.5,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {cocktail.one_line_descriptor}
            </p>
          </div>
          <FavoriteButton cocktailId={cocktail.id} size="lg" />
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginTop: "1.25rem",
          }}
        >
          {cocktail.taste_tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 1rem" }}>

        {/* Quick Profile */}
        <div style={{ marginTop: "1.75rem", marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Quick Profile
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            {[
              { label: "Base Spirit", value: cocktail.base_spirit },
              { label: "Glass", value: cocktail.glass_type },
              { label: "Character", value: cocktail.classic_or_modern === "classic" ? "Classic" : "Modern" },
              {
                label: "Strength",
                value: strengthLabel(strengthValue),
              },
              {
                label: "Beginner Level",
                value: beginnerLabel(cocktail.beginner_friendly_level),
              },
              {
                label: cocktail.sparkling ? "Style" : cocktail.creamy ? "Style" : "Texture",
                value: cocktail.sparkling ? "Sparkling" : cocktail.creamy ? "Creamy" : "Still",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "12px",
                  padding: "0.875rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ivory-muted)",
                    marginBottom: "4px",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    color: "var(--ivory)",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* Ingredients */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.875rem",
            }}
          >
            Ingredients
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {cocktail.ingredients.map((ing) => (
              <span key={ing} className="tag tag-navy">
                {ing}
              </span>
            ))}
          </div>
        </div>

        <hr className="divider" />

        {/* Flavor Profile */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Flavor Profile
          </div>
          <FlavorProfile
            sweetness={cocktail.sweetness}
            bitterness={cocktail.bitterness}
            acidity={cocktail.acidity}
            dryness={cocktail.dryness}
            freshness={cocktail.freshness}
            richness={cocktail.richness}
          />
        </div>

        <hr className="divider" />

        {/* Origin Story */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.875rem",
            }}
          >
            The Story
          </div>
          <p
            style={{
              color: "var(--ivory-dim)",
              fontSize: "0.9375rem",
              lineHeight: 1.7,
              margin: "0 0 1rem 0",
            }}
          >
            {cocktail.origin_story}
          </p>
          {cocktail.historical_note && (
            <p
              style={{
                color: "var(--ivory-muted)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                margin: "0 0 1rem 0",
              }}
            >
              {cocktail.historical_note}
            </p>
          )}
          {cocktail.naming_story && (
            <p
              style={{
                color: "var(--ivory-muted)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              {cocktail.naming_story}
            </p>
          )}
        </div>

        {/* Cultural Context */}
        {cocktail.cultural_context && (
          <>
            <hr className="divider" />
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.875rem",
                }}
              >
                Cultural Context
              </div>
              <p
                style={{
                  color: "var(--ivory-dim)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {cocktail.cultural_context}
              </p>
            </div>
          </>
        )}

        <hr className="divider" />

        {/* Origin Geography */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.875rem",
            }}
          >
            Origin
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--glass-border)",
              borderRadius: "12px",
              padding: "1rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.875rem",
            }}
          >
            <MapPin size={18} color="var(--gold)" style={{ marginTop: "2px", flexShrink: 0 }} />
            <div>
              <div style={{ color: "var(--ivory)", fontSize: "0.9375rem", fontWeight: 500, marginBottom: "4px" }}>
                {cocktail.origin_place_name || cocktail.origin_city || cocktail.origin_country}
              </div>
              <div style={{ color: "var(--ivory-muted)", fontSize: "0.8125rem" }}>
                {cocktail.origin_city && cocktail.origin_country
                  ? `${cocktail.origin_city}, ${cocktail.origin_country}`
                  : cocktail.origin_country}
              </div>
              {certaintyNote && (
                <div
                  style={{
                    color: "var(--ivory-muted)",
                    fontSize: "0.75rem",
                    marginTop: "0.5rem",
                    fontStyle: "italic",
                  }}
                >
                  {certaintyNote}
                </div>
              )}
            </div>
          </div>
          {cocktail.map_query_string && (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(cocktail.map_query_string)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                color: "var(--gold)",
                fontSize: "0.8125rem",
                textDecoration: "none",
                marginTop: "0.75rem",
              }}
            >
              <MapPin size={14} />
              Open in Google Maps
            </a>
          )}
        </div>

        <hr className="divider" />

        {/* Who This Suits */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.875rem",
            }}
          >
            This cocktail is great for
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {cocktail.suitable_for.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  color: "var(--ivory-dim)",
                  fontSize: "0.875rem",
                }}
              >
                <Star size={12} color="var(--gold)" fill="var(--gold)" />
                {item}
              </div>
            ))}
          </div>
          {cocktail.not_ideal_for.length > 0 && (
            <div style={{ marginTop: "1rem" }}>
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
                Less ideal for
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {cocktail.not_ideal_for.map((item) => (
                  <div
                    key={item}
                    style={{
                      color: "var(--ivory-muted)",
                      fontSize: "0.8125rem",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <hr className="divider" />

        {/* Ordering Confidence */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.875rem",
            }}
          >
            Ordering at a Bar
          </div>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--glass-border)",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <div
              style={{
                color: confidenceColor,
                fontWeight: 500,
                fontSize: "0.9375rem",
                marginBottom: "0.5rem",
              }}
            >
              {cocktail.ordering_confidence === "easy"
                ? "Easy to order confidently"
                : cocktail.ordering_confidence === "moderate"
                ? "Generally available at most bars"
                : "Worth asking if they can make it"}
            </div>
            <p style={{ color: "var(--ivory-muted)", fontSize: "0.875rem", margin: 0, lineHeight: 1.6 }}>
              {cocktail.ordering_tip}
            </p>
          </div>
        </div>

        {/* Related Cocktails */}
        {related.length > 0 && (
          <>
            <hr className="divider" />
            <div style={{ marginBottom: "1.75rem" }}>
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                }}
              >
                You might also enjoy
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {related.slice(0, 4).map((r) => (
                  <CocktailCard key={r.id} cocktail={r} variant="compact" />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Mood tags */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "0.875rem",
            }}
          >
            Moods & Situations
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[...cocktail.mood_tags, ...cocktail.situation_tags].map((tag) => (
              <span key={tag} className="tag tag-navy">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
