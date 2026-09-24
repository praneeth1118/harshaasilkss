"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Share2, Truck, ShieldCheck, Clock, Check } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { useAdmin } from "@/context/AdminContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { PaisleyIcon } from "@/components/icons";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { adminProducts } = useAdmin();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [addedToCart, setAddedToCart] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const product = adminProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 bg-[var(--color-brand-ivory)]">
        <h1 className="font-heading text-4xl lg:text-5xl text-[var(--color-brand-dark)] mb-4">
          Product Not Found
        </h1>
        <p className="text-sm text-[var(--color-brand-charcoal)] max-w-md mb-8">
          The luxury saree you are searching for might have been retired from our catalog or is currently unavailable.
        </p>
        <Link
          href="/collections"
          className="bg-[var(--color-brand-dark)] text-white px-8 py-3.5 uppercase tracking-widest text-xs font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors shadow-sm"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="pt-20 lg:pt-24 pb-24 min-h-screen bg-[var(--color-brand-ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb / Back Navigation */}
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Large Image Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[3/4] relative w-full bg-[var(--color-brand-silk)] overflow-hidden rounded-xs">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>
            {/* Additional gallery images */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-2 gap-6 mt-6">
                {product.images.map((imgUrl, index) => (
                  <div key={index} className="aspect-[3/4] relative w-full bg-[var(--color-brand-silk)] overflow-hidden">
                    <Image src={imgUrl} alt={`${product.name} detail ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Sticky Purchase Panel */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="mb-8 border-b border-black/10 pb-8">
                <span className="text-xs uppercase tracking-widest text-[var(--color-brand-maroon)] font-semibold mb-3 block">
                  {product.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-heading text-[var(--color-brand-dark)] leading-tight mb-4">
                  {product.name}
                </h1>
                <p className="font-price text-3xl text-[var(--color-brand-charcoal)]">
                  {formatPrice(product.price)}
                </p>
                <p className="text-sm text-black/50 mt-2 tracking-wide">
                  Inclusive of all luxury taxes & complimentary insured shipping
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 text-sm tracking-widest uppercase font-semibold transition-colors duration-300 flex items-center justify-center gap-2 ${
                      addedToCart
                        ? "bg-emerald-800 text-white"
                        : "bg-[var(--color-brand-dark)] text-white hover:bg-[var(--color-brand-maroon)]"
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Cart
                      </>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Toggle Wishlist"
                    className={`w-14 shrink-0 border border-black/20 flex items-center justify-center transition-colors ${
                      isInWishlist(product.id)
                        ? "text-[var(--color-brand-maroon)] border-[var(--color-brand-maroon)] bg-[var(--color-brand-maroon)]/5"
                        : "text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] hover:border-[var(--color-brand-maroon)]"
                    }`}
                  >
                    <PaisleyIcon
                      className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`}
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full border border-black/20 py-3.5 text-xs tracking-widest uppercase font-semibold text-[var(--color-brand-charcoal)] hover:border-black transition-colors flex justify-center items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedShare ? "Link Copied to Clipboard!" : "Share This Piece"}
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-1 gap-4 mb-10 text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)] border-b border-black/10 pb-8">
                <div className="flex items-center gap-4">
                  <Truck className="w-5 h-5 text-[var(--color-brand-gold)]" strokeWidth={1.5} />
                  Free Express Delivery
                </div>
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-brand-gold)]" strokeWidth={1.5} />
                  Authentic Silk Mark Certified Handloom
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[var(--color-brand-gold)]" strokeWidth={1.5} />
                  7-Day Return Guarantee
                </div>
              </div>

              {/* Accordions for Fabric, Care, etc. */}
              <div className="space-y-6 font-body">
                <div>
                  <h3 className="font-heading text-xl border-b border-black/10 pb-2 mb-4">
                    Fabric Details
                  </h3>
                  <p className="text-sm text-[var(--color-brand-charcoal)] leading-relaxed">
                    Crafted from {product.fabric ? product.fabric.toLowerCase() : "pure handloom silk"}, this piece features intricate zari work that takes master weavers weeks to perfect. The {product.color ? product.color.toLowerCase() : "classic"} hue makes it a timeless addition to your luxury wardrobe.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl border-b border-black/10 pb-2 mb-4">
                    Care Instructions
                  </h3>
                  <p className="text-sm text-[var(--color-brand-charcoal)] leading-relaxed">
                    Dry clean only. Store in a breathable muslin or cotton saree bag. Do not spray perfumes directly on the silk fabric or zari borders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
