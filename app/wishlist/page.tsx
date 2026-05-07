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
      <div className="mb-8 text-center">
        <h2 className="text-[28px] font-normal text-[#202124]">
          Wishlist
        </h2>
        <p className="text-[14px] text-[#5f6368] mt-2">
          {properties.length} saved{" "}
          {properties.length === 1 ? "property" : "properties"}
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[12px] border border-[#e0e0e0] mx-auto max-w-2xl flex flex-col items-center">
          <div className="w-20 h-20 bg-[#fce8e6] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[40px] text-[#d93025]">
              favorite
            </span>
          </div>
          <h2 className="text-[22px] font-medium text-[#202124] mb-2">No wishlist properties yet</h2>
          <p className="text-[14px] text-[#5f6368] mb-8 max-w-md">
            Save properties you like to your wishlist to easily compare them later.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1a73e8] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-medium hover:bg-[#1557b0] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            Browse Listings
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </>
  );
}
