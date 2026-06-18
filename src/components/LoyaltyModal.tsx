import { motion, AnimatePresence } from "motion/react";
import { X, Award, Gift, Sparkles, Check, Lock, Flame } from "lucide-react";

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedOrders: number;
  onSimulateOrder: () => void;
  onResetPoints: () => void;
}

export default function LoyaltyModal({
  isOpen,
  onClose,
  completedOrders,
  onSimulateOrder,
  onResetPoints,
}: LoyaltyModalProps) {
  const points = completedOrders * 50;
  const currentTier =
    points >= 200
      ? "Platinum Elite"
      : points >= 100
      ? "Gold VIP"
      : "Silver Club";

  const tierColor =
    points >= 200
      ? "text-purple-400 border-purple-500/30 bg-purple-500/10"
      : points >= 100
      ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
      : "text-zinc-400 border-zinc-800 bg-zinc-900/40";

  // Milestones
  const milestones = [
    { pts: 50, reward: "Free Soft Drink / Garlic Dip", desc: "Unlock with 1 completed order" },
    { pts: 100, reward: "Free Crinkle Masala Fries", desc: "Unlock with 2 completed orders" },
    { pts: 150, reward: "Free Paratha Roll", desc: "Unlock with 3 completed orders" },
    { pts: 250, reward: "Free Mighty Zinger Burger", desc: "Unlock with 5 completed orders" },
  ];

  const maxPointsGoal = 250;
  const progressRatio = Math.min((points / maxPointsGoal) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="loyalty-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            id="loyalty-modal-container"
            className="relative w-full max-w-md bg-zinc-950 border border-[#FFC107]/30 rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(255,193,7,0.15)] z-10 flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
          >
            {/* Header / Brand visual block */}
            <div className="relative gradient-gold-banner p-6 pb-4 border-b border-zinc-900 bg-gradient-to-b from-amber-950/20 to-transparent flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/30 flex items-center justify-center">
                  <Award className="w-5.5 h-5.5 text-[#FFC107]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-white text-base sm:text-lg uppercase tracking-wider">
                    VEE BITE <span className="text-[#FFC107]">LOYALTY</span>
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                    Premium Member Program
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-zinc-850 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Loyalty Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
              
              {/* Member Tier Card */}
              <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-900 flex justify-between items-center relative overflow-hidden">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFC107]">Current Tier</span>
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-[#FFC107]" />
                    <span className="font-display font-black text-white text-lg tracking-wide uppercase">
                      {currentTier}
                    </span>
                  </div>
                </div>
                <div className={`text-xs font-mono font-black uppercase px-3 py-1.5 rounded-lg border ${tierColor}`}>
                  {completedOrders} {completedOrders === 1 ? "Order" : "Orders"}
                </div>
                {/* Decorative golden blur behind */}
                <div className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-[#FFC107] opacity-5 blur-2xl pointer-events-none" />
              </div>

              {/* Progress Tracker Slider Gauge */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-zinc-400 font-semibold tracking-wide">Points Earned:</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-[#FFC107] font-mono leading-none">
                      {points}
                    </span>
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                      / {maxPointsGoal} PTS
                    </span>
                  </div>
                </div>

                {/* Real progress bar */}
                <div className="w-full h-3 bg-zinc-900/80 border border-zinc-850 rounded-full overflow-hidden p-[2px]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-[#FFC107] shadow-[0_0_10px_rgba(255,193,7,0.2)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressRatio}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-zinc-500 font-mono tracking-wider uppercase">
                  <span>0 PTS</span>
                  <span>100 PTS</span>
                  <span>250 PTS MAX LEVEL</span>
                </div>
              </div>

              {/* Rewards checklist progress milestones */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center space-x-1.5">
                  <Gift className="w-4 h-4 text-[#FFC107]" />
                  <span>Rewards Status Menu</span>
                </h4>

                <div className="space-y-2.5">
                  {milestones.map((ms) => {
                    const isUnlocked = points >= ms.pts;
                    return (
                      <div
                        key={ms.pts}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                          isUnlocked
                            ? "bg-[#FFC107]/5 border-[#FFC107]/25 text-white shadow-[inset_0_1px_15px_rgba(255,193,7,0.02)]"
                            : "bg-zinc-950 border-zinc-900/60 text-zinc-500"
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                              isUnlocked
                                ? "bg-[#FFC107] border-[#FFC107] text-black"
                                : "bg-zinc-900 border-zinc-850 text-zinc-500"
                            }`}
                          >
                            {isUnlocked ? (
                              <Check className="w-4.5 h-4.5 stroke-[3]" />
                            ) : (
                              <Lock className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className={`text-xs font-extrabold uppercase truncate leading-snug ${isUnlocked ? "text-white" : "text-zinc-400"}`}>
                              {ms.reward}
                            </p>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase leading-none mt-0.5">
                              {ms.desc}
                            </p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right ml-3">
                          <span className={`text-xs font-mono font-bold ${isUnlocked ? "text-[#FFC107]" : "text-zinc-600"}`}>
                            {ms.pts} pts
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Informational Guidance Text Footer note */}
              <div className="bg-[#FFC107]/5 border border-[#FFC107]/10 p-3.5 rounded-xl flex items-start space-x-2.5">
                <Sparkles className="w-4.5 h-4.5 text-[#FFC107] shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  Earn **50 loyalty points** naturally on every successful checkout. Points unlock authentic freebies that we will include in your food bags automatically inside Model Town, Gujranwala! Use the simulator below to test rewards.
                </p>
              </div>

              {/* Simulator Action Controls (Engaging Customer Testing) */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={onSimulateOrder}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-[#FFC107]/20 hover:border-[#FFC107]/50 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Simulate Order (+50p)</span>
                </button>
                
                {completedOrders > 0 && (
                  <button
                    onClick={onResetPoints}
                    className="px-3.5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-500/20 text-xs font-semibold cursor-pointer transition-colors"
                    title="Reset History"
                  >
                    Reset
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
