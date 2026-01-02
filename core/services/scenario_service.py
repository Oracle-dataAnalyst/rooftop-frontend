from __future__ import annotations

from core.constants import (
    DEFAULT_BASELINE_SURFACE_TEMP_C,
    CO2_COEF,
    TEMP_COEF,
    TREE_CO2,
    SPECIES_INFO,
)
from core.models import ScenarioInput, SimulationResult
from core.config import settings
from core.exceptions import InvalidScenarioError

class ScenarioService:
    def compute(
        self,
        roof_area_m2: float,
        scenario: ScenarioInput,
        baseline_surface_temp_c: float = DEFAULT_BASELINE_SURFACE_TEMP_C,
    ) -> SimulationResult:
        if roof_area_m2 <= 0:
            raise InvalidScenarioError("roof_area_m2 must be > 0")
        if scenario.coverage_ratio < 0 or scenario.coverage_ratio > 1:
            raise InvalidScenarioError("coverage_ratio must be in [0,1]")

        if scenario.greening_type not in CO2_COEF:
            raise InvalidScenarioError(f"Unknown greening_type: {scenario.greening_type}")

        green_area = roof_area_m2 * scenario.coverage_ratio
        
        co2 = 0.0
        
        # CO2 Calculation (v3.4)
        # 1. Tree uses count-based calculation
        if scenario.greening_type == "tree":
            # Trees use count-based calculation
            # Use input tree_count if provided.
            # Look up specific tree species CO2 factor if species provided
            species_key = scenario.species or "sonamu" # default fallback
            
            # Lookup in SPECIES_INFO -> tree -> species -> co2
            # Fallback to TREE_CO2 default if not found
            tree_info = SPECIES_INFO.get("tree", {}).get(species_key)
            if tree_info:
                per_tree_co2 = tree_info['co2']
            else:
                per_tree_co2 = TREE_CO2.get("default", 6.6)
                
            co2 = float(scenario.tree_count) * per_tree_co2
            
        else:
            # 2. Others (Grass, Sedum, Shrub) use Area-based
            # Try to find species specific CO2
            sp_key = scenario.species
            
            # Default coefficient from CO2_COEF
            coeff_val = CO2_COEF.get(scenario.greening_type, 0.0) 
            
            # If valid species is selected, override coefficient
            if sp_key:
                type_species_dict = SPECIES_INFO.get(scenario.greening_type)
                if type_species_dict and sp_key in type_species_dict:
                    coeff_val = type_species_dict[sp_key]['co2']
            
            co2 = green_area * coeff_val

        # Temp Reduction Calculation (v3.4)
        # Using coefficient * coverage_ratio (linear approximation as per v3.4 intent of "coefficient")
        temp_coeff = TEMP_COEF.get(scenario.greening_type, 0.0)
        temp_reduction = temp_coeff * scenario.coverage_ratio
        
        after_temp = baseline_surface_temp_c - temp_reduction
        
        # Tree Equivalent Count
        # How many pine trees absorb this much CO2?
        pine_unit = TREE_CO2.get("default", 6.6)
        tree_equivalent_count = int(round(co2 / pine_unit)) if pine_unit > 0 else 0

        # Meta info
        meta_coeff = {
            "co2_unit": "kg/tree/y" if scenario.greening_type == "tree" else "kg/m2/y",
            "temp_reduction_max": temp_coeff,
        }

        return SimulationResult(
            roof_area_m2=roof_area_m2,
            greening_type=scenario.greening_type,
            coverage_ratio=scenario.coverage_ratio,
            tree_count=scenario.tree_count,
            species=scenario.species,
            green_area_m2=green_area,
            co2_absorption_kg_per_year=co2,
            temp_reduction_c=temp_reduction,
            baseline_surface_temp_c=baseline_surface_temp_c,
            after_surface_temp_c=after_temp,
            tree_equivalent_count=tree_equivalent_count,
            engine_version=settings.engine_version,
            coefficient_set_version=settings.coefficient_set_version,
            meta={
                "coeff": meta_coeff
            },
        )
