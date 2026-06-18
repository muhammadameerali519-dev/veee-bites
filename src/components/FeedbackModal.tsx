import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Send, Heart, X, MessageSquare, CheckCircle2, User, Phone } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderedItems?: string[];
}

export default function FeedbackModal({ isOpen, onClose, orderedItems = [] }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [comments, setComments] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedDishes, setSelectedDishes] = useState<string[]>(orderedItems);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick rating response phrases
  const getRatingLabel = (val: number) => {
    switch (val) {
      case 1: return "Disappointed 😕";
      case 2: return "Could be better 😐";
      case 3: return "Good & Tasty! 😊";
      case 4: return "Delicious! 😋";
      case 5: return "Absolutely Vee Bite Perfection! 🌟🔥";
      default: return "Select your rating";
    }
  };

  const handleToggleDish = (dish: string) => {
    setSelectedDishes(prev => 
      prev.includes(dish) ? prev.filter(d => d !== dish) : [...prev, dish]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    
    // Simulate minor network delay for smooth high-fidelity loader transition
    setTimeout(() => {
      // Save locally to simulate durable persistence for owner viewing
      const feedbacks = JSON.parse(localStorage.getItem("veebite_feedbacks") || "[]");
      const newFeedback = {
        id: Date.now().toString(),
        rating,
        comments,
        customerName: customerName.trim() || "Anonymous",
        customerPhone: customerPhone.trim() || "Not provided",
        dishes: selectedDishes,
        timestamp: new Date().toISOString()
      };
      
      feedbacks.push(newFeedback);
      localStorage.setItem("veebite_feedbacks", JSON.stringify(feedbacks));

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Dark fuzzy backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Main Panel context */}
          <motion.div
            className="relative w-full max-w-lg glass-gold border-r-2 border-b-2 border-l border-t border-[#FFC107]/40 p-6 md:p-8 rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-50 overflow-hidden font-sans pointer-events-auto"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            
            {/* Top decorative subtle yellow glow pill */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#FFC107] to-transparent rounded-full opacity-60" />

            {/* Close Button element */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#FFC107]/40 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer pointer-events-auto"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Header Information */}
                <div className="text-center space-y-2">
                  <div className="inline-flex w-12 h-12 bg-[#FFC107]/10 text-[#FFC107] rounded-2xl items-center justify-center border border-[#FFC107]/20 mb-1">
                    <Heart className="w-6 h-6 animate-pulse text-[#FFC107]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-black tracking-tight text-white uppercase">
                    Rate Your <span className="text-[#FFC107]">Meal</span>
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed font-sans">
                    Your remarks are delivered straight to founder <strong className="text-zinc-200">Muhammad Haris</strong> to refine our cooking standards!
                  </p>
                </div>

                {/* Rating Stars row selector */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center space-y-3">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">
                    Overall Satisfaction
                  </span>
                  
                  <div className="flex items-center justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isHighlighted = (hoveredRating || rating) >= starValue;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoveredRating(starValue)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1 focus:outline-none transition-transform duration-200 hover:scale-125 cursor-pointer"
                        >
                          <Star
                            className={`w-9 h-9 stroke-[1.5] transition-all duration-200 ${
                              isHighlighted 
                                ? "fill-[#FFC107] text-[#FFC107] drop-shadow-[0_0_8px_rgba(255,193,7,0.5)]" 
                                : "text-zinc-600 hover:text-zinc-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs font-semibold text-[#FFC107] font-display min-h-[1.5rem] flex items-center justify-center">
                    {getRatingLabel(hoveredRating || rating)}
                  </p>
                </div>

                {/* Optional Ordered items selectors list */}
                {orderedItems.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">
                      Which items did you taste?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {orderedItems.map((dishName) => {
                        const isSelected = selectedDishes.includes(dishName);
                        return (
                          <button
                            key={dishName}
                            type="button"
                            onClick={() => handleToggleDish(dishName)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-sans ${
                              isSelected
                                ? "bg-[#FFC107]/10 text-[#FFC107] border-[#FFC107]/40 font-semibold"
                                : "bg-white/5 text-zinc-400 border-zinc-900 hover:text-zinc-200 hover:border-zinc-800"
                            }`}
                          >
                            {dishName}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Comments text feedback box */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">
                    Comments or secret recipe suggestions
                  </span>
                  <div className="relative">
                    <textarea
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Loved the Pakistani Mighty Zinger? Crispy fries flavor reviews? Tell Haris how we did today..."
                      rows={3}
                      className="w-full bg-zinc-900/90 text-white placeholder-zinc-600 text-xs px-3 py-2.5 rounded-xl border border-zinc-800 focus:border-[#FFC107]/50 select-none outline-none leading-relaxed transition-all"
                    />
                    <div className="absolute bottom-2.5 right-2 text-zinc-700 pointer-events-none">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Additional inputs (Name + phone contacts) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">Your Name (Optional)</span>
                    <div className="relative">
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Haris, Ali"
                        className="w-full bg-zinc-900/90 text-zinc-100 text-xs pl-8 pr-3 py-2.5 rounded-xl border border-zinc-800 focus:border-[#FFC107]/40 outline-none"
                      />
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    </div>
                  </div>

                  {/* Phone contacts field */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block font-display">Phone No. (Optional)</span>
                    <div className="relative">
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 0300 1234567"
                        className="w-full bg-zinc-900/90 text-zinc-100 text-xs pl-8 pr-3 py-2.5 rounded-xl border border-zinc-800 focus:border-[#FFC107]/40 outline-none"
                      />
                      <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                    </div>
                  </div>
                </div>

                {/* Dispatch/Submit Button */}
                <button
                  type="submit"
                  disabled={rating === 0 || isSubmitting}
                  className={`w-full py-3.5 rounded-xl text-black font-display font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer select-none ${
                    rating === 0
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-900"
                      : "bg-[#FFC107] hover:bg-[#FFC107]/90 hover:scale-[1.02] shadow-[0_10px_20px_rgba(255,193,7,0.2)]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>transmitting data...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Order Feedback</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success Stage */
              <motion.div
                className="text-center py-8 space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="inline-flex w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full items-center justify-center border border-emerald-500/20">
                  <motion.div
                    initial={{ scale: 0.5, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-serif font-black tracking-tight text-white uppercase">
                    Feedback Received!
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto font-sans">
                    Sublime! Muhammad Haris and the cooking line have received your star rating and structural comment logs. Your input drives Vee Bite towards supreme Pakistani street cuisine.
                  </p>
                </div>

                {/* Short review summary logs */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-left max-w-sm mx-auto space-y-2.5 font-sans">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Satisfactory Index</span>
                    <span className="text-[#FFC107] font-bold font-display tracking-widest text-[10px] uppercase flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#FFC107]" /> {rating} / 5
                    </span>
                  </div>
                  {selectedDishes.length > 0 && (
                    <div className="text-xs">
                      <span className="text-zinc-500 block mb-1">Reviewed Assets</span>
                      <span className="text-zinc-200 font-semibold text-[11px]">
                        {selectedDishes.join(", ")}
                      </span>
                    </div>
                  )}
                  {comments.trim() && (
                    <div className="text-xs">
                      <span className="text-zinc-500 block mb-1">Comment Log</span>
                      <p className="text-zinc-300 italic text-[11px] bg-black/45 p-2 rounded-lg leading-relaxed">
                        "{comments}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="bg-white/5 border border-white/10 hover:border-[#FFC107]/40 px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
                  >
                    Close Sheet
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
