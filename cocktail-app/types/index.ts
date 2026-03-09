export interface Cocktail {
  id: string;
  name: string;
  alternate_names: string[];
  short_description: string;
  one_line_descriptor: string;

  // Classification
  base_spirit: string;
  category: string;
  classic_or_modern: "classic" | "modern";
  beginner_friendly_level: 1 | 2 | 3 | 4 | 5; // 5 = most beginner friendly
  commonness_level: 1 | 2 | 3 | 4 | 5; // 5 = most common

  // Flavor (1-5 scale)
  sweetness: number;
  bitterness: number;
  acidity: number;
  dryness: number;
  freshness: number;
  richness: number;
  sparkling: boolean;
  creamy: boolean;

  // Tags
  mood_tags: string[];
  situation_tags: string[];
  taste_tags: string[];
  visual_tags: string[];

  // Culture / Story
  origin_story: string;
  historical_note: string;
  naming_story: string;
  cultural_context: string;

  // Geography
  origin_country: string;
  origin_city: string;
  origin_place_name: string;
  map_query_string: string;
  origin_certainty_level: "certain" | "likely" | "disputed" | "unknown";

  // User Utility
  ordering_confidence: "easy" | "moderate" | "ask";
  ordering_tip: string;
  suitable_for: string[];
  not_ideal_for: string[];

  // Graph / Exploration
  related_cocktail_ids: string[];
  branch_tags: string[];
  path_nodes: string[];

  // Metadata
  featured_priority: number;
  color_hex: string;
  glass_type: string;
  ingredients: string[];

  // Image
  thecocktaildb_id?: number; // used for prototype image fetching; replace with local asset path in production
}

export interface BranchNode {
  id: string;
  label: string;
  description: string;
  emoji: string;
  children: BranchNodeChild[];
  layer: number;
}

export interface BranchNodeChild {
  type: "node" | "cocktail";
  id: string;
  label?: string;
}

export interface ExploreStep {
  nodeId: string;
  label: string;
}
