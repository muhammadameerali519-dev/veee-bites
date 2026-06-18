/**
 * Vee Bite Dynamic Food Item Image Mapper
 * Automatically maps any product name to the high-contrast premium local asset
 * or produces a smart, resilient fallback URL based on category keyword analysis.
 */

const LOCAL_ASSETS = {
  mighty_zinger: "/assets/images/pakistani_mighty_zinger_1781786394547.jpg",
  cheese_lava: "/assets/images/pakistani_cheese_lava_burger_1781786518382.jpg",
  shami_burger: "/assets/images/pakistani_shami_burger_1781786416456.jpg",
  chapli_burger: "/assets/images/pakistani_chapli_burger_1781786494159.jpg",
  tikka_pizza: "/assets/images/pakistani_tikka_pizza_1781786440012.jpg",
  fajita_pizza: "/assets/images/pakistani_fajita_pizza_1781786631144.jpg",
  malai_boti_pizza: "/assets/images/pakistani_malai_boti_pizza_1781786611477.jpg",
  kababish_pizza: "/assets/images/pakistani_kababish_pizza_1781786683250.jpg",
  paratha_roll: "/assets/images/pakistani_paratha_roll_1781786462116.jpg",
  zinger_paratha: "/assets/images/pakistani_zinger_paratha_roll_1781786591814.jpg",
  chicken_shawarma: "/assets/images/pakistani_chicken_shawarma_1781786551939.jpg",
  zinger_shawarma: "/assets/images/pakistani_zinger_shawarma_1781786572261.jpg",
  masala_fries: "/assets/images/pakistani_masala_fries_1781786663953.jpg",
};

// Premium high-res Unsplash fallbacks mapping to maintain Cumulative Layout Shift & Lighthouse performance scores above 90
const FALLBACKS = {
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  wrap: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=800&q=80",
  fries: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  chicken: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
  generic: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
};

/**
 * Dynamically resolves the best corresponding premium image for a given product name
 * and category. If the product name changes, it automatically recalibrates to find
 * the correct asset.
 */
export function getProductImage(name: string, category: string = ""): string {
  const normName = name.toLowerCase();
  const normCategory = category.toLowerCase();

  // 1. Double/Mighty Zinger Matcher
  if (normName.includes("mighty zinger") || normName.includes("double zinger") || normName.includes("5-zinger")) {
    return LOCAL_ASSETS.mighty_zinger;
  }

  // 2. Lava Burger Matcher
  if (normName.includes("lava") || normName.includes("molten")) {
    return LOCAL_ASSETS.cheese_lava;
  }

  // 3. Shami Burger variations matcher
  if (normName.includes("shami") || normName.includes("anda burger")) {
    return LOCAL_ASSETS.shami_burger;
  }

  // 4. Chapli Burger variations matcher
  if (normName.includes("chapli") || normName.includes("kebab deal") || normName.includes("patty burger")) {
    return LOCAL_ASSETS.chapli_burger;
  }

  // 5. Paratha Roll Zinger vs Normal matcher
  if (normName.includes("paratha") && (normName.includes("zinger") || normName.includes("trios"))) {
    if (normName.includes("zinger")) {
      return LOCAL_ASSETS.zinger_paratha;
    }
  }
  if (normName.includes("paratha")) {
    return LOCAL_ASSETS.paratha_roll;
  }

  // 6. Shawarma matcher
  if (normName.includes("shawarma")) {
    if (normName.includes("zinger")) {
      return LOCAL_ASSETS.zinger_shawarma;
    }
    return LOCAL_ASSETS.chicken_shawarma;
  }

  // 7. Pizza Matchers
  if (normName.includes("tikka") && (normName.includes("pizza") || normName.includes("deal"))) {
    return LOCAL_ASSETS.tikka_pizza;
  }
  if (normName.includes("fajita")) {
    return LOCAL_ASSETS.fajita_pizza;
  }
  if (normName.includes("malai boti")) {
    return LOCAL_ASSETS.malai_boti_pizza;
  }
  if (normName.includes("kababish")) {
    return LOCAL_ASSETS.kababish_pizza;
  }

  // 8. General Fries Matcher
  if (normName.includes("fries") || normName.includes("potato") || normName.includes("masala")) {
    return LOCAL_ASSETS.masala_fries;
  }
  
  // 9. Generic fallbacks by keyword/category patterns
  if (normCategory.includes("pizza") || normName.includes("pizza") || normName.includes("deal 1") || normName.includes("deal 3") || normName.includes("deal 4")) {
    return FALLBACKS.pizza;
  }
  if (normCategory.includes("burger") || normName.includes("burger")) {
    return FALLBACKS.burger;
  }
  if (normCategory.includes("wrap") || normCategory.includes("roll") || normName.includes("roll") || normName.includes("wrap")) {
    return FALLBACKS.wrap;
  }
  if (normCategory.includes("fries") || normName.includes("fries")) {
    return FALLBACKS.fries;
  }
  if (normCategory.includes("chicken") || normName.includes("nuggets") || normName.includes("strips")) {
    return FALLBACKS.chicken;
  }

  return FALLBACKS.generic;
}
