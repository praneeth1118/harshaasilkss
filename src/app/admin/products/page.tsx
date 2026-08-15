"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice, Product } from "@/lib/data";
import { useAdmin } from "@/context/AdminContext";
import { Plus, Pencil, Trash2, Search, X } from "lucide-react";

export default function AdminProductsPage() {
  const { adminProducts, addProduct, deleteProduct } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProducts = adminProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.fabric && p.fabric.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const price = Number(formData.get("price")) || 25000;
    const category = formData.get("category") as Product["category"];
    const image = (formData.get("image") as string) || "/images/collection_bridal.png";
    const fabric = (formData.get("fabric") as string) || "Pure Silk";
    const color = (formData.get("color") as string) || "Classic";

    const newProduct: Product = {
      id: `p-${Date.now()}`,
      name,
      price,
      category,
      image,
      fabric,
      color,
    };

    addProduct(newProduct);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading text-gray-900 font-semibold">
            Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your boutique&apos;s luxury saree inventory and catalog.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="cursor-pointer bg-[var(--color-brand-dark)] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[var(--color-brand-maroon)] transition-colors inline-flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by title or fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)] shadow-2xs"
          />
        </div>
        <p className="text-xs text-gray-500 self-end sm:self-center">
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of {adminProducts.length} products
        </p>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/80 text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-body">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Thumbnail + Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-14 shrink-0 rounded bg-gray-100 overflow-hidden border border-gray-200 shadow-2xs">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 leading-snug">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {product.fabric || "Pure Silk"} • {product.color || "Classic"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category Pill */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>

                    {/* Formatted Price */}
                    <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(product.price)}
                    </td>

                    {/* Stock Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ● In Stock
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          aria-label="Edit product"
                          className="cursor-pointer p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          aria-label="Delete product"
                          className="cursor-pointer p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-heading font-semibold text-gray-900">
                Add New Product
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="py-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="e.g. Royal Gold Banarasi Weave"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Price (INR) *
                  </label>
                  <input
                    required
                    name="price"
                    type="number"
                    defaultValue={35000}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-brand-maroon)] bg-white font-medium"
                  >
                    <option value="Kanchipuram">Kanchipuram</option>
                    <option value="Banarasi">Banarasi</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Designer">Designer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  name="image"
                  type="text"
                  defaultValue="/images/collection_bridal.png"
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)] text-xs text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Fabric
                  </label>
                  <input
                    name="fabric"
                    type="text"
                    defaultValue="Pure Mulberry Silk"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-brand-maroon)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Color
                  </label>
                  <input
                    name="color"
                    type="text"
                    defaultValue="Crimson Red"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--color-brand-maroon)]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="cursor-pointer px-4 py-2.5 border border-gray-200 text-gray-600 text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-6 py-2.5 bg-[var(--color-brand-maroon)] text-white text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-[var(--color-brand-dark)] transition-colors"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
