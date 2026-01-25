import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { postGeocode } from "../api/client";
import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import "../styles/index.css";
import { clearSimulationState, setLocation } from "../utils/simulationStorage";

const Home = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    if (!address.trim()) {
      setError("주소를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      clearSimulationState();
      const location = await postGeocode(address.trim());
      setLocation(location);
      navigate("/simulation/step-1");
    } catch (err) {
      setError("주소를 찾지 못했습니다. 입력값을 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AppHeader />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span>서울시 탄소중립 · 옥상녹화</span>
            <span>·</span>
            <span>Biosolar 최적 설계</span>
          </div>
          <h1 className="hero-title">
            주소 하나로 옥상녹화의
            <br />
            환경·경제 효과를 시뮬레이션합니다.
          </h1>
          <p className="hero-subtitle">
            CO₂ 흡수량, 온도 저감, G-SEED 점수, 절감 금액까지.
            <br />
            데이터 기반 결과를 서울시 제안서와 건물주용 리포트로 동시에 제공합니다.
          </p>

          <div className="hero-search">
            <div className="hero-search-icon">🔍</div>
            <input
              className="hero-search-input"
              placeholder="예) 서울시 중구 세종대로 110 (서울시청) 입력..."
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
            <button className="btn btn-primary" onClick={handleStart} type="button" disabled={isLoading}>
              {isLoading ? "검색 중..." : "시뮬레이션 시작하기"}
            </button>
          </div>
          {error ? <p className="hero-caption" style={{ color: "#e53e3e" }}>{error}</p> : null}
          <p className="hero-caption">
            실제 서비스에서는 공공데이터와 분석 모델을 활용해 건물별 옥상녹화·태양광 통합 효과를 계산합니다.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="container-1320">
          <div className="content-1120">
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">🌿</div>
                <div className="feature-title">CO₂ 흡수량 계산</div>
                <div className="feature-desc">
                  녹화 유형·면적·수종에 따라
                  <br />
                  연간 탄소저감량을 정량화합니다.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌡️</div>
                <div className="feature-title">온도 저감 효과</div>
                <div className="feature-desc">
                  옥상 표면온도 감소와
                  <br />
                  실내 냉방부하 감소를 추정합니다.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <div className="feature-title">G-SEED · 인증 지원</div>
                <div className="feature-desc">
                  데이터 결과를 기반으로
                  <br />
                  G-SEED 항목 추가 근거를 제공합니다.
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <div className="feature-title">경제성·절감 금액</div>
                <div className="feature-desc">
                  에너지 절감, 세제 혜택 등
                  <br />
                  건물주 관점의 경제성을 보여줍니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-1320">
          <div className="content-1120">
            <div className="section-header">
              <div className="section-kicker">PROJECT STRUCTURE</div>
              <h2 className="section-title">데이터 분석에서 제안서와 서비스까지, 한 번에.</h2>
              <p className="section-subtitle">
                옥상이몽은 동일한 분석 결과를 서울시 정책 제안서와 건물주 서비스에 각각 최적화된 형태로 제공합니다.
              </p>
            </div>

            <div className="flow-layout">
              <div className="card">
                <div className="card-header">
                  <span className="card-tag">데이터 분석</span>
                  <h3 className="card-title">옥상녹화 · 태양광 통합 효과 모델링</h3>
                </div>
                <div className="card-body">
                  <p>
                    공공데이터, 기상 데이터, 선행연구를 바탕으로
                    <strong>CO₂ 흡수량·온도저감 계수</strong>를 도출하고, 옥상 단위로
                    시뮬레이션합니다.
                  </p>
                  <div className="pill-list">
                    <span className="pill">녹화 유형별 탄소흡수 계수</span>
                    <span className="pill">옥상 표면 온도 저감 계수</span>
                    <span className="pill">건물용도·층수별 부하 반영</span>
                    <span className="pill">Biosolar 설치 시나리오 비교</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <span className="card-tag">시뮬레이터 서비스</span>
                  <h3 className="card-title">주소 기반 Rooftop Greening Effect Simulator</h3>
                </div>
                <div className="card-body">
                  <p>
                    건물주는 주소만 입력하면, 동일한 모델을 기반으로
                    <strong>"내 건물에 적용했을 때의 효과"</strong>를 즉시 확인할 수 있습니다.
                  </p>
                  <div className="pill-list">
                    <span className="pill">주소·건물 정보 자동 불러오기</span>
                    <span className="pill">녹화 면적·수종 시나리오 선택</span>
                    <span className="pill">CO₂·온도·금액 결과 리포트</span>
                    <span className="pill">G-SEED 준비 체크리스트</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="two-cards">
              <div className="card">
                <div className="badge">📄 서울시 제안서</div>
                <div className="scenario-title">"이 데이터가 근거입니다."</div>
                <p className="card-body">
                  시뮬레이션 결과를 모아 서울시에 제출할
                  <strong>정량적 근거 자료</strong>로 구성합니다.
                  <br />
                  G-SEED 평가 항목에 <strong>탄소흡수·온도저감</strong>을 추가하는 정책 제안을 지원합니다.
                </p>
              </div>
              <div className="card">
                <div className="badge">🖥️ 건물주용 서비스</div>
                <div className="scenario-title">"이걸로 계산하세요."</div>
                <p className="card-body">
                  건물주가 직접 사용하는
                  <strong>웹 기반 시뮬레이터</strong>로,
                  옥상녹화·태양광 통합 설치의 효과를 수치와 그래프로 제공합니다.
                  <br />
                  제안서와 동일한 모델을 사용하여, 정책과 현장의 언어를 연결합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-1320">
          <div className="content-1120">
            <div className="section-header">
              <div className="section-kicker">USE CASES</div>
              <h2 className="section-title">서울시 · 건물주가 이렇게 활용합니다.</h2>
            </div>

            <div className="scenario-grid">
              <div className="card">
                <div className="badge">🏛️ 서울시 · 정책 담당자</div>
                <div className="scenario-title">G-SEED 고도화 · 옥상녹화 확산 정책</div>
                <ul className="scenario-steps">
                  <li>1. 시범지역·건축물 대상 데이터 수집 및 시뮬레이션</li>
                  <li>2. CO₂·온도저감 효과를 지표화하여 G-SEED 항목 설계</li>
                  <li>3. 옥상녹화·Biosolar 설치 인센티브 설계에 활용</li>
                </ul>
              </div>

              <div className="card">
                <div className="badge">🏢 건물주 · 관리자</div>
                <div className="scenario-title">"의무 설치 태양광을, 투자 자산으로."</div>
                <ul className="scenario-steps">
                  <li>1. 주소 입력 후 옥상 조건 확인</li>
                  <li>2. 녹화 유형·면적·태양광 조합 시나리오 선택</li>
                  <li>3. 절감 금액과 인증 가능성 확인 후 의사결정</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default Home;
