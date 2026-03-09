export interface BranchNode {
  id: string;
  label: string;
  description: string;
  emoji: string;
  layer: number;
  children: Array<{ type: "node" | "cocktail"; id: string; label: string }>;
}

export const branchNodes: BranchNode[] = [
  // ─── Layer 0: Entry Points (Mood) ───────────────────────────────────────────
  {
    id: "root",
    label: "How are you feeling tonight?",
    description: "Start your journey",
    emoji: "✦",
    layer: 0,
    children: [
      { type: "node", id: "mood-refreshing", label: "Refreshing" },
      { type: "node", id: "mood-bold", label: "Bold & Strong" },
      { type: "node", id: "mood-elegant", label: "Elegant & Refined" },
      { type: "node", id: "mood-easy", label: "Easy & Approachable" },
      { type: "node", id: "mood-adventurous", label: "Adventurous" },
    ],
  },

  // ─── Layer 1: Mood Nodes ─────────────────────────────────────────────────────
  {
    id: "mood-refreshing",
    label: "Refreshing",
    description: "Something light, crisp, and revitalising",
    emoji: "🌿",
    layer: 1,
    children: [
      { type: "node", id: "taste-citrusy", label: "Citrusy & Bright" },
      { type: "node", id: "taste-minty", label: "Minty & Cool" },
      { type: "node", id: "taste-sparkling", label: "Sparkling & Bubbly" },
      { type: "node", id: "taste-fruity-light", label: "Fruity & Light" },
    ],
  },
  {
    id: "mood-bold",
    label: "Bold & Strong",
    description: "Something with character, depth, and presence",
    emoji: "🔥",
    layer: 1,
    children: [
      { type: "node", id: "taste-bitter", label: "Bitter & Complex" },
      { type: "node", id: "taste-spirit-forward", label: "Spirit-Forward" },
      { type: "node", id: "taste-smoky-rich", label: "Rich & Warming" },
    ],
  },
  {
    id: "mood-elegant",
    label: "Elegant & Refined",
    description: "Something classic, sophisticated, timeless",
    emoji: "🥂",
    layer: 1,
    children: [
      { type: "node", id: "taste-dry", label: "Dry & Crisp" },
      { type: "node", id: "taste-herbal", label: "Herbal & Aromatic" },
      { type: "node", id: "taste-floral", label: "Floral & Delicate" },
    ],
  },
  {
    id: "mood-easy",
    label: "Easy & Approachable",
    description: "A safe, welcoming choice — perfect for beginners",
    emoji: "🌸",
    layer: 1,
    children: [
      { type: "node", id: "taste-sweet-light", label: "Sweet & Light" },
      { type: "node", id: "taste-fizzy-fun", label: "Fizzy & Fun" },
      { type: "node", id: "taste-fruity-sweet", label: "Fruity & Sweet" },
    ],
  },
  {
    id: "mood-adventurous",
    label: "Adventurous",
    description: "Something unexpected, rare, or worth discovering",
    emoji: "🗺️",
    layer: 1,
    children: [
      { type: "node", id: "taste-sour", label: "Sour & Sharp" },
      { type: "node", id: "taste-complex", label: "Complex & Layered" },
      { type: "node", id: "taste-equal-parts", label: "Perfectly Balanced" },
    ],
  },

  // ─── Layer 2: Taste Nodes ────────────────────────────────────────────────────
  {
    id: "taste-citrusy",
    label: "Citrusy & Bright",
    description: "Lime, lemon, and sunshine in a glass",
    emoji: "🍋",
    layer: 2,
    children: [
      { type: "node", id: "spirit-gin-citrus", label: "With Gin" },
      { type: "node", id: "spirit-rum-citrus", label: "With Rum" },
      { type: "node", id: "spirit-tequila-citrus", label: "With Tequila" },
      { type: "node", id: "spirit-whiskey-citrus", label: "With Whiskey" },
    ],
  },
  {
    id: "taste-minty",
    label: "Minty & Cool",
    description: "Fresh mint that lingers on the palate",
    emoji: "🌱",
    layer: 2,
    children: [
      { type: "cocktail", id: "mojito", label: "Mojito" },
      { type: "cocktail", id: "mint-julep", label: "Mint Julep" },
    ],
  },
  {
    id: "taste-sparkling",
    label: "Sparkling & Bubbly",
    description: "Effervescent, celebratory, lively",
    emoji: "✨",
    layer: 2,
    children: [
      { type: "node", id: "spirit-gin-sparkling", label: "Gin-based" },
      { type: "node", id: "spirit-wine-sparkling", label: "Wine-based" },
      { type: "cocktail", id: "moscow-mule", label: "Moscow Mule" },
      { type: "cocktail", id: "aperol-spritz", label: "Aperol Spritz" },
    ],
  },
  {
    id: "taste-fruity-light",
    label: "Fruity & Light",
    description: "Gentle fruit notes, easy on the palate",
    emoji: "🍑",
    layer: 2,
    children: [
      { type: "cocktail", id: "bellini", label: "Bellini" },
      { type: "cocktail", id: "sea-breeze", label: "Sea Breeze" },
      { type: "cocktail", id: "mimosa", label: "Mimosa" },
    ],
  },
  {
    id: "taste-bitter",
    label: "Bitter & Complex",
    description: "Beautifully bitter — an acquired but rewarding taste",
    emoji: "🌑",
    layer: 2,
    children: [
      { type: "cocktail", id: "negroni", label: "Negroni" },
      { type: "cocktail", id: "aperol-spritz", label: "Aperol Spritz" },
      { type: "cocktail", id: "paper-plane", label: "Paper Plane" },
    ],
  },
  {
    id: "taste-spirit-forward",
    label: "Spirit-Forward",
    description: "The spirit is the star — bold and undiluted",
    emoji: "🥃",
    layer: 2,
    children: [
      { type: "cocktail", id: "martini", label: "Martini" },
      { type: "cocktail", id: "old-fashioned", label: "Old Fashioned" },
      { type: "cocktail", id: "manhattan", label: "Manhattan" },
    ],
  },
  {
    id: "taste-smoky-rich",
    label: "Rich & Warming",
    description: "Deep, velvety, warming — meant for slow sipping",
    emoji: "🪵",
    layer: 2,
    children: [
      { type: "cocktail", id: "old-fashioned", label: "Old Fashioned" },
      { type: "cocktail", id: "manhattan", label: "Manhattan" },
      { type: "cocktail", id: "dark-and-stormy", label: "Dark & Stormy" },
    ],
  },
  {
    id: "taste-dry",
    label: "Dry & Crisp",
    description: "No sweetness — clean, precise, controlled",
    emoji: "🧊",
    layer: 2,
    children: [
      { type: "cocktail", id: "martini", label: "Martini" },
      { type: "cocktail", id: "gin-and-tonic", label: "Gin & Tonic" },
      { type: "cocktail", id: "french-75", label: "French 75" },
    ],
  },
  {
    id: "taste-herbal",
    label: "Herbal & Aromatic",
    description: "Botanicals, herbs, and complexity",
    emoji: "🌿",
    layer: 2,
    children: [
      { type: "cocktail", id: "last-word", label: "Last Word" },
      { type: "cocktail", id: "negroni", label: "Negroni" },
      { type: "cocktail", id: "gin-and-tonic", label: "Gin & Tonic" },
    ],
  },
  {
    id: "taste-floral",
    label: "Floral & Delicate",
    description: "Soft and beautiful — a rare and elegant experience",
    emoji: "🌸",
    layer: 2,
    children: [
      { type: "cocktail", id: "aviation", label: "Aviation" },
      { type: "cocktail", id: "clover-club", label: "Clover Club" },
      { type: "cocktail", id: "kir-royale", label: "Kir Royale" },
    ],
  },
  {
    id: "taste-sweet-light",
    label: "Sweet & Light",
    description: "Gentle sweetness — easy and welcoming",
    emoji: "🍬",
    layer: 2,
    children: [
      { type: "cocktail", id: "amaretto-sour", label: "Amaretto Sour" },
      { type: "cocktail", id: "kir-royale", label: "Kir Royale" },
      { type: "cocktail", id: "bellini", label: "Bellini" },
    ],
  },
  {
    id: "taste-fizzy-fun",
    label: "Fizzy & Fun",
    description: "Bubbles, brightness, easy drinking",
    emoji: "🫧",
    layer: 2,
    children: [
      { type: "cocktail", id: "moscow-mule", label: "Moscow Mule" },
      { type: "cocktail", id: "cuba-libre", label: "Cuba Libre" },
      { type: "cocktail", id: "gin-and-tonic", label: "Gin & Tonic" },
      { type: "cocktail", id: "tom-collins", label: "Tom Collins" },
    ],
  },
  {
    id: "taste-fruity-sweet",
    label: "Fruity & Sweet",
    description: "Bright fruit flavors with accessible sweetness",
    emoji: "🍓",
    layer: 2,
    children: [
      { type: "cocktail", id: "cosmopolitan", label: "Cosmopolitan" },
      { type: "cocktail", id: "sea-breeze", label: "Sea Breeze" },
      { type: "cocktail", id: "screwdriver", label: "Screwdriver" },
    ],
  },
  {
    id: "taste-sour",
    label: "Sour & Sharp",
    description: "Tart, punchy, and lively on the palate",
    emoji: "⚡",
    layer: 2,
    children: [
      { type: "cocktail", id: "whiskey-sour", label: "Whiskey Sour" },
      { type: "cocktail", id: "daiquiri", label: "Daiquiri" },
      { type: "cocktail", id: "margarita", label: "Margarita" },
      { type: "cocktail", id: "sidecar", label: "Sidecar" },
    ],
  },
  {
    id: "taste-complex",
    label: "Complex & Layered",
    description: "Drinks that reward attention and curiosity",
    emoji: "🔮",
    layer: 2,
    children: [
      { type: "cocktail", id: "last-word", label: "Last Word" },
      { type: "cocktail", id: "paper-plane", label: "Paper Plane" },
      { type: "cocktail", id: "aviation", label: "Aviation" },
    ],
  },
  {
    id: "taste-equal-parts",
    label: "Perfectly Balanced",
    description: "Equal parts — when every ingredient matters equally",
    emoji: "⚖️",
    layer: 2,
    children: [
      { type: "cocktail", id: "last-word", label: "Last Word" },
      { type: "cocktail", id: "paper-plane", label: "Paper Plane" },
      { type: "cocktail", id: "negroni", label: "Negroni" },
    ],
  },

  // ─── Layer 3: Spirit + Context Nodes ─────────────────────────────────────────
  {
    id: "spirit-gin-citrus",
    label: "Gin with citrus",
    description: "The classic pairing — gin and bright citrus notes",
    emoji: "🍸",
    layer: 3,
    children: [
      { type: "cocktail", id: "gin-and-tonic", label: "Gin & Tonic" },
      { type: "cocktail", id: "tom-collins", label: "Tom Collins" },
      { type: "cocktail", id: "french-75", label: "French 75" },
      { type: "cocktail", id: "white-lady", label: "White Lady" },
    ],
  },
  {
    id: "spirit-rum-citrus",
    label: "Rum with citrus",
    description: "Caribbean sunshine in a glass",
    emoji: "🌴",
    layer: 3,
    children: [
      { type: "cocktail", id: "mojito", label: "Mojito" },
      { type: "cocktail", id: "daiquiri", label: "Daiquiri" },
      { type: "cocktail", id: "cuba-libre", label: "Cuba Libre" },
    ],
  },
  {
    id: "spirit-tequila-citrus",
    label: "Tequila with citrus",
    description: "Agave and acid — bright and compelling",
    emoji: "🌵",
    layer: 3,
    children: [
      { type: "cocktail", id: "margarita", label: "Margarita" },
      { type: "cocktail", id: "paloma", label: "Paloma" },
    ],
  },
  {
    id: "spirit-whiskey-citrus",
    label: "Whiskey with citrus",
    description: "Softening whiskey's boldness with brightness",
    emoji: "🥃",
    layer: 3,
    children: [
      { type: "cocktail", id: "whiskey-sour", label: "Whiskey Sour" },
    ],
  },
  {
    id: "spirit-gin-sparkling",
    label: "Gin-based sparkling",
    description: "Gin lifted by bubbles",
    emoji: "🍾",
    layer: 3,
    children: [
      { type: "cocktail", id: "gin-and-tonic", label: "Gin & Tonic" },
      { type: "cocktail", id: "french-75", label: "French 75" },
      { type: "cocktail", id: "tom-collins", label: "Tom Collins" },
    ],
  },
  {
    id: "spirit-wine-sparkling",
    label: "Wine-based sparkling",
    description: "Champagne and sparkling wine cocktails",
    emoji: "🥂",
    layer: 3,
    children: [
      { type: "cocktail", id: "mimosa", label: "Mimosa" },
      { type: "cocktail", id: "kir-royale", label: "Kir Royale" },
      { type: "cocktail", id: "bellini", label: "Bellini" },
      { type: "cocktail", id: "french-75", label: "French 75" },
    ],
  },
];

export function getBranchNodeById(id: string): BranchNode | undefined {
  return branchNodes.find((n) => n.id === id);
}

export const rootNode = branchNodes.find((n) => n.id === "root")!;
