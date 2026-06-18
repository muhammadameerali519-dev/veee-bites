import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Loader from "./components/Loader";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import FeedbackModal from "./components/FeedbackModal";
import LoyaltyModal from "./components/LoyaltyModal";
import AIChatbot from "./components/AI_Chatbot";
import Footer_Map from "./components/Footer_Map";
import { CartItem, MenuItem } from "./types";
import { ShoppingBag, Menu as MenuIcon, X, Flame, MessageCircle, Phone, Star, Award } from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const [orderedItemNames, setOrderedItemNames] = useState<string[]>([]);
  const [completedOrders, setCompletedOrders] = useState<number>(() => {
    const saved = localStorage.getItem("veebite_completed_orders");
    return saved !== null ? Number(saved) : 1; // Default to 1 completed welcome order
  });

  // Read scroll state to apply glass blur effect to Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = (item: MenuItem, size?: "S" | "M" | "L") => {
    const cartId = `${item.id}-${size || "default"}`;
    const selectedPriceValue =
      typeof item.price === "object"
        ? size
          ? item.price[size]
          : item.price["S"]
        : (item.price as number);

    setCart((prev) => {
      const existingIdx = prev.findIndex((c) => c.cartId === cartId);

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartId,
            menuItem: item,
            selectedSize: size,
            selectedPrice: selectedPriceValue,
            quantity: 1,
            addExtraMeatCheese: false,
            addExtraToppings: false,
            notes: "",
          },
        ];
      }
    });

    // Auto open cart tray on first selection for great UX feedback
    if (cart.length === 0) {
      setTimeout(() => setCartOpen(true), 300);
    }
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleToggleAddon = (
    cartId: string,
    addonType: "addonMeatCheese" | "addonToppings"
  ) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.cartId === cartId) {
          if (addonType === "addonMeatCheese") {
            return { ...item, addExtraMeatCheese: !item.addExtraMeatCheese };
          } else {
            return { ...item, addExtraToppings: !item.addExtraToppings };
          }
        }
        return item;
      });
    });
  };

  const handleUpdateNotes = (cartId: string, notes: string) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.cartId === cartId) {
          return { ...item, notes };
        }
        return item;
      });
    });
  };

  const handleCheckoutSuccess = () => {
    const names = cart.map((item) => item.menuItem.name);
    const uniqueNames = Array.from(new Set(names));
    setOrderedItemNames(uniqueNames);
    
    // Increment loyalty completed orders on checkout success
    setCompletedOrders((prev) => {
      const next = prev + 1;
      localStorage.setItem("veebite_completed_orders", String(next));
      return next;
    });
    
    // Smooth transition: close drawer, clear items and open feedback card modal
    setTimeout(() => {
      setCartOpen(false);
      setCart([]);
      setTimeout(() => {
        setFeedbackOpen(true);
      }, 600);
    }, 300);
  };

  const handleSimulateOrder = () => {
    setCompletedOrders((prev) => {
      const next = prev + 1;
      localStorage.setItem("veebite_completed_orders", String(next));
      return next;
    });
  };

  const handleResetPoints = () => {
    setCompletedOrders(0);
    localStorage.setItem("veebite_completed_orders", "0");
  };

  const scrollToIdHandler = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-zinc-100 overflow-x-hidden selection:bg-[#FFC107] selection:text-black">
      
      {/* 1. Grand entry loader splash overlay */}
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          {/* 2. Premium Sticky Sticky Header */}
          <header
            id="premium-header"
            className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
              scrolled
                ? "bg-[#0A0A0A]/90 backdrop-blur-md py-3.5 border-b border-zinc-900/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                : "bg-transparent py-6"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              
              {/* Logo Brand Title */}
              <button
                onClick={() => scrollToIdHandler("premium-header")}
                className="flex items-center space-x-2.5 pointer-events-auto cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFC107] to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.3)] transform transition-transform duration-300 group-hover:rotate-12">
                  <Flame className="w-5.5 h-5.5 text-black" />
                </div>
                <div>
                  <span className="font-serif font-black tracking-[0.2em] text-white text-lg group-hover:text-[#FFC107] transition-colors uppercase">
                    VEE <span className="text-[#FFC107]">BITE</span>
                  </span>
                  <span className="hidden sm:block text-[9px] text-zinc-500 font-mono tracking-widest leading-none uppercase">Eat Good, Feel Good</span>
                </div>
              </button>

              {/* Desktop view navigation row links */}
              <nav className="hidden md:flex items-center space-x-8 text-xs font-display uppercase tracking-widest font-semibold text-zinc-400 hover:text-zinc-300">
                <button onClick={() => scrollToIdHandler("premium-header")} className="hover:text-[#FFC107] transition-colors cursor-pointer">Home</button>
                <button onClick={() => scrollToIdHandler("our-story")} className="hover:text-[#FFC107] transition-colors cursor-pointer">Our Story</button>
                <button onClick={() => scrollToIdHandler("menu-explorer")} className="hover:text-[#FFC107] transition-colors cursor-pointer">Explore Menu</button>
                <button onClick={() => scrollToIdHandler("location-contact")} className="hover:text-[#FFC107] transition-colors cursor-pointer">Find Us</button>
                <button onClick={() => setFeedbackOpen(true)} className="hover:text-[#FFC107] text-[#FFC107]/90 flex items-center gap-1 transition-colors cursor-pointer"><Star className="w-3.5 h-3.5 fill-[#FFC107]" /> Rate Meal</button>
              </nav>

              {/* Action utilities (Cart trigger + Mobile toggle) */}
              <div className="flex items-center space-x-4">
                
                {/* Header Call button */}
                <a
                  href="tel:03091830660"
                  className="hidden lg:flex items-center space-x-2 border border-zinc-800 text-zinc-350 px-4 py-2 rounded-full hover:border-[#FFC107] transition-colors text-xs uppercase tracking-wider font-semibold pointer-events-auto"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>0309 183 0660</span>
                </a>

                {/* Loyalty Tracker Button in Header with Progress Bar */}
                <button
                  id="header-loyalty-badge"
                  onClick={() => setLoyaltyOpen(true)}
                  className="relative overflow-hidden flex items-center space-x-2 bg-zinc-900/40 border border-zinc-800/80 hover:border-[#FFC107] px-3.5 py-2 rounded-full transition-all cursor-pointer pointer-events-auto shadow-md group shrink-0 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-[#FFC107] group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col text-left leading-none">
                    <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase mb-[1px]">Loyalty</span>
                    <span className="text-[11px] font-black text-[#FFC107] font-mono">{completedOrders * 50} <span className="text-zinc-400 font-sans font-medium text-[9px]">pts</span></span>
                  </div>

                  {/* Micro Progress Bar inside bottom edge */}
                  <div className="absolute bottom-0 inset-x-0 h-[3px] bg-zinc-950/80">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-[#FFC107] transition-all duration-500" 
                      style={{ width: `${Math.min(((completedOrders * 50) / 250) * 100, 100)}%` }}
                    />
                  </div>
                </button>

                {/* Shopping Bag Button trigger with dynamic badge count */}
                <button
                  id="header-cart-icon"
                  onClick={() => setCartOpen(true)}
                  className="relative w-11 h-11 bg-zinc-950/80 border border-zinc-900 rounded-full flex items-center justify-center text-white hover:border-[#FFC107] active:scale-95 transition-all pointer-events-auto cursor-pointer shadow-inner"
                >
                  <ShoppingBag className="w-5 h-5" />
                  
                  {totalItemsCount > 0 && (
                    <motion.span
                      id="cart-badge-count"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-1 -right-1 bg-[#FFC107] text-black font-display font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg transform translate-x-1.5 -translate-y-1"
                    >
                      {totalItemsCount}
                    </motion.span>
                  )}
                </button>

                {/* Mobile Menu Icon Toggle button */}
                <button
                  id="mobile-nav-toggle"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden w-11 h-11 border border-zinc-900 rounded-full flex items-center justify-center hover:border-gold pointer-events-auto cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-5.5 h-5.5 text-white" /> : <MenuIcon className="w-5.5 h-5.5 text-white" />}
                </button>

              </div>
            </div>

            {/* Mobile Navigation Drawer Overlay */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  id="mobile-menu-drawer"
                  className="absolute top-full inset-x-0 bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-800/80 p-6 flex flex-col space-y-4 shadow-2xl z-40 md:hidden"
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                >
                  <button onClick={() => scrollToIdHandler("premium-header")} className="text-left py-2 font-display text-xs uppercase tracking-widest text-zinc-300 font-semibold hover:text-[#FFC107] cursor-pointer">Home</button>
                  <button onClick={() => scrollToIdHandler("our-story")} className="text-left py-2 font-display text-xs uppercase tracking-widest text-zinc-300 font-semibold hover:text-[#FFC107] cursor-pointer">Our Story</button>
                  <button onClick={() => scrollToIdHandler("menu-explorer")} className="text-left py-2 font-display text-xs uppercase tracking-widest text-zinc-300 font-semibold hover:text-[#FFC107] cursor-pointer">Browse Menu</button>
                  <button onClick={() => scrollToIdHandler("location-contact")} className="text-left py-2 font-display text-xs uppercase tracking-widest text-zinc-300 font-semibold hover:text-[#FFC107] cursor-pointer">Location Map</button>
                  <button onClick={() => { setFeedbackOpen(true); setMobileMenuOpen(false); }} className="text-left py-2 font-display text-xs uppercase tracking-widest text-[#FFC107] font-semibold hover:text-[#FFC107] cursor-pointer flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-[#FFC107]" /> Rate Our Meal</button>
                  <a
                    href="tel:03091830660"
                    className="flex items-center space-x-2 bg-zinc-900 px-4 py-3 rounded-xl border border-zinc-800 text-[#FFC107] font-semibold text-xs tracking-wider uppercase mt-2.5"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Delivery: 0309 183 0660</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* 3. Immersive Hero visual carousel (3D Food items, gold fireflies) */}
          <Hero />

          {/* 4. Emotional About Section (Muhammad Haris, struggle since 2023) */}
          <About />

          {/* 5. Menu Categories Section (Pizzas, sizes S/M/L, additive cards) */}
          <Menu onAddToCart={handleAddToCart} />

          {/* 6. Dynamic Slide-out Checkout Cart and Item modification tray */}
          <Cart
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onToggleAddon={handleToggleAddon}
            onUpdateNotes={handleUpdateNotes}
            onCheckoutSuccess={handleCheckoutSuccess}
          />

           {/* 6.5. Post-order Feedback modal component */}
          <FeedbackModal
            isOpen={feedbackOpen}
            onClose={() => setFeedbackOpen(false)}
            orderedItems={orderedItemNames}
          />

          {/* 6.6. Vee Bite Member Loyalty program progress & milestones */}
          <LoyaltyModal
            isOpen={loyaltyOpen}
            onClose={() => setLoyaltyOpen(false)}
            completedOrders={completedOrders}
            onSimulateOrder={handleSimulateOrder}
            onResetPoints={handleResetPoints}
          />

          {/* 7. Interactive Geography Map Embed + contact cards */}
          <Footer_Map />

          {/* 8. Fully loaded AI Food Assistant conversation floating dialog */}
          <AIChatbot onAddToCart={handleAddToCart} />

          {/* 9. Floating Left side direct WhatsApp click CTA to increase conversion speed */}
          <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
            <a
              id="sticky-whatsapp-cta"
              href="https://wa.me/923091830660"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-display font-black text-xs uppercase tracking-widest flex items-center space-x-2.5 shadow-[0_5px_30px_rgba(16,185,129,0.45)] transition-all transform hover:scale-115 cursor-pointer pointer-events-auto"
            >
              <MessageCircle className="w-5 h-5 fill-black/10" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

        </>
      )}
    </div>
  );
}
