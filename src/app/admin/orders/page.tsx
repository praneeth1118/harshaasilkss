"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { useAdmin, AdminOrder } from "@/context/AdminContext";

export default function AdminOrdersPage() {
  const { adminOrders, updateOrderStatus } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = adminOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: AdminOrder["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Pending":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200">
        <h1 className="text-2xl lg:text-3xl font-heading text-gray-900 font-semibold">
          Orders
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor incoming purchases, track status transitions, and manage parcel dispatches.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)] shadow-2xs"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Filter Status:</span>
          <div className="relative flex-1 sm:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer appearance-none w-full pl-3.5 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] shadow-2xs font-medium"
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Total Amount</th>
                <th className="px-6 py-4 font-semibold">Status (Update)</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-body">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Order ID */}
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      {order.id}
                      <span className="block text-[11px] font-normal text-gray-400">
                        {order.itemsCount} {order.itemsCount === 1 ? "Item" : "Items"} • {order.city}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                      {order.date}
                    </td>

                    {/* Total Amount */}
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(order.amount)}
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative inline-block">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(
                              order.id,
                              e.target.value as AdminOrder["status"]
                            )
                          }
                          className={`cursor-pointer appearance-none pl-3 pr-7 py-1.5 rounded-full text-xs font-semibold border transition-all focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-maroon)] ${getStatusColor(
                            order.status
                          )}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="cursor-pointer text-xs font-semibold text-[var(--color-brand-maroon)] hover:text-[var(--color-brand-dark)] transition-colors underline-offset-4 hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-heading font-semibold text-gray-900">
                  {selectedOrder.id}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Order Details & Breakdown</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="py-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Customer</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{selectedOrder.customerName}</p>
                  <p className="text-xs text-gray-500">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Shipping Destination</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{selectedOrder.city}, India</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Order Date</p>
                  <p className="font-medium text-gray-900 mt-0.5">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Total Charged</p>
                  <p className="font-bold text-gray-900 text-base mt-0.5">{formatPrice(selectedOrder.amount)}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="cursor-pointer px-6 py-2.5 bg-gray-900 text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[var(--color-brand-maroon)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
