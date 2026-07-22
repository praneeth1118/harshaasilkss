"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { PaisleyIcon } from "@/components/icons";
import { useCart } from "@/context/CartContext";

export default function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { cartItems } = useCart();
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={`sticky top-0 z-[100] transition-all duration-500 bg-[var(--color-brand-ivory)] text-[var(--color-brand-dark)] shadow-sm border-b border-[var(--color-brand-gold)]/20 ${isScrolled ? "py-5 lg:py-6 shadow-md" : "py-6 lg:py-8"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Left Links & Mobile Menu Toggle */}
        <button 
          className="lg:hidden hover:text-[var(--color-brand-maroon)] transition-colors" 
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/collections" className="font-heading text-base lg:text-lg tracking-wide hover:text-[var(--color-brand-maroon)] transition-colors">
            Collections
          </Link>
          <Link href="/wedding" className="font-heading text-base lg:text-lg tracking-wide hover:text-[var(--color-brand-maroon)] transition-colors">
            Wedding
          </Link>
          <Link href="/new-arrivals" className="font-heading text-base lg:text-lg tracking-wide hover:text-[var(--color-brand-maroon)] transition-colors">
            New Arrivals
          </Link>
        </nav>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/logo.png" 
            alt="Harshaa Silks Logo" 
            className={`w-auto object-contain transition-all duration-500 rounded-md shadow-sm ${isScrolled ? 'h-10 lg:h-12' : 'h-12 lg:h-16'}`}
          />
        </Link>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Link href="/search" aria-label="Search" className="hover:text-[var(--color-brand-maroon)] transition-colors">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link href="/profile" aria-label="Profile" className="hidden sm:block hover:text-[var(--color-brand-maroon)] transition-colors">
            <User className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="hover:text-[var(--color-brand-maroon)] transition-colors">
            <PaisleyIcon className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <Link href="/cart" aria-label="Cart" className="hover:text-[var(--color-brand-maroon)] transition-colors relative">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--color-brand-maroon)] text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Side Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[110] w-4/5 max-w-sm bg-[var(--color-brand-ivory)] shadow-2xl flex flex-col"
            >
              {/* Top Section */}
              <div className="p-6">
                <div className="flex justify-end mb-8">
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[var(--color-brand-maroon)] transition-colors"
                    aria-label="Close Mobile Menu"
                  >
                    <X className="w-8 h-8 text-[var(--color-brand-dark)]" />
                  </button>
                </div>
                
                <nav className="flex flex-col gap-6">
                  <Link 
                    href="/collections" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-heading text-[var(--color-brand-dark)] border-b border-black/5 pb-4 hover:text-[var(--color-brand-maroon)] transition-colors"
                  >
                    Collections
                  </Link>
                  <Link 
                    href="/wedding" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-heading text-[var(--color-brand-dark)] border-b border-black/5 pb-4 hover:text-[var(--color-brand-maroon)] transition-colors"
                  >
                    Wedding
                  </Link>
                  <Link 
                    href="/new-arrivals" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-heading text-[var(--color-brand-dark)] border-b border-black/5 pb-4 hover:text-[var(--color-brand-maroon)] transition-colors"
                  >
                    New Arrivals
                  </Link>
                </nav>
              </div>

              {/* Bottom Section: Imagery */}
              <div className="mt-auto p-6 pb-16 sm:pb-20">
                <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)} className="block relative h-32 sm:h-40 w-full overflow-hidden rounded-md group shadow-md">
                  <Image 
                    src="/images/collection_kanchi.png"
                    alt="Latest Collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <span className="text-white font-heading text-xl uppercase tracking-widest border-b border-white/40 pb-1">
                      Shop Latest
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
