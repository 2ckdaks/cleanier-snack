import "./../Footer/Footer.css";

function Footer() {
  return (
    <div className="footer-background">
      <div className="footer-container">
        <div className="footer-contents">
          <img
            src="/image/pc/footer/logo-dark.svg"
            className="footer-logo"
          ></img>
          <div className="footer-nav">
            <div>
              <a
                href="https://drive.google.com/file/d/1nQW1Gyxx7WxlRChLaek1TUS9Lna-DbOh/view?usp=share_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                서비스 소개서
              </a>
              <span>|</span>
            </div>
            <div>
              <a
                href="https://koreaspacedata.notion.site/bcf26ad9571a4a42a2d9b8a272fe3e3a"
                target="_blank"
                rel="noopener noreferrer"
              >
                개인정보 취급 방침
              </a>
            </div>
            <span>|</span>

            <div>
              <a
                href="mailto:ksd_sales@koreaspacedata.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                비즈니스 제휴
              </a>
              <span>|</span>
            </div>
            <div>
              <a
                href="https://blog.naver.com/thecleanier/223038674397"
                target="_blank"
                rel="noopener noreferrer"
              >
                클리니어 위드 모집
              </a>
            </div>
          </div>

          <div className="footer-info">
            <div>
              <div>
                대표이사 : 김현우<br></br>
                사업자등록번호 : 416-87-01054<br></br>
                주소 : 서울시 서초구 서초대로46길 19-12, 2층
              </div>
            </div>
            <div className="footer-num">
              <div>
                고객센터 :{" "}
                <span>
                  <a href="tel:1833-7470">1833-7470</a> (09:00 ~ 18:00)
                </span>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>
              Copyright © 2023.{" "}
              <a href="https://koreaspacedata.com/" target={"_blank"}>
                주식회사 한국공간데이터
              </a>{" "}
            </p>
          </div>

          <div className="footer-link">
            <div className="sns">
              <a
                href="https://www.instagram.com/cleanier.official/"
                target={"_blank"}
              >
                <img src="/image/pc/footer/Frame 7892.svg"></img>
              </a>
              <a
                href="https://www.facebook.com/cleanier.official/"
                target={"_blank"}
              >
                <img src="/image/pc/footer/Frame 7891.svg"></img>
              </a>
              <a href="https://blog.naver.com/thecleanier" target={"_blank"}>
                <img src="/image/pc/footer/Frame 7893.svg"></img>
              </a>
              <a
                href="https://www.youtube.com/channel/UCCsTYS_gJXPlvoqjFKYGb_g"
                target={"_blank"}
              >
                <img src="/image/pc/footer/Frame 7894.svg"></img>
              </a>
            </div>

            <div className="ksd">
              <a href="https://koreaspacedata.com/" target={"_blank"}>
                <img src="/image/pc/footer/Frame.svg"></img>
                <span>한국공간데이터</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Footer };
