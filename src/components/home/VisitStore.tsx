"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VisitStore() {
  return (
    <section className="bg-[var(--color-brand-ivory)] relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative aspect-square lg:aspect-auto lg:h-[80vh] w-full overflow-hidden bg-[var(--color-brand-silk)]">
          <Image 
            src="/images/heritage.png"
            alt="Boutique Experience"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="flex items-center justify-center py-24 px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-lg"
          >
            <span className="text-sm tracking-widest uppercase text-[var(--color-brand-maroon)] font-semibold mb-4 block">
              Flagship Experience
            </span>
            <h2 className="text-4xl lg:text-6xl font-heading text-[var(--color-brand-dark)] mb-12">
              Visit our <br/> <span className="text-[var(--color-brand-gold)] italic">shop</span>
            </h2>

            <div className="space-y-8 font-body text-[var(--color-brand-charcoal)]">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-[var(--color-brand-gold)] shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-xl text-[var(--color-brand-dark)] mb-2">Hyderabad</h4>
                  <p className="leading-relaxed">
                    MIG 82, Bathukammakunta, Shivam Rd<br/>
                    Bagh Amberpet, Telangana 500013<br/>
                    <Link href="#" className="text-sm text-[var(--color-brand-maroon)] uppercase tracking-widest mt-2 inline-block font-semibold hover:text-[var(--color-brand-gold)] transition-colors">
                      Get Directions
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Phone className="w-5 h-5 text-[var(--color-brand-gold)] shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-xl text-[var(--color-brand-dark)] mb-2">Contact</h4>
                  <p>092473 62349</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-black/10 flex flex-col sm:flex-row gap-4">
              <Link 
                href="https://www.instagram.com/harshaasilksofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[var(--color-brand-dark)] text-white py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors flex items-center justify-center gap-2"
              >
                Follow on Instagram
              </Link>
              <button className="flex-1 border border-black/20 text-[var(--color-brand-dark)] py-4 text-sm tracking-widest uppercase font-semibold hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)] transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
