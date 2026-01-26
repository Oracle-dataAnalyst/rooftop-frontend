import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { postSimulation } from "../api/client";
import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import { GREENING_TYPES, SPECIES_OPTIONS, type GreeningType } from "../data/greening";
import "../styles/step2_planning.css";
import { formatNumber, formatPercent } from "../utils/format";
import { getConfirmedArea, getScenario, setResult, setScenario } from "../utils/simulationStorage";
import type { ScenarioInput, SimulationResult } from "../utils/simulationStorage";

const SimulationStep2 = () => {
  const navigate = useNavigate();
  const roofArea = getConfirmedArea();
  const savedScenario = getScenario();

  const [selectedType, setSelectedType] = useState<GreeningType>(
    (savedScenario?.greening_type as GreeningType) || "sedum"
  );
  const [coverageRatio, setCoverageRatio] = useState<number>(savedScenario?.coverage_ratio ?? 0.65);
  const [treeCount, setTreeCount] = useState<number>(savedScenario?.tree_count ?? 10);
  const [species, setSpecies] = useState<string>(savedScenario?.species ?? "sonamu");
  const [preview, setPreview] = useState<SimulationResult | null>(null);
  const [error, setError] = useState("");

  const typeInfo = GREENING_TYPES[selectedType];
  const speciesOptions = SPECIES_OPTIONS[selectedType];

  const scenario: ScenarioInput = useMemo(
    () => ({
      greening_type: selectedType,
      coverage_ratio: coverageRatio,
      tree_count: selectedType === "tree" ? treeCount : 0,
      species: species || null,
    }),
    [coverageRatio, selectedType, species, treeCount]
  );

  useEffect(() => {
    if (!speciesOptions.find((option) => option.value === species)) {
      setSpecies(speciesOptions[0]?.value ?? "");
    }
  }, [selectedType, species, speciesOptions]);

  useEffect(() => {
    const fetchPreview = async () => {
      if (!roofArea) {
        return;
      }
      try {
        const result = await postSimulation(roofArea, scenario);
        setPreview(result);
        setError("");
      } catch (err) {
        setError("시뮬레이션 미리보기를 불러오지 못했습니다.");
      }
    };

    void fetchPreview();
  }, [roofArea, scenario]);

  if (!roofArea) {
    return (
      <div>
        <AppHeader />
        <main className="page">
          <div className="container-1320">
            <div className="content-1120">
              <section className="card">
                <div className="card-title">면적 입력이 필요합니다.</div>
                <p className="card-caption">옥상 가용면적을 먼저 확정해주세요.</p>
                <div className="cta-row">
                  <button className="btn btn-primary" onClick={() => navigate("/simulation/step-1")}>
                    조건 확인으로 이동
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

  const handleNext = async () => {
    try {
      const result = await postSimulation(roofArea, scenario);
      setScenario(scenario);
      setResult(result);
      navigate("/simulation/step-3");
    } catch (err) {
      setError("시뮬레이션 계산에 실패했습니다. 입력값을 확인해주세요.");
    }
  };

  return (
    <div>
      <AppHeader />

      <main className="page">
        <div className="container-1320">
          <div className="content-1120">
            <section className="section-header">
              <div className="eyebrow">SIMULATION · STEP 2</div>
              <h1 className="h2">녹화 계획 설정</h1>
              <p className="subtitle">녹화 유형과 비율을 선택해 내 건물에 맞는 시나리오를 구성합니다.</p>
            </section>

            <section className="stepper" aria-label="simulation steps">
              <div className="step done">
                <div className="dot" />
                <div className="label">조건확인</div>
              </div>
              <div className="line" />
              <div className="step active">
                <div className="dot" />
                <div className="label">계획</div>
              </div>
              <div className="line" />
              <div className="step">
                <div className="dot" />
                <div className="label">결과</div>
              </div>
              <div className="line" />
              <div className="step">
                <div className="dot" />
                <div className="label">리포트</div>
              </div>
            </section>

            <section className="grid">
              <div className="stack">
                <div className="card">
                  <div className="card-top">
                    <div className="card-title">분석 대상</div>
                    <div className="pill">
                      가용면적 <strong>{formatNumber(roofArea)}㎡</strong>
                    </div>
                  </div>

                  <div className="block">
                    <div className="block-title">녹화 유형 선택</div>
                    <div className="type-grid" role="group" aria-label="green roof types">
                      {(Object.keys(GREENING_TYPES) as GreeningType[]).map((key) => {
                        const type = GREENING_TYPES[key];
                        return (
                          <button
                            key={key}
                            className={`type-card${selectedType === key ? " selected" : ""}`}
                            type="button"
                            aria-pressed={selectedType === key}
                            onClick={() => setSelectedType(key)}
                          >
                            {type.recommended ? <div className="type-badge">추천</div> : null}
                            <div className="type-icon">{type.icon}</div>
                            <div className="type-name">{type.name}</div>
                            <div className="type-meta">
                              <span>CO₂</span>
                              <strong>{type.co2 ?? "확정 예정"}</strong>
                              <span>{type.co2 ? type.co2Unit : ""}</span>
                            </div>
                            <div className="type-sub">{type.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="block">
                    <div className="block-title">선택 유형 상세</div>
                    <div className="detail-panel">
                      <div className="detail-head">
                        <div className="detail-title">
                          <span className="detail-icon">{typeInfo.icon}</span>
                          <span>{typeInfo.name}</span>
                        </div>
                        <div className="detail-tag">상세 패널</div>
                      </div>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <div className="k">추천 식물</div>
                          <div className="v">{typeInfo.detail.recommendedPlant}</div>
                        </div>
                        <div className="detail-item">
                          <div className="k">CO₂ 흡수량</div>
                          <div className="v">
                            {typeInfo.co2 ? `${typeInfo.co2} ${typeInfo.co2Unit}` : "확정 예정"}
                          </div>
                        </div>
                        <div className="detail-item">
                          <div className="k">온도 저감</div>
                          <div className="v">최대 {typeInfo.temp}℃</div>
                        </div>
                        <div className="detail-item">
                          <div className="k">특징</div>
                          <div className="v">{typeInfo.detail.features}</div>
                        </div>
                      </div>
                      <div className="detail-form">
                        <label>
                          수종 선택
                          <select value={species} onChange={(event) => setSpecies(event.target.value)}>
                            {speciesOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </label>
                        {selectedType === "tree" ? (
                          <label>
                            나무 그루 수
                            <input
                              type="number"
                              min={1}
                              value={treeCount}
                              onChange={(event) => setTreeCount(Number(event.target.value || 0))}
                            />
                          </label>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="block">
                    <div className="block-title">녹화 비율</div>
                    <div className="slider-row">
                      <div className="slider-label">0%</div>
                      <div className="slider-track">
                        <div className="slider-fill" style={{ width: `${coverageRatio * 100}%` }} />
                        <div className="slider-thumb" style={{ left: `${coverageRatio * 100}%` }} />
                        <input
                          className="slider-input"
                          type="range"
                          min={0}
                          max={100}
                          value={Math.round(coverageRatio * 100)}
                          onChange={(event) => setCoverageRatio(Number(event.target.value) / 100)}
                        />
                      </div>
                      <div className="slider-label">100%</div>
                      <div className="slider-pill">
                        <strong>{formatPercent(coverageRatio, 0)}%</strong>
                      </div>
                    </div>

                    <div className="preview">
                      <div className="preview-item">
                        <div className="k">녹지 면적</div>
                        <div className="v">{formatNumber(preview?.green_area_m2 ?? 0)}㎡</div>
                      </div>
                      <div className="preview-item">
                        <div className="k">예상 CO₂ 흡수</div>
                        <div className="v">{formatNumber(preview?.co2_absorption_kg_per_year ?? 0)}kg/년</div>
                      </div>
                      <div className="preview-item">
                        <div className="k">예상 온도 저감</div>
                        <div className="v">{formatNumber(preview?.temp_reduction_c ?? 0, 1)}℃</div>
                      </div>
                    </div>

                    {error ? <div className="edit-help" style={{ color: "#e53e3e" }}>{error}</div> : null}

                    <div className="cta-row">
                      <button className="btn btn-ghost" type="button" onClick={() => navigate("/simulation/step-1")}>
                        이전
                      </button>
                      <button className="btn btn-primary" type="button" onClick={handleNext}>
                        결과 확인하기 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="side">
                <div className="card">
                  <div className="card-title">도움말</div>
                  <ul className="bullets">
                    <li>유형별 계수는 데이터 분석 결과로 확정됩니다.</li>
                    <li>나무는 구조·하중 검토가 필요합니다.</li>
                    <li>선택 값은 리포트(PDF) 근거로 포함됩니다.</li>
                  </ul>
                  <div className="divider" />
                  <button className="link" type="button" onClick={() => navigate("/data")}>
                    데이터 근거 보기 →
                  </button>
                </div>

                <div className="card">
                  <div className="card-title">다음 단계</div>
                  <div className="mini">
                    <div className="mini-k">STEP 3</div>
                    <div className="mini-v">Before/After 결과 비교</div>
                  </div>
                  <div className="divider" />
                  <button className="btn btn-secondary" type="button" style={{ width: "100%" }}>
                    결과 페이지 미리보기
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

export default SimulationStep2;
