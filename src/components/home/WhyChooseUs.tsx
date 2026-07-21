"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const features = [
  {
    title: "Authentic Silk",
    description: "Every saree is woven from pure mulberry silk, tested for authenticity and strength.",
  },
  {
    title: "Trusted Heritage",
    description: "With over three decades of legacy in Hyderabad, we are the trusted choice for thousands of brides.",
  },
  {
    title: "Premium Craftsmanship",
    description: "Our master weavers spend up to 90 days hand-weaving a single Kanchipuram masterpiece.",
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function WhyChooseUs() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 1024 && scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        
        // Check if we've reached the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-warm-white)] relative overflow-hidden">
      
      {/* Mobile Background Image */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image 
          src="/images/hero.png"
          alt="Harshaa Heritage Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-0 lg:px-12 relative z-10">
        <div className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto px-6 lg:px-0">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading text-white lg:text-[var(--color-brand-dark)] mb-6 drop-shadow-md lg:drop-shadow-none"
          >
            Why Trust <span className="text-[var(--color-brand-gold)] lg:text-[var(--color-brand-maroon)] italic">Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-lg text-white/90 lg:text-[var(--color-brand-charcoal)] leading-relaxed drop-shadow-md lg:drop-shadow-none"
          >
            We do not just sell sarees; we preserve a legacy. When you choose Harshaa Silks, you choose uncompromising quality.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: The Image (Desktop Only) */}
          <div className="hidden lg:block w-full aspect-[4/5] rounded-sm overflow-hidden relative shadow-lg bg-[var(--color-brand-silk)]">
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full relative"
            >
              <Image 
                src="/images/hero.png"
                alt="Harshaa Heritage"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right Column: The Promises (Swipe Carousel on Mobile) */}
          <motion.div 
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-6 pb-8 px-6 lg:px-0 lg:flex-col lg:overflow-visible lg:gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="shrink-0 snap-center w-[85vw] lg:w-full bg-white/20 lg:bg-white/70 backdrop-blur-md shadow-xl border border-white/20 p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:bg-white/30 lg:hover:bg-white/80"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[var(--color-brand-gold)]/20 lg:bg-[var(--color-brand-gold)]/10 rounded-full blur-2xl z-0" />
                <div className="flex gap-6 lg:gap-8 items-start relative z-10">
                  <span className="text-4xl lg:text-5xl font-price text-white lg:text-[var(--color-brand-gold)] font-light leading-none pt-1 drop-shadow-sm lg:drop-shadow-none">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-heading text-white lg:text-[var(--color-brand-dark)] mb-3 drop-shadow-md lg:drop-shadow-none">
                      {feature.title}
                    </h3>
                    <p className="font-body text-lg text-white/90 lg:text-[var(--color-brand-charcoal)] leading-relaxed drop-shadow-sm lg:drop-shadow-none">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
