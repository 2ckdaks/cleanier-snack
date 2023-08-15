import "./../Nav/Nav.css";
import { Link as ScrollLink } from "react-scroll";

function Nav() {
  return (
    <div className="main-nav">
      <div className="nav-container">
        <div className="logo-container">
          <a href="/" style={{ color: "black" }}>
            <img src="/image/pc/nav/snack-logo.svg"></img>{" "}
          </a>
        </div>
        <ScrollLink to="contact" offset={0} spy={true}>
          <button id="nav-btn">서비스 문의하기</button>
        </ScrollLink>
      </div>
    </div>
  );
}

export { Nav };
