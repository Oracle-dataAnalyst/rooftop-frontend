import { useNavigate } from "react-router-dom";

import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import "../styles/service_intro.css";

const ServiceIntro = () => {
  const navigate = useNavigate();

  return (
    <div>
      <AppHeader />

      <section className="service-hero">
        <div className="container">
          <div className="hero-badge">🌿 Rooftop Greening Effect Simulator</div>
          <h1 className="hero-title">
            옥상녹화의 효과를
            <br />
            <span className="highlight">숫자로 증명</span>합니다
          </h1>
          <p className="hero-desc">
            주소만 입력하면 CO₂ 흡수량, 온도 저감 효과를 자동 계산
            <br />
            G-SEED 정책 개선을 위한 정량적 근거 자료를 제공합니다
          </p>
          <button className="hero-cta" type="button" onClick={() => navigate("/simulation/step-1")}>
            시뮬레이션 시작하기 →
          </button>
        </div>
      </section>

      <section className="section section-problem">
        <div className="container">
          <div className="problem-intro">
            <div className="problem-quote">"녹색 건물인데, 녹화 효과는 측정하지 않는다?"</div>
            <p className="problem-explain">
              현재 G-SEED 인증은 옥상녹화의 실제 환경 효과(탄소 흡수량, 온도 저감)를
              <br />
              정량적으로 측정하지 않고, 단순히 &apos;토심(흙 깊이)&apos;만으로 평가합니다.
            </p>
          </div>

          <div className="problem-grid">
            <div className="problem-card current">
              <div className="problem-badge">현행 G-SEED 평가 방식</div>
              <h3 className="problem-title">토심(흙 깊이) 기반 가중치 평가</h3>
              <div className="problem-formula">
                <span>생태면적 = 녹화면적 × 가중치</span>
              </div>
              <ul className="problem-list">
                <li>
                  토심 20cm 이상: 가중치 <strong>0.6</strong>
                </li>
                <li>
                  토심 20cm 미만: 가중치 <strong>0.5</strong>
                </li>
              </ul>
              <div className="problem-issue">
                <span className="issue-icon">⚠️</span>
                <span>"흙만 깔아놓고 식물이 죽어도 점수를 받는" 구조적 한계</span>
              </div>
            </div>

            <div className="problem-card issues">
              <div className="problem-badge warning">정량 평가 부재 항목</div>
              <h3 className="problem-title">측정되지 않는 실제 환경 효과</h3>
              <div className="issue-list">
                <div className="issue-item">
                  <span className="issue-label">🌿 탄소 흡수량 (kg CO₂/년)</span>
                  <span className="issue-status">측정 안 함</span>
                </div>
                <div className="issue-item">
                  <span className="issue-label">🌡️ 온도 저감 효과 (°C)</span>
                  <span className="issue-status">측정 안 함</span>
                </div>
                <div className="issue-item">
                  <span className="issue-label">☀️ 냉방 에너지 절감</span>
                  <span className="issue-status">측정 안 함</span>
                </div>
                <div className="issue-item">
                  <span className="issue-label">🏙️ 도시 열섬 완화 효과</span>
                  <span className="issue-status">측정 안 함</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-solution">
        <div className="container">
          <div className="solution-card">
            <div className="solution-icon">💡</div>
            <h2 className="solution-title">옥상이몽이 제안하는 솔루션</h2>
            <p className="solution-desc">
              G-SEED 생태환경 분야에 <strong>탄소 흡수량</strong>과 <strong>냉각 효과</strong>를
              <br />
              정량적으로 평가하는 세부 항목을 추가한다면,
              <br />
              정책 의도에 맞는 실질적인 환경 효과를 극대화할 수 있습니다.
            </p>

            <div className="solution-table">
              <div className="sol-row header">
                <span>분석 데이터</span>
                <span>G-SEED 연계 항목</span>
                <span>기대 효과</span>
              </div>
              <div className="sol-row">
                <span>🌲 수종별 탄소 흡수량</span>
                <span>생태환경 (생태면적률)</span>
                <span>탄소 저감 효율 높은 수종 선정 근거</span>
              </div>
              <div className="sol-row">
                <span>🌡️ 옥상 냉각 효과</span>
                <span>에너지 (EPI 지표)</span>
                <span>냉방 에너지 부하 감소 입증</span>
              </div>
              <div className="sol-row">
                <span>📊 종합 분석</span>
                <span>혁신적 설계 (열섬 저감)</span>
                <span>도시 미기후 개선 기여도 증명</span>
              </div>
            </div>

            <button className="btn-primary" type="button" onClick={() => navigate("/simulation/step-1")}>
              옥상이몽 시뮬레이션 체험하기 →
            </button>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">주요 기능</h2>
          <p className="section-desc">옥상이몽은 정책 담당자와 건물주 모두에게 유용한 데이터를 제공합니다.</p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3 className="feature-title">주소 기반 자동 계산</h3>
              <p className="feature-desc">
                건물 주소만 입력하면 VWorld API를 통해 옥상 면적을 자동으로 추출합니다.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3 className="feature-title">녹화 유형별 효과 분석</h3>
              <p className="feature-desc">
                잔디, 세덤, 관목 등 녹화 유형에 따른 CO₂ 흡수량과 온도 저감 효과를 비교합니다.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Before/After 시각화</h3>
              <p className="feature-desc">
                녹화 전후 환경 효과를 직관적으로 비교할 수 있는 시각화 리포트를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title" style={{ color: "#fff" }}>
            시뮬레이션 프로세스
          </h2>
          <p className="section-desc" style={{ color: "rgba(255,255,255,.7)" }}>
            4단계 과정을 통해 옥상녹화 효과를 확인하세요.
          </p>

          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-title" style={{ color: "#fff" }}>
                주소 입력
              </div>
              <div className="step-desc">건물 주소를 검색하여 입력</div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-title" style={{ color: "#fff" }}>
                조건 확인
              </div>
              <div className="step-desc">옥상 면적 및 가용 면적 확인</div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-title" style={{ color: "#fff" }}>
                녹화 계획
              </div>
              <div className="step-desc">녹화 유형 및 비율 설정</div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-title" style={{ color: "#fff" }}>
                결과 확인
              </div>
              <div className="step-desc">CO₂, 온도 저감 효과 리포트</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">지금 바로 옥상녹화 효과를 확인해보세요</h2>
          <p className="cta-desc">주소만 입력하면 10초 안에 결과를 확인할 수 있습니다.</p>
          <button className="btn-cta" type="button" onClick={() => navigate("/simulation/step-1")}>
            🌿 시뮬레이션 시작하기
          </button>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default ServiceIntro;
