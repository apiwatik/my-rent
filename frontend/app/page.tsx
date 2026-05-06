import { Suspense } from "react";
import FilterBar from "@/components/FilterBar";
import PropertyCard from "@/components/PropertyCard";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getProperties } from "@/lib/api";
import { Property, PropertyFilters } from "@/types";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

async function PropertyGrid({ filters }: { filters: PropertyFilters }) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="text-center py-[80px]">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-[24px] block">
          lock
        </span>
        <p className="text-[16px] text-on-surface-variant mb-[24px]">
          Sign in to view your properties
        </p>
        <Link
          href="/login"
          className="inline-block bg-black text-white px-[48px] py-3 text-[12px] font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    );
  }

  let properties: Property[] = [];
  try {
    properties = await getProperties(session.access_token, filters);
  } catch {
    return (
      <div className="text-center py-[80px]">
        <p className="text-[16px] text-on-surface-variant">
          Failed to load properties. Make sure the API is running.
        </p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-[80px]">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-[24px] block">
          home_work
        </span>
        <p className="text-[16px] text-on-surface-variant mb-[24px]">
          No properties found. Add your first one!
        </p>
        <Link
          href="/add"
          className="inline-block bg-black text-white px-[48px] py-3 text-[12px] font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          Add Property
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px]">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[0.5px] border-[#e5e5e5] animate-pulse"
              >
                <div className="aspect-[4/3] bg-surface-container-high" />
                <div className="p-[24px] space-y-[8px]">
                  <div className="h-3 bg-surface-container-high w-1/3" />
                  <div className="h-5 bg-surface-container-high w-2/3" />
                  <div className="h-6 bg-surface-container-high w-1/2" />
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
