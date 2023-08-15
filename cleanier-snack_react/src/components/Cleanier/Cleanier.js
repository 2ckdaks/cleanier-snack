import "./../Cleanier/Cleanier.css";

function Cleanier() {
  return (
    <div className="cleanier-background">
      <div className="cleanier-container">
        <p className="cleanier-title">
          클리니어 공간 관리 서비스도 <b>이용해보세요!</b>
        </p>
        <p className="cleanier-paragraphs">
          클리니어의 다양한 서비스를 이용해보세요!
        </p>
        <a href="https://www.thecleanier.com/" target={"_blank"}>
          <button>클리니어 홈페이지 이동하기</button>
        </a>
        <img src="/image/pc/cleanier/bg.svg" className="cleanier-bg"></img>
        <img
          src="/image/pc/cleanier/img_cleanier.svg"
          className="cleanier-people"
        ></img>
      </div>
    </div>
  );
}

export { Cleanier };
