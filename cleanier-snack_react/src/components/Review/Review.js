import "./../Review/Review.css";
import Marquee from "react-fast-marquee";
import React, { useState, useEffect } from "react";

function Review() {
  return (
    <div className="review-container">
      <p className="review-title">클리니어 스낵 이용 고객 피드백</p>
      <p className="review-paragraphs">
        클리니어 스낵을 <b>추천합니다</b>
      </p>
      <Marquee>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl4.svg"></img>
          <p className="review-name">K사 L 담당자님</p>
          <p className="review-write">
            "어떤 요청을 드려도<br></br>
            담당 매니저님께서<br></br>
            빠르게 답변해주시고<br></br>
            바로 반영해주셔서 좋아요!"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl5.svg"></img>
          <p className="review-name">F사 K 담당자님</p>
          <p className="review-write">
            "그동안 인기없는 과자만<br></br>
            있었는데, 과자 퀄리티도<br></br>
            좋아지고 간식양도<br></br>
            기존보다 두 배나 늘었어요!"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl6.svg"></img>
          <p className="review-name">S사 P 담당자님</p>
          <p className="review-write">
            "저도 간식 선정에 대한<br></br>
            부담없이 다양한 간식을<br></br>
            즐길 수 있어졌어요!"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl7.svg"></img>
          <p className="review-name">A사 P 담당자님</p>
          <p className="review-write">
            "청소부터 스낵까지<br></br>
            클리니어 하나로 해결되니까<br></br>
            너무 편리해요!<br></br>
            역시 클리니어가 최고에요!"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl8.svg"></img>
          <p className="review-name">S사 L 담당자님</p>
          <p className="review-write">
            "업체 변경 후 직원들 만족도가<br></br>
            높아 믿고 맡기고 있어요!<br></br>
            직원들이 편의점 갈 필요가<br></br>
            없다고 하네요!"
          </p>
        </div>
        <div className="review-item-container">
          <img
            src="/image/pc/review/img_ppl9.svg"
            style={{ marginBottom: "8px" }}
          ></img>
          <p className="review-name">A사 P 담당자님</p>
          <p className="review-write">
            "클리니어로 바꾸고나서 직원들<br></br>
            반응이 너무 좋아요! 자꾸 손이<br></br>
            가는 조합이라구요 다른 지점도<br></br>
            추가 요청 드리려구요! 🤭 "
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl10.svg"></img>
          <p className="review-name">C사 K 담당자님</p>
          <p className="review-write">
            "배송이 끝이아닌<br></br>
            진열, 정기관리까지 해주셔서<br></br>
            즐겁게 업무에만<br></br>
            집중할 수 있어요"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl11.svg"></img>
          <p className="review-name">A사 P 담당자님</p>
          <p className="review-write">
            "신상품부터 인기상품까지<br></br>
            큐레이션을 해주니<br></br>
            사무실이 편의점 같아요!<br></br>
            복지가 이런거죠"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl1.svg"></img>
          <p className="review-name">K사 L 담당자님</p>
          <p className="review-write">
            "청소와 스낵 모두 클리니어<br></br>
            사용중인데<br></br>
            회계처리가 편하니<br></br>
            업무가 확실히 줄었어요"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl2.svg"></img>
          <p className="review-name">M사 K 담당자님</p>
          <p className="review-write">
            "한 사무실만 시험삼아<br></br>
            써봤는데 너무 만족스러워요!<br></br>
            지사에 모두<br></br>
            확장할 계획입니다!"
          </p>
        </div>
        <div className="review-item-container">
          <img src="/image/pc/review/img_ppl3.svg"></img>
          <p className="review-name">K사 H 담당자님</p>
          <p className="review-write">
            "타 스낵업체 사용하다가<br></br>
            클리니어 스낵으로 바꾸고<br></br>
            예산은 그대로인데 간식량이<br></br>
            확연하게 늘었어요"
          </p>
        </div>
      </Marquee>
    </div>
  );
}

export { Review };
