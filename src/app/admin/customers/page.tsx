"use client";

import { useState } from "react";
import { Search, Trash2, UserCheck, UserX, Mail } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { formatPrice } from "@/lib/data";

export default function AdminCustomersPage() {
  const { adminCustomers, deleteCustomer } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = adminCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove customer "${name}"?`)) {
      deleteCustomer(id);
    }
  };

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl lg:text-3xl font-heading text-gray-900 font-semibold">
          Customers
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          View customer profiles, order frequencies, and lifetime luxury spend.
        </p>
      </div>

      {/* Search Bar & Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)] shadow-2xs"
          />
        </div>

        <p className="text-xs text-gray-500 self-end sm:self-center">
          Showing <span className="font-semibold text-gray-900">{filteredCustomers.length}</span> of {adminCustomers.length} registered clients
        </p>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Total Orders</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-body">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No customers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const initials = customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2);

                  return (
                    <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Customer Avatar + Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[var(--color-brand-ivory)] border border-[var(--color-brand-gold)]/40 text-[var(--color-brand-maroon)] flex items-center justify-center font-heading text-xs font-semibold shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 leading-snug">
                              {customer.name}
                            </p>
                            <span className="text-[11px] text-gray-400">
                              Client ID: {customer.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        <a
                          href={`mailto:${customer.email}`}
                          className="hover:text-[var(--color-brand-maroon)] transition-colors inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{customer.email}</span>
                        </a>
                      </td>

                      {/* Total Orders */}
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                        {customer.ordersCount} {customer.ordersCount === 1 ? "Order" : "Orders"}
                      </td>

                      {/* Total Spent */}
                      <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                        {formatPrice(customer.totalSpent)}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.status === "Active" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <UserCheck className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            <UserX className="w-3 h-3" />
                            <span>Inactive</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleDelete(customer.id, customer.name)}
                          aria-label={`Delete ${customer.name}`}
                          className="cursor-pointer p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline font-medium">Delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
