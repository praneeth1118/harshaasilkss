"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const igPosts = [
  { id: 1, image: "/images/collection_bridal.png", aspect: "md:aspect-square" },
  { id: 2, image: "/images/collection_kanchi.png", aspect: "md:aspect-[3/4]" },
  { id: 3, image: "/images/hero.png", aspect: "md:aspect-[4/3]" },
  { id: 4, image: "/images/heritage.png", aspect: "md:aspect-square" },
];

export default function InstagramGallery() {
  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-ivory)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)] mb-6"
          >
            Follow our <span className="text-[var(--color-brand-gold)] italic">Journey</span>
          </motion.h2>
          <motion.a 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors inline-block pb-1 border-b border-current"
          >
            @harshaasilks
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {igPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative group w-full h-full aspect-square ${post.aspect} overflow-hidden cursor-pointer bg-[var(--color-brand-silk)]`}
            >
              <Image 
                src={post.image}
                alt="Instagram post"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
