import streamlit as st

from core.services.analyze_service import AnalyzeService
from components.common.footer import render_footer
from components.common.header import render_header
from core.constants import TREE_CO2, DEFAULT_BASELINE_SURFACE_TEMP_C, CO2_COEF, TEMP_COEF
from core.models import ScenarioInput
from core.services.analyze_service import AnalyzeService
from core.state import get_state, set_state
from ui.result_ui import render_result_ui


st.set_page_config(page_title="결과확인 | 옥상이몽", page_icon="📊", layout="wide")

from components.common.style import apply_common_styles
apply_common_styles()

render_header("simulate")

state = get_state()
scenario_dict = state.get("scenario")
roof_area = state.get("roof_area_m2_confirmed")

if not scenario_dict or not roof_area:
    st.warning("먼저 '녹화계획' 페이지에서 계획을 저장하세요.")
    st.stop()
    
scenario = ScenarioInput(**scenario_dict)
svc = AnalyzeService()
result = svc.compute()

set_state("result", result.model_dump())
address_title = state.get("location", {}).get("input_address", "선택한 주소")
address_caption = state.get("location", {}).get("normalized_address", address_title)

# Determine coefficients for UI display
greening_type = result.greening_type
co2_coeff_val = None
temp_coeff_val = TEMP_COEF.get(greening_type, 0.0)

if greening_type == "tree":
    # Special handling for tree display if needed, currently passing per-tree value as coeff
    # But UI expects kg/m2 generally? Or we just pass None for coeff and let UI handle it?
    # Original UI code: co2_coefficient displayed "kg/m2/y".
    # v3.4 Tree is kg/tree/y.
    # We will pass the per-unit value.
    co2_coeff_val = TREE_CO2.get("default", 6.6)
else:
    co2_coeff_val = CO2_COEF.get(greening_type, 0.0)

ui_state = render_result_ui(
    address_title=address_title,
    address_caption=address_caption,
    greening_type_code=result.greening_type,
    coverage_ratio=result.coverage_ratio,
    roof_area_m2=result.roof_area_m2,
    green_area_m2=result.green_area_m2,
    co2_absorption_kg=result.co2_absorption_kg_per_year,
    temp_reduction_c=result.temp_reduction_c,
    baseline_surface_temp_c=result.baseline_surface_temp_c or DEFAULT_BASELINE_SURFACE_TEMP_C,
    after_surface_temp_c=result.after_surface_temp_c,
    tree_equivalent_count=result.tree_equivalent_count,
    co2_coefficient=co2_coeff_val,
    temp_coefficient=temp_coeff_val,
    pine_factor_kg_per_year=TREE_CO2.get("default", 6.6),
)

if ui_state.get("prev_clicked"):
    st.switch_page("pages/2_step2_planning.py")

c1, c2 = st.columns(2)
with c2:
    if st.button("상세 리포트 보기", type="primary", use_container_width=True):
        st.switch_page("pages/4_step4_report.py")
    
render_footer()
