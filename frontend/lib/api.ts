import { Property, PropertyFormData, PropertyFilters } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function fetchWithAuth(
  path: string,
  accessToken: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
}

export async function getProperties(
  accessToken: string,
  filters: PropertyFilters = {}
): Promise<Property[]> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
  if (filters.max_price) params.set("max_price", filters.max_price);
  if (filters.status) params.set("status", filters.status);

  const query = params.toString() ? `?${params}` : "";
  const res = await fetchWithAuth(`/properties${query}`, accessToken);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function getProperty(
  id: string,
  accessToken: string
): Promise<Property> {
  const res = await fetchWithAuth(`/properties/${id}`, accessToken);
  if (!res.ok) throw new Error("Property not found");
  return res.json();
}

export async function createProperty(
  data: PropertyFormData,
  accessToken: string
): Promise<Property> {
  const res = await fetchWithAuth("/properties", accessToken, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create property");
  return res.json();
}

export async function updateProperty(
  id: string,
  data: Partial<PropertyFormData>,
  accessToken: string
): Promise<Property> {
  const res = await fetchWithAuth(`/properties/${id}`, accessToken, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
}

export async function deleteProperty(
  id: string,
  accessToken: string
): Promise<void> {
  const res = await fetchWithAuth(`/properties/${id}`, accessToken, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete property");
}
