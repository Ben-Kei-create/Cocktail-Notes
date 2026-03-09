"use client";

const FAVORITES_KEY = "cocktail-notes-favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } else {
    favorites.splice(index, 1);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return false;
  }
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

const VIEWED_KEY = "cocktail-notes-viewed";

export function addRecentlyViewed(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(VIEWED_KEY);
    const viewed: string[] = stored ? JSON.parse(stored) : [];
    const filtered = viewed.filter((v) => v !== id);
    filtered.unshift(id);
    localStorage.setItem(VIEWED_KEY, JSON.stringify(filtered.slice(0, 10)));
  } catch {
    // ignore
  }
}

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(VIEWED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
