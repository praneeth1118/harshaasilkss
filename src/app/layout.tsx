import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import Navigation from "@/components/navigation";
import { WishlistProvider } from "@/context/WishlistContext";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { AuthProvider } from "@/context/AuthContext";
import { AdminProvider } from "@/context/AdminContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harshaa Silks | Luxury Saree Boutique",
  description: "Experience the timeless elegance of Indian craftsmanship. Explore our curated collection of luxury Kanchipuram, Banarasi, and designer sarees in Hyderabad.",
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable} ${playfair.variable}`}>
      <body className="antialiased selection:bg-brand-gold selection:text-white">
        <AdminProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
                <WishlistProvider>
                  <LenisProvider>
                    <Navigation />
                    <main className="min-h-screen">
                      {children}
                    </main>
                    <Footer />
                  </LenisProvider>
                </WishlistProvider>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
