"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ArrowLeft,
  Store,
} from "lucide-react";

import { AdminProvider } from "@/context/AdminContext";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <AdminProvider>
      <div className="min-h-screen flex bg-gray-50 font-sans text-gray-900">
        {/* Sidebar */}
        <aside className="w-64 bg-[var(--color-brand-dark)] text-white flex flex-col shrink-0 min-h-screen border-r border-black/20">
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
          <nav className="p-4 flex-1 space-y-1.5">
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

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 min-h-screen overflow-x-hidden">
          {children}
        </main>
      </div>
    </AdminProvider>
  );
}
