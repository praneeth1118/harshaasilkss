"use client";

import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BestSellers() {
  // Take first 4 products for Best Sellers
  const bestSellers = products.slice(0, 4);

  return (
    <section className="pt-16 pb-10 lg:pt-24 lg:pb-16 bg-[var(--color-brand-warm-white)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)]">
              Best <span className="text-[var(--color-brand-maroon)] italic">Sellers</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              href="/collections"
              className="group text-sm font-semibold tracking-widest uppercase text-[var(--color-brand-dark)] hover:text-[var(--color-brand-gold)] transition-colors inline-flex items-center gap-2"
            >
              Shop All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
