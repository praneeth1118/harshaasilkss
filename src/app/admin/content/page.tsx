"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Layout,
  Megaphone,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function AdminContentPage() {
  const { storeContent, updateContent } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewImage, setPreviewImage] = useState(storeContent.heroImageUrl);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const formData = new FormData(e.currentTarget);
    const heroHeadline = formData.get("heroHeadline") as string;
    const heroSubtext = formData.get("heroSubtext") as string;
    const heroImageUrl = (formData.get("heroImageUrl") as string) || "/images/hero.png";
    const announcementBar = formData.get("announcementBar") as string;

    setTimeout(() => {
      updateContent({
        heroHeadline,
        heroSubtext,
        heroImageUrl,
        announcementBar,
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
            Storefront Content
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Customize live hero banners, headlines, and promotional announcement messages across your boutique.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg animate-in fade-in duration-200 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Storefront Content Updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: Announcement Bar */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-ivory)] text-[var(--color-brand-maroon)] flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 font-heading">
                Top Announcement Bar
              </h2>
              <p className="text-xs text-gray-500">
                Notice displayed prominently at the very top of all storefront pages.
              </p>
            </div>
          </div>

          <div className="p-6">
            <label className="block text-xs font-medium text-gray-700 mb-1.5">
              Announcement Message
            </label>
            <input
              type="text"
              name="announcementBar"
              defaultValue={storeContent.announcementBar}
              required
              placeholder="e.g. Complimentary Insured Delivery Across India on Orders Over ₹20,000"
              className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)]"
            />
          </div>
        </div>

        {/* Card 2: Homepage Hero */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-ivory)] text-[var(--color-brand-maroon)] flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 font-heading">
                Homepage Hero Section
              </h2>
              <p className="text-xs text-gray-500">
                The primary banner and luxury introductory text greeting every boutique visitor.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Hero Main Headline
              </label>
              <input
                type="text"
                name="heroHeadline"
                defaultValue={storeContent.heroHeadline}
                required
                placeholder="e.g. Elegance Woven in Threads"
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)] font-heading text-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Hero Subtext / Narrative
              </label>
              <textarea
                name="heroSubtext"
                defaultValue={storeContent.heroSubtext}
                rows={3}
                required
                placeholder="Write a captivating luxury brand narrative..."
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Hero Background Image Path / URL
                </label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="heroImageUrl"
                    defaultValue={storeContent.heroImageUrl}
                    onChange={(e) => setPreviewImage(e.target.value)}
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[var(--color-brand-maroon)] focus:ring-1 focus:ring-[var(--color-brand-maroon)] text-xs text-gray-600"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Default luxury assets: <code className="bg-gray-100 px-1 py-0.5 rounded">/images/hero.png</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">/images/collection_bridal.png</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">/images/heritage.png</code>
                </p>
              </div>

              {/* Live Preview Thumbnail */}
              <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex flex-col items-center justify-center text-center">
                <p className="text-[11px] font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Live Image Preview
                </p>
                <div className="relative w-full h-24 rounded bg-gray-200 overflow-hidden border border-gray-300 shadow-2xs">
                  <Image
                    src={previewImage || "/images/hero.png"}
                    alt="Hero Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
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
            <span>{isSaving ? "Saving Content..." : "Save Content"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
