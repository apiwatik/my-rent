import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Property, PropertyFilters, PropertyFormData } from "@/types";

const TABLE = "properties";

type PropertyPayload = Partial<
  Omit<PropertyFormData, "image_url" | "notes" | "listing_url">
> & {
  image_url?: string | null;
  notes?: string | null;
  listing_url?: string | null;
};

function normalizeSearch(search: string) {
  return search.replace(/[%,()]/g, " ").trim();
}

function cleanPayload(data: Partial<PropertyFormData>): PropertyPayload {
  const payload: PropertyPayload = { ...data };

  for (const key of ["image_url", "notes", "listing_url"] as const) {
    if (payload[key] === "") {
      payload[key] = null;
    }
  }

  return payload;
}

export async function getProperties(
  filters: PropertyFilters = {}
): Promise<Property[]> {
  const supabase = createServerSupabaseClient();
  let query = supabase.from(TABLE).select("*");

  if (filters.search) {
    const search = normalizeSearch(filters.search);
    if (search) {
      query = query.or(`address.ilike.%${search}%,suburb.ilike.%${search}%`);
    }
  }

  if (filters.bedrooms) {
    const bedrooms = Number(filters.bedrooms);
    if (!Number.isNaN(bedrooms)) {
      query =
        bedrooms >= 3
          ? query.gte("bedrooms", bedrooms)
          : query.eq("bedrooms", bedrooms);
    }
  }

  if (filters.max_price) {
    const maxPrice = Number(filters.max_price);
    if (!Number.isNaN(maxPrice)) {
      query = query.lte("price_per_week", maxPrice);
    }
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProperty(id: string): Promise<Property> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Property not found");
  }

  return data;
}

export async function createProperty(data: PropertyFormData): Promise<Property> {
  const supabase = createServerSupabaseClient();
  const { data: property, error } = await supabase
    .from(TABLE)
    .insert(cleanPayload(data))
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return property;
}

export async function updateProperty(
  id: string,
  data: Partial<PropertyFormData>
): Promise<Property> {
  const supabase = createServerSupabaseClient();
  const { data: property, error } = await supabase
    .from(TABLE)
    .update(cleanPayload(data))
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!property) {
    throw new Error("Property not found");
  }

  return property;
}

export async function deleteProperty(id: string): Promise<void> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Property not found");
  }
}
