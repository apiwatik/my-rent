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
    <div className="space-y-[24px]">
      {/* Status switcher */}
      <div>
        <p className="text-[12px] font-semibold tracking-widest uppercase leading-none text-on-surface-variant mb-[16px]">
          Update Status
        </p>
        <div className="flex gap-[8px]">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              disabled={loading}
              onClick={() => changeStatus(opt.value)}
              className={`px-[16px] py-[8px] text-[12px] font-semibold tracking-widest uppercase transition-colors disabled:opacity-50 ${
                status === opt.value
                  ? "bg-black text-white"
                  : "border border-[0.5px] border-black text-black hover:bg-surface-container-low"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-[8px] pt-[24px] border-t border-[0.5px] border-[#e5e5e5]">
        <button
          disabled={loading}
          onClick={toggleWishlist}
          className="flex items-center gap-[8px] px-[16px] py-[8px] border border-[0.5px] border-black text-[12px] font-semibold tracking-widest uppercase hover:bg-surface-container-low transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">
            {wishlist ? "favorite" : "favorite_border"}
          </span>
          {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>

        <button
          disabled={loading}
          onClick={handleDelete}
          className="flex items-center gap-[8px] px-[16px] py-[8px] border border-[0.5px] border-error text-error text-[12px] font-semibold tracking-widest uppercase hover:bg-error-container transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
          Delete
        </button>
      </div>
    </div>
  );
}
