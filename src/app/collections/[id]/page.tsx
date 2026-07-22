import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Truck, ShieldCheck, Clock } from "lucide-react";
import { products, formatPrice } from "@/lib/data";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);
  
  if (!product) {
    notFound();
  }

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
            <div className="aspect-[3/4] relative w-full bg-[var(--color-brand-silk)] overflow-hidden">
              <Image 
                src={product.image}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
            </div>
            {/* Additional gallery placeholders */}
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-[3/4] relative w-full bg-[var(--color-brand-silk)] overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="aspect-[3/4] relative w-full bg-[var(--color-brand-silk)] overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            </div>
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
                <p className="text-sm text-black/50 mt-2 tracking-wide">Inclusive of all taxes</p>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <button className="flex-1 bg-[var(--color-brand-dark)] text-white py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors">
                    Add to Cart
                  </button>
                  <button className="w-14 shrink-0 border border-black/20 flex items-center justify-center text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] hover:border-[var(--color-brand-maroon)] transition-colors">
                    <Heart className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
                <button className="w-full border border-black/20 py-4 text-sm tracking-widest uppercase font-semibold text-[var(--color-brand-charcoal)] hover:border-black transition-colors flex justify-center items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share This Piece
                </button>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-1 gap-4 mb-10 text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)] border-b border-black/10 pb-8">
                <div className="flex items-center gap-4">
                  <Truck className="w-5 h-5 text-[var(--color-brand-gold)]" strokeWidth={1.5} /> Free Express Delivery
                </div>
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-brand-gold)]" strokeWidth={1.5} /> Authentic Handloom
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[var(--color-brand-gold)]" strokeWidth={1.5} /> 7-Day Returns
                </div>
              </div>

              {/* Accordions Placeholder for Fabric, Care, etc. */}
              <div className="space-y-6 font-body">
                <div>
                  <h3 className="font-heading text-xl border-b border-black/10 pb-2 mb-4">Fabric Details</h3>
                  <p className="text-sm text-[var(--color-brand-charcoal)] leading-relaxed">
                    Crafted from {product.fabric.toLowerCase()}, this piece features intricate zari work that takes master weavers weeks to perfect. The {product.color.toLowerCase()} hue makes it a timeless addition to your luxury wardrobe.
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl border-b border-black/10 pb-2 mb-4">Care Instructions</h3>
                  <p className="text-sm text-[var(--color-brand-charcoal)] leading-relaxed">
                    Dry clean only. Store in a breathable cotton bag. Do not use perfumes directly on the fabric.
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
