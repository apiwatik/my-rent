from pydantic import BaseModel, HttpUrl
from typing import Optional, Literal
from datetime import datetime
from uuid import UUID


PropertyStatus = Literal["active", "visited", "rejected"]


class PropertyBase(BaseModel):
    address: str
    suburb: str
    price_per_week: float
    bedrooms: int
    status: PropertyStatus = "active"
    has_parking: bool = False
    allows_pets: bool = False
    image_url: Optional[str] = None
    notes: Optional[str] = None
    listing_url: Optional[str] = None
    is_wishlist: bool = False


class PropertyCreate(PropertyBase):
    pass


class PropertyUpdate(BaseModel):
    address: Optional[str] = None
    suburb: Optional[str] = None
    price_per_week: Optional[float] = None
    bedrooms: Optional[int] = None
    status: Optional[PropertyStatus] = None
    has_parking: Optional[bool] = None
    allows_pets: Optional[bool] = None
    image_url: Optional[str] = None
    notes: Optional[str] = None
    listing_url: Optional[str] = None
    is_wishlist: Optional[bool] = None


class Property(PropertyBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
