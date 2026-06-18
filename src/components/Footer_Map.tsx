import { motion } from "motion/react";
import { Phone, MapPin, Clock, Star, Share2, MessageCircle } from "lucide-react";

export default function Footer_Map() {
  const mapAddress = "Near Rizwan Book Depot, Main Market, Model Town, Gujranwala";
  const mapUrl = "https://share.google/kbqjRTFpVB3JswDWG";

  return (
    <footer id="location-contact" className="relative bg-[#050505] border-t border-zinc-900 overflow-hidden pt-20">
      
      {/* Decorative Golden Ambient glow */}
      <div className="absolute left-1/4 bottom-0 h-80 w-80 rounded-full bg-[#FFC107] opacity-5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
          
          {/* Contact Details & Info Grid (Col span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[#FFC107] font-display text-xs uppercase tracking-[0.25em] font-semibold block">
                Find Our Kitchen
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                VEE BITE <br />
                <span className="gold-gradient-text font-display font-medium">Headquarters</span>
              </h2>
              <div className="h-[2px] w-16 bg-[#FFC107]" />
            </div>

            {/* Structured Contact Rows */}
            <div className="space-y-6">
              
              {/* Address card */}
              <div className="flex items-start space-x-4 bg-zinc-950/80 p-5 rounded-xl border border-zinc-900 hover:border-[#FFC107]/20 transition-colors duration-300">
                <div className="p-3 bg-[#FFC107]/10 text-[#FFC107] rounded-lg mt-0.5 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-semibold tracking-wider text-xs uppercase">Location Address</h4>
                  <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{mapAddress}</p>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs text-[#FFC107] hover:underline font-semibold mt-2 space-x-1 uppercase tracking-wider"
                  >
                    <span>View on Google Maps</span>
                    <Share2 className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Timing info */}
              <div className="flex items-start space-x-4 bg-zinc-950/80 p-5 rounded-xl border border-zinc-900 hover:border-[#FFC107]/20 transition-colors duration-300">
                <div className="p-3 bg-[#FFC107]/10 text-[#FFC107] rounded-lg mt-0.5 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-semibold tracking-wider text-xs uppercase">Chef Timings</h4>
                  <p className="text-sm text-[#FFC107] mt-1.5 leading-relaxed font-bold font-display">1:00 PM – 2:00 AM daily</p>
                  <p className="text-xs text-zinc-500 mt-1">Fresh fast food and golden cheese pull available late-night!</p>
                </div>
              </div>

              {/* Call support */}
              <div className="flex items-start space-x-4 bg-zinc-950/80 p-5 rounded-xl border border-zinc-900 hover:border-[#FFC107]/20 transition-colors duration-300">
                <div className="p-3 bg-[#FFC107]/10 text-[#FFC107] rounded-lg mt-0.5 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-display font-semibold tracking-wider text-xs uppercase">Hot Delivery Hotline</h4>
                  <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">
                    Call our team directly to book raw catering, delivery, or custom orders.
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <a
                      href="tel:03091830660"
                      className="text-[#FFC107] font-display font-bold text-base hover:underline"
                    >
                      0309 183 0660
                    </a>
                    <span className="text-zinc-700">|</span>
                    <a
                      href="https://wa.me/923091830660"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 hover:underline flex items-center space-x-1 text-xs uppercase tracking-wider font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 fill-emerald-500/20" />
                      <span>WhatsApp Order</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Map Frame Embed Container (Col span 7) */}
          <div className="lg:col-span-7 relative h-[420px] lg:h-auto rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
            {/* Elegant luxury overlay around map frame */}
            <div className="absolute inset-0 border-[8px] border-zinc-950 pointer-events-none z-10 rounded-2xl" />
            
            {/* Map Frame Embed - Centered on Model Town, Gujranwala with high contrast dark look */}
            <iframe
              title="Vee Bite Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1s0x391f298da787adfb!2sRizwan+Book+Depot!5m2!1sen!2spk!2s31.13401!4s74.19567!5m2!1sen!2spk"
              className="w-full h-full border-0 brightness-75 invert animate-fade-in"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* Solid elegant separator */}
        <div className="h-[1px] bg-zinc-900 w-full mb-12" />

        {/* Real Footer Credits area */}
        <div className="flex flex-col md:flex-row items-center justify-between text-zinc-500 text-xs gap-6 font-display uppercase tracking-widest leading-none">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-[#FFC107] animate-pulse" />
            <p className="text-zinc-400 font-semibold tracking-wider">
              Vee Bite &copy; {new Date().getFullYear()} &bull; Eat Good, Feel Good &bull; All Rights Reserved
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-zinc-950/80 px-6 py-4 rounded-xl border border-zinc-900 text-right">
            <span className="text-zinc-400 text-center sm:text-right">
              Website Premium Engineered By:{" "}
              <span className="text-white hover:text-[#FFC107] font-bold tracking-wide transition-colors duration-300">
                Fast Target Co.
              </span>
            </span>
            <span className="hidden sm:inline text-zinc-800">|</span>
            <a
              href="tel:03148418849"
              className="text-[#FFC107] hover:underline font-bold flex items-center space-x-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0314 8418849</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
