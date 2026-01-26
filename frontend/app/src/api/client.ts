import { apiBaseUrl, request } from "./http";

import type { LocationResult, RooftopAreaEstimate, ScenarioInput, SimulationResult } from "../utils/simulationStorage";

export const postChat = (message: string) => {
  return request("/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
};

export const postGeocode = (address: string): Promise<LocationResult> => {
  return request("/geocode", {
    method: "POST",
    body: JSON.stringify({ address }),
  });
};

export const postRooftopEstimate = (lat: number, lon: number): Promise<RooftopAreaEstimate> => {
  return request("/buildings/estimate", {
    method: "POST",
    body: JSON.stringify({ lat, lon }),
  });
};

export const postSimulation = (
  roof_area_m2: number,
  scenario: ScenarioInput,
  baseline_surface_temp_c?: number
): Promise<SimulationResult> => {
  return request("/simulation", {
    method: "POST",
    body: JSON.stringify({ roof_area_m2, scenario, baseline_surface_temp_c }),
  });
};

export const downloadReport = async (path: "/reports/pdf" | "/reports/excel", result: SimulationResult) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result }),
  });

  if (!response.ok) {
    throw new Error(`리포트 생성 실패: ${response.status}`);
  }

  return response.blob();
};
