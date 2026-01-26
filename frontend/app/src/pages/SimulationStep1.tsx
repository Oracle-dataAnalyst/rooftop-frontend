import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { postRooftopEstimate } from "../api/client";
import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import "../styles/step1_condition.css";
import { formatNumber, formatPercent } from "../utils/format";
import {
  getConfirmedArea,
  getEstimate,
  getLocation,
  setConfirmedArea,
  setEstimate,
} from "../utils/simulationStorage";

const SimulationStep1 = () => {
  const navigate = useNavigate();
  const location = getLocation();
  const [estimate, setEstimateState] = useState(getEstimate());
  const [areaInput, setAreaInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const confirmed = getConfirmedArea();
    if (confirmed) {
      setAreaInput(String(confirmed));
    } else if (estimate?.roof_area_m2_suggested) {
      setAreaInput(String(Math.round(estimate.roof_area_m2_suggested)));
    }
  }, [estimate]);

  useEffect(() => {
    const fetchEstimate = async () => {
      if (!location) {
        return;
      }
      if (estimate) {
        return;
      }
      setLoading(true);
      try {
        const data = await postRooftopEstimate(location.point.lat, location.point.lon);
        setEstimate(data);
        setEstimateState(data);
      } catch (err) {
        setError("옥상 면적 추정을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    void fetchEstimate();
  }, [estimate, location]);

  if (!location) {
    return (
      <div>
        <AppHeader />
        <main className="page">
          <div className="container-1320">
            <div className="content-1120">
              <section className="card">
                <div className="card-title">주소 입력이 필요합니다.</div>
                <p className="card-caption">시뮬레이션을 시작하려면 먼저 주소를 입력해주세요.</p>
                <div className="cta-row">
                  <button className="btn btn-primary" onClick={() => navigate("/")}>
                    주소 입력하러 가기
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

  const handleApply = () => {
    const parsed = Number(areaInput.replace(/,/g, ""));
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError("유효한 면적 값을 입력해주세요.");
      return;
    }
    setConfirmedArea(parsed);
    setError("");
  };

  const handleNext = () => {
    const confirmed = getConfirmedArea();
    if (!confirmed) {
      setError("다음 단계로 이동하려면 면적 값을 확정해주세요.");
      return;
    }
    navigate("/simulation/step-2");
  };

  const addressTitle = location.input_address || "선택한 주소";
  const addressCaption = location.normalized_address || addressTitle;

  return (
    <div>
      <AppHeader />

      <main className="page">
        <div className="container-1320">
          <div className="content-1120">
            <section className="section-header">
              <div className="eyebrow">SIMULATION · STEP 1</div>
              <h1 className="h2">옥상 조건 확인</h1>
              <p className="subtitle">주소를 기반으로 시뮬레이션에 사용할 면적 정보를 확인합니다.</p>
            </section>

            <section className="stepper" aria-label="simulation steps">
              <div className="step active">
                <div className="dot" />
                <div className="label">조건확인</div>
              </div>
              <div className="line" />
              <div className="step">
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
              <div className="card">
                <div className="card-header">
                  <div className="pin">📍</div>
                  <div className="header-text">
                    <div className="card-title">{addressTitle}</div>
                    <div className="card-caption">{addressCaption}</div>
                  </div>
                </div>

                <div className="chips">
                  <div className="chip">
                    <div className="chip-label">바닥면적</div>
                    <div className="chip-value">
                      {formatNumber(estimate?.floor_area_m2 ?? 0)} <span className="unit">㎡</span>
                    </div>
                  </div>
                  <div className="chip">
                    <div className="chip-label">옥상 가용면적</div>
                    <div className="chip-value">
                      {formatNumber(estimate?.roof_area_m2_suggested ?? 0)} <span className="unit">㎡</span>
                    </div>
                  </div>
                  <div className="chip">
                    <div className="chip-label">가용 비율</div>
                    <div className="chip-value">
                      {formatPercent(estimate?.availability_ratio ?? 0)} <span className="unit">%</span>
                    </div>
                  </div>
                </div>

                <div className="callout">
                  <div className="callout-icon">i</div>
                  <div className="callout-text">
                    {estimate?.note
                      ? estimate.note
                      : "이 면적은 다음 단계에서 CO₂·온도·경제성 계산의 기준값으로 사용됩니다."}
                  </div>
                </div>

                <div className="edit">
                  <div className="edit-title">면적이 다르면 직접 수정할 수 있습니다.</div>
                  <div className="edit-row">
                    <div className="input">
                      <div className="input-label">옥상 가용면적(㎡)</div>
                      <input
                        className="input-box"
                        type="text"
                        value={areaInput}
                        onChange={(event) => setAreaInput(event.target.value)}
                        placeholder="예: 2500"
                      />
                    </div>
                    <button className="btn btn-secondary" type="button" onClick={handleApply} disabled={loading}>
                      값 적용
                    </button>
                  </div>
                  <div className="edit-help">가용면적은 옥상 구조·설비에 따라 달라질 수 있습니다.</div>
                  {error ? <div className="edit-help" style={{ color: "#e53e3e" }}>{error}</div> : null}
                </div>

                <div className="cta-row">
                  <button className="btn btn-ghost" type="button" onClick={() => navigate("/")}>
                    이전(주소 수정)
                  </button>
                  <button className="btn btn-primary" type="button" onClick={handleNext}>
                    다음: 녹화 계획 →
                  </button>
                </div>
              </div>

              <aside className="side">
                <div className="card">
                  <div className="card-title">왜 면적 확인이 필요한가요?</div>
                  <ul className="bullets">
                    <li>면적은 CO₂ 흡수량 계산의 기준입니다.</li>
                    <li>면적은 온도 저감 효과의 크기를 결정합니다.</li>
                    <li>리포트(PDF)에는 이 값이 근거로 포함됩니다.</li>
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

export default SimulationStep1;
