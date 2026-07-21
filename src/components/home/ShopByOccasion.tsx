"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const occasions = [
  { title: "Weddings", image: "/images/collection_bridal.png", colSpan: "col-span-2 lg:col-span-8", aspect: "aspect-[21/9] lg:aspect-[21/9]" },
  { title: "Festivals", image: "/images/hero.png", colSpan: "col-span-1 lg:col-span-4", aspect: "aspect-square" },
  { title: "Reception", image: "/images/collection_kanchi.png", colSpan: "col-span-1 lg:col-span-4", aspect: "aspect-square" },
  { title: "Temple", image: "/images/heritage.png", colSpan: "col-span-2 lg:col-span-4", aspect: "aspect-square lg:aspect-[3/4]" },
  { title: "Party Wear", image: "/images/collection_bridal.png", colSpan: "col-span-2 lg:col-span-4", aspect: "aspect-[16/9] lg:aspect-[3/4]" }
];

export default function ShopByOccasion() {
  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-warm-white)] relative">
      <div className="max-w-6xl mx-auto px-8 sm:px-16 lg:px-24">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)]"
          >
            Shop by <span className="text-[var(--color-brand-gold)] italic">Occasion</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`${occasion.colSpan} relative group cursor-pointer overflow-hidden bg-[var(--color-brand-silk)]`}
            >
              <Link href="/collections">
                <div className={`${occasion.aspect} relative w-full`}>
                  <Image 
                    src={occasion.image}
                    alt={occasion.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl lg:text-4xl font-heading text-white tracking-wide group-hover:text-[var(--color-brand-gold)] transition-colors duration-500 relative">
                      {occasion.title}
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--color-brand-gold)] group-hover:w-full transition-all duration-500" />
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
