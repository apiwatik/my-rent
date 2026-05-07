import { Suspense } from "react";
import Link from "next/link";
import FilterBar from "@/components/FilterBar";
import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/properties";
import { Property, PropertyFilters } from "@/types";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

async function PropertyGrid({ filters }: { filters: PropertyFilters }) {
  let properties: Property[] = [];

  try {
    properties = await getProperties(filters);
  } catch {
    return (
      <div className="text-center py-20 bg-white rounded-[12px] border border-[#e0e0e0] mx-auto max-w-2xl">
        <span className="material-symbols-outlined text-[48px] text-[#ea4335] mb-4 block">
          error
        </span>
        <p className="text-[16px] text-[#202124] font-medium">
          Failed to load properties. Check the Supabase environment settings.
        </p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-[12px] border border-[#e0e0e0] mx-auto max-w-2xl flex flex-col items-center">
        <div className="w-20 h-20 bg-[#f1f3f4] rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[40px] text-[#1a73e8]">
            home_work
          </span>
        </div>
        <h2 className="text-[22px] font-medium text-[#202124] mb-2">No properties found</h2>
        <p className="text-[#5f6368] mb-8 max-w-md text-[14px]">
          We couldn't find any properties matching your current filters. Try adjusting your search or add a new property.
        </p>
        <Link
          href="/add"
          className="inline-flex items-center gap-2 bg-[#1a73e8] text-white px-6 py-2.5 rounded-[8px] text-[14px] font-medium hover:bg-[#1557b0] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Property
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: PropertyFilters = {
    search: params.search,
    bedrooms: params.bedrooms,
    max_price: params.max_price,
    status: params.status,
  };

  return (
    <>
      <Suspense>
        <FilterBar />
      </Suspense>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] overflow-hidden border border-[#e0e0e0] animate-pulse"
              >
                <div className="aspect-[4/3] bg-[#f1f3f4]" />
                <div className="p-5 space-y-4">
                  <div className="h-3 bg-[#e0e0e0] rounded-full w-1/3" />
                  <div className="h-5 bg-[#e0e0e0] rounded-full w-2/3" />
                  <div className="h-6 bg-[#e0e0e0] rounded-full w-1/2 mt-4" />
                </div>
              </div>
            ))}
          </div>
        }
      >
        <PropertyGrid filters={filters} />
      </Suspense>
    </>
  );
}
