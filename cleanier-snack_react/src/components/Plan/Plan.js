import "./../Plan/Plan.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link as ScrollLink } from "react-scroll";
import React, { useState, useEffect } from "react";

SwiperCore.use([Navigation]);

export function Plan({ setPlanName }) {
  const handleClick = (planName) => {
    setPlanName(planName);
  };

  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    setIsWide(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsWide(window.innerWidth >= 768);
  };

  return (
    <div className="plan-background">
      <div className="plan-container">
        {/* plan-contents추가됨 */}
        <div className="plan-contents">
          <p className="plan-title">클리니어 스낵 가격 플랜</p>
          <p className="plan-paragraphs">
            클리니어 스낵을 <b>다양하게 이용하세요</b>
          </p>
          <div className="plan-img-container">
            <Swiper
              className="Plan-Swiper"
              spaceBetween={20}
              slidesPerView={isWide ? 3 : 1.2}
              freeMode={true}
              freeModeSticky={true}
              freeModeMomentum={false}
              scrollbar={{ draggable: true }}
              breakpoints={{
                767: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                600: {
                  slidesPerView: 2.3,
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 13,
                },
                360: {
                  slidesPerView: 1.3,
                  spaceBetween: 13,
                },
              }}
            >
              <SwiperSlide className="Plan-SwiperSlide">
                <div className="plan-item">
                  <img
                    src="/image/pc/Rectangle-6749.png"
                    className="best"
                  ></img>
                  <span className="best-write">추천</span>
                  <p>한 번에 해결해요</p>
                  <h1>그린 플랜</h1>
                  <ul className="plan-ul">
                    <li>주 1회 배송</li>
                    <li>상품 수 최대 60개</li>
                    <li>월간 리포트 제공</li>
                    <li>전담 매니저 배정</li>
                    <li>서비스 매대 제공</li>
                  </ul>
                  <div className="line"></div>
                  <ul className="green-ul">
                    <li>정기 청소 진행시 최대 35% 할인</li>
                    <li>대청소 할인 쿠폰 제공</li>
                    <li>피톤치드 분사 분기별 1회 무료</li>
                  </ul>
                  <ScrollLink to="contact" offset={0} spy={true}>
                    <button
                      id="plan-green-btn"
                      className="green-btn"
                      onClick={() => handleClick("그린 플랜(주 80만원부터)")}
                    >
                      주 80만원부터
                    </button>
                  </ScrollLink>
                </div>
              </SwiperSlide>

              <SwiperSlide className="Plan-SwiperSlide">
                <div className="plan-item">
                  <p>5-80명 규모의 사무실에 추천해요</p>
                  <h1>블루 플랜</h1>
                  <ul className="plan-ul">
                    <li>주 1회 배송</li>
                    <li>상품 수 최대 30개</li>
                    <li>월간 리포트 제공</li>
                    <li>고객사 선호 품목 비율 반영</li>
                    <li>서비스 매대 제공</li>
                  </ul>
                  <ScrollLink to="contact" offset={0} spy={true}>
                    <button
                      id="plan-blue-btn"
                      className="blue-btn"
                      onClick={() => handleClick("블루 플랜(주 50만원부터)")}
                    >
                      주 50만원부터
                    </button>
                  </ScrollLink>
                </div>
              </SwiperSlide>

              <SwiperSlide className="Plan-SwiperSlide">
                <div className="plan-item">
                  <p>소수 정예 필요한 간식만 선택해요</p>
                  <h1>옐로우 플랜</h1>
                  <ul className="plan-ul">
                    <li>월 1-2회 배송</li>
                    <li>상품 수 최대 30개</li>
                  </ul>
                  <ScrollLink to="contact" offset={0} spy={true}>
                    <button
                      id="plan-yellow-btn"
                      className="yellow-btn"
                      onClick={() => handleClick("옐로우 플랜 (월 30만원부터)")}
                    >
                      월 30만원부터
                    </button>
                  </ScrollLink>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
