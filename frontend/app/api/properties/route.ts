import { NextResponse } from "next/server";
import {
  createProperty,
  getProperties,
} from "@/lib/properties";
import { PropertyFilters } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters: PropertyFilters = {
    search: searchParams.get("search") ?? undefined,
    bedrooms: searchParams.get("bedrooms") ?? undefined,
    max_price: searchParams.get("max_price") ?? undefined,
    status: searchParams.get("status") ?? undefined,
  };

  try {
    return NextResponse.json(await getProperties(filters));
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const property = await createProperty(body);
    return NextResponse.json(property, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
