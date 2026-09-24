"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BestSellers from "@/components/home/BestSellers";
import NewArrivals from "@/components/home/NewArrivals";
import BridalShowcase from "@/components/home/BridalShowcase";
import ShopByOccasion from "@/components/home/ShopByOccasion";
import ShopByFabric from "@/components/home/ShopByFabric";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import InstagramGallery from "@/components/home/InstagramGallery";
import Testimonials from "@/components/home/Testimonials";
import VisitStore from "@/components/home/VisitStore";
const heroSlides = [
  {
    id: 0,
    titleLine1: "Timeless",
    titleLine2: "Elegance",
    subtitle: "Discover the heritage of Indian craftsmanship. Every thread tells a story of tradition, woven into luxury for the modern woman.",
    mainImage: "/images/hero.png",
    detailImage: "/images/collection_kanchi.png",
    taglineTitle: "Kanchipuram",
    taglineSub: "Heritage Collection",
    linkText: "Explore Collections"
  },
  {
    id: 1,
    titleLine1: "The Bridal",
    titleLine2: "Trousseau",
    subtitle: "Handcrafted for your special day. Experience the heavy gold zari and intricate details made for the perfect Indian bride.",
    mainImage: "/images/collection_bridal.png",
    detailImage: "/images/hero.png",
    taglineTitle: "Bridal",
    taglineSub: "Wedding Edit",
    linkText: "Shop Bridal"
  },
  {
    id: 2,
    titleLine1: "Pure Zari",
    titleLine2: "Weaves",
    subtitle: "Authentic masterpieces woven over 90 days. Feel the weight and richness of pure mulberry silk.",
    mainImage: "/images/collection_kanchi.png",
    detailImage: "/images/heritage.png",
    taglineTitle: "Authentic",
    taglineSub: "Pure Silks",
    linkText: "View Mastery"
  }
];

import CuratedCollections from "@/components/home/CuratedCollections";
import { useAdmin } from "@/context/AdminContext";

export default function Home() {
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { storeContent } = useAdmin();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];
  const isFirstSlide = currentSlide === 0;

  const currentImage = isFirstSlide && storeContent?.heroImageUrl ? storeContent.heroImageUrl : slide.mainImage;
  const currentHeadline = isFirstSlide && storeContent?.heroHeadline ? storeContent.heroHeadline : `${slide.titleLine1} ${slide.titleLine2}`;
  const currentSubtext = isFirstSlide && storeContent?.heroSubtext ? storeContent.heroSubtext : slide.subtitle;

  return (
    <div ref={containerRef} className="relative">
      {/* Full-width Immersive Hero Section (Kalanjali Inspired) */}
      <section className="relative h-[85vh] min-h-[700px] w-full overflow-hidden flex items-center justify-center bg-[var(--color-brand-dark)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide + currentImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentImage}
              alt={currentHeadline}
              fill
              className="object-cover"
              priority
            />
            {/* Elegant dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide + currentHeadline}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <span className="inline-block px-5 py-2 text-xs tracking-widest uppercase text-[var(--color-brand-gold)] font-semibold mb-6 border border-[var(--color-brand-gold)]/40 rounded-full bg-black/40 shadow-sm">
                {slide.taglineTitle} - {slide.taglineSub}
              </span>
              <h1 className="text-5xl lg:text-[7rem] font-heading text-white leading-[1.1] mb-6 drop-shadow-lg max-w-5xl">
                {currentHeadline}
              </h1>
              <p className="font-body text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
                {currentSubtext}
              </p>
              <Link
                href="/collections"
                className="group inline-flex items-center gap-4 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] px-10 py-5 uppercase tracking-widest text-sm font-semibold hover:bg-white transition-colors duration-500 shadow-xl"
              >
                {slide.linkText} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
          className="absolute left-6 lg:left-12 bottom-24 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/30 bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--color-brand-gold)] hover:border-transparent hover:text-[var(--color-brand-dark)] transition-all duration-300 group shadow-lg"
        >
          <ArrowRight className="w-6 h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-6 lg:right-12 bottom-24 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-white/30 bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-[var(--color-brand-gold)] hover:border-transparent hover:text-[var(--color-brand-dark)] transition-all duration-300 group shadow-lg"
        >
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Slider Progress Controls - Centered Bottom */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 transition-all duration-500 rounded-full cursor-pointer ${currentSlide === index ? "w-10 bg-[var(--color-brand-gold)]" : "w-2 bg-white/50 hover:bg-white/80"
                }`}
            />
          ))}
        </div>
      </section>


      <CuratedCollections />

      <BestSellers />
      <NewArrivals />
      <BridalShowcase />
      <ShopByOccasion />
      <ShopByFabric />
      <WhyChooseUs />
      <InstagramGallery />
      <Testimonials />
      <VisitStore />
    </div>
  );
}
