"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Reddy",
    location: "Hyderabad",
    collection: "Kanchipuram Bridal",
    quote: "Finding my wedding saree at Harshaa Silks was a dream. The weight, the intricate zari, and the way it draped was pure perfection. It felt like wearing a piece of history.",
    image: "/images/hero.png"
  },
  {
    id: 2,
    name: "Ananya Sharma",
    location: "Mumbai",
    collection: "Banarasi Tissue",
    quote: "I traveled from Mumbai specifically to visit their boutique. The authenticity of the weave and the depth of the colors in their Banarasi collection is unmatched anywhere else.",
    image: "/images/collection_kanchi.png"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-maroon)] text-[var(--color-brand-ivory)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        <div className="lg:col-span-5 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading mb-0 lg:mb-12 text-center lg:text-left"
          >
            Words of <br/><span className="text-[var(--color-brand-gold)] italic">Love</span>
          </motion.h2>
          
          <div className="hidden lg:flex gap-4">
            <button 
              onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-12 h-12 rounded-full border border-[var(--color-brand-gold)] flex items-center justify-center text-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold)] hover:text-[var(--color-brand-maroon)] transition-colors"
            >
              &larr;
            </button>
            <button 
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full border border-[var(--color-brand-gold)] flex items-center justify-center text-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold)] hover:text-[var(--color-brand-maroon)] transition-colors"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 lg:p-12 relative"
            >
              {/* Quote Icon watermark */}
              <div className="absolute top-8 left-8 text-6xl font-heading text-[var(--color-brand-gold)] opacity-20 leading-none">
                &quot;
              </div>
              
              <div className="flex gap-1 mb-8 text-[var(--color-brand-gold)] relative z-10">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              
              <p className="font-heading text-xl sm:text-2xl lg:text-3xl text-center lg:text-left leading-relaxed mb-10 relative z-10">
                {testimonials[current].quote}
              </p>
              
              <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-4 lg:gap-6 border-t border-white/10 pt-8 relative z-10">
                <div className="w-16 h-16 relative rounded-full overflow-hidden bg-[var(--color-brand-silk)] hidden lg:block">
                  <Image src={testimonials[current].image} alt={testimonials[current].name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-heading text-xl">{testimonials[current].name}</h4>
                  <p className="text-sm tracking-widest uppercase text-[var(--color-brand-gold)] mt-1">
                    {testimonials[current].location} • {testimonials[current].collection}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex lg:hidden justify-center mt-8 gap-6">
            <button 
              onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-12 h-12 rounded-full border border-[var(--color-brand-gold)] flex items-center justify-center text-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold)] hover:text-[var(--color-brand-maroon)] transition-colors"
            >
              &larr;
            </button>
            <button 
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full border border-[var(--color-brand-gold)] flex items-center justify-center text-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold)] hover:text-[var(--color-brand-maroon)] transition-colors"
            >
              &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
