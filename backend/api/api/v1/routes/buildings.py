from fastapi import APIRouter
from pydantic import BaseModel

from core.models import RooftopAreaEstimate
from core.services.building_service import BuildingService
from core.services.rooftop_service import RooftopService

router = APIRouter()


class RooftopEstimateRequest(BaseModel):
    lat: float
    lon: float


@router.post("/buildings/estimate", response_model=RooftopAreaEstimate)
def estimate_rooftop_area(request: RooftopEstimateRequest) -> RooftopAreaEstimate:
    building_service = BuildingService()
    rooftop_service = RooftopService()
    candidates = building_service.find_candidates(request.lat, request.lon)
    return rooftop_service.estimate_area(candidates, lat=request.lat, lon=request.lon)
