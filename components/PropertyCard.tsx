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
    <Link href={`/property/${property.id}`} className="block group">
      <article className="bg-white rounded-[12px] overflow-hidden border border-[#e0e0e0] transition-shadow hover:shadow-md">
        <div className="aspect-[4/3] overflow-hidden relative bg-[#f1f3f4]">
          {property.image_url ? (
            <Image
              src={property.image_url}
              alt={property.address}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-[#bdc1c6]">
                home_work
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 z-10">
            <StatusBadge status={property.status} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-1">
            <p className="text-[12px] font-medium uppercase tracking-wide text-[#1a73e8]">
              {property.suburb}
            </p>
          </div>
          <h3 className="text-[18px] font-medium leading-[1.4] text-[#202124] mb-1 line-clamp-1 group-hover:text-[#1a73e8] transition-colors">
            {property.address}
          </h3>
          <p className="text-[22px] font-normal tracking-[-0.01em] text-[#202124] mb-4">
            ${property.price_per_week}
            <span className="text-[14px] text-[#5f6368] ml-1">/wk</span>
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#f1f3f4]">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f8f9fa] border border-[#e0e0e0] rounded-full text-[#5f6368] text-[12px] font-medium">
              <span className="material-symbols-outlined text-[16px]">bed</span>
              {property.bedrooms} bed
            </div>
            {property.has_parking && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f8f9fa] border border-[#e0e0e0] rounded-full text-[#5f6368] text-[12px] font-medium">
                <span className="material-symbols-outlined text-[16px]">
                  directions_car
                </span>
                Parking
              </div>
            )}
            {property.allows_pets && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f8f9fa] border border-[#e0e0e0] rounded-full text-[#5f6368] text-[12px] font-medium">
                <span className="material-symbols-outlined text-[16px]">
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
