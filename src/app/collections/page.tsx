"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import ProductCard from "@/components/product-card";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CollectionsPage() {
  const { adminProducts: products } = useAdmin();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFabric, setSelectedFabric] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  
  const categories = ["All", "Kanchipuram", "Banarasi", "Bridal", "Designer"];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const fabricMatch = selectedFabric === "All" || product.fabric.toLowerCase().includes(selectedFabric.toLowerCase());
    return categoryMatch && fabricMatch;
  }).sort((a, b) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Newest Arrivals") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0;
  });

  return (
    <div className="pt-20 lg:pt-24 pb-24 min-h-screen bg-[var(--color-brand-ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-brand-charcoal)] mb-6 font-semibold flex gap-2 items-center justify-center">
            <Link href="/" className="hover:text-[var(--color-brand-maroon)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-[var(--color-brand-maroon)] transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span className="text-[var(--color-brand-maroon)]">All</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)] mb-6">
            Our <span className="text-[var(--color-brand-maroon)] italic">Collections</span>
          </h1>
          <div className="w-16 h-[1px] bg-[var(--color-brand-gold)] mx-auto mt-8"></div>
        </div>

        {/* Filters Layout */}
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sidebar Filters */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-32 space-y-10">
              <div>
                <h3 className="font-heading text-xl mb-4">Categories</h3>
                <ul className="space-y-3">
                  {categories.map((category) => (
                    <li key={category}>
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer text-sm tracking-widest uppercase transition-colors ${selectedCategory === category ? "text-[var(--color-brand-maroon)] font-semibold" : "text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-gold)]"}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-black/10 pt-8">
                <h3 className="font-heading text-xl mb-4">Fabric</h3>
                <ul className="space-y-3">
                  {["All", "Pure Silk", "Tissue Silk", "Organza", "Silk Blend"].map((fabric) => (
                    <li key={fabric}>
                      <label 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setSelectedFabric(fabric)}
                      >
                        <div className={`w-4 h-4 border transition-colors flex items-center justify-center ${selectedFabric === fabric ? "border-[var(--color-brand-maroon)] bg-[var(--color-brand-maroon)]" : "border-black/20 group-hover:border-[var(--color-brand-gold)]"}`} />
                        <span className={`text-sm tracking-widest uppercase transition-colors ${selectedFabric === fabric ? "text-[var(--color-brand-maroon)] font-semibold" : "text-[var(--color-brand-charcoal)] group-hover:text-[var(--color-brand-gold)]"}`}>
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
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm tracking-widest uppercase text-[var(--color-brand-dark)] border-none outline-none focus:ring-0 cursor-pointer ml-auto md:ml-0"
              >
                <option value="Featured">Sort by: Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest Arrivals">Newest Arrivals</option>
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
