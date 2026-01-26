export type GeoPoint = {
  lat: number;
  lon: number;
};

export type LocationResult = {
  input_address: string;
  normalized_address: string;
  point: GeoPoint;
  provider: string;
  extra?: Record<string, unknown>;
};

export type BuildingCandidate = {
  building_id: string;
  name?: string | null;
  address?: string | null;
  distance_m?: number | null;
  extra?: Record<string, unknown>;
};

export type RooftopAreaEstimate = {
  roof_area_m2_suggested: number | null;
  floor_area_m2: number | null;
  availability_ratio: number | null;
  confidence: "low" | "medium" | "high";
  note?: string | null;
  candidates: BuildingCandidate[];
};

export type ScenarioInput = {
  greening_type: "grass" | "sedum" | "shrub" | "tree";
  coverage_ratio: number;
  tree_count?: number;
  species?: string | null;
};

export type SimulationResult = {
  roof_area_m2: number;
  greening_type: string;
  coverage_ratio: number;
  tree_count: number;
  species?: string | null;
  green_area_m2: number;
  co2_absorption_kg_per_year: number;
  temp_reduction_c: number;
  baseline_surface_temp_c: number;
  after_surface_temp_c: number;
  tree_equivalent_count: number;
  engine_version: string;
  coefficient_set_version: string;
  meta?: Record<string, unknown>;
};

const STORAGE_KEYS = {
  location: "rooftop.location",
  estimate: "rooftop.estimate",
  confirmedArea: "rooftop.confirmed_area",
  scenario: "rooftop.scenario",
  result: "rooftop.result",
};

const readJson = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const writeJson = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearSimulationState = () => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};

export const getLocation = () => readJson<LocationResult>(STORAGE_KEYS.location);
export const setLocation = (value: LocationResult) => writeJson(STORAGE_KEYS.location, value);

export const getEstimate = () => readJson<RooftopAreaEstimate>(STORAGE_KEYS.estimate);
export const setEstimate = (value: RooftopAreaEstimate) => writeJson(STORAGE_KEYS.estimate, value);

export const getConfirmedArea = () => readJson<number>(STORAGE_KEYS.confirmedArea);
export const setConfirmedArea = (value: number) => writeJson(STORAGE_KEYS.confirmedArea, value);

export const getScenario = () => readJson<ScenarioInput>(STORAGE_KEYS.scenario);
export const setScenario = (value: ScenarioInput) => writeJson(STORAGE_KEYS.scenario, value);

export const getResult = () => readJson<SimulationResult>(STORAGE_KEYS.result);
export const setResult = (value: SimulationResult) => writeJson(STORAGE_KEYS.result, value);
