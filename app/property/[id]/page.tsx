import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { getProperty } from "@/lib/properties";
import { Property } from "@/types";
import PropertyDetailActions from "./PropertyDetailActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  let property: Property;

  try {
    property = await getProperty(id);
  } catch {
    notFound();
  }

  return (
    <>
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#1a73e8] hover:bg-[#f1f3f4] px-3 py-1.5 rounded-full transition-colors -ml-3"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[4/3] relative rounded-[12px] overflow-hidden bg-[#f1f3f4] border border-[#e0e0e0]">
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
              <span className="material-symbols-outlined text-[64px] text-[#bdc1c6]">
                home_work
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 z-10">
            <StatusBadge status={property.status} />
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-[12px] border border-[#e0e0e0] p-6 lg:p-8">
          <p className="text-[12px] font-medium uppercase tracking-wide text-[#1a73e8] mb-2">
            {property.suburb}
          </p>
          <h1 className="text-[28px] md:text-[32px] font-normal leading-tight text-[#202124] mb-4">
            {property.address}
          </h1>
          <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[#e0e0e0]">
            <p className="text-[36px] font-normal tracking-tight text-[#202124]">
              ${property.price_per_week}
            </p>
            <p className="text-[16px] text-[#5f6368]">/week</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#f8f9fa] rounded-full border border-[#e0e0e0] text-[#5f6368] text-[14px] font-medium">
              <span className="material-symbols-outlined text-[18px]">bed</span>
              {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}
            </div>
            {property.has_parking && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f8f9fa] rounded-full border border-[#e0e0e0] text-[#5f6368] text-[14px] font-medium">
                <span className="material-symbols-outlined text-[18px]">
                  directions_car
                </span>
                Parking
              </div>
            )}
            {property.allows_pets && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#f8f9fa] rounded-full border border-[#e0e0e0] text-[#5f6368] text-[14px] font-medium">
                <span className="material-symbols-outlined text-[18px]">
                  pets
                </span>
                Pets OK
              </div>
            )}
            {property.is_wishlist && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#fce8e6] rounded-full text-[#d93025] text-[14px] font-medium border border-[#fad2cf]">
                <span className="material-symbols-outlined text-[18px]">
                  favorite
                </span>
                Wishlisted
              </div>
            )}
          </div>

          {property.notes && (
            <div className="mb-8">
              <p className="text-[14px] font-medium text-[#202124] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#5f6368]">notes</span>
                Notes
              </p>
              <p className="text-[#5f6368] leading-relaxed whitespace-pre-wrap text-[14px] bg-[#f8f9fa] p-4 rounded-[8px] border border-[#e0e0e0]">
                {property.notes}
              </p>
            </div>
          )}

          {property.listing_url && (
            <div className="mb-8">
              <a
                href={property.listing_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#e0e0e0] hover:bg-[#f8f9fa] rounded-full text-[14px] font-medium text-[#1a73e8] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  open_in_new
                </span>
                View Original Listing
              </a>
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-[#e0e0e0]">
            <PropertyDetailActions
              propertyId={property.id}
              currentStatus={property.status}
              isWishlist={property.is_wishlist}
            />
          </div>
        </div>
      </div>
    </>
  );
}
