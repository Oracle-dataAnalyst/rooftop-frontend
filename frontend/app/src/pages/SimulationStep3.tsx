import { useNavigate } from "react-router-dom";

import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import "../styles/step3_result.css";
import { GREENING_TYPES, type GreeningType } from "../data/greening";
import { formatNumber, formatPercent } from "../utils/format";
import { getConfirmedArea, getLocation, getResult, getScenario } from "../utils/simulationStorage";

const SimulationStep3 = () => {
  const navigate = useNavigate();
  const location = getLocation();
  const result = getResult();
  const scenario = getScenario();
  const roofArea = getConfirmedArea();

  if (!result || !scenario || !roofArea) {
    return (
      <div>
        <AppHeader />
        <main className="page">
          <div className="container-1320">
            <div className="content-1120">
              <section className="card">
                <div className="card-title">결과가 없습니다.</div>
                <p className="card-desc">녹화 계획을 먼저 저장해주세요.</p>
                <div className="cta-row">
                  <button className="btn btn-primary" onClick={() => navigate("/simulation/step-2")}>
                    녹화 계획으로 이동
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  const typeInfo = GREENING_TYPES[scenario.greening_type as GreeningType];
  const addressTitle = location?.input_address ?? "선택한 주소";
  const addressCaption = location?.normalized_address ?? addressTitle;

  return (
    <div>
      <AppHeader />

      <main className="page">
        <div className="container-1320">
          <div className="content-1120">
            <section className="section-header">
              <div className="eyebrow">SIMULATION · STEP 3</div>
              <h1 className="h2">시뮬레이션 결과</h1>
              <p className="subtitle">옥상녹화 적용 시 예상되는 환경 효과를 확인하세요.</p>
            </section>

            <section className="stepper" aria-label="simulation steps">
              <div className="step done">
                <div className="dot" />
                <div className="label">조건확인</div>
              </div>
              <div className="line" />
              <div className="step done">
                <div className="dot" />
                <div className="label">계획</div>
              </div>
              <div className="line" />
              <div className="step active">
                <div className="dot" />
                <div className="label">결과</div>
              </div>
              <div className="line" />
              <div className="step">
                <div className="dot" />
                <div className="label">리포트</div>
              </div>
            </section>

            <section className="summary-bar">
              <div className="summary-item">
                <span className="summary-icon">📍</span>
                <span className="summary-label">{addressTitle}</span>
                <span className="summary-sub">{addressCaption}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-item">
                <span className="summary-label">{typeInfo.name}</span>
                <span className="summary-sub">녹화 유형</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-item">
                <span className="summary-label">{formatPercent(result.coverage_ratio)}%</span>
                <span className="summary-sub">녹화 비율</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-item">
                <span className="summary-label">{formatNumber(result.green_area_m2)}㎡</span>
                <span className="summary-sub">녹지 면적</span>
              </div>
            </section>

            <section className="grid">
              <div className="stack">
                <div className="card">
                  <div className="card-title">환경 효과 시뮬레이션</div>
                  <p className="card-desc">옥상녹화로 기대되는 연간 환경 개선 효과입니다.</p>

                  <div className="viz-grid">
                    <div className="viz-item">
                      <div className="viz-icon">🌿</div>
                      <div className="viz-label">CO₂ 흡수량</div>
                      <div className="viz-value">
                        {formatNumber(result.co2_absorption_kg_per_year)} <span className="viz-unit">kg/년</span>
                      </div>
                    </div>

                    <div className="viz-item">
                      <div className="temp-bars">
                        <div className="temp-bar hot" />
                        <div className="temp-bar cool" />
                      </div>
                      <div className="viz-label">표면 온도 저감</div>
                      <div className="viz-value highlight-cool">
                        -{formatNumber(result.temp_reduction_c, 1)} <span className="viz-unit">℃</span>
                      </div>
                      <div className="temp-detail">
                        {formatNumber(result.baseline_surface_temp_c, 1)}℃ →{" "}
                        {formatNumber(result.after_surface_temp_c, 1)}℃
                      </div>
                    </div>

                    <div className="viz-item">
                      <div className="tree-icons">🌲🌲🌲🌲🌲</div>
                      <div className="viz-label">소나무 환산</div>
                      <div className="viz-value highlight-green">
                        {formatNumber(result.tree_equivalent_count)} <span className="viz-unit">그루</span>
                      </div>
                      <div className="viz-sub">30년생 소나무 기준</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-title">Before / After 비교</div>

                  <div className="compare-grid">
                    <div className="compare-card before">
                      <div className="compare-badge">Before</div>
                      <div className="compare-sub">콘크리트 옥상</div>
                      <div className="compare-icon">🏢</div>
                      <div className="compare-stats">
                        <div className="stat-row">
                          <span className="stat-label">옥상 면적</span>
                          <span className="stat-value">{formatNumber(roofArea)} ㎡</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">녹지 면적</span>
                          <span className="stat-value">0 ㎡</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">CO₂ 흡수량</span>
                          <span className="stat-value">0 kg/년</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">표면 온도</span>
                          <span className="stat-value hot">{formatNumber(result.baseline_surface_temp_c, 1)}℃</span>
                        </div>
                      </div>
                    </div>

                    <div className="compare-arrow">→</div>

                    <div className="compare-card after">
                      <div className="compare-badge after">After</div>
                      <div className="compare-sub">
                        {typeInfo.name} 녹화 {formatPercent(result.coverage_ratio)}%
                      </div>
                      <div className="compare-icon">{typeInfo.icon}</div>
                      <div className="compare-stats">
                        <div className="stat-row">
                          <span className="stat-label">옥상 면적</span>
                          <span className="stat-value">{formatNumber(roofArea)} ㎡</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">녹지 면적</span>
                          <span className="stat-value green">{formatNumber(result.green_area_m2)} ㎡ ▲</span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">CO₂ 흡수량</span>
                          <span className="stat-value green">
                            {formatNumber(result.co2_absorption_kg_per_year)} kg/년 ▲
                          </span>
                        </div>
                        <div className="stat-row">
                          <span className="stat-label">표면 온도</span>
                          <span className="stat-value cool">
                            {formatNumber(result.after_surface_temp_c, 1)}℃ (-{formatNumber(result.temp_reduction_c, 1)}℃
                            ) ▼
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="callout">
                  <div className="callout-icon">🏛️</div>
                  <div className="callout-content">
                    <div className="callout-title">G-SEED 인증 활용 안내</div>
                    <ul className="callout-list">
                      <li>
                        <strong>현황:</strong> G-SEED는 토심(20cm 이상) 기준으로만 옥상녹화를 평가합니다.
                      </li>
                      <li>
                        <strong>제안:</strong> CO₂ 흡수량, 온도 저감 등 정량적 환경 지표 항목 추가가 필요합니다.
                      </li>
                      <li>
                        <strong>활용:</strong> 이 시뮬레이션 결과를 정책 제안 근거 자료로 사용하세요.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="cta-row">
                  <button className="btn btn-ghost" type="button" onClick={() => navigate("/simulation/step-2")}>
                    ← 이전: 녹화 계획
                  </button>
                  <button className="btn btn-primary" type="button" onClick={() => navigate("/simulation/step-4")}>
                    리포트 다운로드 →
                  </button>
                </div>
              </div>

              <aside className="side">
                <div className="card">
                  <div className="card-title">결과 해석</div>
                  <ul className="bullets">
                    <li>CO₂ 흡수량은 시나리오 기준 계수를 적용해 계산됩니다.</li>
                    <li>온도 저감은 녹화 비율에 비례합니다.</li>
                    <li>소나무 환산은 연간 CO₂ 흡수량 기준입니다.</li>
                  </ul>
                  <div className="divider" />
                  <button className="link" type="button" onClick={() => navigate("/data")}>
                    데이터 근거 보기 →
                  </button>
                </div>
              </aside>
            </section>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default SimulationStep3;
