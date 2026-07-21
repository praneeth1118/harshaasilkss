"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/data";
import { PaisleyIcon } from "@/components/icons";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div 
      className="group flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-brand-silk)] mb-6">
        <Link href={`/collections/${product.id}`}>
          <Image 
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-1000 ease-out ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        </Link>

        {/* Top Badges & Actions */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.isNew && (
            <span className="bg-white/90 backdrop-blur-sm text-[var(--color-brand-dark)] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 shadow-sm">
              New
            </span>
          )}
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 ${
            isInWishlist(product.id) ? "text-[var(--color-brand-maroon)]" : "text-[var(--color-brand-charcoal)]"
          }`}
        >
          <PaisleyIcon 
            className={`w-4 h-4 transition-all duration-300 ${isInWishlist(product.id) ? "fill-current scale-110" : ""}`} 
            strokeWidth={isInWishlist(product.id) ? 2 : 1.5} 
          />
        </button>

        {/* Quick Add Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 ease-out ${isHovered ? "translate-y-0" : "translate-y-full"}`}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              setIsAdding(true);
              setTimeout(() => setIsAdding(false), 400);
            }}
            className={`w-full py-3 text-sm tracking-widest uppercase font-semibold transition-colors ${
              isAdding 
                ? "bg-green-700 text-white" 
                : "bg-[var(--color-brand-maroon)] text-white hover:bg-[var(--color-brand-dark)]"
            }`}
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <Link href={`/collections/${product.id}`} className="flex flex-col flex-1">
        <span className="text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)] mb-2">
          {product.category}
        </span>
        <h3 className="font-heading text-base lg:text-xl text-[var(--color-brand-dark)] leading-snug mb-3 group-hover:text-[var(--color-brand-gold)] transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="font-price text-sm lg:text-base text-[var(--color-brand-charcoal)] tracking-wide mt-auto pt-2">
          {formatPrice(product.price)}
        </p>
      </Link>
    </div>
  );
}
