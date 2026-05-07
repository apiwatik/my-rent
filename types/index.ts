export type PropertyStatus = "active" | "visited" | "rejected";

export interface Property {
  id: string;
  address: string;
  suburb: string;
  price_per_week: number;
  bedrooms: number;
  status: PropertyStatus;
  has_parking: boolean;
  allows_pets: boolean;
  image_url: string | null;
  notes: string | null;
  listing_url: string | null;
  is_wishlist: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyFormData {
  address: string;
  suburb: string;
  price_per_week: number;
  bedrooms: number;
  status: PropertyStatus;
  has_parking: boolean;
  allows_pets: boolean;
  image_url?: string;
  notes?: string;
  listing_url?: string;
  is_wishlist: boolean;
}

export interface PropertyFilters {
  search?: string;
  bedrooms?: string;
  max_price?: string;
  status?: string;
}
