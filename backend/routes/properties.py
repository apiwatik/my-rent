from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import Optional
from models import Property, PropertyCreate, PropertyUpdate
from auth import get_current_user_id
from database import get_db
from supabase import Client

router = APIRouter(prefix="/properties", tags=["properties"])


@router.get("/", response_model=list[Property])
def list_properties(
    search: Optional[str] = Query(None),
    bedrooms: Optional[int] = Query(None),
    max_price: Optional[float] = Query(None),
    status: Optional[str] = Query(None),
    user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db),
):
    query = db.table("properties").select("*").eq("user_id", user_id)

    if search:
        query = query.or_(
            f"address.ilike.%{search}%,suburb.ilike.%{search}%"
        )
    if bedrooms:
        if bedrooms >= 3:
            query = query.gte("bedrooms", bedrooms)
        else:
            query = query.eq("bedrooms", bedrooms)
    if max_price:
        query = query.lte("price_per_week", max_price)
    if status and status != "":
        query = query.eq("status", status)

    result = query.order("created_at", desc=True).execute()
    return result.data


@router.post("/", response_model=Property, status_code=status.HTTP_201_CREATED)
def create_property(
    data: PropertyCreate,
    user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db),
):
    payload = data.model_dump()
    payload["user_id"] = user_id

    result = db.table("properties").insert(payload).execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create property")
    return result.data[0]


@router.get("/{property_id}", response_model=Property)
def get_property(
    property_id: str,
    user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db),
):
    result = (
        db.table("properties")
        .select("*")
        .eq("id", property_id)
        .eq("user_id", user_id)
        .single()
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Property not found")
    return result.data


@router.put("/{property_id}", response_model=Property)
def update_property(
    property_id: str,
    data: PropertyUpdate,
    user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db),
):
    payload = data.model_dump(exclude_none=True)
    if not payload:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = (
        db.table("properties")
        .update(payload)
        .eq("id", property_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Property not found")
    return result.data[0]


@router.delete("/{property_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_property(
    property_id: str,
    user_id: str = Depends(get_current_user_id),
    db: Client = Depends(get_db),
):
    result = (
        db.table("properties")
        .delete()
        .eq("id", property_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=404, detail="Property not found")
