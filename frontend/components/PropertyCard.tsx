"use client";

import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types";
import StatusBadge from "./StatusBadge";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <article className="bg-white border border-[#e5e5e5] border-[0.5px] cursor-pointer group hover:border-black transition-colors">
        <div className="aspect-[4/3] overflow-hidden relative bg-surface-container-high">
          {property.image_url ? (
            <Image
              src={property.image_url}
              alt={property.address}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-container">
              <span className="material-symbols-outlined text-[48px] text-on-surface-variant">
                home_work
              </span>
            </div>
          )}
          <div className="absolute top-[24px] right-[24px]">
            <StatusBadge status={property.status} />
          </div>
        </div>

        <div className="p-[24px]">
          <p className="text-[12px] font-semibold tracking-widest uppercase leading-none text-on-surface-variant mb-[4px]">
            {property.suburb}
          </p>
          <h3 className="text-[18px] font-semibold leading-[1.4] mb-[8px] truncate">
            {property.address}
          </h3>
          <p className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-black mb-[24px]">
            ${property.price_per_week}/wk
          </p>

          <div className="flex gap-[8px] border-t border-[0.5px] border-[#e5e5e5] pt-[24px]">
            <div className="flex items-center gap-1 px-[16px] py-[4px] bg-[#f3f3f3] text-on-surface-variant text-[11px] font-medium leading-none">
              <span className="material-symbols-outlined text-[14px]">bed</span>
              {property.bedrooms} bed
            </div>
            {property.has_parking && (
              <div className="flex items-center gap-1 px-[16px] py-[4px] bg-[#f3f3f3] text-on-surface-variant text-[11px] font-medium leading-none">
                <span className="material-symbols-outlined text-[14px]">
                  directions_car
                </span>
                Parking
              </div>
            )}
            {property.allows_pets && (
              <div className="flex items-center gap-1 px-[16px] py-[4px] bg-[#f3f3f3] text-on-surface-variant text-[11px] font-medium leading-none">
                <span className="material-symbols-outlined text-[14px]">
                  pets
                </span>
                Pets
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
