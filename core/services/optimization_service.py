from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable, Literal

from core.constants import (
    DEFAULT_GREENING_COEFFS,
    DEFAULT_HVAC_SAVINGS_KWH_PER_DEG_M2,
    GREENING_LABELS,
)


@dataclass(frozen=True)
class CoverageProposal:
    """Coverage ratio proposal per greening type."""

    coverage: dict[str, float]
    total_cost: float
    total_load: float
    achieved_effect: float
    target_effect: float
    effect_kind: Literal["co2", "temp"]
    feasible: bool

    @property
    def combination_label(self) -> str:
        parts: list[str] = []
        for code, ratio in self.coverage.items():
            if ratio <= 0:
                continue
            label = GREENING_LABELS.get(code, code)
            pct = round(ratio * 100)
            parts.append(f"{label} {pct}%")
        if not parts:
            return "선택 없음"
        return " + ".join(parts)


class OptimizationService:
    """Linear-like optimizer for coverage ratios with cost/load metadata."""

    def __init__(self, coeffs=None):
        self.coeffs = coeffs or DEFAULT_GREENING_COEFFS

    def _effect_coeff(self, kind: Literal["co2", "temp"], type_code: str) -> float:
        coeff = self.coeffs[type_code]
        if kind == "co2":
            return coeff.co2_kg_m2_y
        if kind == "temp":
            return coeff.temp_reduction_c_at_100
        # hvac는 온도저감 계수를 기반으로 kWh 환산
        return coeff.temp_reduction_c_at_100 * DEFAULT_HVAC_SAVINGS_KWH_PER_DEG_M2

    def _max_effect(self, kind: Literal["co2", "temp"]) -> float:
        return max(self._effect_coeff(kind, t) for t in self.coeffs.keys())

    def _candidate_single(self, kind: Literal["co2", "temp"], type_code: str, target_effect: float):
        eff = self._effect_coeff(kind, type_code)
        required_coverage = target_effect / eff if eff > 0 else 2.0  # mark infeasible if zero
        return type_code, eff, required_coverage

    def _evaluate(
        self,
        coverage: dict[str, float],
        kind: Literal["co2", "temp"],
        roof_area_m2: float,
        target_effect: float,
    ) -> CoverageProposal:
        achieved_effect = sum(self._effect_coeff(kind, k) * v for k, v in coverage.items())
        total_cost = roof_area_m2 * sum(self.coeffs[k].cost_per_m2 * v for k, v in coverage.items())
        total_load = roof_area_m2 * sum(self.coeffs[k].load_kg_per_m2 * v for k, v in coverage.items())
        feasible = achieved_effect >= target_effect and sum(coverage.values()) <= 1.0 + 1e-6
        return CoverageProposal(
            coverage=coverage,
            total_cost=total_cost,
            total_load=total_load,
            achieved_effect=achieved_effect,
            target_effect=target_effect,
            effect_kind=kind,
            feasible=feasible,
        )

    def _pair_mix_solution(
        self,
        kind: Literal["co2", "temp"],
        type_a: str,
        type_b: str,
        target_effect: float,
    ) -> Iterable[dict[str, float]]:
        a = self._effect_coeff(kind, type_a)
        b = self._effect_coeff(kind, type_b)
        if a == b:
            return []
        # Full coverage mix: x*a + (1-x)*b = target => x = (target - b)/(a-b)
        x = (target_effect - b) / (a - b)
        if 0 <= x <= 1:
            yield {type_a: x, type_b: 1 - x}

    def optimize(
        self,
        *,
        roof_area_m2: float,
        target_co2_kg_per_year: float | None = None,
        target_temp_reduction_c: float | None = None,
        target_hvac_savings_kwh_per_year: float | None = None,
    ) -> CoverageProposal | None:
        if roof_area_m2 <= 0:
            return None
        if (
            target_co2_kg_per_year is None
            and target_temp_reduction_c is None
            and target_hvac_savings_kwh_per_year is None
        ):
            return None

        if target_co2_kg_per_year is not None:
            target_effect = target_co2_kg_per_year / roof_area_m2
            kind: Literal["co2", "temp"] = "co2"
        elif target_temp_reduction_c is not None:
            target_effect = float(target_temp_reduction_c or 0)
            kind = "temp"
        else:
            target_effect = (target_hvac_savings_kwh_per_year or 0) / (
                roof_area_m2 * DEFAULT_HVAC_SAVINGS_KWH_PER_DEG_M2
            )
            kind = "hvac"

        candidates: list[CoverageProposal] = []

        # Single-type candidates
        for type_code in self.coeffs.keys():
            type_code, eff, req_cov = self._candidate_single(kind, type_code, target_effect)
            if req_cov <= 1.0:
                candidates.append(
                    self._evaluate({type_code: req_cov}, kind, roof_area_m2, target_effect)
                )
            # Cap at 1.0 to consider maximum effect for closest suggestion
            candidates.append(self._evaluate({type_code: 1.0}, kind, roof_area_m2, target_effect))

        # Two-type mixes on coverage=1 boundary
        type_codes = list(self.coeffs.keys())
        for i in range(len(type_codes)):
            for j in range(i + 1, len(type_codes)):
                for mix in self._pair_mix_solution(kind, type_codes[i], type_codes[j], target_effect):
                    candidates.append(self._evaluate(mix, kind, roof_area_m2, target_effect))

        feasible_candidates = [c for c in candidates if c.feasible]
        if feasible_candidates:
            feasible_candidates.sort(key=lambda c: (c.total_cost, c.total_load))
            return feasible_candidates[0]

        # No feasible solution → return the closest (max achieved effect)
        best_infeasible = max(candidates, key=lambda c: c.achieved_effect)
        return CoverageProposal(
            coverage=best_infeasible.coverage,
            total_cost=best_infeasible.total_cost,
            total_load=best_infeasible.total_load,
            achieved_effect=best_infeasible.achieved_effect,
            target_effect=target_effect,
            effect_kind=kind,
            feasible=False,
        )
