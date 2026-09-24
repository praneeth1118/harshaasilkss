"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Store,
  Menu,
  X,
  Layout,
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Storefront", href: "/admin/content", icon: Layout },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 font-sans text-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[var(--color-brand-dark)] text-white flex-col shrink-0 min-h-screen border-r border-black/20 sticky top-0 h-screen">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Harshaa Silks Logo"
              className="h-10 w-auto object-contain rounded"
            />
            <div>
              <p className="font-heading text-lg tracking-wider text-white">Harshaa Silks</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] font-medium">
                Admin Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 flex-1 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3.5 px-4 py-3 text-sm rounded-md transition-colors ${
                  isActive
                    ? "bg-[var(--color-brand-maroon)] text-white font-medium shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / Storefront Link */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider text-white/70 hover:text-[var(--color-brand-gold)] hover:bg-white/5 rounded-md transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>View Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-[var(--color-brand-dark)] text-white p-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.png"
            alt="Harshaa Silks Logo"
            className="h-8 w-auto object-contain rounded"
          />
          <div>
            <span className="font-heading text-lg text-white leading-tight block">Harshaa Silks</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-brand-gold)] font-medium block">
              Admin Panel
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Admin Menu"
          className="cursor-pointer p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-[var(--color-brand-dark)] text-white p-6 shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo.png"
                    alt="Harshaa Silks"
                    className="h-8 w-auto object-contain rounded"
                  />
                  <span className="font-heading text-lg text-white">Admin Panel</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Admin Menu"
                  className="cursor-pointer p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 text-sm rounded-lg transition-colors ${
                        isActive
                          ? "bg-[var(--color-brand-maroon)] text-white font-medium shadow-sm"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider text-white/70 hover:text-[var(--color-brand-gold)] hover:bg-white/5 rounded-lg transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>View Storefront</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 bg-gray-50 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
