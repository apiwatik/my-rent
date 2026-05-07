"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProperty, deleteProperty } from "@/lib/api";
import { PropertyStatus } from "@/types";

interface Props {
  propertyId: string;
  currentStatus: PropertyStatus;
  isWishlist: boolean;
}

export default function PropertyDetailActions({
  propertyId,
  currentStatus,
  isWishlist,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [wishlist, setWishlist] = useState(isWishlist);
  const [loading, setLoading] = useState(false);

  const statusOptions: { value: PropertyStatus; label: string }[] = [
    { value: "active", label: "Active" },
    { value: "visited", label: "Visited" },
    { value: "rejected", label: "Rejected" },
  ];

  async function changeStatus(newStatus: PropertyStatus) {
    setLoading(true);
    try {
      await updateProperty(propertyId, { status: newStatus });
      setStatus(newStatus);
    } finally {
      setLoading(false);
    }
  }

  async function toggleWishlist() {
    setLoading(true);
    try {
      await updateProperty(propertyId, { is_wishlist: !wishlist });
      setWishlist(!wishlist);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    setLoading(true);
    try {
      await deleteProperty(propertyId);
      router.push("/");
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Status switcher */}
      <div>
        <p className="text-[14px] font-medium text-[#202124] mb-3 flex items-center gap-2">
          Update Status
        </p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              disabled={loading}
              onClick={() => changeStatus(opt.value)}
              className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors disabled:opacity-50 ${
                status === opt.value
                  ? "bg-[#e8f0fe] text-[#1a73e8] border border-[#e8f0fe]"
                  : "bg-white border border-[#e0e0e0] text-[#5f6368] hover:bg-[#f8f9fa]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          disabled={loading}
          onClick={toggleWishlist}
          className={`flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors disabled:opacity-50 ${
            wishlist
              ? "bg-[#fce8e6] text-[#d93025] hover:bg-[#fad2cf] border-none"
              : "bg-white border border-[#e0e0e0] text-[#5f6368] hover:bg-[#f8f9fa]"
          }`}
        >
          <span className={`material-symbols-outlined text-[20px] ${wishlist ? "fill-current" : ""}`}>
            {wishlist ? "favorite" : "favorite_border"}
          </span>
          {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>

        <button
          disabled={loading}
          onClick={handleDelete}
          className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-5 py-2.5 bg-white border border-[#e0e0e0] rounded-[8px] text-[#d93025] text-[14px] font-medium hover:bg-[#fce8e6] hover:border-[#fce8e6] transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
          Delete
        </button>
      </div>
    </div>
  );
}
