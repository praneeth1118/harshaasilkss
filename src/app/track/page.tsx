"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsTracking(true);
    }, 600);
  };

  const handleReset = () => {
    setIsTracking(false);
  };

  const steps = [
    { label: "Order Placed", date: "Aug 12, 2026", status: "completed" },
    { label: "Processing", date: "Aug 13, 2026", status: "current" },
    { label: "Shipped", date: "Expected Aug 16", status: "pending" },
    { label: "Delivered", date: "Expected Aug 18", status: "pending" },
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 bg-[var(--color-brand-warm-white)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-brand-gold)] font-medium mb-3">
            Shipment Dispatch & Status
          </p>
          <h1 className="text-5xl lg:text-6xl font-heading text-[var(--color-brand-dark)] mb-4">
            Track Your <span className="text-[var(--color-brand-maroon)] italic">Order</span>
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-brand-charcoal)] max-w-lg mx-auto font-body">
            Enter your order number and email address to view the live status of your handcrafted silk parcels.
          </p>
        </div>

        {!isTracking ? (
          /* Search Form */
          <div className="bg-white p-8 sm:p-12 shadow-sm border border-black/5 max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2 font-medium">
                  Order Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. #ORD-8924"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full bg-transparent border border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none px-4 py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priyanshu@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-black/20 focus:border-[var(--color-brand-maroon)] focus:outline-none px-4 py-3 text-sm text-[var(--color-brand-dark)] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full py-4 bg-[var(--color-brand-dark)] text-white uppercase tracking-widest text-sm font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  "Locating Parcel..."
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Track Order
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-black/10 text-center">
              <p className="text-xs text-[var(--color-brand-charcoal)]">
                Have an account?{" "}
                <Link href="/profile" className="text-[var(--color-brand-maroon)] hover:underline font-medium">
                  View full order history in your account
                </Link>
              </p>
            </div>
          </div>
        ) : (
          /* Mock Tracking Result */
          <div className="space-y-8 animate-in fade-in duration-500">
            <button
              onClick={handleReset}
              className="cursor-pointer inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Track Another Order
            </button>

            {/* Status Summary Card */}
            <div className="bg-white p-8 sm:p-10 shadow-sm border border-black/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-heading text-2xl sm:text-3xl text-[var(--color-brand-dark)]">
                      {orderNumber || "#ORD-8924"}
                    </h2>
                    <span className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] tracking-widest uppercase font-semibold">
                      In Progress
                    </span>
                  </div>
                  <p className="text-xs tracking-wider uppercase text-[var(--color-brand-charcoal)] mt-1">
                    Carrier: Blue Dart Express • AWB: 7892104938
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs uppercase tracking-widest text-[var(--color-brand-charcoal)]">Estimated Delivery</p>
                  <p className="font-heading text-xl text-[var(--color-brand-maroon)] font-medium">August 18, 2026</p>
                </div>
              </div>

              {/* Horizontal Visual Timeline */}
              <div className="py-10">
                <div className="relative">
                  {/* Timeline Bar */}
                  <div className="hidden sm:block absolute top-5 left-8 right-8 h-0.5 bg-black/10 z-0">
                    <div className="h-full bg-[var(--color-brand-maroon)] w-[38%]" />
                  </div>

                  {/* Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4 relative z-10">
                    {steps.map((step, idx) => {
                      const isCompleted = step.status === "completed";
                      const isCurrent = step.status === "current";
                      const isActive = isCompleted || isCurrent;

                      return (
                        <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                              isCompleted
                                ? "bg-[var(--color-brand-maroon)] text-white ring-4 ring-[var(--color-brand-maroon)]/10"
                                : isCurrent
                                ? "bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] ring-4 ring-[var(--color-brand-gold)]/20 animate-pulse"
                                : "bg-black/10 text-black/40 border border-black/10"
                            }`}
                          >
                            {isCompleted ? "✓" : idx + 1}
                          </div>
                          <div>
                            <p
                              className={`text-sm font-semibold tracking-wide uppercase ${
                                isActive ? "text-[var(--color-brand-maroon)]" : "text-black/40"
                              }`}
                            >
                              {step.label}
                            </p>
                            <p className="text-xs text-[var(--color-brand-charcoal)] mt-0.5">{step.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Parcel Details Breakdown */}
              <div className="pt-6 border-t border-black/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Destination</p>
                  <p className="font-body text-[var(--color-brand-dark)]">Bangalore, Karnataka, 560001</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Latest Update</p>
                  <p className="font-body text-[var(--color-brand-dark)]">Quality checked & packed in silk gift casing</p>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Support</p>
                  <Link href="/contact" className="text-[var(--color-brand-maroon)] hover:underline">
                    Need assistance with delivery?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
