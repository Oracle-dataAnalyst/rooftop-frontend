from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from core.exceptions import AddressNotFoundError
from core.models import LocationResult
from core.services.geocoding_service import GeocodingService

router = APIRouter()


class GeocodeRequest(BaseModel):
    address: str


@router.post("/geocode", response_model=LocationResult)
def geocode(request: GeocodeRequest) -> LocationResult:
    service = GeocodingService()
    try:
        return service.geocode(request.address)
    except AddressNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
