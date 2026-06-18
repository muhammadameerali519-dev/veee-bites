import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem, PizzaPrices } from "../types";
import { CATEGORIES, MENU_ITEMS } from "../data";
import { ShoppingCart, Star, HelpCircle, Check, Info, Flame } from "lucide-react";
import { getProductImage } from "../utils/imageMapper";

interface MenuProps {
  onAddToCart: (item: MenuItem, size?: "S" | "M" | "L") => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("Regular Pizza");
  
  // Track selected sizes for size-based items (pizza, cheese sticks)
  // Format: { [itemId]: 'S' | 'M' | 'L' }
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: "S" | "M" | "L" }>({});

  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter(
    (item) => item.category === selectedCategory
  );

  const handleSizeChange = (itemId: string, size: "S" | "M" | "L") => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const getPriceForSize = (item: MenuItem, size: "S" | "M" | "L") => {
    if (typeof item.price === "object") {
      const prices = item.price as PizzaPrices;
      return prices[size];
    }
    return item.price as number;
  };

  const executeAddToCart = (item: MenuItem) => {
    const isSizeBased = typeof item.price === "object";
    const selectedSize = isSizeBased ? selectedSizes[item.id] || "S" : undefined;
    
    onAddToCart(item, selectedSize);

    // Micro interactive animation
    setAddedAnimationId(item.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  return (
    <section id="menu-explorer" className="relative py-24 bg-gradient-to-b from-zinc-950 to-[#0A0A0A] overflow-hidden">
      
      {/* Visual Ambient Globs */}
      <div className="absolute left-1/3 top-0 h-[400px] w-[400px] rounded-full bg-yellow-500 opacity-[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute right-10 bottom-20 h-[300px] w-[300px] rounded-full bg-amber-500 opacity-5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Main Headers */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[#FFC107] font-display text-xs uppercase tracking-[0.25em] font-semibold block">
            House Specialties
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif font-black text-white tracking-tight leading-none">
            VEE BITE <span className="gold-gradient-text font-display font-medium">Culinary Guild</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Freshly prepared by order using pristine chicken cuts, local herbs, and bubbling Italian mozzarella cheese customized exactly to your liking.
          </p>
          <div className="h-[2px] w-24 bg-[#FFC107] mx-auto mt-6" />
        </div>

        {/* Categories Tab Switchnavigation */}
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-none pb-4 mb-12 -mx-4 px-4 sm:mx-0 sm:px-0 justify-start md:justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 text-xs sm:text-sm font-display uppercase tracking-widest font-semibold rounded-full border transition-all duration-300 pointer-events-auto cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#FFC107] text-black border-[#FFC107] font-bold shadow-[0_4px_15px_rgba(255,193,7,0.2)]"
                  : "bg-zinc-950/80 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-[#FFC107]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Category Menu Items Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isPizza = item.category.toLowerCase().includes("pizza");
              const isSizeBased = typeof item.price === "object";
              const activeSize = selectedSizes[item.id] || "S";
              const activePrice = isSizeBased
                ? getPriceForSize(item, activeSize)
                : (item.price as number);

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-gold rounded-[24px] overflow-hidden glass-gold-hover flex flex-col justify-between p-4 relative group"
                >
                  <div className="space-y-4">
                    {/* Food Image viewport */}
                    <div className="relative h-56 rounded-xl overflow-hidden bg-neutral-900 shadow-md">
                      {/* Popular ribbon */}
                      {item.popular && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-amber-500 text-white font-display text-[10px] font-bold tracking-widest px-3 py-1 rounded-md uppercase z-20 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                          ⭐ Best Seller
                        </div>
                      )}

                      {/* Conditionally render real product image for the Mighty Burger, and preserve clean animations for other products */}
                      {item.name.toLowerCase().includes("mighty zinger") || item.name.toLowerCase().includes("mighty burger") || item.name.toLowerCase().includes("mighty crispy") ? (
                        <img
                          referrerPolicy="no-referrer"
                          src="/api/mighty-burger-image"
                          alt={item.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      ) : (
                        /* Clean Animated Gold Mandala Artwork/Emblem instead of product image */
                        <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-zinc-950 flex flex-col items-center justify-center space-y-3 p-4">
                          <div className="relative w-24 h-24 flex items-center justify-center">
                            {/* Outer spinning dashed ring */}
                            <div className="absolute inset-0 rounded-full border border-dashed border-[#FFC107]/20 group-hover:animate-[spin_20s_linear_infinite]" />
                            {/* Inner spinning double ring */}
                            <div className="absolute inset-2 rounded-full border border-double border-[#FFC107]/10 group-hover:animate-[spin_10s_linear_infinite_reverse]" />
                            {/* Inner golden glowing core */}
                            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FFC107]/5 to-amber-500/10 border border-[#FFC107]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.05)] group-hover:scale-105 transition-transform duration-300">
                              <Flame className="w-6 h-6 text-[#FFC107] group-hover:animate-bounce" />
                            </div>
                          </div>

                          {/* Monogram / product initials under ring */}
                          <div className="text-center">
                            <p className="text-[9px] font-mono tracking-[0.2em] text-[#FFC107] uppercase opacity-75">
                              Gourmet
                            </p>
                            <p className="text-sm font-display font-black text-white tracking-widest mt-[2px] uppercase">
                              {item.name.split(" ").map(w => w[0]).join("")}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Dark edge gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Smooth category stamp overlay */}
                      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono tracking-widest text-[#FFC107] uppercase border border-yellow-500/15">
                        {item.category === "Wraps & Rolls" ? "Wrap" : item.category === "Sides & Kids" ? "Side" : "Kitchen Special"}
                      </div>
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-display font-black text-white text-lg tracking-wide uppercase group-hover:text-[#FFC107] transition-colors duration-200">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400 font-sans font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Sizeselectors for Pizzas */}
                    {isSizeBased && (
                      <div className="space-y-2 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-900">
                        <div className="flex items-center justify-between text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">
                          <span>Select Crust Size:</span>
                          <span className="text-[#FFC107]">
                            {activeSize === "S" ? 'Small (8")' : activeSize === "M" ? 'Medium (10")' : 'Large (14")'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {(["S", "M", "L"] as const).map((sz) => (
                            <button
                              key={sz}
                              onClick={() => handleSizeChange(item.id, sz)}
                              className={`flex-1 text-xs py-1.5 font-display rounded-lg font-bold border transition-all duration-200 cursor-pointer pointer-events-auto ${
                                activeSize === sz
                                  ? "bg-[#FFC107] text-black border-[#FFC107]"
                                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white"
                              }`}
                            >
                              {sz} - Rs. {getPriceForSize(item, sz)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action row */}
                  <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                    <div>
                      <span className="text-zinc-500 text-[10px] block uppercase tracking-widest font-semibold font-display">Regular Price</span>
                      <span className="text-2xl font-serif text-white font-bold tracking-wide">
                        Rs. <span className="text-gold font-display font-black">{activePrice}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => executeAddToCart(item)}
                      className={`px-5 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-widest flex items-center space-x-2 transition-all duration-300 pointer-events-auto cursor-pointer ${
                        addedAnimationId === item.id
                          ? "bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.3)]"
                          : "bg-[#FFC107] text-black hover:bg-amber-400 shadow-[0_3px_15px_rgba(255,193,7,0.2)] active:scale-95"
                      }`}
                    >
                      {addedAnimationId === item.id ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* General Extras Callout info box */}
        <div className="mt-16 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 rounded-2xl p-6 border border-zinc-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500/10 text-[#FFC107] rounded-xl border border-yellow-500/20 shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-display font-bold text-base tracking-wide uppercase">Looking for customize extras?</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed max-w-xl">
                Add **Extra Premium Meat &amp; Cheese** (Small: Rs. 110, Large: Rs. 230) or **Extra Gourmet Veggie Toppings** (Rs. 80) directly inside your Cart checkout tray before ordering on WhatsApp!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById("location-contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs text-black font-display font-bold uppercase tracking-widest bg-[#FFC107] px-5 py-3 rounded-xl hover:bg-amber-400 active:scale-95 transition-all cursor-pointer pointer-events-auto whitespace-nowrap"
          >
            Special Event Catering
          </button>
        </div>

      </div>
    </section>
  );
}
