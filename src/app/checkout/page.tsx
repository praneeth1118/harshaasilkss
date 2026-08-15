"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const orderDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(new Date());

      addOrder({
        id: orderId,
        date: orderDate,
        total: cartTotal,
        status: "Processing",
        items: [...cartItems],
      });

      clearCart();
      setIsProcessing(false);
      router.push("/profile");
    }, 800);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 bg-[var(--color-brand-warm-white)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <Link
            href="/cart"
            className="text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors inline-flex items-center gap-2 mb-4"
          >
            <span>←</span> Return to Cart
          </Link>
          <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)]">
            Secure <span className="text-[var(--color-brand-maroon)] italic">Checkout</span>
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-12">
          {/* Left Column: Forms */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Contact Information */}
              <div>
                <h2 className="font-heading text-2xl text-[var(--color-brand-dark)] mb-6 pb-2 border-b border-black/10">
                  1. Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                      First Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Priyanshu"
                      className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                      Last Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Sharma"
                      className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="priyanshu@example.com"
                      className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="font-heading text-2xl text-[var(--color-brand-dark)] mb-6 pb-2 border-b border-black/10">
                  2. Shipping Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                      Street Address *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="House / Flat No., Street, Landmark"
                      className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                        Apartment, Suite, Unit (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Apartment 4B"
                        className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Bangalore"
                        className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                        State / Province *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Karnataka"
                        className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                        PIN / Postal Code *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="560001"
                        className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                        Country *
                      </label>
                      <input
                        required
                        type="text"
                        defaultValue="India"
                        className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h2 className="font-heading text-2xl text-[var(--color-brand-dark)] mb-6 pb-2 border-b border-black/10">
                  3. Payment Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                      Name on Card *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Name as printed on card"
                      className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                      Card Number *
                    </label>
                    <input
                      required
                      type="text"
                      maxLength={19}
                      placeholder="4532 •••• •••• 8920"
                      className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] tracking-wider transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                        Expiry Date *
                      </label>
                      <input
                        required
                        type="text"
                        maxLength={5}
                        placeholder="MM / YY"
                        className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">
                        Security Code (CVV) *
                      </label>
                      <input
                        required
                        type="password"
                        maxLength={4}
                        placeholder="•••"
                        className="w-full bg-transparent border-b border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-[var(--color-brand-charcoal)] flex items-center gap-2 pt-2">
                    <span>🔒</span> All transactions are encrypted with 256-bit SSL security.
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={cartItems.length === 0 || isProcessing}
                className={`w-full py-4 text-white uppercase tracking-widest text-sm transition-colors duration-300 ${
                  cartItems.length === 0 || isProcessing
                    ? "bg-black/20 cursor-not-allowed"
                    : "bg-[var(--color-brand-maroon)] hover:bg-[var(--color-brand-dark)] cursor-pointer"
                }`}
              >
                {isProcessing ? "Processing Order..." : `Complete Order • ${formatPrice(cartTotal)}`}
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-32 bg-white p-8 shadow-sm border border-black/5">
              <h2 className="font-heading text-2xl mb-6 text-[var(--color-brand-dark)]">Order Summary</h2>

              {/* Items Preview */}
              {cartItems.length === 0 ? (
                <p className="text-sm text-[var(--color-brand-charcoal)] mb-6 italic">No items in cart</p>
              ) : (
                <div className="max-h-80 overflow-y-auto space-y-4 mb-6 pr-1 divide-y divide-black/5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                      <div className="relative w-16 h-20 shrink-0 bg-[var(--color-brand-silk)] overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute top-1 right-1 bg-[var(--color-brand-dark)] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-sm text-[var(--color-brand-dark)] truncate">{item.name}</h4>
                        <p className="text-xs uppercase tracking-wider text-[var(--color-brand-charcoal)]">{item.category}</p>
                        <p className="font-body text-xs text-[var(--color-brand-dark)] mt-1">{formatPrice(item.price)} each</p>
                      </div>
                      <p className="font-body text-sm font-semibold text-[var(--color-brand-dark)] shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-4 mb-8 pt-4 border-t border-black/10">
                <div className="flex justify-between font-body text-[var(--color-brand-charcoal)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between font-body text-[var(--color-brand-charcoal)]">
                  <span>Shipping</span>
                  <span className="italic">Complimentary</span>
                </div>
              </div>

              <div className="border-t border-black/10 pt-6 flex justify-between items-center font-heading text-2xl text-[var(--color-brand-dark)]">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
