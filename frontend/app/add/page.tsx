"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProperty } from "@/lib/api";
import { PropertyFormData, PropertyStatus } from "@/types";

export default function AddPropertyPage() {
  const router = useRouter();
  const [form, setForm] = useState<PropertyFormData>({
    address: "",
    suburb: "",
    price_per_week: 0,
    bedrooms: 1,
    status: "active",
    has_parking: false,
    allows_pets: false,
    image_url: "",
    notes: "",
    listing_url: "",
    is_wishlist: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labelClass =
    "block text-[12px] font-semibold tracking-widest uppercase leading-none text-on-surface-variant mb-[8px]";
  const inputClass =
    "w-full bg-transparent border-b border-[0.5px] border-black py-[8px] focus:ring-0 focus:outline-none placeholder:text-outline text-[16px] leading-[1.6]";
  const selectClass =
    "w-full bg-transparent border-b border-[0.5px] border-black py-[8px] focus:ring-0 focus:outline-none appearance-none text-[16px] leading-[1.6] cursor-pointer";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const property = await createProperty(form);
      router.push(`/property/${property.id}`);
    } catch {
      setError("Failed to add property. Please try again.");
      setLoading(false);
    }
  }

  function update<K extends keyof PropertyFormData>(
    key: K,
    value: PropertyFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      <div className="mb-[48px]">
        <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]">
          Add Property
        </h2>
        <p className="text-[16px] text-on-surface-variant mt-[8px]">
          Track a new rental property
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white border border-[0.5px] border-[#e5e5e5] p-[24px] space-y-[24px]">
          {error && (
            <div className="bg-error-container text-on-error-container p-[16px] text-[14px]">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div>
              <label className={labelClass}>Address *</label>
              <input
                required
                className={inputClass}
                placeholder="303/111 Molesworth St"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Suburb *</label>
              <input
                required
                className={inputClass}
                placeholder="Thorndon"
                value={form.suburb}
                onChange={(e) => update("suburb", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            <div>
              <label className={labelClass}>Rent/Week ($) *</label>
              <input
                required
                type="number"
                min="0"
                className={inputClass}
                placeholder="695"
                value={form.price_per_week || ""}
                onChange={(e) =>
                  update("price_per_week", Number(e.target.value))
                }
              />
            </div>
            <div>
              <label className={labelClass}>Bedrooms *</label>
              <select
                className={selectClass}
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} bed{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                className={selectClass}
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as PropertyStatus)
                }
              >
                <option value="active">Active</option>
                <option value="visited">Visited</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Listing URL</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://trademe.co.nz/..."
              value={form.listing_url}
              onChange={(e) => update("listing_url", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Image URL</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://..."
              value={form.image_url}
              onChange={(e) => update("image_url", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea
              className="w-full bg-transparent border border-[0.5px] border-black p-[8px] focus:ring-0 focus:outline-none placeholder:text-outline text-[16px] leading-[1.6] resize-none"
              rows={3}
              placeholder="Pros, cons, observations..."
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-[24px]">
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 border border-[0.5px] border-black accent-black"
                checked={form.has_parking}
                onChange={(e) => update("has_parking", e.target.checked)}
              />
              <span className="text-[14px]">Has Parking</span>
            </label>
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 border border-[0.5px] border-black accent-black"
                checked={form.allows_pets}
                onChange={(e) => update("allows_pets", e.target.checked)}
              />
              <span className="text-[14px]">Allows Pets</span>
            </label>
            <label className="flex items-center gap-[8px] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 border border-[0.5px] border-black accent-black"
                checked={form.is_wishlist}
                onChange={(e) => update("is_wishlist", e.target.checked)}
              />
              <span className="text-[14px]">Save to Wishlist</span>
            </label>
          </div>
        </div>

        <div className="flex gap-[16px] mt-[24px]">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-[48px] py-3 text-[12px] font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Property"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="border border-[0.5px] border-black px-[48px] py-3 text-[12px] font-semibold tracking-widest uppercase hover:bg-surface-container-low transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
