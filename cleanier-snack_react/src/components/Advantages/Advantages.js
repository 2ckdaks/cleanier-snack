import "./../Advantages/Advantages.css";

function Advangages() {
  return (
    <div className="Adv-container">
      <div className="adv-contents">
        <p className="adv-title">클리니어 스낵의 장점</p>
        <p className="adv-paragraphs">
          클리니어 스낵을 만나면 <b>이렇게 달라집니다</b>
        </p>
        <div className="img-container">
          <div className="waste-worry">
            <div className="waste">
              <div className="waste-contents">
                <h1>낭비하지 마세요!</h1>
                <p>
                  <span className="Adv-bold">
                    <b>상품 구매부터 배치</b>
                  </span>
                  까지
                  <br></br>
                  클리니어 스낵이<br></br>
                  고객님의 시간을 아껴드려요
                </p>
              </div>
              <img
                className="waste-img"
                src="/image/mobile/advantages/on_process 1.png"
              ></img>
            </div>
            <div className="worry">
              <div className="worry-contents">
                <h1>고민하지 마세요!</h1>
                <p>
                  고객사 담당 매니저가<br></br>
                  <span className="Adv-bold">예산에 맞는 상품 구성</span>으로
                  <br></br>
                  맞춤 큐레이션 해드려요
                </p>
              </div>
              <img
                className="worry-img"
                src="/image/mobile/advantages/3D000939 1.png"
              ></img>
            </div>
          </div>
          <div className="find">
            <div className="find-contents">
              <h1>찾지 마세요!</h1>
              <p>
                타사 대비 최대<br></br>
                <span className="Adv-bold">10~15% 합리적인 가격,</span>
                <br></br>
                클리니어 스낵이 <span className="find-br"> 해결해 드려요</span>
              </p>
            </div>
            <img
              className="find-img"
              src="image/mobile/advantages/3D00228 1.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Advangages };
