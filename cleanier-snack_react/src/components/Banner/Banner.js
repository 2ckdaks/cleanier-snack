import "./../Banner/Banner.css";
import { Link as ScrollLink } from "react-scroll";

function Banner() {
  return (
    <div className="Banner-container">
      <div className="Banner-background">
        <div className="Banner-contents">
          <p>
            우리 사무실 간식,<br></br>더 이상 고민하지 말고<br></br>
            <b>클리니어에게 맡기세요</b>
          </p>
          <img src="/image/pc/img_human_cleanier.png" className="pc-img"></img>
          <ScrollLink to="contact" offset={0} spy={true}>
            <button id="banner-btn">서비스 문의하기</button>
          </ScrollLink>
          <img
            src="/image/mobile/banner/people.png"
            className="m-img-people"
          ></img>
          <img src="/image/mobile/banner/bar.png" className="m-img-bar"></img>
        </div>
      </div>
    </div>
  );
}

export { Banner };
