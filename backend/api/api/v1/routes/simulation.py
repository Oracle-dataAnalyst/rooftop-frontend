from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from core.constants import DEFAULT_BASELINE_SURFACE_TEMP_C
from core.exceptions import InvalidScenarioError
from core.models import ScenarioInput, SimulationResult
from core.services.scenario_service import ScenarioService

router = APIRouter()


class SimulationRequest(BaseModel):
    roof_area_m2: float
    scenario: ScenarioInput
    baseline_surface_temp_c: float | None = None


@router.post("/simulation", response_model=SimulationResult)
def simulate(request: SimulationRequest) -> SimulationResult:
    service = ScenarioService()
    try:
        return service.compute(
            roof_area_m2=request.roof_area_m2,
            scenario=request.scenario,
            baseline_surface_temp_c=request.baseline_surface_temp_c or DEFAULT_BASELINE_SURFACE_TEMP_C,
        )
    except InvalidScenarioError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
