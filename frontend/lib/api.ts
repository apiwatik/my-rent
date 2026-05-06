import { Property, PropertyFormData, PropertyFilters } from "@/types";

async function fetchApi(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export async function getProperties(
  filters: PropertyFilters = {}
): Promise<Property[]> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
  if (filters.max_price) params.set("max_price", filters.max_price);
  if (filters.status) params.set("status", filters.status);

  const query = params.toString() ? `?${params}` : "";
  const res = await fetchApi(`/api/properties${query}`);
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function getProperty(id: string): Promise<Property> {
  const res = await fetchApi(`/api/properties/${id}`);
  if (!res.ok) throw new Error("Property not found");
  return res.json();
}

export async function createProperty(data: PropertyFormData): Promise<Property> {
  const res = await fetchApi("/api/properties", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create property");
  return res.json();
}

export async function updateProperty(
  id: string,
  data: Partial<PropertyFormData>
): Promise<Property> {
  const res = await fetchApi(`/api/properties/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update property");
  return res.json();
}

export async function deleteProperty(id: string): Promise<void> {
  const res = await fetchApi(`/api/properties/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete property");
}
