import streamlit as st

from components.common.footer import render_footer
from components.common.header import render_header
from core.models import ScenarioInput
from core.services.analyze_service import AnalyzeService
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
    st.switch_page("pages/1_step1_condition_check.py")
    st.stop()

roof_area = float(state["roof_area_m2_confirmed"])
existing_scenario = state.get("scenario") or {}
default_type = existing_scenario.get("greening_type", "sedum")
default_ratio = float(existing_scenario.get("coverage_ratio", 0.65))

# Tree/Species settings fallback (Migration support)
default_tree_count = existing_scenario.get("tree_count", 10)
default_species = existing_scenario.get("species") or existing_scenario.get("tree_species", "sonamu")

if "planning_selected_type" not in st.session_state:
    st.session_state["planning_selected_type"] = default_type
if "planning_tree_count" not in st.session_state:
    st.session_state["planning_tree_count"] = default_tree_count
if "planning_species" not in st.session_state:
    st.session_state["planning_species"] = default_species

active_type = st.session_state.get("planning_selected_type", default_type)
slider_default = int(round(default_ratio * 100))
active_ratio = (st.session_state.get("planning_slider", slider_default) or 0) / 100
active_tree_count = st.session_state.get("planning_tree_count", default_tree_count)
active_species = st.session_state.get("planning_species", default_species)

scenario_service = ScenarioService()

# Create preview scenario with all current state
# Note: models.py updated to use 'species' instead of 'tree_species'
preview_scenario = ScenarioInput(
    greening_type=active_type, 
    coverage_ratio=active_ratio, 
    tree_count=int(active_tree_count),
    species=active_species
)

preview_result = scenario_service.compute(roof_area_m2=roof_area, scenario=preview_scenario)

ui_state = render_planning_ui(
    roof_area=roof_area,
    selected_type=active_type,
    coverage_ratio=active_ratio,
    green_area_m2=preview_result.green_area_m2,
    co2_absorption_kg=preview_result.co2_absorption_kg_per_year,
    temp_reduction_c=preview_result.temp_reduction_c,
    species=active_species,
    tree_count=int(active_tree_count)
)

selected_type = ui_state["selected_type"]
coverage_ratio = ui_state["coverage_ratio"]
tree_count = ui_state.get("tree_count", 0)
species = ui_state.get("species")

scenario = ScenarioInput(
    greening_type=selected_type, 
    coverage_ratio=coverage_ratio,
    tree_count=int(tree_count),
    species=species
)

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