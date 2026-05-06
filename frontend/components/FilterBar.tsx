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
    "block text-[12px] font-semibold tracking-widest uppercase leading-none text-on-surface-variant mb-[8px]";
  const inputClass =
    "w-full bg-transparent border-b border-[0.5px] border-black py-[8px] focus:ring-0 focus:outline-none placeholder:text-outline text-[16px] leading-[1.6]";
  const selectClass =
    "w-full bg-transparent border-b border-[0.5px] border-black py-[8px] focus:ring-0 focus:outline-none appearance-none text-[16px] leading-[1.6] cursor-pointer";

  return (
    <section className="mb-[80px]">
      <div className="bg-white border border-[0.5px] border-[#cfc4c5] p-[24px] flex flex-col md:flex-row gap-[16px] items-end">
        <div className="flex-1 w-full">
          <label className={labelClass}>Search Location</label>
          <div className="relative">
            <input
              className={inputClass}
              placeholder="Suburb or address"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
            <span className="material-symbols-outlined absolute right-0 bottom-[8px] text-on-surface-variant">
              search
            </span>
          </div>
        </div>

        <div className="w-full md:w-48">
          <label className={labelClass}>Bedrooms</label>
          <select
            className={selectClass}
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Any bedrooms</option>
            <option value="1">1 bed</option>
            <option value="2">2 beds</option>
            <option value="3">3+ beds</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <label className={labelClass}>Max Rent/Week</label>
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
        </div>

        <div className="w-full md:w-48">
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
        </div>

        <button
          onClick={applyFilters}
          disabled={isPending}
          className="w-full md:w-auto bg-black text-white px-[48px] py-3 text-[12px] font-semibold tracking-widest uppercase leading-none hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Apply Filters
        </button>
      </div>
    </section>
  );
}
