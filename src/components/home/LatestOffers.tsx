"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LatestOffers() {
  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full h-[60vh] min-h-[500px] overflow-hidden bg-[var(--color-brand-maroon)] flex items-center"
        >
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/collection_bridal.png"
              alt="Wedding Season Offers"
              fill
              className="object-cover opacity-40 mix-blend-overlay"
            />
          </div>
          
          <div className="relative z-10 w-full px-8 lg:px-20 grid grid-cols-1 md:grid-cols-2">
            <div className="text-white">
              <span className="text-sm tracking-widest uppercase text-[var(--color-brand-gold)] font-semibold mb-6 block">
                Exclusive Campaign
              </span>
              <h2 className="text-5xl lg:text-7xl font-heading leading-[1.1] mb-6">
                The Wedding <br />
                <span className="italic font-light text-[var(--color-brand-gold)]">Trousseau</span>
              </h2>
              <p className="font-body text-lg text-white/80 leading-relaxed mb-10 max-w-md">
                Curate your bridal wardrobe with our special wedding season privileges. Enjoy exclusive styling sessions and heirloom packaging.
              </p>
              <Link 
                href="/collections"
                className="group inline-flex items-center gap-4 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-white transition-colors duration-500"
              >
                Discover the Offer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
