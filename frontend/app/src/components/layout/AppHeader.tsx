import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="container-1320 header-inner">
        <NavLink className="logo" to="/">
          <div className="logo-mark">옥</div>
          <span className="logo-text">옥상이몽</span>
        </NavLink>
        <nav className="nav">
          <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/intro">
            서비스 소개
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/data">
            데이터 근거
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/gseed">
            G-SEED란?
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/contact">
            문의하기
          </NavLink>
          <NavLink className="btn btn-outline" to="/simulation/step-1">
            시뮬레이션 시작
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
