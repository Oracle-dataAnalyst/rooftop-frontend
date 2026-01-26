import AppFooter from "../components/layout/AppFooter";
import AppHeader from "../components/layout/AppHeader";
import "../styles/contact.css";

const Contact = () => {
  return (
    <div>
      <AppHeader />

      <section className="contact-section">
        <div className="container">
          <div className="section-badge">CONTACT</div>
          <h1 className="section-title">문의하기</h1>
          <p className="section-desc">서비스, 시뮬레이션, 협업에 대해 무엇이든 문의해주세요.</p>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="card-title">문의 내용 입력</div>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">
                      이름
                    </label>
                    <input id="contact-name" type="text" className="form-input" placeholder="홍길동" />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">
                      이메일
                    </label>
                    <input id="contact-email" type="email" className="form-input" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-type">
                    문의 유형
                  </label>
                  <select id="contact-type" className="form-select">
                    <option>서비스 문의</option>
                    <option>시뮬레이션 결과 문의</option>
                    <option>협업 제안</option>
                    <option>G-SEED 인증 자문</option>
                    <option>기타</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    문의 내용
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="문의하실 내용을 자세히 작성해주세요."
                  />
                </div>
                <p className="form-note">접수된 문의는 영업일 기준 1~2일 이내에 답변드립니다.</p>
                <div style={{ textAlign: "right" }}>
                  <button type="submit" className="btn-submit">
                    문의 보내기
                  </button>
                </div>
              </form>
            </div>

            <div className="info-card">
              <div className="card-title">안내 사항</div>
              <ul className="info-list">
                <li>시뮬레이션 결과 문의 시 주소를 함께 남겨주세요.</li>
                <li>공공기관·기업 협업 문의 환영합니다.</li>
                <li>G-SEED 인증 관련 자문 가능합니다.</li>
              </ul>
              <div className="info-divider" />
              <div className="info-row">
                <span className="info-label">이메일</span>
                <span className="info-value">contact@oksangimong.kr</span>
              </div>
              <div className="info-row">
                <span className="info-label">운영시간</span>
                <span className="info-value">평일 10:00 – 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </div>
  );
};

export default Contact;
