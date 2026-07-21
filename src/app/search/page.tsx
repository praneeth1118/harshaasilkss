"use client";

import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";
import { motion } from "framer-motion";

export default function SearchPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--color-brand-warm-white)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Search Bar */}
        <div className="mb-16">
          <input 
            type="text" 
            placeholder="Search for Kanchipuram, Bridal..." 
            className="w-full bg-transparent border-b-2 border-black/20 focus:border-[var(--color-brand-maroon)] text-3xl lg:text-5xl font-heading py-4 outline-none transition-colors placeholder:text-black/20"
            autoFocus
          />
        </div>

        {/* Results / Trending */}
        <div>
          <h2 className="font-heading text-2xl text-[var(--color-brand-dark)] mb-8">
            Trending Searches
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 mt-8 sm:gap-x-6 sm:gap-y-16">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
