import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import "../styles/data_reference.css";

const DataReference = () => {
  return (
    <div>
      <AppHeader />

      <section className="data-hero">
        <div className="container">
          <div className="hero-badge">📊 Research-Based Data</div>
          <h1 className="hero-title">학술 연구 기반의 정량 데이터</h1>
          <p className="hero-desc">
            옥상이몽의 모든 계산은 국내외 학술 논문과 공공 데이터에 근거합니다.
            <br />
            신뢰할 수 있는 출처를 투명하게 공개합니다.
          </p>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">핵심 계수 데이터</h2>
          <p className="section-desc">옥상이몽 시뮬레이션에 적용되는 주요 계수입니다.</p>

          <div className="data-card">
            <div className="data-card-title">
              <div className="data-card-icon icon-co2">🌿</div>
              CO₂ 흡수 계수 (kg/m²/년)
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>녹화 유형</th>
                  <th>적용 계수</th>
                  <th>연구 범위</th>
                  <th>출처</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>잔디</strong>
                  </td>
                  <td className="highlight">1.79 ~ 2.5</td>
                  <td>버뮤다그래스, 톨페스큐, 금잔디</td>
                  <td>
                    <span className="source-tag japan">일본</span> Kuronuma et al. (2018)
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>세덤</strong>
                  </td>
                  <td className="highlight">0.14 ~ 0.70</td>
                  <td>Sedum acre, S. aizoon 등</td>
                  <td>
                    <span className="source-tag usa">미국</span> Getter et al. (2009)
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>관목</strong>
                  </td>
                  <td className="highlight">2.07 ~ 2.27</td>
                  <td>화살나무, 회양목 등</td>
                  <td>
                    <span className="source-tag korea">한국</span> 김학구 외 (2022)
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="source-note">
              <strong>💡 보수적 적용:</strong> 본 서비스는 연구 범위 내 <strong>보수적 수치</strong>를 적용하여 정책적
              신뢰성을 확보했습니다.
            </div>
          </div>

          <div className="data-card">
            <div className="data-card-title">
              <div className="data-card-icon icon-temp">🌡️</div>
              온도 저감 효과 (°C)
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>녹화 유형</th>
                  <th>최대 저감</th>
                  <th>측정 조건</th>
                  <th>출처</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>세덤</strong>
                  </td>
                  <td className="highlight">4.7°C</td>
                  <td>8월, 12시 기준</td>
                  <td>
                    <span className="source-tag korea">한국</span> 옥상녹화 유형별 기온저감 연구
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>잔디</strong>
                  </td>
                  <td className="highlight">3.2°C</td>
                  <td>8월, 12시 기준</td>
                  <td>
                    <span className="source-tag korea">한국</span> 옥상녹화 유형별 기온저감 연구
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>관목</strong>
                  </td>
                  <td className="highlight">2.5°C</td>
                  <td>8월, 12시 기준</td>
                  <td>
                    <span className="source-tag korea">한국</span> 옥상녹화 유형별 기온저감 연구
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="source-note">
              <strong>📐 실험 조건:</strong> 1m×1m×1m 건물 모형에서 4개월간(7~10월) 실측한 데이터입니다.
            </div>
          </div>

          <div className="data-card">
            <div className="data-card-title">
              <div className="data-card-icon icon-pine">🌲</div>
              기준값
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>항목</th>
                  <th>값</th>
                  <th>설명</th>
                  <th>출처</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>소나무 연간 CO₂ 흡수량</strong>
                  </td>
                  <td className="highlight">9.1 kg/년</td>
                  <td>30년생 소나무 기준</td>
                  <td>
                    <span className="source-tag gov">정부</span> 산림청 국립산림과학원
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>옥상 가용율</strong>
                  </td>
                  <td className="highlight">65%</td>
                  <td>건축물 옥상 면적 대비 녹화 가능 면적</td>
                  <td>
                    <span className="source-tag gov">정부</span> 서울시 옥상녹화 가이드라인
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <h2 className="section-title">참고 문헌</h2>
          <p className="section-desc">본 서비스에 인용된 학술 논문 및 공공 데이터 출처입니다.</p>

          <div className="reference-list">
            <div className="reference-item">
              <div className="ref-number">1</div>
              <div className="ref-content">
                <div className="ref-title">CO₂ Payoff of Extensive Green Roofs with Different Vegetation Species</div>
                <div className="ref-meta">
                  Kuronuma, T., Watanabe, H. et al. (2018) · Sustainability, MDPI ·{" "}
                  <a className="ref-link" href="https://doi.org/10.3390/su10072256" target="_blank" rel="noreferrer">
                    DOI: 10.3390/su10072256
                  </a>
                </div>
              </div>
            </div>
            <div className="reference-item">
              <div className="ref-number">2</div>
              <div className="ref-content">
                <div className="ref-title">Carbon Sequestration Potential of Extensive Green Roofs</div>
                <div className="ref-meta">
                  Getter, K. L. et al. (2009) · Environmental Science & Technology, Michigan State University
                </div>
              </div>
            </div>
            <div className="reference-item">
              <div className="ref-number">3</div>
              <div className="ref-content">
                <div className="ref-title">정원수목의 탄소흡수량 측정 및 국가 탄소흡수원 자료 구축</div>
                <div className="ref-meta">김학구 외 (2022) · 한국수목원정원관리원</div>
              </div>
            </div>
            <div className="reference-item">
              <div className="ref-number">4</div>
              <div className="ref-content">
                <div className="ref-title">산림생장정보 - 수종별 탄소흡수량</div>
                <div className="ref-meta">
                  산림청 국립산림과학원 ·{" "}
                  <a className="ref-link" href="https://nifos.forest.go.kr" target="_blank" rel="noreferrer">
                    nifos.forest.go.kr
                  </a>
                </div>
              </div>
            </div>
            <div className="reference-item">
              <div className="ref-number">5</div>
              <div className="ref-content">
                <div className="ref-title">서울시 옥상녹화 가이드라인</div>
                <div className="ref-meta">서울특별시 · 푸른도시국</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default DataReference;
