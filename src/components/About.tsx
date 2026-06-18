import { motion } from "motion/react";
import { Award, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="our-story" className="relative py-24 bg-gradient-to-b from-[#0A0A0A] to-zinc-950 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-500 opacity-5 blur-[120px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 h-[300px] w-[300px] rounded-full bg-[#FFC107] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Visual Presentation side */}
          <div className="lg:col-span-5 relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-800/80 group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Dark overlay with soft gold glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Chef preparing delicious Pakistani kebab specialty"
                className="w-full h-[480px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#FFC107]/30 w-fit">
                  <Sparkles className="w-4 h-4 text-[#FFC107]" />
                  <span className="font-display text-xs text-white uppercase tracking-widest font-semibold">Since 2023 • Premium Quality</span>
                </div>
                <h3 className="text-2xl font-serif text-white font-bold mt-3">Authentic Hot Grills & Pizzas</h3>
              </div>
            </motion.div>

            {/* Overlapping badge box */}
            <motion.div
              className="absolute -bottom-[20px] -right-4 md:-right-6 glass-gold border-r-4 border-b-4 border-l border-t border-[#FFC107] p-6 rounded-[24px] z-20 max-w-[240px]"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#FFC107]/10 text-[#FFC107] rounded-lg mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-white tracking-wide text-sm">100% Halal</h4>
                  <p className="text-xs text-gray-400 mt-1 font-sans">Finest spices, pristine ingredients, and premium milk mozzarella.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Story telling text side */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[#FFC107] font-display text-xs uppercase tracking-[0.25em] font-semibold block">
                The Heritage & Heart
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-none">
                Our Narrative & <br />
                <span className="gold-gradient-text">Emotional Commitment</span>
              </h2>
              <div className="h-[2px] w-20 bg-[#FFC107] mt-4" />
            </div>

            {/* Emotional Story blockquote with glassmorphism */}
            <motion.div
              className="glass-gold rounded-2xl p-8 md:p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Golden quote decor */}
              <div className="absolute -top-6 -right-6 text-zinc-800/10 text-9xl font-serif select-none pointer-events-none">
                “
              </div>

              <p className="text-gray-300 font-sans text-lg md:text-xl leading-relaxed italic relative z-10">
                &ldquo;Vee Bite was founded in 2023 by Muhammad Haris. Built through dedication, hard work, and struggle, the dream was to serve premium-quality fast food with authentic Pakistani taste. Every meal is prepared with passion to give customers a memorable dining experience.&rdquo;
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-zinc-800/60 pt-6">
                <div>
                  <h4 className="text-[#FFC107] font-display font-bold text-base tracking-wider">Muhammad Haris</h4>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-sans mt-0.5">Founder &amp; Master Chef</p>
                </div>
                
                <div className="hidden sm:flex items-center space-x-3 text-zinc-500 text-xs">
                  <span className="font-semibold text-zinc-400">Gujranwala, PK</span>
                  <span className="h-4 w-[1px] bg-zinc-800" />
                  <span>Est. 2023</span>
                </div>
              </div>
            </motion.div>

            {/* Core Values grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-zinc-900 rounded-lg text-[#FFC107] shrink-0 border border-zinc-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold font-display text-sm uppercase tracking-wider">Uncompromising Hygiene</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Every station is deep-cleaned daily. We source prime cuts of chicken and high quality greens for our buns or pizzas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 bg-zinc-900 rounded-lg text-[#FFC107] shrink-0 border border-zinc-800">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold font-display text-sm uppercase tracking-wider">With Love & Spices</h4>
                  <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                    Custom blend of local Tikka spices and secret white sauce crafted in-house to unlock that rich Pakistani fast food memory.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
