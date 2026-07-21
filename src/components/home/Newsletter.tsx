"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-10 lg:py-16 bg-[var(--color-brand-silk)] relative overflow-hidden">
      {/* Decorative texture background */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-brand-dark)_1px,_transparent_1px)] bg-[length:24px_24px]" />
      
      <div className="max-w-2xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-widest uppercase text-[var(--color-brand-maroon)] font-semibold mb-6 block">
            The Inner Circle
          </span>
          <h2 className="text-4xl lg:text-5xl font-heading text-[var(--color-brand-dark)] mb-6">
            Join the <span className="italic">Society</span>
          </h2>
          <p className="font-body text-[var(--color-brand-charcoal)] mb-12">
            Subscribe to receive exclusive invitations to our private showcases, new collection previews, and styling curations.
          </p>

          {!submitted ? (
            <form 
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input 
                type="email" 
                required
                placeholder="Enter your email address" 
                className="flex-1 bg-transparent border-b border-black/20 pb-4 px-2 text-sm focus:outline-none focus:border-[var(--color-brand-maroon)] transition-colors placeholder:text-black/40 text-[var(--color-brand-dark)]"
              />
              <button 
                type="submit"
                className="group flex items-center justify-center gap-2 bg-[var(--color-brand-dark)] text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors"
              >
                Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/50 backdrop-blur-sm p-8 border border-[var(--color-brand-gold)]"
            >
              <h3 className="font-heading text-2xl text-[var(--color-brand-dark)] mb-2">Welcome to the Family</h3>
              <p className="font-body text-sm text-[var(--color-brand-charcoal)]">
                Your invitation has been accepted. We will be in touch soon.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
