import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import "../styles/gseed.css";

const Gseed = () => {
  return (
    <div>
      <AppHeader />

      <section className="gseed-hero">
        <div className="container">
          <div className="hero-badge">🏢 녹색건축 인증제도</div>
          <h1 className="hero-title">
            <span className="highlight">G-SEED</span>란?
          </h1>
          <p className="hero-desc">
            Green Standard for Energy and Environmental Design
            <br />
            설계·시공·유지·관리 전 과정에서 에너지 절약 및 환경오염 저감에 기여한
            <br />
            <strong>친환경 건축물에 인증을 부여하는 국가 제도</strong>입니다.
          </p>
          <p className="hero-sub">
            공공건축물(연면적 3,000㎡ 이상)은 인증 취득이 의무화되어 있으며,
            <br />
            인증 건축물에는 취득세·재산세 감면 등 세제 인센티브가 제공됩니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">녹색건축 인증의 핵심 효과</h2>
          <p className="section-desc">G-SEED 인증 건축물은 환경적·경제적 가치를 동시에 제공합니다.</p>

          <div className="effect-grid">
            <div className="effect-card">
              <div className="effect-icon">⚡</div>
              <div className="effect-title">에너지 절감</div>
              <div className="effect-desc">
                연간 에너지 사용량
                <br />
                20~30% 절감
              </div>
            </div>
            <div className="effect-card">
              <div className="effect-icon">💧</div>
              <div className="effect-title">수자원 절약</div>
              <div className="effect-desc">
                빗물 재활용 및
                <br />
                절수 설비 적용
              </div>
            </div>
            <div className="effect-card">
              <div className="effect-icon">🌬️</div>
              <div className="effect-title">환경오염 감소</div>
              <div className="effect-desc">
                CO₂ 및 미세먼지
                <br />
                배출 저감
              </div>
            </div>
            <div className="effect-card">
              <div className="effect-icon">🏢</div>
              <div className="effect-title">자산 가치 상승</div>
              <div className="effect-desc">
                건물 가치 및
                <br />
                임대 경쟁력 향상
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">인증 등급 & 세제 혜택</h2>
          <p className="section-desc">G-SEED 인증 등급에 따라 취득세·재산세 감면 혜택이 제공됩니다.</p>

          <div className="benefit-grid">
            <div className="benefit-card">
              <div className="benefit-header">
                <span className="benefit-icon">🏷️</span>
                <span className="benefit-label">신축 건축물</span>
              </div>
              <h3 className="benefit-title">취득세 감면</h3>
              <p className="benefit-sub">2026년 12월 31일까지</p>

              <div className="benefit-table">
                <div className="table-row header">
                  <span>인증 등급</span>
                  <span>에너지효율등급</span>
                  <span>감면율</span>
                </div>
                <div className="table-row highlight">
                  <span>최우수 (그린1등급)</span>
                  <span>1+등급 이상</span>
                  <span className="green">10%</span>
                </div>
                <div className="table-row">
                  <span>우수 (그린2등급)</span>
                  <span>1+등급 이상</span>
                  <span className="green">5%</span>
                </div>
              </div>
              <div className="benefit-note">
                <span className="icon">⚠️</span>
                <span>에너지효율등급 1+등급 이상 동시 충족 필요</span>
              </div>
            </div>

            <div className="benefit-card">
              <div className="benefit-header">
                <span className="benefit-icon">🏠</span>
                <span className="benefit-label">보유 건축물</span>
              </div>
              <h3 className="benefit-title">재산세 감면</h3>
              <p className="benefit-sub">인증일로부터 5년간</p>

              <div className="benefit-highlight">
                <div className="highlight-value">3% ~ 15%</div>
                <div className="highlight-label">감면율</div>
              </div>

              <ul className="benefit-list">
                <li>녹색건축 인증 또는 에너지효율등급 인증 건물</li>
                <li>인증일(또는 준공일) 기준 5년간 적용</li>
                <li>두 인증 날짜가 다를 경우 먼저 받은 인증일 기준</li>
              </ul>
            </div>
          </div>

          <div className="legal-ref">
            <strong>📋 법적 근거:</strong> 「지방세특례제한법」 제47조의2, 같은 법 시행령 제24조
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">인증 등급 체계</h2>
          <p className="section-desc">G-SEED는 100점 만점 기준 4개 등급으로 분류됩니다.</p>

          <div className="grade-table">
            <div className="grade-table-title">📊 등급별 점수 기준 (100점 만점)</div>
            <div className="grade-row header">
              <span>등급</span>
              <span>점수 기준</span>
              <span>비고</span>
            </div>
            <div className="grade-row green1">
              <span>
                <span className="grade-badge badge-green1">최우수</span> 그린1등급
              </span>
              <span>80점 이상</span>
              <span>취득세 10% 감면</span>
            </div>
            <div className="grade-row">
              <span>
                <span className="grade-badge badge-green2">우수</span> 그린2등급
              </span>
              <span>70점 이상</span>
              <span>취득세 5% 감면</span>
            </div>
            <div className="grade-row">
              <span>
                <span className="grade-badge badge-green3">우량</span> 그린3등급
              </span>
              <span>60점 이상</span>
              <span>-</span>
            </div>
            <div className="grade-row">
              <span>
                <span className="grade-badge badge-green4">일반</span> 그린4등급
              </span>
              <span>50점 이상</span>
              <span>-</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">7개 평가 분야</h2>
          <p className="section-desc">G-SEED는 7개 분야에서 건축물의 친환경 성능을 종합 평가합니다.</p>

          <div className="eval-grid">
            <div className="eval-card">
              <div className="eval-number">1</div>
              <h4 className="eval-title">토지이용 및 교통</h4>
              <p className="eval-desc">대지 보존성, 대중교통 접근성, 자전거 보관시설 등</p>
            </div>
            <div className="eval-card">
              <div className="eval-number">2</div>
              <h4 className="eval-title">에너지 및 환경오염</h4>
              <p className="eval-desc">에너지 성능, 온실가스 저감, 오존층 보호 등</p>
            </div>
            <div className="eval-card">
              <div className="eval-number">3</div>
              <h4 className="eval-title">재료 및 자원</h4>
              <p className="eval-desc">친환경 자재, 재활용 비율, 유해물질 저감 등</p>
            </div>
            <div className="eval-card">
              <div className="eval-number">4</div>
              <h4 className="eval-title">물순환 관리</h4>
              <p className="eval-desc">빗물 관리, 절수 설비, 우수 저류 시설 등</p>
            </div>
            <div className="eval-card">
              <div className="eval-number">5</div>
              <h4 className="eval-title">유지관리</h4>
              <p className="eval-desc">체계적 관리 시스템, 운영 매뉴얼 등</p>
            </div>
            <div className="eval-card">
              <div className="eval-number">6</div>
              <h4 className="eval-title">생태환경</h4>
              <p className="eval-desc">생태면적률, 녹지 공간, 비오톱 조성 등</p>
            </div>
            <div className="eval-card">
              <div className="eval-number">7</div>
              <h4 className="eval-title">실내환경</h4>
              <p className="eval-desc">실내 공기질, 쾌적성, 소음 저감 등</p>
            </div>
            <div className="eval-card">
              <div className="eval-number">+</div>
              <h4 className="eval-title">혁신적 설계 (가산)</h4>
              <p className="eval-desc">도시 열섬 저감, 혁신 기술 적용 등</p>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default Gseed;
