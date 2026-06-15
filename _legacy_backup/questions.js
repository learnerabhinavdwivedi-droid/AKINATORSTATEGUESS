/**
 * ANKANITOR QUESTION BANK
 * Maps each testable attribute to a user-friendly question string.
 * The `attribute` field must match a key in the ANKANITOR_KNOWLEDGE_BASE objects.
 * The `matchValue` field specifies what value constitutes a "match" for that attribute.
 */

const QUESTION_BANK = [
  // ── Core Geographic & Administrative (from canonical matrix) ──

  {
    attribute: "is_state",
    matchValue: true,
    text: "Is the place you're thinking of a full State (not a Union Territory)?",
    category: "administrative"
  },
  {
    attribute: "region",
    matchValue: "South",
    text: "Is your place located in Southern India?",
    category: "geography"
  },
  {
    attribute: "region",
    matchValue: "North",
    text: "Is your place located in Northern India?",
    category: "geography"
  },
  {
    attribute: "region",
    matchValue: "West",
    text: "Is your place located in Western India?",
    category: "geography"
  },
  {
    attribute: "region",
    matchValue: "East",
    text: "Is your place located in Eastern or Northeastern India?",
    category: "geography"
  },
  {
    attribute: "region",
    matchValue: "Central",
    text: "Is your place located in Central India?",
    category: "geography"
  },
  {
    attribute: "has_coastline",
    matchValue: true,
    text: "Does your place have a coastline (touching the sea)?",
    category: "geography"
  },
  {
    attribute: "highly_mountainous",
    matchValue: true,
    text: "Is your place known for having significant mountainous or hilly terrain?",
    category: "geography"
  },
  {
    attribute: "shares_international_border",
    matchValue: true,
    text: "Does your place share an international border with another country?",
    category: "geography"
  },

  // ── Language & Literacy (from canonical matrix) ──

  {
    attribute: "dominant_language_family",
    matchValue: "Dravidian",
    text: "Does your place predominantly speak a Dravidian language (like Tamil, Telugu, Kannada, or Malayalam)?",
    category: "culture"
  },
  {
    attribute: "dominant_language_family",
    matchValue: "Sino-Tibetan",
    text: "Does your place predominantly speak a Sino-Tibetan language (like Mizo, Meitei, or Ladakhi)?",
    category: "culture"
  },
  {
    attribute: "dominant_language_family",
    matchValue: "Indo-Aryan",
    text: "Does your place predominantly speak an Indo-Aryan language (like Hindi, Bengali, Marathi, or Gujarati)?",
    category: "culture"
  },
  {
    attribute: "high_literacy_85_plus",
    matchValue: true,
    text: "Does your place have a very high literacy rate (above 85%)?",
    category: "demographics"
  },
  {
    attribute: "known_for_classical_dance",
    matchValue: true,
    text: "Is your place the origin of one of India's recognized classical dance forms (like Kathakali, Odissi, or Manipuri)?",
    category: "culture"
  },

  // ── Extended Geographic ──

  {
    attribute: "famous_for_deserts",
    matchValue: true,
    text: "Is your place famous for its deserts (hot or cold)?",
    category: "geography"
  },
  {
    attribute: "is_in_northeast",
    matchValue: true,
    text: "Is your place specifically part of Northeast India (the Seven Sisters or Sikkim)?",
    category: "geography"
  },
  {
    attribute: "is_island_territory",
    matchValue: true,
    text: "Is your place an island or island group?",
    category: "geography"
  },

  // ── Demographics & Size ──

  {
    attribute: "population_large",
    matchValue: true,
    text: "Does your place have a very large population (over 50 million)?",
    category: "demographics"
  },
  {
    attribute: "area_large",
    matchValue: true,
    text: "Is your place very large in area (over 100,000 sq km)?",
    category: "demographics"
  },
  {
    attribute: "smallest_by_area",
    matchValue: true,
    text: "Is your place one of the smallest states or territories by area?",
    category: "demographics"
  },

  // ── Language & Culture ──

  {
    attribute: "hindi_speaking_majority",
    matchValue: true,
    text: "Is Hindi the primary language spoken in your place?",
    category: "culture"
  },
  {
    attribute: "historic_portuguese_influence",
    matchValue: true,
    text: "Does your place have a strong Portuguese colonial heritage?",
    category: "culture"
  },
  {
    attribute: "historic_french_influence",
    matchValue: true,
    text: "Does your place have a notable French colonial influence?",
    category: "culture"
  },
  {
    attribute: "has_significant_tribal_population",
    matchValue: true,
    text: "Is your place known for having a significant tribal population?",
    category: "culture"
  },

  // ── Economy & Industry ──

  {
    attribute: "known_for_tea_coffee",
    matchValue: true,
    text: "Is your place famous for producing tea or coffee?",
    category: "economy"
  },
  {
    attribute: "known_for_spices",
    matchValue: true,
    text: "Is your place well-known for spice cultivation?",
    category: "economy"
  },
  {
    attribute: "known_for_it_industry",
    matchValue: true,
    text: "Is your place known as a major IT or technology hub?",
    category: "economy"
  },

  // ── Tourism & Landmarks ──

  {
    attribute: "known_for_beaches",
    matchValue: true,
    text: "Is your place a famous beach tourism destination?",
    category: "tourism"
  },
  {
    attribute: "known_for_historical_monuments",
    matchValue: true,
    text: "Is your place famous for historical monuments, forts, or palaces?",
    category: "tourism"
  },
  {
    attribute: "has_backwaters_or_lagoons",
    matchValue: true,
    text: "Is your place known for its backwaters or lagoon systems?",
    category: "tourism"
  },
  {
    attribute: "known_for_wildlife_sanctuaries",
    matchValue: true,
    text: "Is your place famous for its wildlife sanctuaries or national parks?",
    category: "tourism"
  },

  // ── History & Formation ──

  {
    attribute: "formed_after_2000",
    matchValue: true,
    text: "Was your place formed or reorganized after the year 2000?",
    category: "history"
  },
  {
    attribute: "capital_is_major_metro",
    matchValue: true,
    text: "Is the capital or major city of your place a well-known metropolitan city?",
    category: "demographics"
  },

  // ── International Borders (specific) ──

  {
    attribute: "borders_pakistan",
    matchValue: true,
    text: "Does your place share a border with Pakistan?",
    category: "geography"
  },
  {
    attribute: "borders_china",
    matchValue: true,
    text: "Does your place share a border with China?",
    category: "geography"
  },
  {
    attribute: "borders_bangladesh",
    matchValue: true,
    text: "Does your place share a border with Bangladesh?",
    category: "geography"
  },
  {
    attribute: "borders_nepal",
    matchValue: true,
    text: "Does your place share a border with Nepal?",
    category: "geography"
  },
  {
    attribute: "borders_myanmar",
    matchValue: true,
    text: "Does your place share a border with Myanmar?",
    category: "geography"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTION_BANK };
}
