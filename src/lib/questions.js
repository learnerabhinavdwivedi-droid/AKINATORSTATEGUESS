/**
 * ANKANITOR UNIFIED QUESTION BANK - 50 CUSTOM QUESTIONS
 */

const QUESTION_BANK = [
  // ── 1. Geography & Terrains (12 Questions) ──
  { attribute: "is_landlocked", matchValue: true, text: "Is your state/UT landlocked (completely surrounded by land with no coastline)?", category: "geography" },
  { attribute: "has_direct_coastline", matchValue: true, text: "Does your state have direct access to sea beaches or a coastline?", category: "geography" },
  { attribute: "high_altitude_mountains", matchValue: true, text: "Is your state widely known for high-altitude mountains, hill stations, or snow?", category: "geography" },
  { attribute: "active_international_border", matchValue: true, text: "Does your state share an active international land border with another country?", category: "geography" },
  { attribute: "is_south_india", matchValue: true, text: "Is your state located in South India?", category: "geography" },
  { attribute: "is_seven_sisters", matchValue: true, text: "Is your state part of the contiguous 'Seven Sisters' of Northeast India?", category: "geography" },
  { attribute: "tropic_of_cancer", matchValue: true, text: "Does the Tropic of Cancer pass through your state?", category: "geography" },
  { attribute: "is_union_territory", matchValue: true, text: "Is your state primarily classified as a Union Territory rather than a full state?", category: "geography" },
  { attribute: "borders_more_than_5_states", matchValue: true, text: "Does your state share a border with more than 5 other Indian states?", category: "geography" },
  { attribute: "sandy_or_cold_desert", matchValue: true, text: "Is a major portion of your state covered by a sandy or cold desert?", category: "geography" },
  { attribute: "ganga_flows_through", matchValue: true, text: "Does the holy river Ganga flow directly through your state?", category: "geography" },
  { attribute: "backwaters_or_archipelagos", matchValue: true, text: "Is your state known for a major network of tropical backwaters or island archipelagos?", category: "geography" },

  // ── 2. Famous Historical & Cultural Landmarks (10 Questions) ──
  { attribute: "seven_wonders", matchValue: true, text: "Is one of the official Seven Wonders of the World located in your state?", category: "historical" },
  { attribute: "hampi_or_mysore", matchValue: true, text: "Is your state home to the famous ancient ruins of Hampi or the Mysore Palace?", category: "historical" },
  { attribute: "kumbh_mela", matchValue: true, text: "Does your state host the world's largest religious gathering, the Kumbh Mela?", category: "historical" },
  { attribute: "golden_temple", matchValue: true, text: "Is the highly revered Golden Temple situated in your state?", category: "historical" },
  { attribute: "ajanta_ellora", matchValue: true, text: "Are the famous ancient Ajanta or Ellora rock-cut caves located in your state?", category: "historical" },
  { attribute: "birthplace_buddhism_mahabodhi", matchValue: true, text: "Is your state considered the birthplace of Buddhism or home to the Mahabodhi Temple?", category: "historical" },
  { attribute: "charminar_golconda", matchValue: true, text: "Does your state contain the historical monuments of the Charminar or Golconda Fort?", category: "historical" },
  { attribute: "royal_forts_sand_palaces", matchValue: true, text: "Is your state famous for iconic royal forts and massive sand palaces?", category: "historical" },
  { attribute: "konark_jagannath", matchValue: true, text: "Is your state home to the Sun Temple of Konark or the Jagannath Puri Yatra?", category: "historical" },
  { attribute: "varanasi_ayodhya", matchValue: true, text: "Does your state contain the spiritual ghats of Varanasi or the ancient city of Ayodhya?", category: "historical" },

  // ── 3. Food, Cuisine & Agriculture (10 Questions) ──
  { attribute: "tea_plantations", matchValue: true, text: "Is your state globally famous for its tea plantations and aromatic tea gardens?", category: "food" },
  { attribute: "spices_garden", matchValue: true, text: "Is your state known as the 'Spices Garden of India'?", category: "food" },
  { attribute: "dal_baati_churma", matchValue: true, text: "Are dishes like Dal Baati Churma or Pyaz Kachori considered native staples here?", category: "food" },
  { attribute: "vada_pav_misal", matchValue: true, text: "Is your state famous for street foods like Vada Pav, Pav Bhaji, or Misal Pav?", category: "food" },
  { attribute: "hyderabadi_biryani", matchValue: true, text: "Is your state world-famous for Hyderabadi Biryani?", category: "food" },
  { attribute: "rosogolla", matchValue: true, text: "Is your state credited with the origin of the sweet Rosogolla?", category: "food" },
  { attribute: "makki_di_roti", matchValue: true, text: "Is Makki di Roti and Sarson da Saag the signature traditional meal of your state?", category: "food" },
  { attribute: "saffron_or_apples", matchValue: true, text: "Is your state the largest producer of saffron or apples in India?", category: "food" },
  { attribute: "litti_chokha", matchValue: true, text: "Is Litthi Chokha a popular traditional dish deeply rooted in your state?", category: "food" },
  { attribute: "idli_dosa", matchValue: true, text: "Is your state famous for traditional fermented rice items like Idli, Dosa, and Uttapam?", category: "food" },

  // ── 4. Art, Festivals & Clothing (10 Questions) ──
  { attribute: "durga_puja", matchValue: true, text: "Is the grand festival of Durga Puja celebrated as the biggest event in your state?", category: "art" },
  { attribute: "garba", matchValue: true, text: "Is your state famous for the high-energy Garba dance during Navratri?", category: "art" },
  { attribute: "hornbill_festival", matchValue: true, text: "Is the vibrant, colorful Hornbill Festival celebrated annually in your state?", category: "art" },
  { attribute: "pongal_jallikattu", matchValue: true, text: "Is the harvest festival of Pongal or Jallikattu native to your state?", category: "art" },
  { attribute: "kathakali_mohiniyattam", matchValue: true, text: "Is your state the origin of classical dance forms like Kathakali or Mohiniyattam?", category: "art" },
  { attribute: "bamboo_dance_cheraw", matchValue: true, text: "Is the traditional bamboo dance (Cheraw) a famous cultural asset of your state?", category: "art" },
  { attribute: "bhangra_gidha", matchValue: true, text: "Is the energetic Bhangra or Gidha dance a core identity of your state?", category: "art" },
  { attribute: "bihu_festival", matchValue: true, text: "Is the Bihu festival celebrated as the primary state festival?", category: "art" },
  { attribute: "chhau_dance_mask", matchValue: true, text: "Is your state famous for Chhau dance or tribal mask-making cultures?", category: "art" },
  { attribute: "bharatnatyam", matchValue: true, text: "Is your state the origin of the classical dance form Bharatnatyam?", category: "art" },

  // ── 5. Demographics, Language & Modern Identity (8 Questions) ──
  { attribute: "dravidian_language", matchValue: true, text: "Does your state use a Dravidian language family script (Tamil, Telugu, Kannada, Malayalam)?", category: "demographics" },
  { attribute: "literacy_over_90", matchValue: true, text: "Does your state boast an official literacy rate of over 90%?", category: "demographics" },
  { attribute: "silicon_valley", matchValue: true, text: "Is your state capital widely known as the 'Silicon Valley of India' or the main IT hub?", category: "demographics" },
  { attribute: "bollywood_financial", matchValue: true, text: "Is your state home to 'Bollywood' and the financial capital of India?", category: "demographics" },
  { attribute: "first_100_organic", matchValue: true, text: "Is your state widely recognized as the first 100% organic farming state in India?", category: "demographics" },
  { attribute: "largest_mangrove", matchValue: true, text: "Is your state home to the largest mangrove forest ecosystem in the world (Sundarbans)?", category: "demographics" },
  { attribute: "formed_after_2000", matchValue: true, text: "Was your state formed relatively recently in the 21st century (after the year 2000)?", category: "demographics" },
  { attribute: "portuguese_lifestyle", matchValue: true, text: "Is your state highly famous for its historic Portuguese lifestyle, architecture, and nightlife?", category: "demographics" }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUESTION_BANK };
}
