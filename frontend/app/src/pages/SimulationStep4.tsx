import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { downloadReport } from "../api/client";
import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import { GREENING_TYPES, type GreeningType } from "../data/greening";
import "../styles/step4_report.css";
import { formatNumber, formatPercent } from "../utils/format";
import { getConfirmedArea, getLocation, getResult, getScenario } from "../utils/simulationStorage";

const SimulationStep4 = () => {
  const navigate = useNavigate();
  const location = getLocation();
  const result = getResult();
  const scenario = getScenario();
  const roofArea = getConfirmedArea();
  const [error, setError] = useState("");

  if (!result || !scenario || !roofArea) {
    return (
      <div>
        <AppHeader />
        <main className="page">
          <div className="container-1320">
            <div className="content-1120">
              <section className="card">
                <div className="card-title">리포트를 생성할 데이터가 없습니다.</div>
                <p className="card-desc">시뮬레이션 결과를 먼저 확인해주세요.</p>
                <div className="cta-row">
                  <button className="btn btn-primary" onClick={() => navigate("/simulation/step-3")}>
                    결과 페이지로 이동
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

  const handleDownload = async (kind: "pdf" | "excel") => {
    try {
      setError("");
      const blob = await downloadReport(kind === "pdf" ? "/reports/pdf" : "/reports/excel", result);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = kind === "pdf" ? "rooftop-report.pdf" : "rooftop-report.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("리포트 다운로드에 실패했습니다.");
    }
  };

  return (
    <div>
      <AppHeader />

      <main className="page">
        <div className="container-1320">
          <div className="content-1120">
            <section className="section-header">
              <div className="eyebrow">SIMULATION · STEP 4</div>
              <h1 className="h2">리포트 다운로드</h1>
              <p className="subtitle">시뮬레이션 결과를 PDF, Excel 등 다양한 형식으로 저장하세요.</p>
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
              <div className="step done">
                <div className="dot" />
                <div className="label">결과</div>
              </div>
              <div className="line" />
              <div className="step active">
                <div className="dot" />
                <div className="label">리포트</div>
              </div>
            </section>

            <section className="complete-banner">
              <div className="complete-icon">✓</div>
              <h2 className="complete-title">시뮬레이션 완료!</h2>
              <p className="complete-desc">결과 리포트를 다운로드하고 활용하세요.</p>
            </section>

            <section className="grid">
              <div className="stack">
                <div className="card">
                  <div className="card-header-bar">
                    <div className="building-icon">🏢</div>
                    <div className="building-info">
                      <div className="building-name">{addressTitle}</div>
                      <div className="building-meta">
                        {addressCaption} · {typeInfo.name} · 녹화 {formatPercent(result.coverage_ratio)}%
                      </div>
                    </div>
                  </div>

                  <div className="result-grid">
                    <div className="result-item">
                      <div className="result-icon">🌿</div>
                      <div className="result-value">
                        {formatNumber(result.green_area_m2)} <span className="result-unit">㎡</span>
                      </div>
                      <div className="result-label">녹화 면적</div>
                    </div>
                    <div className="result-item">
                      <div className="result-icon">💨</div>
                      <div className="result-value">
                        {formatNumber(result.co2_absorption_kg_per_year)} <span className="result-unit">kg/년</span>
                      </div>
                      <div className="result-label">CO₂ 흡수량</div>
                    </div>
                    <div className="result-item">
                      <div className="result-icon">🌡️</div>
                      <div className="result-value">
                        -{formatNumber(result.temp_reduction_c, 1)} <span className="result-unit">℃</span>
                      </div>
                      <div className="result-label">온도 저감</div>
                    </div>
                    <div className="result-item">
                      <div className="result-icon">🌲</div>
                      <div className="result-value">
                        {formatNumber(result.tree_equivalent_count)} <span className="result-unit">그루</span>
                      </div>
                      <div className="result-label">소나무 환산</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-title">📥 리포트 다운로드</div>

                  <div className="download-grid">
                    <button className="download-btn pdf" type="button" onClick={() => handleDownload("pdf")}>
                      <span className="download-icon">📄</span>
                      <span className="download-text">PDF 리포트</span>
                      <span className="download-desc">정책 제안용</span>
                    </button>
                    <button className="download-btn excel" type="button" onClick={() => handleDownload("excel")}>
                      <span className="download-icon">📊</span>
                      <span className="download-text">Excel 데이터</span>
                      <span className="download-desc">상세 데이터</span>
                    </button>
                  </div>

                  <div className="share-grid">
                    <button className="share-btn" type="button">
                      <span className="share-icon">🖼️</span>
                      <span>이미지 저장</span>
                    </button>
                    <button className="share-btn" type="button">
                      <span className="share-icon">🔗</span>
                      <span>링크 공유</span>
                    </button>
                  </div>
                  {error ? <div className="edit-help" style={{ color: "#e53e3e" }}>{error}</div> : null}
                </div>

                <div className="feedback-card">
                  <div className="feedback-title">이 시뮬레이터가 도움이 되셨나요?</div>
                  <div className="feedback-btns">
                    <button className="feedback-btn positive" type="button">
                      👍 도움이 됐어요
                    </button>
                    <button className="feedback-btn negative" type="button">
                      💬 개선이 필요해요
                    </button>
                  </div>
                </div>

                <div className="cta-row">
                  <button className="btn btn-ghost" type="button" onClick={() => navigate("/simulation/step-3")}>
                    ← 이전: 결과 보기
                  </button>
                  <button className="btn btn-primary" type="button" onClick={() => navigate("/")}>
                    🏠 처음으로 돌아가기
                  </button>
                </div>
              </div>

              <aside className="side">
                <div className="card">
                  <div className="card-title">📚 관련 정보</div>

                  <div className="info-list">
                    <button className="info-item" type="button">
                      <div className="info-icon">🏛️</div>
                      <div className="info-content">
                        <div className="info-name">G-SEED 녹색건축인증 안내</div>
                        <div className="info-desc">인증 절차 및 혜택 확인</div>
                      </div>
                      <div className="info-arrow">→</div>
                    </button>
                    <button className="info-item" type="button">
                      <div className="info-icon">🏢</div>
                      <div className="info-content">
                        <div className="info-name">서울시 옥상녹화 지원사업</div>
                        <div className="info-desc">보조금 및 지원 조건 확인</div>
                      </div>
                      <div className="info-arrow">→</div>
                    </button>
                    <button className="info-item" type="button">
                      <div className="info-icon">📖</div>
                      <div className="info-content">
                        <div className="info-name">옥상녹화 시공 가이드</div>
                        <div className="info-desc">녹화 유형별 시공 안내</div>
                      </div>
                      <div className="info-arrow">→</div>
                    </button>
                  </div>

                  <div className="divider" />
                  <button className="link" type="button" onClick={() => navigate("/data")}>
                    데이터 근거 보기 →
                  </button>
                </div>

                <div className="card">
                  <div className="card-title">💡 활용 팁</div>
                  <ul className="bullets">
                    <li>
                      <strong>정책 담당자:</strong> PDF 리포트를 G-SEED 개정 근거 자료로 활용하세요.
                    </li>
                    <li>
                      <strong>건물주:</strong> Excel 데이터로 상세 비용-효과 분석이 가능합니다.
                    </li>
                    <li>
                      <strong>공유:</strong> 링크를 통해 동료에게 결과를 공유하세요.
                    </li>
                  </ul>
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

export default SimulationStep4;
