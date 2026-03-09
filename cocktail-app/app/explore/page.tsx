"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { BranchNode, getBranchNodeById, rootNode } from "@/lib/branches";
import CocktailCard from "@/components/CocktailCard";
import { Cocktail } from "@/types";

function ExploreContent() {
  const searchParams = useSearchParams();
  const startNode = searchParams.get("start");

  const [path, setPath] = useState<Array<{ node: BranchNode; choiceLabel: string }>>([]);
  const [currentNode, setCurrentNode] = useState<BranchNode>(rootNode);
  const [results, setResults] = useState<Cocktail[]>([]);
  const [allCocktails, setAllCocktails] = useState<Cocktail[]>([]);

  useEffect(() => {
    import("@/lib/cocktails").then(({ cocktails }) => {
      setAllCocktails(cocktails);
    });
  }, []);

  useEffect(() => {
    if (startNode) {
      const node = getBranchNodeById(startNode);
      if (node) {
        setCurrentNode(node);
        setPath([{ node: rootNode, choiceLabel: node.label }]);
      }
    }
  }, [startNode]);

  function handleChoice(child: { type: "node" | "cocktail"; id: string; label: string }) {
    if (child.type === "cocktail") {
      const cocktail = allCocktails.find((c) => c.id === child.id);
      if (cocktail) {
        const existing = results.find((r) => r.id === child.id);
        if (!existing) {
          setResults((prev) => [...prev, cocktail]);
        }
      }
      return;
    }

    const nextNode = getBranchNodeById(child.id);
    if (!nextNode) return;

    // Check if next node has any cocktail children that lead to results
    const hasResults = nextNode.children.some((c) => c.type === "cocktail");

    if (hasResults) {
      const cocktailResults = nextNode.children
        .filter((c) => c.type === "cocktail")
        .map((c) => allCocktails.find((cocktail) => cocktail.id === c.id))
        .filter(Boolean) as Cocktail[];
      setResults(cocktailResults);
      setPath((prev) => [...prev, { node: currentNode, choiceLabel: child.label }]);
      setCurrentNode(nextNode);
    } else {
      setPath((prev) => [...prev, { node: currentNode, choiceLabel: child.label }]);
      setCurrentNode(nextNode);
    }
  }

  function handleBack() {
    if (path.length === 0) return;
    const prev = path[path.length - 1];
    setCurrentNode(prev.node);
    setPath((p) => p.slice(0, -1));
    setResults([]);
  }

  function handleReset() {
    setCurrentNode(rootNode);
    setPath([]);
    setResults([]);
  }

  const breadcrumbs = path.map((p) => p.choiceLabel);

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", padding: "0 1rem", paddingBottom: "5rem" }}>
      {/* Header */}
      <div
        style={{
          paddingTop: "3rem",
          paddingBottom: "1.5rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
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
            Explore
          </div>
          <h1
            style={{
              color: "var(--ivory)",
              fontSize: "1.75rem",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Follow the path
          </h1>
        </div>
        {path.length > 0 && (
          <button
            onClick={handleReset}
            style={{
              background: "transparent",
              border: "1px solid var(--glass-border)",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--ivory-muted)",
              marginTop: "8px",
            }}
          >
            <RotateCcw size={15} />
          </button>
        )}
      </div>

      {/* Breadcrumb path */}
      {breadcrumbs.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
            padding: "0.75rem 1rem",
            background: "rgba(201, 168, 76, 0.06)",
            borderRadius: "12px",
            border: "1px solid rgba(201, 168, 76, 0.12)",
          }}
        >
          <span style={{ color: "var(--ivory-muted)", fontSize: "0.75rem" }}>Your path:</span>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <span
                style={{
                  color: "var(--gold)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                {crumb}
              </span>
              {i < breadcrumbs.length - 1 && (
                <span style={{ color: "var(--ivory-muted)", fontSize: "0.75rem" }}>→</span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Back button */}
      {path.length > 0 && (
        <button
          onClick={handleBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "none",
            color: "var(--ivory-muted)",
            fontSize: "0.875rem",
            cursor: "pointer",
            padding: "0.25rem 0",
            marginBottom: "1.5rem",
            transition: "color 0.2s ease",
          }}
        >
          <ArrowLeft size={16} />
          Go back
        </button>
      )}

      {/* Current Node */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.5rem" }}>{currentNode.emoji}</span>
          <h2
            style={{
              color: "var(--ivory)",
              fontSize: "1.25rem",
              fontWeight: 400,
              margin: 0,
            }}
          >
            {currentNode.label}
          </h2>
        </div>
        {currentNode.description && (
          <p style={{ color: "var(--ivory-muted)", fontSize: "0.875rem", lineHeight: 1.5, margin: 0 }}>
            {currentNode.description}
          </p>
        )}
      </div>

      {/* Choices */}
      {results.length === 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {currentNode.children.map((child) => {
            const isCocktail = child.type === "cocktail";
            const cocktail = isCocktail
              ? allCocktails.find((c) => c.id === child.id)
              : null;

            if (isCocktail && cocktail) {
              return (
                <Link
                  key={child.id}
                  href={`/cocktail/${child.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="card"
                    style={{
                      padding: "1rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      borderColor: "rgba(201, 168, 76, 0.2)",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: cocktail.color_hex,
                        opacity: 0.8,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "var(--ivory)", fontSize: "0.9375rem", fontWeight: 500 }}>
                        {cocktail.name}
                      </div>
                      <div style={{ color: "var(--ivory-muted)", fontSize: "0.8125rem" }}>
                        {cocktail.one_line_descriptor}
                      </div>
                    </div>
                    <span style={{ color: "var(--gold)", fontSize: "0.75rem", fontWeight: 500 }}>
                      Arrive →
                    </span>
                  </div>
                </Link>
              );
            }

            return (
              <button
                key={child.id}
                onClick={() => handleChoice(child)}
                style={{
                  background: "var(--navy-card)",
                  border: "1px solid var(--glass-border)",
                  borderRadius: "16px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  width: "100%",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                }}
              >
                <span style={{ color: "var(--ivory)", fontSize: "0.9375rem" }}>
                  {child.label}
                </span>
                <span style={{ color: "var(--ivory-muted)", fontSize: "0.875rem" }}>→</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
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
            {results.length === 1 ? "Your cocktail" : `${results.length} cocktails found`}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {results.map((c) => (
              <CocktailCard key={c.id} cocktail={c} variant="default" />
            ))}
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <button
              onClick={handleBack}
              className="btn-ghost"
              style={{ width: "100%" }}
            >
              Explore other options
            </button>
          </div>
        </div>
      )}

      {/* Empty state for leaf nodes without cocktails */}
      {results.length === 0 && currentNode.children.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 1rem",
            color: "var(--ivory-muted)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🍹</div>
          <p>This path leads somewhere special — explore a bit more.</p>
          <button onClick={handleBack} className="btn-ghost" style={{ marginTop: "1rem" }}>
            Go back
          </button>
        </div>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div style={{ padding: "3rem 1rem", color: "var(--ivory-muted)" }}>Loading...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
