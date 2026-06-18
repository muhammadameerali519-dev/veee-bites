import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ShoppingBag, Star, Flame, ArrowRight } from "lucide-react";
import { getProductImage } from "../utils/imageMapper";

interface HeroFood {
  id: string;
  name: string;
  tagline: string;
  image: string;
  accent: string;
  price: string;
}

const HERO_FOODS: HeroFood[] = [
  {
    id: "mighty-zinger",
    name: "Pakistani Mighty Zinger",
    tagline: "Double stacked crispy giant breast fillet drenched in premium mayonnaise, fresh lettuce, and cheddar cheese.",
    image: "/assets/images/pakistani_mighty_zinger_1781786394547.jpg",
    accent: "from-amber-600 to-red-600",
    price: "Rs. 600/-"
  },
  {
    id: "pizza-pull",
    name: "Golden Cheese-Pull Pizza",
    tagline: "Heavy premium mozzarella stretch backed by deep-marinated Tikka spices and bell peppers.",
    image: "/assets/images/pakistani_tikka_pizza_1781786440012.jpg",
    accent: "from-amber-500 to-yellow-600",
    price: "Rs. 850/-"
  },
  {
    id: "shami-burger",
    name: "Traditional Shami Burger",
    tagline: "The absolute Pakistani street classic: slow-grilled beef-and-lentil patty with authentic mint chutney and fresh eggs.",
    image: "/assets/images/pakistani_shami_burger_1781786416456.jpg",
    accent: "from-yellow-500 to-emerald-600",
    price: "Rs. 280/-"
  },
  {
    id: "shawarma",
    name: "Chicken Shawarma Wrap",
    tagline: "Slow roasted tender chicken shavings, spicy garlic cream, and pickles wrapped in soft flatbread.",
    image: "/assets/images/pakistani_chicken_shawarma_1781786551939.jpg",
    accent: "from-amber-400 to-amber-700",
    price: "Rs. 320/-"
  },
  {
    id: "loaded-fries",
    name: "Spiced Masala Fries",
    tagline: "Generous heap of crinkle-cut golden potatoes covered in chatpatta red chilli masala spices with garlic mayo.",
    image: "/assets/images/pakistani_masala_fries_1781786663953.jpg",
    accent: "from-yellow-400 to-amber-600",
    price: "Rs. 160/-"
  }
];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycles heroes slowly (paused on manual hover/interaction)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_FOODS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeFood = HERO_FOODS[activeIdx];

  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center bg-[#0A0A0A] overflow-hidden pt-28 pb-20">
      
      {/* Golden Particle Animations */}
      <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none overflow-hidden opacity-25 select-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#FFC107]"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-20px`,
              animation: `float ${Math.random() * 10 + 8}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient glowing blobs */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-[#FFC107] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-[450px] w-[450px] rounded-full bg-amber-600 opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT CONTENT CONTAINER */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Promotional Badge */}
            <div className="inline-flex self-start items-center gap-2 px-3.5 py-1.5 bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-full text-[#FFC107] text-[10px] sm:text-xs font-bold tracking-[0.2em] font-display uppercase">
              <Flame className="w-3.5 h-3.5 animate-pulse text-[#FFC107]" />
              <span>Premium Food Hub • Est. 2023</span>
            </div>

            {/* Main Branding Titles */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black leading-[0.9] text-white tracking-tighter uppercase">
                VEE <span className="gold-gradient-text">BITE</span>
              </h1>
              <p className="font-display text-2xl sm:text-4xl text-zinc-200 tracking-wide font-extrabold uppercase leading-tight">
                Authentic <span className="text-[#FFC107]">Pakistani</span> Fast Food<br />
                & Gourmet Pizzas
              </p>
              <p className="font-sans text-sm sm:text-base text-zinc-400 font-medium tracking-wide max-w-xl">
                Experience Gujranwala&apos;s ultimate cheese-pull pizzas, signature towering crispy burgers, and street-style wraps made from local, premium ingredients.
              </p>
            </div>

            {/* Custom CTA Ordering Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-order-now"
                onClick={() => handleScrollToId("menu-explorer")}
                className="bg-[#FFC107] text-black px-8 py-4 rounded-xl font-black shadow-[0_10px_20px_rgba(255,193,7,0.15)] uppercase tracking-wider flex items-center justify-center space-x-2.5 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_15px_30px_rgba(255,193,7,0.3)] active:scale-[0.98] cursor-pointer pointer-events-auto w-full sm:w-auto"
              >
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                <span className="tracking-wide">Order Online Now</span>
              </button>

              <button
                id="hero-view-menu"
                onClick={() => handleScrollToId("menu-explorer")}
                className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-[#FFC107]/40 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer pointer-events-auto w-full sm:w-auto"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 text-[#FFC107]" />
              </button>
            </div>

            {/* Interactive Category Selector Tabs */}
            <div className="pt-6 border-t border-zinc-900/80">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#FFC107] mb-3">
                Select Featured Item
              </p>
              <div className="flex flex-wrap gap-2">
                {HERO_FOODS.map((food, idx) => (
                  <button
                    key={food.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`text-[11px] px-4 py-2.5 font-display uppercase tracking-wider font-bold rounded-lg transition-all duration-300 cursor-pointer pointer-events-auto border ${
                      activeIdx === idx
                        ? "bg-[#FFC107] text-black border-[#FFC107] font-extrabold shadow-[0_4px_12px_rgba(255,193,7,0.25)]"
                        : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-[#FFC107]/30 hover:bg-[#FFC107]/5"
                    }`}
                  >
                    {food.id === "mighty-zinger" ? "Mighty Burger" : food.id === "pizza-pull" ? "Tikka Pizza" : food.id === "shami-burger" ? "Shami Burger" : food.id === "shawarma" ? "Shawarma" : "Masala Fries"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>


          {/* RIGHT FEATURED CARD CONTAINER */}
          <motion.div 
            className="lg:col-span-5 flex items-center justify-center relative w-full pt-4 lg:pt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFood.id}
                className="relative w-full max-w-[500px] aspect-[4/4.2] sm:aspect-[4/4.1] md:aspect-[4/4] lg:aspect-[4/4.5] xl:aspect-[4/4.2] rounded-[24px] border border-[#FFC107]/25 bg-zinc-950/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden group select-none pointer-events-auto transition-all duration-300 hover:border-[#FFC107]/45 hover:shadow-[0_25px_60px_rgba(255,193,7,0.15)]"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Backgound radial accent glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-72 h-72 bg-gradient-to-br ${activeFood.accent} opacity-20 blur-[50px] pointer-events-none group-hover:opacity-30 transition-opacity duration-550`} />

                {/* Rating Badge (Always positioned absolute in top-right) */}
                <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#FFC107]/35 flex items-center space-x-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#FFC107] text-[#FFC107]" />
                  <span className="text-[11px] font-black text-white tracking-wide">⭐ 4.9</span>
                </div>

                {/* Product Image Section (Real scraped image for the Mighty Burger, and clean animation/mandala for other products) */}
                <div className="flex-1 w-full relative flex items-center justify-center p-6 pb-2 overflow-hidden z-10">
                  {activeFood.name.toLowerCase().includes("mighty zinger") || activeFood.name.toLowerCase().includes("mighty burger") || activeFood.name.toLowerCase().includes("mighty crispy") ? (
                    <div className="relative w-full h-full min-h-[220px] max-h-[220px] sm:max-h-[260px] md:max-h-[280px] lg:max-h-[230px] xl:max-h-[270px] overflow-hidden rounded-2xl border border-[#FFC107]/20 bg-gradient-to-b from-zinc-900/40 to-zinc-950/90 flex flex-col items-center justify-center">
                      <img
                        loading="lazy"
                        src="/api/mighty-burger-image"
                        alt={activeFood.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="relative w-full h-full min-h-[220px] max-h-[220px] sm:max-h-[260px] md:max-h-[280px] lg:max-h-[230px] xl:max-h-[270px] overflow-hidden rounded-2xl border border-[#FFC107]/20 bg-gradient-to-b from-zinc-900/40 to-zinc-950/90 flex flex-col items-center justify-center space-y-4">
                      {/* Glowing golden circle animations representing the food plate dynamically */}
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        {/* Pulse Ring 1 */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#FFC107]/30 animate-[spin_40s_linear_infinite]" />
                        
                        {/* Pulse Ring 2 */}
                        <div className="absolute inset-2 rounded-full border border-double border-[#FFC107]/20 animate-[spin_20s_linear_infinite_reverse]" />
                        
                        {/* Inner Core Pulse */}
                        <div className="absolute inset-6 rounded-full bg-gradient-to-tr from-amber-600/10 to-yellow-500/20 border border-[#FFC107]/45 flex items-center justify-center shadow-[0_0_25px_rgba(255,193,7,0.15)] group-hover:scale-105 transition-transform duration-500">
                          <Flame className="w-12 h-12 text-[#FFC107] animate-pulse" />
                        </div>

                        {/* Golden particles revolving around the circle */}
                        <div className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-[#FFC107] shadow-[0_0_8px_#FFC107] animate-bounce" />
                        <div className="absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#FF9800] animate-pulse" />
                      </div>

                      {/* Clean Monogram Header with Animated Details */}
                      <div className="text-center space-y-1">
                        <span className="text-[10px] font-mono tracking-[0.3em] text-[#FFC107] uppercase font-bold">
                          Vee Bite Gourmet
                        </span>
                        <div className="text-2xl font-display font-black text-white tracking-widest uppercase flex items-center justify-center gap-1.5">
                          <span>{activeFood.name.split(" ").map(w => w[0]).join("")}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-ping" />
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}
                </div>

                {/* Product Details (Fixed fully visible at bottom) */}
                <div className="w-full p-5 sm:p-6 bg-zinc-950/90 border-t border-zinc-900/60 z-20 flex flex-col space-y-2 relative">
                  <div className="flex justify-between items-center gap-3">
                    <h3 className="font-display font-black text-white text-base sm:text-lg tracking-wide uppercase leading-tight truncate">
                      {activeFood.name}
                    </h3>
                    <span className="text-sm font-black text-[#FFC107] whitespace-nowrap bg-[#FFC107]/10 px-2.5 py-1 rounded-md border border-[#FFC107]/20 font-mono">
                      {activeFood.price}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans font-medium leading-relaxed">
                    {activeFood.tagline}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={() => handleScrollToId("menu-explorer")}
                      className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#FFC107] hover:text-white flex items-center gap-1.5 group/link cursor-pointer"
                    >
                      <span>Add to Order</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">
                      Freshly Prepared
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
