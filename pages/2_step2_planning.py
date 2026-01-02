import streamlit as st

from components.common.footer import render_footer
from components.common.header import render_header
from core.models import CoverageRecommendation, ScenarioInput
from core.services.analyze_service import AnalyzeService
from core.services.optimization_service import OptimizationService
from core.services.scenario_service import ScenarioService
from core.state import get_state, set_state
from ui.planning_ui import render_planning_ui

st.set_page_config(page_title="녹화계획 | 옥상이몽", page_icon="🌿", layout="wide")

from components.common.style import apply_common_styles
apply_common_styles()

render_header("simulate")

state = get_state()
if not state.get("roof_area_m2_confirmed"):
    st.warning("먼저 '면적확인' 페이지에서 면적을 확정하세요.")
    st.stop()

roof_area = float(state["roof_area_m2_confirmed"])
existing_scenario = state.get("scenario") or {}
default_type = existing_scenario.get("greening_type", "sedum")
default_ratio = float(existing_scenario.get("coverage_ratio", 0.65))

if "planning_selected_type" not in st.session_state:
    st.session_state["planning_selected_type"] = default_type

active_type = st.session_state.get("planning_selected_type", default_type)
slider_default = int(round(default_ratio * 100))
active_ratio = (st.session_state.get("planning_slider", slider_default) or 0) / 100

scenario_service = ScenarioService()
preview_scenario = ScenarioInput(greening_type=active_type, coverage_ratio=active_ratio)
preview_result = scenario_service.compute(roof_area_m2=roof_area, scenario=preview_scenario)

opt_service = OptimizationService()
target_mode = st.radio("목표 선택", ["목표 없음", "CO₂(kg/년)", "온도 저감(℃)", "냉난방 절감(kWh/년)"], horizontal=True)
target_value = 0.0
proposal = None
if target_mode == "CO₂(kg/년)":
    target_value = st.number_input("연간 CO₂ 흡수 목표 (kg)", min_value=0.0, value=0.0, step=50.0)
    if target_value > 0:
        proposal = opt_service.optimize(roof_area_m2=roof_area, target_co2_kg_per_year=target_value)
elif target_mode == "온도 저감(℃)":
    target_value = st.number_input("표면 온도 저감 목표 (℃)", min_value=0.0, value=0.0, step=0.5)
    if target_value > 0:
        proposal = opt_service.optimize(roof_area_m2=roof_area, target_temp_reduction_c=target_value)
elif target_mode == "냉난방 절감(kWh/년)":
    target_value = st.number_input("연간 냉난방 절감 목표 (kWh)", min_value=0.0, value=0.0, step=100.0)
    if target_value > 0:
        proposal = opt_service.optimize(roof_area_m2=roof_area, target_hvac_savings_kwh_per_year=target_value)

recommendation_text = None
recommendation_status = None
if proposal:
    recommendation_text = proposal.combination_label
    if proposal.feasible:
        recommendation_status = "목표 달성 최소 비용 조합"
    else:
        recommendation_status = "목표 달성 불가 · 가장 근접한 조합"
    rec_model = CoverageRecommendation(
        effect_kind=proposal.effect_kind,
        target_effect=proposal.target_effect,
        achieved_effect=proposal.achieved_effect,
        feasible=proposal.feasible,
        coverage=proposal.coverage,
        total_cost=proposal.total_cost,
        total_load=proposal.total_load,
        combination_label=proposal.combination_label,
    )
    set_state("recommendation", rec_model.model_dump())
else:
    set_state("recommendation", None)

ui_state = render_planning_ui(
    roof_area=roof_area,
    selected_type=active_type,
    coverage_ratio=active_ratio,
    green_area_m2=preview_result.green_area_m2,
    co2_absorption_kg=preview_result.co2_absorption_kg_per_year,
    temp_reduction_c=preview_result.temp_reduction_c,
    hvac_savings_kwh=preview_result.hvac_savings_kwh_per_year,
    recommended_combination=recommendation_text,
    recommendation_status=recommendation_status,
)

selected_type = ui_state["selected_type"]
coverage_ratio = ui_state["coverage_ratio"]

scenario = ScenarioInput(greening_type=selected_type, coverage_ratio=coverage_ratio)

svc = AnalyzeService()

if ui_state["save_clicked"]:
    svc.set_scenario(scenario)
    set_state("scenario", scenario.model_dump())
    st.success("녹화 계획을 저장했습니다.")


if ui_state["prev_clicked"]:
    st.switch_page("pages/1_step1_condition_check.py")

if ui_state["next_clicked"]:
    st.switch_page("pages/3_step3_result.py")

render_footer()
