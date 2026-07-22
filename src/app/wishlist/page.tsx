"use client";

import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PaisleyIcon } from "@/components/icons";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 bg-[var(--color-brand-ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24 max-w-2xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)] mb-6">
            Your <span className="text-[var(--color-brand-maroon)] italic">Wishlist</span>
          </h1>
          <p className="font-body text-[var(--color-brand-charcoal)] leading-relaxed">
            Curate your personal collection of our finest woven masterpieces.
          </p>
        </div>

        {/* Product Grid or Empty State */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16 max-w-6xl mx-auto px-8 lg:px-24">
            {wishlistItems.map((product, index) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative w-24 h-24 flex items-center justify-center mb-8">
              {/* Subtle Paisley Background Outline */}
              <PaisleyIcon className="absolute inset-0 w-full h-full text-[var(--color-brand-gold)] opacity-20" />
              {/* Central Heart Icon */}
              <div className="relative z-10 w-12 h-12 bg-[var(--color-brand-silk)] rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-[var(--color-brand-maroon)]" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="font-heading text-3xl text-[var(--color-brand-dark)] mb-4">
              Your wishlist is empty
            </h2>
            <p className="font-body text-[var(--color-brand-charcoal)] mb-10 max-w-md">
              Discover pieces that resonate with your soul and save them here for future reflection.
            </p>
            <Link 
              href="/collections"
              className="bg-[var(--color-brand-dark)] text-white px-10 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors inline-block"
            >
              Discover our Collections
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
