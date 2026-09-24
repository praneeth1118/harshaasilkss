"use client";

import Link from "next/link";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Activity,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { formatPrice } from "@/lib/data";

export default function AdminDashboardPage() {
  const { adminOrders, adminProducts, adminCustomers } = useAdmin();

  const totalRevenue = adminOrders.reduce((acc, curr) => acc + curr.amount, 0);

  const metrics = [
    {
      title: "Total Revenue",
      value: formatPrice(totalRevenue),
      change: "+12.5% from last month",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: adminOrders.length.toString(),
      change: "+8.2% from last month",
      icon: ShoppingCart,
    },
    {
      title: "Registered Clients",
      value: adminCustomers.length.toString(),
      change: "+5.4% active clients",
      icon: Users,
    },
    {
      title: "Conversion Rate",
      value: "3.6%",
      change: "+0.8% from last month",
      icon: Activity,
    },
  ];

  const recentOrders = adminOrders.slice(0, 5);

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading text-gray-900 font-semibold">
            Welcome back, <span className="text-[var(--color-brand-maroon)]">Admin</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here&apos;s a live snapshot of your luxury boutique&apos;s performance today.
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="inline-block px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600 shadow-2xs">
            📅 {currentDate}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {metric.title}
                </p>
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-body">
                  {metric.value}
                </h3>
                <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{metric.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table Section */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-heading">Recent Orders</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Latest transactions placed across all saree collections.
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-medium text-[var(--color-brand-maroon)] hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full pb-4">
          <table className="w-full min-w-[700px] text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Order ID</th>
                <th className="px-6 py-3.5 font-semibold">Customer</th>
                <th className="px-6 py-3.5 font-semibold">Date</th>
                <th className="px-6 py-3.5 font-semibold">Amount</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-body">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    {formatPrice(order.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        order.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : order.status === "Processing"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : order.status === "Pending"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <Link
                      href="/admin/orders"
                      className="cursor-pointer text-xs font-medium text-gray-500 hover:text-[var(--color-brand-maroon)] transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
