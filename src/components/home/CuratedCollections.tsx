"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const collections = [
  {
    title: "The Bridal Trousseau",
    subtitle: "Handcrafted for your special day",
    image: "/images/collection_bridal.png",
    link: "/collections/bridal",
  },
  {
    title: "Pure Kanchipuram",
    subtitle: "Authentic Zari Weaves",
    image: "/images/collection_kanchi.png",
    link: "/collections/kanchipuram",
  },
  {
    title: "Banarasi Heritage",
    subtitle: "Timeless brocade patterns",
    image: "/images/heritage.png",
    link: "/collections/banarasi",
  },
  {
    title: "Modern Silk",
    subtitle: "Contemporary woven artistry",
    image: "/images/hero.png",
    link: "/collections/modern",
  },
];

export default function CuratedCollections() {
  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-ivory)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)]"
          >
            Curated <br /> <span className="text-[var(--color-brand-maroon)] italic">Collections</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/collections"
              className="text-sm font-semibold tracking-widest uppercase hover:text-[var(--color-brand-gold)] transition-colors inline-flex items-center gap-2"
            >
              View All Collections <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Swipeable Carousel Container */}
      <div className="w-full pl-6 lg:pl-12 max-w-[1920px] mx-auto pb-10">
        <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 lg:gap-8 pb-4 pr-6 lg:pr-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {collections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-[75vw] sm:w-[280px] lg:w-[300px] shrink-0 snap-center group relative cursor-pointer"
            >
              <Link href={item.link} className="block">
                <div className="aspect-[4/5] relative overflow-hidden mb-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-heading mb-1 group-hover:text-[var(--color-brand-maroon)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-brand-charcoal)]">{item.subtitle}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[var(--color-brand-maroon)] group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
          {/* Spacer to push the last card away from the edge */}
          <div className="w-1 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
