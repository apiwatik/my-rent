import { NextResponse } from "next/server";
import {
  deleteProperty,
  getProperty,
  updateProperty,
} from "@/lib/properties";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    return NextResponse.json(await getProperty(id));
  } catch {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const body = await request.json();
    const property = await updateProperty(id, body);
    return NextResponse.json(property);
  } catch {
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 404 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    await deleteProperty(id);
    return new Response(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 404 }
    );
  }
}
