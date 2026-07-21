import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story | Harshaa Silks",
  description: "The legacy of Harshaa Silks. Preserving the art of Indian craftsmanship.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-brand-ivory)]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-32 text-center max-w-4xl">
        <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)] mb-8">
          The <span className="text-[var(--color-brand-gold)] italic">Legacy</span> of Silk
        </h1>
        <p className="font-body text-xl text-[var(--color-brand-charcoal)] leading-relaxed">
          Founded in Hyderabad, Harshaa Silks is a homage to the master weavers of India. We believe that a saree is not just six yards of fabric—it is a canvas of heritage, passed down through generations.
        </p>
      </section>

      {/* Split Editorial Story */}
      <section className="bg-[var(--color-brand-warm-white)] py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] relative w-full overflow-hidden">
             <Image 
                src="/images/heritage.png" 
                alt="Weaving tradition"
                fill
                className="object-cover"
              />
          </div>
          <div className="lg:pl-12">
            <h2 className="text-4xl lg:text-5xl font-heading mb-8">
              A Commitment to <br/><span className="text-[var(--color-brand-maroon)] italic">Authenticity</span>
            </h2>
            <div className="space-y-6 font-body text-lg text-[var(--color-brand-charcoal)] leading-relaxed">
              <p>
                In a world of fast fashion, we slow down. Every Kanchipuram and Banarasi saree in our boutique takes anywhere from 30 to 90 days to weave. Our master artisans use pure mulberry silk and authentic zari to create heirlooms.
              </p>
              <p>
                We travel to the loom clusters of Kanchipuram and Varanasi, working directly with weaving families to ensure fair trade and the survival of these ancient textile arts.
              </p>
            </div>
            <Link 
              href="/collections"
              className="mt-12 inline-flex items-center gap-4 bg-[var(--color-brand-dark)] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[var(--color-brand-maroon)] transition-colors duration-500"
            >
              Explore the Craft <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founder Vision */}
      <section className="py-32 bg-[var(--color-brand-maroon)] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center max-w-4xl">
          <h2 className="text-4xl lg:text-5xl font-heading mb-8">The Vision</h2>
          <blockquote className="font-heading text-2xl lg:text-3xl leading-relaxed italic opacity-90 mb-8">
            &quot;Our dream was to create a space in Hyderabad where luxury meets tradition—a boutique where a bride can find a piece of art that she will one day pass down to her daughter.&quot;
          </blockquote>
          <p className="font-body text-sm uppercase tracking-widest text-[var(--color-brand-gold)]">
            Founder, Harshaa Silks
          </p>
        </div>
      </section>
    </div>
  );
}
