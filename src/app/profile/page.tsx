"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/data";

const mockOrders = [
  {
    id: "#ORD-8924",
    date: "October 12, 2023",
    total: 45000,
    status: "Delivered",
  },
  {
    id: "#ORD-9211",
    date: "November 05, 2023",
    total: 32000,
    status: "Processing",
  }
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-24 bg-[var(--color-brand-ivory)]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)] text-center lg:text-left">
          My <span className="text-[var(--color-brand-maroon)] italic">Account</span>
        </h1>
      </div>

      {/* Dashboard Split */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-16 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Sidebar Menu (Left Column) */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-col gap-6">
            <Link 
              href="/profile" 
              className="text-[var(--color-brand-maroon)] font-semibold border-l-2 border-[var(--color-brand-maroon)] pl-4 text-sm tracking-widest uppercase"
            >
              Order History
            </Link>
            <Link 
              href="#" 
              className="text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] pl-4 text-sm tracking-widest uppercase transition-colors"
            >
              Account Details
            </Link>
            <Link 
              href="#" 
              className="text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] pl-4 text-sm tracking-widest uppercase transition-colors"
            >
              Saved Addresses
            </Link>
            <Link 
              href="#" 
              className="text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] pl-4 text-sm tracking-widest uppercase transition-colors mt-8"
            >
              Log Out
            </Link>
          </nav>
        </div>

        {/* Order History Content (Right Column) */}
        <div className="flex-1">
          <h2 className="font-heading text-3xl text-[var(--color-brand-dark)] mb-8 pb-4 border-b border-black/10">
            Recent Orders
          </h2>
          
          <div className="flex flex-col gap-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 sm:p-8 shadow-sm border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 flex-1">
                  <div>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Order Number</p>
                    <p className="font-body text-sm sm:text-base text-[var(--color-brand-dark)]">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Date</p>
                    <p className="font-body text-sm sm:text-base text-[var(--color-brand-dark)]">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Total Price</p>
                    <p className="font-body text-sm sm:text-base text-[var(--color-brand-dark)]">{formatPrice(order.total)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 text-[10px] sm:text-xs tracking-widest uppercase rounded-sm border ${
                      order.status === 'Delivered' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="shrink-0 md:pl-6 md:border-l border-black/10 pt-4 md:pt-0 border-t md:border-t-0 mt-2 md:mt-0">
                  <button className="text-sm uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors underline-offset-4 hover:underline">
                    View Details
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
