import { motion, AnimatePresence } from "motion/react";
import { CartItem } from "../types";
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle, Sparkles, CheckSquare, Square, Flame } from "lucide-react";
import { useState } from "react";
import { getProductImage } from "../utils/imageMapper";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onToggleAddon: (cartId: string, addonType: "addonMeatCheese" | "addonToppings") => void;
  onUpdateNotes: (cartId: string, notes: string) => void;
  onCheckoutSuccess?: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onToggleAddon,
  onUpdateNotes,
  onCheckoutSuccess
}: CartProps) {
  const [generalNotes, setGeneralNotes] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"modeltown" | "other">("modeltown");

  const calculateItemPrice = (item: CartItem) => {
    let base = item.selectedPrice;
    if (item.addExtraMeatCheese) {
      // Small is 110, Large/Medium default to 230
      base += item.selectedSize === "S" ? 110 : 230;
    }
    if (item.addExtraToppings) {
      base += 80;
    }
    return base * item.quantity;
  };

  const calculateCabinetTotal = () => {
    return cart.reduce((acc, item) => acc + calculateItemPrice(item), 0);
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let text = `*🚨 NEW ORDER FROM VEE BITE WEBSITE 🚨*\n`;
    text += `==================================\n\n`;

    cart.forEach((item, index) => {
      const isSizeBased = item.selectedSize !== undefined;
      const sizeStr = isSizeBased ? ` (Size: ${item.selectedSize})` : "";
      
      text += `*${index + 1}. ${item.menuItem.name}${sizeStr}* \n`;
      text += `   *Qty:* ${item.quantity}x \n`;
      text += `   *Base Price:* Rs. ${item.selectedPrice} / item \n`;

      const addons = [];
      if (item.addExtraMeatCheese) {
        const extraCost = item.selectedSize === "S" ? 110 : 230;
        addons.push(`Extra Meat & Cheese (+Rs. ${extraCost})`);
      }
      if (item.addExtraToppings) {
        addons.push(`Extra Toppings (+Rs. 80)`);
      }

      if (addons.length > 0) {
        text += `   *Add-ons:* ${addons.join(", ")} \n`;
      }

      if (item.notes && item.notes.trim() !== "") {
        text += `   *Item Note:* "${item.notes}" \n`;
      }

      const totalItemVal = calculateItemPrice(item);
      text += `   *Item Total Price:* Rs. ${totalItemVal}\n\n`;
    });

    if (generalNotes.trim() !== "") {
      text += `*Order Instructions:* \n"${generalNotes}" \n\n`;
    }

    const deliveryFee = deliveryArea === "modeltown" ? 70 : "Calculated relative to distance (km / location)";
    const totalWithDelivery = deliveryArea === "modeltown" 
      ? `Rs. ${calculateCabinetTotal() + 70}` 
      : `Rs. ${calculateCabinetTotal()} + Delivery Charges`;

    text += `==================================\n`;
    text += `*Menu Subtotal:* Rs. ${calculateCabinetTotal()}\n`;
    text += `*Delivery Area:* ${deliveryArea === "modeltown" ? "Model Town" : "Other Area (Outside Model Town)"}\n`;
    text += `*Delivery Charges:* ${deliveryArea === "modeltown" ? "Rs. 70" : "To be confirmed on WhatsApp (based on location/km)"}\n`;
    text += `*GRAND TOTAL:* ${totalWithDelivery}\n`;
    text += `==================================\n\n`;
    text += `_Please confirm my order and share the estimated delivery time. JazakAllah!_ 🌟`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/923091830660?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    if (onCheckoutSuccess) {
      onCheckoutSuccess();
    }
  };

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            id="cart-backdrop"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 pointer-events-auto cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Slide-out Panel body */}
          <motion.div
            id="cart-drawer"
            className="fixed inset-y-0 right-0 w-[100vw] sm:w-[480px] bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-[#FFC107]/20 z-50 flex flex-col justify-between shadow-[-10px_0_50px_rgba(0,0,0,0.85)] pointer-events-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
          >
            {/* Header portion */}
            <div className="px-6 py-5 bg-[#050505] border-b border-[#FFC107]/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#FFC107]/10 text-[#FFC107] rounded-lg flex items-center justify-center border border-[#FFC107]/25">
                  <ShoppingBag className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm text-white tracking-widest uppercase">Order Bag</h3>
                  <p className="text-[10px] text-zinc-400 font-sans tracking-wide uppercase mt-0.5">
                    {totalCount} {totalCount === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>

              <button
                id="cart-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* List scroll panel body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin bg-gradient-to-b from-neutral-950 to-zinc-950">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-72 text-center space-y-4">
                  <ShoppingBag className="w-16 h-16 text-zinc-700 stroke-[1.2] animate-bounce" />
                  <div>
                    <h4 className="text-zinc-400 font-display font-bold uppercase tracking-wider text-sm">Your bag is empty</h4>
                    <p className="text-[#FFC107] text-xs font-semibold mt-1 max-w-[220px] mx-auto leading-relaxed">
                      Explore our delicious pizzas, Mighty burgers, and hot local spices to load items!
                    </p>
                  </div>
                </div>
              ) : (
                cart.map((item) => {
                  const itemPrice = calculateItemPrice(item);
                  const extraMeatCheeseCost = item.selectedSize === "S" ? 110 : 230;

                  return (
                    <div
                      key={item.cartId}
                      className="bg-[#0F0F0F] border border-zinc-900/90 rounded-2xl p-4 space-y-4 shadow-md relative"
                    >
                      {/* Flex core image title block */}
                      <div className="flex items-start justify-between gap-4">
                        {/* Conditionally display real product image for the Mighty Burger, and preserve clean abstract monograms for others */}
                        {item.menuItem.name.toLowerCase().includes("mighty zinger") || item.menuItem.name.toLowerCase().includes("mighty burger") || item.menuItem.name.toLowerCase().includes("mighty crispy") ? (
                          <img
                            referrerPolicy="no-referrer"
                            src="/api/mighty-burger-image"
                            alt={item.menuItem.name}
                            className="w-16 h-16 object-cover rounded-xl border border-[#FFC107]/20 shrink-0"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=120&q=80";
                            }}
                          />
                        ) : (
                          /* Mini abstract monogram instead of image */
                          <div className="w-16 h-16 rounded-xl border border-[#FFC107]/20 bg-gradient-to-b from-zinc-850 to-zinc-950 flex flex-col items-center justify-center p-1 shrink-0 text-center">
                            <p className="text-[10px] font-display font-black text-[#FFC107] uppercase">
                              {item.menuItem.name.split(" ").map(w => w[0]).join("")}
                            </p>
                            <Flame className="w-4 h-4 text-[#FFC107]/60 animate-pulse mt-1" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-display font-black tracking-wide text-sm uppercase">
                            {item.menuItem.name}
                          </h4>
                          {item.selectedSize && (
                            <span className="inline-block bg-yellow-500/15 border border-yellow-500/10 text-[#FFC107] text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-md mt-1 uppercase">
                              Size: {item.selectedSize === "S" ? "S (8\")" : item.selectedSize === "M" ? "M (10\")" : "L (14\")"}
                            </span>
                          )}
                          <p className="text-xs text-[#FFC107] mt-1.5 font-bold font-display">
                            Rs. {item.selectedPrice} / item
                          </p>
                        </div>

                        {/* Remove Action */}
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="p-1 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom additions selection checklists */}
                      <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-900 space-y-2 text-xs">
                        {/* Add-on title */}
                        <div className="text-[10px] text-zinc-500 tracking-wider font-semibold uppercase">Customize Addons</div>

                        {/* Extra Meat & Cheese selection option */}
                        <button
                          onClick={() => onToggleAddon(item.cartId, "addonMeatCheese")}
                          className="flex items-center space-x-2 text-zinc-300 hover:text-white w-full text-left font-medium transition-colors"
                        >
                          {item.addExtraMeatCheese ? (
                            <CheckSquare className="w-4 h-4 text-[#FFC107] shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-700 shrink-0" />
                          )}
                          <span className="flex-1">Extra Meat &amp; Premium Cheese</span>
                          <span className="text-yellow-500/80 font-bold font-display">+Rs. {extraMeatCheeseCost}</span>
                        </button>

                        {/* Extra general toppings selection option */}
                        <button
                          onClick={() => onToggleAddon(item.cartId, "addonToppings")}
                          className="flex items-center space-x-2 text-zinc-300 hover:text-white w-full text-left font-medium transition-colors"
                        >
                          {item.addExtraToppings ? (
                            <CheckSquare className="w-4 h-4 text-[#FFC107] shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-zinc-700 shrink-0" />
                          )}
                          <span className="flex-1">Extra Veggie / Mash Toppings</span>
                          <span className="text-yellow-500/80 font-bold font-display">+Rs. 80</span>
                        </button>
                      </div>

                      {/* Custom notes for chefs */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">Notes to Kitchen</label>
                        <input
                          type="text"
                          placeholder="e.g. Extra spicy, no onions, double chutney"
                          value={item.notes || ""}
                          onChange={(e) => onUpdateNotes(item.cartId, e.target.value)}
                          className="w-full bg-zinc-950 text-white placeholder-zinc-600 text-xs px-3 py-2 rounded-lg border border-zinc-900 focus:border-[#FFC107] outline-none"
                        />
                      </div>

                      {/* Quantity switcher & running total row */}
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-900/60 text-xs">
                        <div className="flex items-center space-x-3 bg-zinc-950 border border-zinc-900 p-1.5 rounded-xl">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, -1)}
                            className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-display font-black text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartId, 1)}
                            className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-zinc-500 text-[10px] block uppercase tracking-widest font-semibold">Subtotal</span>
                          <span className="text-sm font-display font-black text-[#FFC107]">
                            Rs. {itemPrice}
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Checkout Action drawer container */}
            {cart.length > 0 && (
              <div className="p-6 bg-zinc-950 border-t border-zinc-900 space-y-4">
                {/* General Delivery instructions box */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">Special Delivery/Address Instructions</span>
                  <textarea
                    placeholder="Enter delivery address, phone number or landmarks if applicable..."
                    rows={2}
                    value={generalNotes}
                    onChange={(e) => setGeneralNotes(e.target.value)}
                    className="w-full bg-zinc-900 text-white placeholder-zinc-600 text-xs px-3 py-2 rounded-xl border border-zinc-800 focus:border-[#FFC107] outline-none"
                  />
                </div>

                {/* Delivery Area Selection */}
                <div className="space-y-2 pt-2 border-t border-zinc-900">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">Delivery Location Selector</span>
                  <div className="grid grid-cols-2 gap-2 col-span-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea("modeltown")}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold font-display tracking-wider flex flex-col items-center justify-center transition-all cursor-pointer ${
                        deliveryArea === "modeltown"
                          ? "bg-zinc-900 border-[#FFC107] text-[#FFC107] shadow-[0_2px_10px_rgba(255,193,7,0.15)] animate-none"
                          : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <span className="text-[11px]">Model Town</span>
                      <span className="text-[9px] opacity-85 mt-0.5">Rs. 70 Flat Fee</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryArea("other")}
                      className={`px-3 py-2.5 rounded-xl border text-xs font-semibold font-display tracking-wider flex flex-col items-center justify-center transition-all cursor-pointer ${
                        deliveryArea === "other"
                          ? "bg-zinc-900 border-[#FFC107] text-[#FFC107] shadow-[0_2px_10px_rgba(255,193,7,0.15)] animate-none"
                          : "bg-zinc-950/40 border-zinc-900 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <span className="text-[11px]">Other Areas</span>
                      <span className="text-[9px] opacity-85 mt-0.5">Acc. to Distance</span>
                    </button>
                  </div>
                </div>

                {/* Subtotals summaries board */}
                <div className="space-y-2 pt-2 border-t border-zinc-900 text-sm font-sans text-zinc-400">
                  <div className="flex justify-between items-center text-xs">
                    <span>Menu Subtotal</span>
                    <span className="text-zinc-200">Rs. {calculateCabinetTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Delivery Charges</span>
                    {deliveryArea === "modeltown" ? (
                      <span className="text-[#FFC107] font-bold font-display tracking-widest text-xs">Rs. 70</span>
                    ) : (
                      <span className="text-zinc-400 font-medium text-xs font-display uppercase tracking-widest text-[9px]">Confirmed on Call (per km)</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xl font-display font-black text-white py-2 border-t border-zinc-900 pt-3">
                    <span>TOTAL BILL:</span>
                    {deliveryArea === "modeltown" ? (
                      <span className="text-[#FFC107] font-serif font-black">Rs. {calculateCabinetTotal() + 70}</span>
                    ) : (
                      <div className="text-right">
                        <span className="text-[#FFC107] font-serif font-black text-xl">Rs. {calculateCabinetTotal()}</span>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block font-display mt-0.5">+ Delivery</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Green WhatsApp Dispatch Button */}
                <button
                  id="cart-checkout-whatsapp"
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-emerald-500 text-black hover:bg-emerald-400 py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2.5 shadow-[0_4px_15px_rgba(16,185,129,0.35)] transition-all cursor-pointer pointer-events-auto active:scale-95"
                >
                  <MessageCircle className="w-5.5 h-5.5 stroke-[2.2] fill-black/10" />
                  <span className="tracking-widest">Order on WhatsApp</span>
                </button>

                <p className="text-[10px] text-zinc-500 text-center font-sans tracking-wide leading-relaxed">
                  Clicking the button compiles your order receipt and routes you directly to our cooking line WhatsApp dispatch desk.
                </p>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
