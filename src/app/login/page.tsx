"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    login();
    setTimeout(() => {
      setIsLoading(false);
      router.push("/profile");
    }, 400);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-0 bg-[var(--color-brand-warm-white)] flex flex-col lg:flex-row">
      {/* Left Column: Fashion Image (Desktop only) */}
      <div className="hidden lg:relative lg:flex lg:w-1/2 min-h-screen bg-[var(--color-brand-dark)] overflow-hidden">
        <Image
          src="/images/collection_bridal.png"
          alt="Harshaa Silks Bridal Collection"
          fill
          priority
          className="object-cover object-center opacity-85 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Text Overlay */}
        <div className="relative z-10 mt-auto p-12 xl:p-16 text-white max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-brand-gold)] mb-3">
            Pure Silk Couture
          </p>
          <h2 className="font-heading text-4xl xl:text-5xl leading-tight mb-4 font-normal">
            The Heritage of Handcrafted <span className="italic">Elegance</span>
          </h2>
          <p className="text-sm font-light text-white/80 leading-relaxed">
            Step into a world of timeless silk couture, woven with grace, tradition, and generations of master artistry.
          </p>
        </div>
      </div>

      {/* Right Column: Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 min-h-[calc(100vh-80px)] lg:min-h-screen">
        <div className="w-full max-w-md">
          {/* Header & Toggle */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-heading text-[var(--color-brand-dark)] mb-3">
              {mode === "signin" ? (
                <>Welcome <span className="text-[var(--color-brand-maroon)] italic">Back</span></>
              ) : (
                <>Create an <span className="text-[var(--color-brand-maroon)] italic">Account</span></>
              )}
            </h1>
            <p className="text-sm text-[var(--color-brand-charcoal)] font-body">
              {mode === "signin"
                ? "Sign in to access your curated wishlist, orders, and saved addresses."
                : "Join the Harshaa Silks inner circle for bespoke collections and private previews."}
            </p>

            {/* Segmented Switcher */}
            <div className="flex border-b border-black/10 mt-8">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`cursor-pointer pb-3 text-xs uppercase tracking-widest transition-colors font-medium flex-1 text-center border-b-2 -mb-px ${
                  mode === "signin"
                    ? "border-[var(--color-brand-maroon)] text-[var(--color-brand-maroon)]"
                    : "border-transparent text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)]"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`cursor-pointer pb-3 text-xs uppercase tracking-widest transition-colors font-medium flex-1 text-center border-b-2 -mb-px ${
                  mode === "register"
                    ? "border-[var(--color-brand-maroon)] text-[var(--color-brand-maroon)]"
                    : "border-transparent text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)]"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "register" && (
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  placeholder=" "
                  required
                  className="peer w-full border border-black/20 bg-white/50 px-4 pt-6 pb-2 text-sm text-[var(--color-brand-dark)] focus:border-[var(--color-brand-maroon)] focus:bg-white focus:outline-none transition-colors"
                />
                <label
                  htmlFor="fullName"
                  className="pointer-events-none absolute left-4 top-2 text-[10px] tracking-widest uppercase text-[var(--color-brand-charcoal)] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--color-brand-maroon)]"
                >
                  Full Name
                </label>
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder=" "
                required
                className="peer w-full border border-black/20 bg-white/50 px-4 pt-6 pb-2 text-sm text-[var(--color-brand-dark)] focus:border-[var(--color-brand-maroon)] focus:bg-white focus:outline-none transition-colors"
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute left-4 top-2 text-[10px] tracking-widest uppercase text-[var(--color-brand-charcoal)] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--color-brand-maroon)]"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder=" "
                required
                className="peer w-full border border-black/20 bg-white/50 px-4 pt-6 pb-2 text-sm text-[var(--color-brand-dark)] focus:border-[var(--color-brand-maroon)] focus:bg-white focus:outline-none transition-colors"
              />
              <label
                htmlFor="password"
                className="pointer-events-none absolute left-4 top-2 text-[10px] tracking-widest uppercase text-[var(--color-brand-charcoal)] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[var(--color-brand-maroon)]"
              >
                Password
              </label>
            </div>

            {mode === "signin" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer text-xs uppercase tracking-wider text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-maroon)] transition-colors underline-offset-4 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-4 bg-[var(--color-brand-dark)] text-white uppercase tracking-widest text-sm font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading
                ? "Please wait..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Bottom Switcher Note */}
          <div className="mt-8 text-center">
            {mode === "signin" ? (
              <p className="text-xs text-[var(--color-brand-charcoal)]">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="cursor-pointer text-[var(--color-brand-maroon)] font-semibold hover:underline underline-offset-4 uppercase tracking-wider ml-1"
                >
                  Create one
                </button>
              </p>
            ) : (
              <p className="text-xs text-[var(--color-brand-charcoal)]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="cursor-pointer text-[var(--color-brand-maroon)] font-semibold hover:underline underline-offset-4 uppercase tracking-wider ml-1"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="text-xs tracking-widest uppercase text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-dark)] transition-colors"
            >
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
