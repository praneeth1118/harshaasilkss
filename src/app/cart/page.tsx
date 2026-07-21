"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();


  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--color-brand-warm-white)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="text-5xl lg:text-7xl font-heading text-[var(--color-brand-dark)]">
          Your <span className="text-[var(--color-brand-maroon)] italic">Cart</span>
        </h1>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-12">
          {/* Left Column: Cart Items */}
          <div className="flex-1">
            <div className="border-t border-black/10">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 sm:gap-10 border-b border-black/10 py-8">
                  <div className="relative w-24 sm:w-32 aspect-[4/5] shrink-0 bg-[var(--color-brand-silk)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 justify-between py-1 sm:py-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-heading text-xl sm:text-2xl text-[var(--color-brand-dark)] mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm tracking-widest uppercase text-[var(--color-brand-charcoal)]">
                          {item.category}
                        </p>
                      </div>
                      <p className="font-body text-lg text-[var(--color-brand-dark)] whitespace-nowrap">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center border border-black/20 w-max">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 text-[var(--color-brand-charcoal)] hover:text-black transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-body text-sm border-x border-black/20">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 text-[var(--color-brand-charcoal)] hover:text-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm uppercase tracking-widest text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors underline-offset-4 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-32 bg-white p-8 shadow-sm border border-black/5">
              <h2 className="font-heading text-2xl mb-8 text-[var(--color-brand-dark)]">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between font-body text-[var(--color-brand-charcoal)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between font-body text-[var(--color-brand-charcoal)]">
                  <span>Shipping</span>
                  <span className="italic">Complimentary</span>
                </div>
              </div>
              
              <div className="border-t border-black/10 pt-6 mb-8 flex justify-between items-center font-heading text-2xl text-[var(--color-brand-dark)]">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              
              <button className="w-full py-4 bg-[var(--color-brand-dark)] text-white uppercase tracking-widest text-sm hover:bg-[var(--color-brand-charcoal)] transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
