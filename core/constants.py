"""Domain constants.

NOTE:
- 지금은 임의값/placeholder여도 OK.
- 중요한 건 '버전'과 '출처'를 구조적으로 담을 수 있게 해두는 것.
"""

from __future__ import annotations

from dataclasses import dataclass


GREENING_LABELS: dict[str, str] = {
    "grass": "잔디",
    "sedum": "세덤",
    "shrub": "관목",
    "tree": "나무",
}

@dataclass(frozen=True)
class GreeningCoeff:
    type_code: str
    # 예: kg CO2 / m2 / year
    co2_kg_m2_y: float
    # 예: C reduction at 100% coverage
    temp_reduction_c_at_100: float
    # 예: 원/m2 (조성 + 1년차 관리비 등 총계)
    cost_per_m2: float
    # 예: kg/m2 (구조 하중)
    load_kg_per_m2: float

DEFAULT_BASELINE_SURFACE_TEMP_C = 60.0
DEFAULT_HVAC_SAVINGS_KWH_PER_DEG_M2 = 4.0

# MVP 기본 계수 세트 (임시)
DEFAULT_GREENING_COEFFS: dict[str, GreeningCoeff] = {
    # 비용/하중은 임시값. 데이터 확보 후 업데이트 예정.
    "grass": GreeningCoeff("grass", co2_kg_m2_y=0.5, temp_reduction_c_at_100=2.5, cost_per_m2=48000, load_kg_per_m2=120),
    "sedum": GreeningCoeff("sedum", co2_kg_m2_y=1.0, temp_reduction_c_at_100=4.7, cost_per_m2=52000, load_kg_per_m2=95),
    "shrub": GreeningCoeff("shrub", co2_kg_m2_y=3.0, temp_reduction_c_at_100=3.8, cost_per_m2=110000, load_kg_per_m2=210),
    "tree": GreeningCoeff("tree", co2_kg_m2_y=4.0, temp_reduction_c_at_100=5.5, cost_per_m2=185000, load_kg_per_m2=350)
}

# 소나무 환산 (임시): kg CO2 / year / tree
DEFAULT_PINE_FACTOR_KG_PER_YEAR = 9.13
