"use client";

import Image from "next/image";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const newArrivals = [
  {
    id: 1,
    title: "The Ruby Edit",
    subtitle: "A contemporary take on traditional motifs.",
    image: "/images/collection_bridal.png"
  },
  {
    id: 2,
    title: "Midnight Opulence",
    subtitle: "Deep tones woven with authentic silver zari.",
    image: "/images/hero.png"
  },
  {
    id: 3,
    title: "Golden Aura",
    subtitle: "The quintessential tissue silk masterpiece.",
    image: "/images/collection_kanchi.png"
  },
  {
    id: 4,
    title: "Heritage Weaves",
    subtitle: "Classic motifs reborn.",
    image: "/images/heritage.png"
  }
];

export default function NewArrivals() {


  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-ivory)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)]">
          New <span className="text-[var(--color-brand-gold)] italic">Arrivals</span>
        </h2>
        <Link 
          href="/collections" 
          className="text-sm font-semibold tracking-widest uppercase hover:text-[var(--color-brand-gold)] transition-colors inline-flex items-center gap-2"
        >
          View All Arrivals <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-8 px-6 lg:px-12 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
        {newArrivals.map((item, index) => (
          <div key={item.id} className="w-[75vw] sm:w-[280px] lg:w-[300px] group cursor-pointer shrink-0 snap-center">
            <div className="aspect-[4/5] relative overflow-hidden mb-6 bg-[var(--color-brand-silk)]">
              <Image 
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs tracking-widest uppercase text-[var(--color-brand-maroon)] font-semibold mb-2 block">
                  0{index + 1} / Edition
                </span>
                <h3 className="text-3xl font-heading text-[var(--color-brand-dark)] mb-2 group-hover:text-[var(--color-brand-gold)] transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-[var(--color-brand-charcoal)]">
                  {item.subtitle}
                </p>
              </div>
              <Link 
                href="/collections" 
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[var(--color-brand-dark)] group-hover:text-white group-hover:border-transparent transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
