"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[var(--color-brand-dark)] text-white pt-24 pb-12 overflow-hidden">
      {/* Temple Border (Korvai) Pattern */}
      <div 
        className="absolute top-0 left-0 w-full h-3 bg-repeat-x opacity-40" 
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='24' height='12' viewBox='0 0 24 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0L24 12H0L12 0Z' fill='%23B88A3B'/%3E%3C/svg%3E\")" }} 
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logo.png" 
                alt="Harshaa Silks Logo" 
                className="h-20 lg:h-28 w-auto object-contain rounded-md shadow-lg"
              />
            </Link>
            <p className="font-body text-white/60 leading-relaxed mb-8 max-w-sm text-sm">
              Preserving the sacred art of Indian silk weaving. Our boutique curates the finest Kanchipuram and Banarasi masterpieces, creating heirlooms that transcend time.
            </p>
            <div className="flex gap-6 items-center">
              <a href="https://www.instagram.com/harshaasilksofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-white/60">
                <InstagramIcon className="w-5 h-5 hover:text-[var(--color-brand-maroon)] transition-colors" />
              </a>
              <a href="#" className="text-white/60">
                <FacebookIcon className="w-5 h-5 hover:text-[var(--color-brand-maroon)] transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="font-heading text-xl mb-6 text-[var(--color-brand-gold)]">Collections</h4>
            <ul className="space-y-4 font-body text-sm text-white/70">
              <li><Link href="/collections" className="hover:text-white transition-colors">Kanchipuram Silk</Link></li>
              <li><Link href="/collections" className="hover:text-white transition-colors">Banarasi Brocade</Link></li>
              <li><Link href="/collections" className="hover:text-white transition-colors">Bridal Trousseau</Link></li>
              <li><Link href="/collections" className="hover:text-white transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xl mb-6 text-[var(--color-brand-gold)]">Boutique</h4>
            <ul className="space-y-4 font-body text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Visit Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Book Appointment</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Virtual Consultation</Link></li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div className="lg:col-span-2 lg:col-start-11">
            <h4 className="font-heading text-xl mb-6 text-[var(--color-brand-gold)]">Support</h4>
            <ul className="space-y-4 font-body text-sm text-white/70">
              <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Care Instructions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-white/40 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Harshaa Silks. All Rights Reserved.
          </p>
          
          <div className="flex gap-6 font-body text-xs text-white/40 tracking-widest uppercase">
            <Link href="#" className="hover:text-[var(--color-brand-gold)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--color-brand-gold)] transition-colors">Terms of Service</Link>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
