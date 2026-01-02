from __future__ import annotations

import math
from dataclasses import dataclass

import streamlit as st

from core.constants import GREEN_TYPE_INFO, SPECIES_INFO
# Force reload


def _format_number(value: float) -> str:
    if math.isnan(value):
        return "—"
    return f"{value:,.0f}"


def _format_decimal(value: float) -> str:
    if math.isnan(value):
        return "—"
    return f"{value:,.1f}"


def render_planning_ui(
    *,
    roof_area: float,
    selected_type: str,
    coverage_ratio: float,
    green_area_m2: float,
    co2_absorption_kg: float,
    temp_reduction_c: float,
    species: str | None = None,
    tree_count: int = 0,
) -> dict:
    st.markdown(
        """
        <style>
        /* Scoped reset for our custom components only */
        .page * { box-sizing: border-box; }
        .page { margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Noto Sans KR", system-ui, sans-serif;
          background: #f4f6f9;
          color: #1a202c;
          line-height: 1.5;
        }
        a { text-decoration: none; color: inherit; }
        button, input { font: inherit; }
        .page { padding: 28px 0 44px; }
        .container-1320 { width: 100%; max-width: 1320px; margin: 0 auto; padding: 0 20px; }
        .content-1120 { width: 100%; max-width: 1120px; margin: 0 auto; }

        .section-header { padding: 6px 0 10px; }
        .eyebrow { font-size: 12px; color: #2f855a; font-weight: 800; letter-spacing: .08em; }
        .h2 { font-size: 28px; font-weight: 900; margin-top: 6px; }
        .subtitle { font-size: 14px; color: #718096; margin-top: 6px; }

        .stepper { width: 100%; background: #fff; border-radius: 16px; box-shadow: 0 10px 30px rgba(15,23,42,.08); padding: 14px 16px; display: flex; align-items: center; gap: 10px; margin: 16px 0 18px; }
        .step { display: flex; align-items: center; gap: 8px; min-width: 0; }
        .step .dot { width: 10px; height: 10px; border-radius: 999px; background: #cbd5e0; }
        .step .label { font-size: 12px; color: #4a5568; font-weight: 900; white-space: nowrap; }
        .step.active .dot { background: #48bb78; }
        .step.active .label { color: #1a202c; }
        .step.done .dot { background: #2f855a; }
        .step.done .label { color: #1a202c; }
        .line { flex: 1; height: 1px; background: #e2e8f0; }

        .grid { display: grid; grid-template-columns: 1fr 360px; gap: 20px; align-items: start; }
        .side { display: flex; flex-direction: column; gap: 16px; }
        .stack { min-width: 0; }

        .card { background: #fff; border-radius: 20px; padding: 22px 22px; box-shadow: 0 10px 30px rgba(15,23,42,.08); }
        .card-title { font-size: 16px; font-weight: 900; }
        .card-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
        .pill { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; background: #edf2f7; color: #1a202c; border-radius: 999px; padding: 6px 10px; font-weight: 800; }





        /* 디테일 */
        .detail-panel { border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 14px; background: #fff; }
        .detail-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
        .detail-title { display: flex; align-items: center; gap: 8px; font-weight: 900; }
        .detail-icon { width: 26px; height: 26px; border-radius: 999px; background: #f0fff4; display: flex; align-items: center; justify-content: center; }
        .detail-tag { font-size: 11px; background: #e6fffa; color: #0b7285; border-radius: 999px; padding: 4px 10px; font-weight: 900; }
        .detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .detail-item { border: 1px solid #edf2f7; border-radius: 14px; padding: 10px 10px; background: #f7fafc; }
        .detail-item .k { font-size: 11px; color: #718096; font-weight: 900; margin-bottom: 4px; }
        .detail-item .v { font-size: 12px; color: #1a202c; font-weight: 800; }

        /* 슬라이더 */
        .slider-row { display: flex; align-items: center; gap: 10px; }
        .slider-label { font-size: 11px; color: #a0aec0; font-weight: 900; white-space: nowrap; }
        .slider-pill { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; background: #edf2f7; color: #1a202c; font-size: 12px; font-weight: 900; padding: 6px 10px; }

        /* 프리뷰 */
        .preview { margin-top: 14px; border: 1px solid #e2e8f0; border-radius: 16px; padding: 12px 12px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; background: #fff; }
        .preview-item { border: 1px solid #edf2f7; border-radius: 14px; padding: 10px 10px; background: #f7fafc; }
        .preview-item .k { font-size: 11px; color: #718096; font-weight: 900; margin-bottom: 4px; }
        .preview-item .v { font-size: 14px; color: #1a202c; font-weight: 900; }

        .cta-row { display: flex; justify-content: space-between; gap: 12px; margin-top: 16px; }

        .btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 10px 18px; font-size: 13px; font-weight: 700; border: 1px solid transparent; cursor: pointer; white-space: nowrap; }
        .btn-primary { background: #48bb78; color: #fff; }
        .btn-primary:hover { background: #2f855a; }
        .btn-secondary { background: #edf2f7; color: #1a202c; border-color: #e2e8f0; }
        .btn-secondary:hover { background: #e2e8f0; }
        .btn-ghost { background: transparent; color: #1a202c; border-color: #e2e8f0; }
        .btn-ghost:hover { background: #fff; }

        .bullets { margin-top: 10px; padding-left: 16px; color: #4a5568; font-size: 12px; font-weight: 800; }
        .bullets li { margin-bottom: 6px; }
        .divider { height: 1px; background: #e2e8f0; margin: 14px 0; }
        .link { font-size: 12px; color: #0b3b5b; font-weight: 900; }

        .mini { margin-top: 10px; }
        .mini-k { font-size: 11px; color: #718096; font-weight: 900; letter-spacing: .06em; text-transform: uppercase; }
        .mini-v { font-size: 13px; color: #1a202c; font-weight: 900; margin-top: 4px; }

        /* Streamlit 위젯 커스터마이즈 */
        /* 타입 버튼 오버레이 스타일 */
        .type-buttons .stButton > button {
          width: 100%;
          height: 140px !important;
          text-align: left;
          padding: 0;
          background: transparent;
          border: none;
          color: transparent !important;
          position: relative;
          z-index: 10;
        }
        .type-buttons .stButton > button:focus { outline: none; box-shadow: none; }
        
        /* 종 버튼 오버레이 스타일 */
        .species-buttons .stButton > button {
           width: 100%;
           height: 100px !important;
           background: transparent;
           border: none;
           color: transparent !important;
           position: relative;
           z-index: 10;
        }
        .species-buttons .stButton > button:focus { outline: none; box-shadow: none; }

        .slider-holder .stSlider { width: 100%; }
        .slider-holder [data-baseweb="slider"] { width: 100%; }
        .slider-holder .stSlider > div { padding: 6px 0; }
         .slider-holder [data-baseweb="slider"] > div > div { background: #c6f6d5; }
        .slider-holder [data-baseweb="slider"] > div > div > div { background: #2f855a; }
        .slider-holder .stSlider [role="slider"] { background: #2f855a !important; box-shadow: 0 6px 18px rgba(15,23,42,.18); width: 16px; height: 16px; }
        .slider-holder .stSlider [role="slider"]::before { display: none; }
        .slider-holder .stSlider [data-testid=\"stThumbValue\"], .slider-holder [data-baseweb=\"slider\"] [data-baseweb=\"slider-value\"] { color: #2f855a !important; }
        
        .cta-row .stButton > button {
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 13px;
          font-weight: 700;
          border: 1px solid #e2e8f0;
          background: transparent;
          color: #1a202c;
        }
        .cta-row .stButton.primary > button {
          background: #48bb78;
          color: #fff;
          border-color: transparent;
        }
        .cta-row .stButton.primary > button:hover { background: #2f855a; }
        .cta-row .stButton.primary > button:hover { background: #2f855a; }
        
        /* 선택된 버튼 초록색으로 */
        [data-testid="stButton"] button[kind="primary"] {
            background-color: #48bb78 !important;
            border-color: #48bb78 !important;
        }
        [data-testid="stButton"] button[kind="primary"]:hover {
            background-color: #2f855a !important;
            border-color: #2f855a !important;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )

    st.markdown('<main class="page">', unsafe_allow_html=True)
    st.markdown('<div class="container-1320">', unsafe_allow_html=True)
    st.markdown('<div class="content-1120">', unsafe_allow_html=True)

    st.markdown(
        """
        <section class="section-header">
          <div class="eyebrow">SIMULATION · STEP 2</div>
          <h1 class="h2">녹화 계획 설정</h1>
          <p class="subtitle">녹화 유형과 비율을 선택해 내 건물에 맞는 시나리오를 구성합니다.</p>
        </section>
        """,
        unsafe_allow_html=True,
    )

    st.markdown(
        """
        <section class="stepper" aria-label="simulation steps">
          <div class="step done">
            <div class="dot"></div>
            <div class="label">조건확인</div>
          </div>
          <div class="line"></div>
          <div class="step active">
            <div class="dot"></div>
            <div class="label">계획</div>
          </div>
          <div class="line"></div>
          <div class="step">
            <div class="dot"></div>
            <div class="label">결과</div>
          </div>
          <div class="line"></div>
          <div class="step">
            <div class="dot"></div>
            <div class="label">리포트</div>
          </div>
        </section>
        """,
        unsafe_allow_html=True,
    )

    left_col, right_col = st.columns([3, 1], gap="large")

    with left_col:
        with st.container():
            st.markdown(
                f"""
                <section class="card">
                  <div class="card-top">
                    <div class="card-title">분석 대상</div>
                    <div class="pill">가용면적 <strong>{_format_number(roof_area)}㎡</strong></div>
                  </div>
                </section>
                """,
                unsafe_allow_html=True,
            )

        with st.container():
            st.subheader("🌿 녹화 유형 선택")
        
            cols = st.columns(4, gap="small")
            for idx, (type_code, info) in enumerate(GREEN_TYPE_INFO.items()):
                with cols[idx]:
                    co2_str = f"{info['co2']} {info['co2_unit']}"
                    temp_str = f"-{info['temp']}℃"
                    is_selected = st.session_state.get("planning_selected_type", selected_type) == type_code
                    
                    # 버튼에 내용 직접 표시
                    button_label = f"{info['icon']} {info['name']}\nCO₂: {co2_str}\n온도: {temp_str}"
                    button_type = "primary" if is_selected else "secondary"
                    
                    if st.button(button_label, key=f"type_{type_code}", use_container_width=True, type=button_type):
                        st.session_state["planning_selected_type"] = type_code
 

        selected_type_code = st.session_state.get("planning_selected_type", selected_type)
        
        # 2nd Stage: Species Selection
        st.write("") # Spacer
        
        type_species_data = SPECIES_INFO.get(selected_type_code)
        has_detail_selection = (type_species_data and len(type_species_data) > 1)
        current_species_key = st.session_state.get("planning_species", species)
        
        if has_detail_selection and current_species_key and current_species_key not in type_species_data:
            current_species_key = list(type_species_data.keys())[0]
            st.session_state["planning_species"] = current_species_key
            
        final_tree_count = 0 
        
        with st.container():
            if has_detail_selection:
                st.subheader("🌱 세부 종류 선택")
                sp_cols = st.columns(min(len(type_species_data), 6), gap="small")
                
                if not current_species_key:
                    current_species_key = list(type_species_data.keys())[0]
                    st.session_state["planning_species"] = current_species_key

                idx = 0
                for sp_key, sp_info in type_species_data.items():
                    with sp_cols[idx % 6]:
                        is_sp_selected = (current_species_key == sp_key)
                        unit_str = "kg/m²" if selected_type_code != "tree" else "kg"
                        
                        sp_label = f"{sp_info['icon']} {sp_info['name']}\n{sp_info['co2']} {unit_str}"
                        sp_type = "primary" if is_sp_selected else "secondary"
                        
                        if st.button(sp_label, key=f"species_{selected_type_code}_{sp_key}", use_container_width=True, type=sp_type):
                            st.session_state["planning_species"] = sp_key
                            current_species_key = sp_key
                    idx += 1
                st.session_state["planning_species"] = current_species_key
        if selected_type_code == "tree":
             with st.container():
                 st.subheader("나무 수량 설정")
                 default_tree_count = st.session_state.get("planning_tree_count", max(tree_count, 10))
                 final_tree_count = st.number_input(
                    "🌲 나무 그루 수",
                    min_value=1,
                    max_value=100,
                    value=default_tree_count,
                    key="planning_tree_count",
                    label_visibility="collapsed" 
                 )

        
        active_species_info = None
        if has_detail_selection and current_species_key:
             active_species_info = type_species_data.get(current_species_key)
        
        main_info = GREEN_TYPE_INFO.get(selected_type_code, GREEN_TYPE_INFO['grass'])
        
        with st.container():
            st.subheader("선택 정보")
            
            display_name = active_species_info['name'] if active_species_info else main_info['name']
            display_icon = active_species_info['icon'] if active_species_info else main_info['icon']
            display_co2 = active_species_info['co2'] if active_species_info else main_info['co2']
        
        if selected_type_code == 'tree':
             cat = active_species_info.get('category', main_info.get('desc',''))
             unit = "kg/그루/yr"
        else:
             cat = main_info.get('desc', '')
             unit = "kg/㎡/yr"
             
        co2_display_val = f"{display_co2} {unit}"
        
        st.markdown(
            f"""
            <div class="detail-panel">
              <div class="detail-head">
                <div class="detail-title">
                  <span class="detail-icon">{display_icon}</span>
                  <span>{display_name}</span>
                </div>
                <div class="detail-tag">{cat}</div>
              </div>
              <div class="detail-grid">
                 <div class="detail-item">
                  <div class="k">단위 CO₂ 흡수</div>
                  <div class="v">{co2_display_val}</div>
                </div>
                 <div class="detail-item">
                  <div class="k">온도 저감 효과</div>
                  <div class="v">-{main_info['temp']}℃</div>
                </div>
              </div>
            </div>
            """,
            unsafe_allow_html=True,
        )

        
        with st.container():
            st.subheader("녹화 비율")

            st.markdown('<div class="slider-row slider-holder">', unsafe_allow_html=True)
            slider_col, pct_col = st.columns([9, 1], gap="small")
            with slider_col:
                slider_value = st.slider(
                    "녹화 비율(%)",
                    min_value=0,
                    max_value=100,
                    step=5,
                    value=int(round(coverage_ratio * 100)),
                    label_visibility="collapsed",
                    key="planning_slider",
                )
            with pct_col:
                st.markdown(
                    f'<div class="slider-pill"><strong>{slider_value}%</strong></div>',
                    unsafe_allow_html=True,
                )
            st.markdown("</div>", unsafe_allow_html=True)


        st.markdown(
            f"""
            <div class="preview">
              <div class="preview-item">
                <div class="k">녹지 면적</div>
                <div class="v">{_format_number(green_area_m2)}㎡</div>
              </div>
              <div class="preview-item">
                <div class="k">예상 CO₂ 흡수</div>
                <div class="v">{_format_decimal(co2_absorption_kg)}kg/년</div>
              </div>
              <div class="preview-item">
                <div class="k">예상 온도 저감</div>
                <div class="v">{_format_decimal(temp_reduction_c)}℃</div>
              </div>
            </div>
            """,
            unsafe_allow_html=True,
        )

        st.markdown('<div class="cta-row">', unsafe_allow_html=True)
        prev_col, save_col, next_col = st.columns([1, 1, 1], gap="small")
        with prev_col:
            prev_clicked = st.button("이전", key="planning_prev")
        with save_col:
            save_clicked = st.button("계획 저장", key="planning_save")
        with next_col:
            next_clicked = st.button("결과 확인하기 →", key="planning_next")
        st.markdown("</div>", unsafe_allow_html=True)

    with right_col:
        st.markdown(
            """
            <section class="card">
              <div class="card-title">도움말</div>
              <ul class="bullets">
                <li>유형별 계수는 데이터 분석 결과로 확정됩니다.</li>
                <li>나무는 구조·하중 검토가 필요합니다.</li>
                <li>선택 값은 리포트(PDF) 근거로 포함됩니다.</li>
              </ul>
              <div class="divider"></div>
              <a class="link" href="#">데이터 근거 보기 →</a>
            </section>
            """,
            unsafe_allow_html=True,
        )

        st.markdown(
            """
            <section class="card">
              <div class="card-title">다음 단계</div>
              <div class="mini">
                <div class="mini-k">STEP 3</div>
                <div class="mini-v">Before/After 결과 비교</div>
              </div>
              <div class="divider"></div>
              <a class="btn btn-secondary" href="#" style="width:100%;">결과 페이지 미리보기</a>
            </section>
            """,
            unsafe_allow_html=True,
        )

    st.markdown("</div></div></main>", unsafe_allow_html=True)

    active_ratio = st.session_state.get("planning_slider", slider_value) / 100

    return {
        "selected_type": selected_type_code,
        "coverage_ratio": active_ratio,
        "prev_clicked": prev_clicked,
        "save_clicked": save_clicked,
        "next_clicked": next_clicked,
        "tree_count": final_tree_count,
        "species": current_species_key,
    }