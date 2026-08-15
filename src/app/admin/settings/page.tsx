"use client";

import { useState } from "react";
import {
  Store,
  Mail,
  Truck,
  Phone,
  CheckCircle2,
  Save,
  ShieldCheck,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminSettingsPage() {
  const { storeSettings, updateSettings } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const formData = new FormData(e.currentTarget);
    const storeName = formData.get("storeName") as string;
    const contactEmail = formData.get("contactEmail") as string;
    const shippingRate = Number(formData.get("shippingRate")) || 0;
    const supportPhone = (formData.get("supportPhone") as string) || "";
    const currency = (formData.get("currency") as string) || "INR (₹)";

    setTimeout(() => {
      updateSettings({
        storeName,
        contactEmail,
        shippingRate,
        supportPhone,
        currency,
      });
      setIsSaving(false);
      setSaveSuccess(true);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3500);
    }, 400);
  };

  return (
    <div className="p-8 lg:p-10 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-heading text-gray-900 font-semibold">
            Store Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure global store identity, customer communication, and shipping rates.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg animate-in fade-in duration-200 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: General Info */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-ivory)] text-[var(--color-brand-maroon)] flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 font-heading">
                General Information
              </h2>
              <p className="text-xs text-gray-500">
                Public boutique brand identity and concierge contact details.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Store Name
                </label>
                <input
                  type="text"
                  name="storeName"
                  defaultValue={storeSettings.storeName}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Contact Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="contactEmail"
                    defaultValue={storeSettings.contactEmail}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Support Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="supportPhone"
                    defaultValue={storeSettings.supportPhone}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Store Currency
                </label>
                <input
                  type="text"
                  name="currency"
                  defaultValue={storeSettings.currency}
                  readOnly
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Shipping & Fulfillment */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-ivory)] text-[var(--color-brand-maroon)] flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 font-heading">
                Shipping & Delivery Rates
              </h2>
              <p className="text-xs text-gray-500">
                Default domestic flat-rate shipping calculation applied during checkout.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="max-w-md">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Flat Rate Shipping (INR ₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  name="shippingRate"
                  defaultValue={storeSettings.shippingRate}
                  min={0}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)]"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">
                Set to 0 for complimentary luxury doorstep delivery across India.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer bg-[var(--color-brand-dark)] text-white px-8 py-3 rounded-lg text-xs uppercase tracking-widest font-semibold hover:bg-[var(--color-brand-maroon)] transition-colors inline-flex items-center gap-2 shadow-xs disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving Changes..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
