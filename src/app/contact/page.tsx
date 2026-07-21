import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Harshaa Silks",
  description: "Visit our luxury boutique in Hyderabad or get in touch with our styling team.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-brand-ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)] mb-6">
            Visit our <span className="text-[var(--color-brand-gold)] italic">Boutique</span>
          </h1>
          <p className="font-body text-[var(--color-brand-charcoal)] leading-relaxed">
            Experience the touch of pure silk and let our styling experts help you find the perfect piece for your special occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info & Form */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-maroon)]">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-heading text-xl">Address</h3>
                </div>
                <p className="font-body text-[var(--color-brand-charcoal)] leading-relaxed text-sm">
                  Harshaa Silks Boutique<br/>
                  MIG 82, Bathukammakunta, Shivam Rd<br/>
                  Bagh Amberpet, Telangana 500013
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-maroon)]">
                  <Clock className="w-5 h-5" />
                  <h3 className="font-heading text-xl">Hours</h3>
                </div>
                <p className="font-body text-[var(--color-brand-charcoal)] leading-relaxed text-sm">
                  Monday - Saturday: 11 AM - 8 PM<br/>
                  Sunday: 11 AM - 5 PM
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-maroon)]">
                  <Phone className="w-5 h-5" />
                  <h3 className="font-heading text-xl">Phone</h3>
                </div>
                <p className="font-body text-[var(--color-brand-charcoal)] leading-relaxed text-sm">
                  092473 62349
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4 text-[var(--color-brand-maroon)]">
                  <Mail className="w-5 h-5" />
                  <h3 className="font-heading text-xl">Email</h3>
                </div>
                <p className="font-body text-[var(--color-brand-charcoal)] leading-relaxed text-sm">
                  concierge@harshaasilks.com
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <h3 className="font-heading text-2xl mb-6">Book an Appointment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors placeholder:text-black/40"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors placeholder:text-black/40"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors placeholder:text-black/40"
              />
              <input 
                type="text" 
                placeholder="Phone Number (WhatsApp preferred)" 
                className="w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors placeholder:text-black/40"
              />
              <button 
                type="button"
                className="w-full bg-[var(--color-brand-dark)] text-white py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors mt-4"
              >
                Request Appointment
              </button>
            </form>
          </div>

          {/* Map Image Placeholder */}
          <div className="relative aspect-square lg:aspect-auto h-full w-full bg-[var(--color-brand-silk)] overflow-hidden flex items-center justify-center text-black/40 uppercase tracking-widest text-sm">
            [Interactive Map Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
