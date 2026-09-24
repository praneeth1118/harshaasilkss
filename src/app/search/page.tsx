"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import ProductCard from "@/components/product-card";
import { Filter, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage() {
  const { adminProducts: products } = useAdmin();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Kanchipuram", "Banarasi", "Bridal", "Designer"];

  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 lg:pt-24 pb-24 min-h-screen bg-[var(--color-brand-ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-heading text-[var(--color-brand-dark)] mb-8">
            What are you <span className="text-[var(--color-brand-maroon)] italic">looking for?</span>
          </h1>
          
          {/* The Kalanjali-style Search Input */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Kanchipuram, Bridal, Banarasi..." 
              className="w-full bg-white border border-black/20 rounded-full py-4 pl-6 pr-14 text-lg font-body focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors shadow-sm"
              autoFocus
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--color-brand-maroon)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-brand-dark)] transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap justify-center gap-3 text-sm font-body">
            <span className="text-[var(--color-brand-charcoal)] mt-1">Popular:</span>
            {["Pure Kanchipuram", "Bridal Lehengas", "Tissue Silk", "Banarasi"].map(term => (
              <button 
                key={term} 
                onClick={() => setSearchQuery(term)}
                className="px-4 py-1 rounded-full border border-black/10 hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-maroon)] transition-colors bg-white"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Layout */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-32 space-y-10">
              <div>
                <h3 className="font-heading text-xl mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category, idx) => (
                    <li key={category}>
                      <button className={`text-sm tracking-widest uppercase transition-colors ${idx === 0 ? "text-[var(--color-brand-maroon)] font-semibold" : "text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-gold)]"}`}>
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-black/10 pt-8">
                <h3 className="font-heading text-xl mb-4">Fabric</h3>
                <ul className="space-y-3">
                  {["Pure Silk", "Tissue Silk", "Organza", "Silk Blend"].map((fabric) => (
                    <li key={fabric}>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-black/20 group-hover:border-[var(--color-brand-gold)] transition-colors flex items-center justify-center" />
                        <span className="text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-gold)] transition-colors">
                          {fabric}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 border-b border-black/10 pb-4">
              <button onClick={() => setIsFilterOpen(true)} className="md:hidden flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--color-brand-dark)]">
                <Filter className="w-4 h-4"/> Filters
              </button>
              <span className="hidden md:block text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)]">
                {filteredProducts.length} Products
              </span>
              <select className="bg-transparent text-sm tracking-widest uppercase text-[var(--color-brand-dark)] border-none outline-none focus:ring-0 cursor-pointer ml-auto md:ml-0">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
              {filteredProducts.map((product, index) => (
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

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-[var(--color-brand-ivory)] rounded-t-3xl p-6 z-[110]"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-heading text-2xl text-[var(--color-brand-dark)]">Filters</span>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="hover:text-[var(--color-brand-maroon)] transition-colors"
                  aria-label="Close Filters"
                >
                  <X className="w-6 h-6 text-[var(--color-brand-dark)]" />
                </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="font-heading text-xl mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((category, idx) => (
                      <li key={category}>
                        <button className={`text-sm tracking-widest uppercase transition-colors ${idx === 0 ? "text-[var(--color-brand-maroon)] font-semibold" : "text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-gold)]"}`}>
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t border-black/10 pt-8">
                  <h3 className="font-heading text-xl mb-4">Fabric</h3>
                  <ul className="space-y-3">
                    {["Pure Silk", "Tissue Silk", "Organza", "Silk Blend"].map((fabric) => (
                      <li key={fabric}>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-4 h-4 border border-black/20 group-hover:border-[var(--color-brand-gold)] transition-colors flex items-center justify-center" />
                          <span className="text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-gold)] transition-colors">
                            {fabric}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
