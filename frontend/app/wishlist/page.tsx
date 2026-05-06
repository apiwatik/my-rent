import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";
import { Property } from "@/types";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  let properties: Property[] = [];

  try {
    const all = await getProperties();
    properties = all.filter((p) => p.is_wishlist);
  } catch {
    properties = [];
  }

  return (
    <>
      <div className="mb-[48px]">
        <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.02em]">
          Wishlist
        </h2>
        <p className="text-[16px] text-on-surface-variant mt-[8px]">
          {properties.length} saved{" "}
          {properties.length === 1 ? "property" : "properties"}
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-[80px] border border-[0.5px] border-[#e5e5e5]">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-[24px] block">
            favorite_border
          </span>
          <p className="text-[16px] text-on-surface-variant mb-[24px]">
            No wishlist properties yet
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-[48px] py-3 text-[12px] font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Browse Listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px]">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </>
  );
}
