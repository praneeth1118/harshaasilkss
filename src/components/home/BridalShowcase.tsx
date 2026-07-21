"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function BridalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/images/collection_bridal.png"
          alt="Harshaa Silks Bridal Collection"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="lg:col-start-2 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm tracking-widest uppercase text-[var(--color-brand-gold)] font-semibold mb-4 block">
              The Wedding Edit
            </span>
            <h2 className="text-5xl lg:text-7xl font-heading mb-6 leading-[1.1]">
              A Bride&apos;s <br />
              <span className="italic font-light">Masterpiece</span>
            </h2>
            <p className="font-body text-lg text-white/80 leading-relaxed mb-10 max-w-md">
              Walk down the aisle wrapped in centuries of tradition. Our bridal collection features the heaviest pure gold zari weaves, designed to be passed down as family heirlooms.
            </p>
            <Link 
              href="/collections" 
              className="inline-flex items-center gap-4 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-white transition-colors duration-500"
            >
              Explore Bridal Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
