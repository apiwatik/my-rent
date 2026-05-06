import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getProperty } from "@/lib/api";
import { Property } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import PropertyDetailActions from "./PropertyDetailActions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <div className="text-center py-[80px]">
        <p className="text-[16px] text-on-surface-variant mb-[24px]">
          Sign in to view this property
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

  let property: Property;
  try {
    property = await getProperty(id, session.access_token);
  } catch {
    notFound();
  }

  return (
    <>
      <div className="mb-[24px]">
        <Link
          href="/"
          className="flex items-center gap-[8px] text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-black transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">
            arrow_back
          </span>
          Back to Listings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px]">
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden bg-surface-container-high">
          {property.image_url ? (
            <Image
              src={property.image_url}
              alt={property.address}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant">
                home_work
              </span>
            </div>
          )}
          <div className="absolute top-[24px] right-[24px]">
            <StatusBadge status={property.status} />
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-[12px] font-semibold tracking-widest uppercase leading-none text-on-surface-variant mb-[8px]">
            {property.suburb}
          </p>
          <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.02em] mb-[8px]">
            {property.address}
          </h1>
          <p className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] mb-[48px]">
            ${property.price_per_week}/wk
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-[8px] mb-[48px]">
            <div className="flex items-center gap-1 px-[16px] py-[8px] bg-surface-container-low text-on-surface-variant text-[11px] font-medium">
              <span className="material-symbols-outlined text-[14px]">bed</span>
              {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}
            </div>
            {property.has_parking && (
              <div className="flex items-center gap-1 px-[16px] py-[8px] bg-surface-container-low text-on-surface-variant text-[11px] font-medium">
                <span className="material-symbols-outlined text-[14px]">
                  directions_car
                </span>
                Parking
              </div>
            )}
            {property.allows_pets && (
              <div className="flex items-center gap-1 px-[16px] py-[8px] bg-surface-container-low text-on-surface-variant text-[11px] font-medium">
                <span className="material-symbols-outlined text-[14px]">
                  pets
                </span>
                Pets OK
              </div>
            )}
            {property.is_wishlist && (
              <div className="flex items-center gap-1 px-[16px] py-[8px] bg-surface-container-low text-on-surface-variant text-[11px] font-medium">
                <span className="material-symbols-outlined text-[14px]">
                  favorite
                </span>
                Wishlisted
              </div>
            )}
          </div>

          {/* Notes */}
          {property.notes && (
            <div className="border-t border-[0.5px] border-[#e5e5e5] pt-[24px] mb-[24px]">
              <p className="text-[12px] font-semibold tracking-widest uppercase leading-none text-on-surface-variant mb-[8px]">
                Notes
              </p>
              <p className="text-[16px] leading-[1.6] whitespace-pre-wrap">
                {property.notes}
              </p>
            </div>
          )}

          {/* Listing URL */}
          {property.listing_url && (
            <div className="mb-[24px]">
              <a
                href={property.listing_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-[8px] text-[12px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-black transition-colors border border-[0.5px] border-current px-[16px] py-[8px] inline-flex"
              >
                <span className="material-symbols-outlined text-[16px]">
                  open_in_new
                </span>
                View Listing
              </a>
            </div>
          )}

          <PropertyDetailActions
            propertyId={property.id}
            currentStatus={property.status}
            isWishlist={property.is_wishlist}
            accessToken={session.access_token}
          />
        </div>
      </div>
    </>
  );
}
