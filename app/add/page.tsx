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
    "block text-[14px] font-medium text-[#202124] mb-2";
  const inputClass =
    "w-full bg-[#f1f3f4] border-none rounded-[8px] px-4 py-3 text-[#202124] focus:bg-white focus:ring-[2px] focus:ring-[#1a73e8] outline-none transition-colors placeholder:text-[#80868b] text-[14px]";
  const selectClass =
    "w-full bg-[#f1f3f4] border-none rounded-[8px] px-4 py-3 text-[#202124] focus:bg-white focus:ring-[2px] focus:ring-[#1a73e8] outline-none transition-colors appearance-none cursor-pointer text-[14px]";

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
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-[28px] font-normal text-[#202124]">
          Add Property
        </h2>
        <p className="text-[14px] text-[#5f6368] mt-2">
          Track a new rental property and save its details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-6 md:p-8 space-y-6">
          {error && (
            <div className="bg-[#fce8e6] text-[#c5221f] p-4 rounded-[8px] text-[14px] flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="relative">
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
              <span className="material-symbols-outlined absolute right-4 top-[38px] text-[#5f6368] pointer-events-none text-lg">
                expand_more
              </span>
            </div>
            <div className="relative">
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
              <span className="material-symbols-outlined absolute right-4 top-[38px] text-[#5f6368] pointer-events-none text-lg">
                expand_more
              </span>
            </div>
          </div>

          <div>
            <label className={labelClass}>Listing URL</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://domain.com.au/..."
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
              className={`${inputClass} resize-y min-h-[120px]`}
              placeholder="Pros, cons, observations..."
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] border-2 border-[#5f6368] rounded-[2px] checked:bg-[#1a73e8] checked:border-[#1a73e8] focus:ring-[2px] focus:ring-[#1a73e8] outline-none appearance-none cursor-pointer flex items-center justify-center after:content-[''] after:hidden checked:after:block after:w-[5px] after:h-[10px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45 after:-mt-1"
                checked={form.has_parking}
                onChange={(e) => update("has_parking", e.target.checked)}
              />
              <span className="text-[14px] text-[#202124]">Has Parking</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] border-2 border-[#5f6368] rounded-[2px] checked:bg-[#1a73e8] checked:border-[#1a73e8] focus:ring-[2px] focus:ring-[#1a73e8] outline-none appearance-none cursor-pointer flex items-center justify-center after:content-[''] after:hidden checked:after:block after:w-[5px] after:h-[10px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45 after:-mt-1"
                checked={form.allows_pets}
                onChange={(e) => update("allows_pets", e.target.checked)}
              />
              <span className="text-[14px] text-[#202124]">Allows Pets</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] border-2 border-[#5f6368] rounded-[2px] checked:bg-[#1a73e8] checked:border-[#1a73e8] focus:ring-[2px] focus:ring-[#1a73e8] outline-none appearance-none cursor-pointer flex items-center justify-center after:content-[''] after:hidden checked:after:block after:w-[5px] after:h-[10px] after:border-r-[2px] after:border-b-[2px] after:border-white after:rotate-45 after:-mt-1"
                checked={form.is_wishlist}
                onChange={(e) => update("is_wishlist", e.target.checked)}
              />
              <span className="text-[14px] text-[#202124]">Save to Wishlist</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-[8px] text-[#1a73e8] text-[14px] font-medium hover:bg-[#f1f3f4] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1a73e8] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-medium hover:bg-[#1557b0] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
                Saving...
              </>
            ) : (
              <>
                Add Property
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
