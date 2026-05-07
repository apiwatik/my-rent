"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("max_price") ?? ""
  );
  const [status, setStatus] = useState(searchParams.get("status") ?? "");

  function applyFilters() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (maxPrice) params.set("max_price", maxPrice);
    if (status) params.set("status", status);

    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  const labelClass =
    "block text-[12px] font-medium text-[#5f6368] mb-1 ml-1";
  const inputClass =
    "w-full bg-[#f1f3f4] border-none rounded-[8px] px-4 py-2.5 text-[#202124] focus:bg-white focus:ring-[2px] focus:ring-[#1a73e8] outline-none transition-colors placeholder:text-[#80868b] text-[14px]";
  const selectClass =
    "w-full bg-[#f1f3f4] border-none rounded-[8px] px-4 py-2.5 text-[#202124] focus:bg-white focus:ring-[2px] focus:ring-[#1a73e8] outline-none transition-colors appearance-none cursor-pointer text-[14px]";

  return (
    <section className="mb-8">
      <div className="bg-white rounded-[12px] border border-[#e0e0e0] p-5 flex flex-col lg:flex-row gap-4 items-end">
        <div className="flex-1 w-full relative">
          <label className={labelClass}>Location</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#5f6368] pointer-events-none text-[20px]">
              search
            </span>
            <input
              className={`${inputClass} pl-10`}
              placeholder="Suburb or address"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>
        </div>

        <div className="w-full lg:w-40 relative">
          <label className={labelClass}>Bedrooms</label>
          <select
            className={selectClass}
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Any beds</option>
            <option value="1">1 bed</option>
            <option value="2">2 beds</option>
            <option value="3">3+ beds</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-[34px] text-[#5f6368] pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>

        <div className="w-full lg:w-40 relative">
          <label className={labelClass}>Max Rent</label>
          <select
            className={selectClass}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="">No limit</option>
            <option value="500">$500</option>
            <option value="700">$700</option>
            <option value="1000">$1000</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-[34px] text-[#5f6368] pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>

        <div className="w-full lg:w-40 relative">
          <label className={labelClass}>Status</label>
          <select
            className={selectClass}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="visited">Visited</option>
            <option value="rejected">Rejected</option>
          </select>
          <span className="material-symbols-outlined absolute right-3 top-[34px] text-[#5f6368] pointer-events-none text-[20px]">
            expand_more
          </span>
        </div>

        <button
          onClick={applyFilters}
          disabled={isPending}
          className="w-full lg:w-auto bg-[#1a73e8] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-medium hover:bg-[#1557b0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span>
          ) : (
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
          )}
          <span>Filter</span>
        </button>
      </div>
    </section>
  );
}
