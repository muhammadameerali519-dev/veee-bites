import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Sparkles, AlertCircle, ShoppingCart } from "lucide-react";
import { ChatMessage, MenuItem } from "../types";
import { MENU_ITEMS } from "../data";

interface AIChatbotProps {
  onAddToCart: (item: MenuItem, size?: "S" | "M" | "L") => void;
}

const CHIPS = [
  "Recommend a deal for 2 people",
  "What is in the Mighty Zinger Burger?",
  "Recommend spicy large pizza choices",
  "What are the delivery charges?",
  "Suggest a student special deal"
];

export default function AIChatbot({ onAddToCart }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "assistant",
      text: "Assalam-o-Alaikum! 🌟 Welcome to VEE BITE! I am your personal **Vee Bite Assistant**. \n\nI can recommend our delicious pizzas, explain traditional bun kebabs, or compile custom WhatsApp deals! Ask me anything in English or Urdu.",
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    setErrorStatus(null);

    const userMsg: ChatMessage = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      // Gather raw current history for context
      const payloadMessages = [...messages, userMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) {
        throw new Error("Local server reported an error on chat API");
      }

      const data = await res.json();
      setIsTyping(false);

      if (data && data.text) {
        setMessages(prev => [...prev, {
          sender: "assistant",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        }]);
      } else {
        throw new Error("No answer text provided");
      }
    } catch (err: any) {
      console.warn("Express endpoint /api/chat not found or offline. Triggering smart client-side fallback...");
      setIsTyping(false);
      
      // Highly-detailed local knowledge fallback engine tailored specifically for Vee Bite / Italy Pizza Gujranwala
      const query = textToSend.toLowerCase();
      let responseText = "";

      if (query.includes("deal") || query.includes("offer") || query.includes("combo") || query.includes("discount")) {
        responseText = `Vee Bite has some of the absolute best deals in Gujranwala! 🌟 Here are our most-ordered choices:\n\n🔥 **Zinger Couple Feast (Rs. 890/-)**\n• Includes 2 Crispy Zinger Burgers, 1 Masala Fries, and 2 Soft Drinks.\n\n⚡ **Vee Bite Grand Family Combo (Rs. 1,450/-)**\n• Includes 1 Medium Pizza + 2 Zinger Burgers + 1 Paratha Roll.\n\n🎓 **Mighty Student Deal (Rs. 750/-)**\n• Includes 1 Mighty Zinger Burger + 1 Masala Fries + 1 Regular Drink.\n\nFeel free to select items from the menu, add them to your cart, and place an order direct onto WhatsApp!`;
      } else if (query.includes("burger") || query.includes("mighty") || query.includes("zinger") || query.includes("shami") || query.includes("egg") || query.includes("chapli")) {
        responseText = `Our burgers are marinated for 24 hours in special street-spices! 🍔 Try these signature items:\n\n• **Mighty Zinger Burger (Rs. 600/-)**: Fully loaded with double stacked oversized crispy Zinger fillets and double cheese.\n• **Chicken Shami Burger (Rs. 280/-)**: Soft sesame sesame bun, chicken shami patty wrapped in egg, cabbage & chutney.\n• **Chicken Cheese Shami Burger (Rs. 350/-)**: Spiced chicken shami paired with a thick premium cheddar cheese slice.\n• **Double Anda Burger (Rs. 220/-)**: Two juicy fried eggs layered around our slow-grilled shami patty.\n• **Zinger Burger (Rs. 350/-)**: Crispy hand-shredded breast, iceberg lettuce, and zesty mayo.`;
      } else if (query.includes("pizza") || query.includes("tikka") || query.includes("fajita") || query.includes("malai") || query.includes("kababish")) {
        responseText = `Vee Bite's pizzas are known for their fresh homemade dough & massive golden cheese-pull! 🍕 We offer:\n\n• **Chicken Tikka Pizza**: Spicy tikka chunks, sweet onion circles, bell pepper, and premium mozzarella.\n• **Chicken Fajita Pizza**: Rich smoked fajita breast, green peppers, black olives.\n• **Chicken Malai Boti Pizza**: Incredibly creamy base with melt-in-mouth BBQ Malai boti cubes.\n• **Kababish Pizza**: Traditional spiced beef Seekh Kabab slices drizzled with mint chutney.\n\nAll flavors are available in Small, Medium, or Large sizes inside the menu! Select your size to see pricing.`;
      } else if (query.includes("timing") || query.includes("time") || query.includes("hour") || query.includes("when") || query.includes("open") || query.includes("close")) {
        responseText = `We are open daily from **1:00 PM to 2:00 AM**! 🕒\nYou can drop by our outlet for fresh premium dining or place order for delivery straight to your doorstep late night.`;
      } else if (query.includes("delivery") || query.includes("charge") || query.includes("fee") || query.includes("rate") || query.includes("model town")) {
        responseText = `🛵 **Delivery Policy:**\n• Flat **Rs. 70/- delivery fee** specifically inside Model Town, Gujranwala.\n• For other surrounding areas, delivery fees are dynamically calculated and charged on-call based on distance.\n\nYou can specify your exact block/address in the cart during checkout!`;
      } else if (query.includes("contact") || query.includes("phone") || query.includes("number") || query.includes("number") || query.includes("call") || query.includes("whatsapp") || query.includes("location") || query.includes("where") || query.includes("address") || query.includes("rizwan")) {
        responseText = `You can easily reach us or find our store: \n\n📍 **Store Location:** Near Rizwan Book Depot, Main Market, Model Town, Gujranwala.\n📞 **Click-to-Call Delivery:** +92 309 183 0660\n💬 **WhatsApp Orders:** +92 309 183 0660\n\nDrop by or place your order online anytime from 1:00 PM - 2:00 AM!`;
      } else {
        responseText = `Hello! 🌟 I am your friendly **Vee Bite Assistant**. \n\nI can assist you with our mouth-watering menu options, provide prices, explain student bundle deals, or give our exact Gujranwala timings (1:00 PM - 2:00 AM) and address!\n\nWhat are you craving today? You can ask about our legendary **Mighty Zinger Burger**, **Chicken Tikka Pizza**, **Masala Fries**, or any **Specials/Deals**!`;
      }

      setMessages(prev => [...prev, {
        sender: "assistant",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      }]);
    }
  };

  const handleChipClick = (chip: string) => {
    handleSendMessage(chip);
  };

  // Helper to match text inside responses to menu items and render a dynamic "Add to Cart" helper button
  const renderAddToCartHelpers = (text: string) => {
    const textLower = text.toLowerCase();
    const matchedItems: MenuItem[] = [];

    MENU_ITEMS.forEach(item => {
      const nameLower = item.name.toLowerCase();
      if (textLower.includes(nameLower) && matchedItems.length < 2) {
        if (!matchedItems.some(existing => existing.id === item.id)) {
          matchedItems.push(item);
        }
      }
    });

    if (matchedItems.length === 0) return null;

    return (
      <div className="mt-3.5 pt-3.5 border-t border-yellow-500/10 flex flex-wrap gap-2">
        <span className="text-[10px] text-zinc-500 block w-full uppercase tracking-widest font-semibold">Suggested items from chat:</span>
        {matchedItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              // Add simple item or first price if it is size based
              onAddToCart(item, typeof item.price === 'object' ? 'S' : undefined);
            }}
            className="flex items-center space-x-1.5 text-xs bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500 hover:text-black hover:border-transparent text-[#FFC107] px-2.5 py-1.5 rounded-lg font-bold font-display transition-all duration-200 cursor-pointer pointer-events-auto"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add {item.name}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Red/Gold Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          id="chatbot-trigger"
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-[#FFC107] text-black font-semibold shadow-[0_4px_30px_rgba(255,193,7,0.45)] hover:shadow-[0_4px_45px_rgba(255,193,7,0.6)] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all pointer-events-auto z-40 border border-yellow-400 group"
          animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        >
          <MessageSquare className="w-6 h-6 stroke-[2]" />
          
          {/* Notification bubble shine */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow-600"></span>
          </span>
        </motion.button>
      </div>

      {/* Floating Chat dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-panel"
            className="fixed bottom-6 right-6 w-[92vw] sm:w-[420px] h-[600px] z-50 glass-gold rounded-[24px] overflow-hidden max-h-[85vh] shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-r-2 border-b-2 border-l border-t border-[#FFC107]/40 flex flex-col font-sans pointer-events-auto"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Elegant Header with Glowing gold accent */}
            <div className="px-5 py-4 bg-gradient-to-r from-zinc-950 to-neutral-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFC107] to-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(255,193,7,0.3)]">
                  <Bot className="w-5.5 h-5.5 text-black" />
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <h3 className="font-display font-black text-sm text-white tracking-wide uppercase">Vee Bite Assistant</h3>
                    <Sparkles className="w-3.5 h-3.5 text-[#FFC107] animate-pulse" />
                  </div>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase font-semibold">Gemini Powered</span>
                  </div>
                </div>
              </div>

              {/* Close Button Trigger */}
              <button
                id="chatbot-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors pointer-events-auto cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body Container */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-neutral-950/90 to-zinc-950/95 scrollbar-thin"
            >
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="max-w-[85%] flex flex-col">
                    {/* Message Bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed font-normal whitespace-pre-line ${
                        message.sender === "user"
                          ? "bg-[#FFC107] text-black font-medium rounded-tr-none shadow-md"
                          : "bg-zinc-900 border border-zinc-800/80 text-zinc-100 rounded-tl-none shadow-sm shadow-black"
                      }`}
                    >
                      {message.text}

                      {/* Display Add to Cart button helpers if applicable */}
                      {message.sender === "assistant" && renderAddToCartHelpers(message.text)}
                    </div>
                    {/* Timestamp */}
                    <span
                      className={`text-[9px] text-zinc-500 font-mono tracking-wider mt-1 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing State block */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 px-4 py-3.5 rounded-2xl rounded-tl-none flex items-center space-x-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Chip list box */}
            <div className="px-3.5 py-3.5 bg-neutral-950 border-t border-zinc-900 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
              {CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip)}
                  disabled={isTyping}
                  className="text-2xs bg-zinc-900 hover:bg-yellow-500/10 hover:border-[#FFC107]/40 text-zinc-300 font-semibold px-3 py-2 rounded-lg border border-zinc-800 transition-all duration-200 cursor-pointer pointer-events-auto"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input typing panel */}
            <div className="p-3.5 bg-[#0A0A0A] border-t border-zinc-900 flex items-center space-x-2">
              <input
                id="chatbot-input"
                type="text"
                placeholder="Ask me about pizzas, deals, timings..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                disabled={isTyping}
                className="flex-1 bg-zinc-950 focus:bg-black text-white placeholder-zinc-500 text-sm px-4 py-3 rounded-xl border border-zinc-800 focus:border-[#FFC107] focus:ring-0 outline-none transition-all"
              />
              <button
                id="chatbot-send-btn"
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-[#FFC107] hover:bg-amber-400 text-black rounded-xl font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed pointer-events-auto cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
