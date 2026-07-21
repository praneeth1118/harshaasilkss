"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const fabrics = [
  { name: "Kanchipuram Silk", image: "/images/collection_kanchi.png", description: "Pure mulberry silk with heavy zari." },
  { name: "Banarasi Brocade", image: "/images/hero.png", description: "Intricate floral motifs woven in gold." },
  { name: "Tissue Silk", image: "/images/collection_bridal.png", description: "Lightweight, sheer elegance." },
  { name: "Organza", image: "/images/heritage.png", description: "Crisp texture with a subtle sheen." }
];

export default function ShopByFabric() {
  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-ivory)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)] mb-6"
          >
            The <span className="text-[var(--color-brand-gold)] italic">Textures</span> of Heritage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-[var(--color-brand-charcoal)] leading-relaxed"
          >
            Explore our collections through the tactile beauty of authentic Indian fabrics.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {fabrics.map((fabric, index) => (
            <motion.div
              key={fabric.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href="/collections" className="group block">
                <div className="aspect-[4/5] relative overflow-hidden mb-6 bg-[var(--color-brand-silk)] rounded-t-full">
                  <Image 
                    src={fabric.image}
                    alt={fabric.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-heading text-[var(--color-brand-dark)] mb-2 group-hover:text-[var(--color-brand-gold)] transition-colors">
                    {fabric.name}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-brand-charcoal)]">
                    {fabric.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
