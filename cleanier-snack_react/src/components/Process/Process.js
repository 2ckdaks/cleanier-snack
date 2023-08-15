import "./../Process/Process.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";
import React, { useState, useEffect } from "react";

SwiperCore.use([Navigation]);

function Process() {
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
    <div className="process-background">
      <div className="process-container">
        <p className="process-title">클리니어 스낵의 프로세스</p>
        <p className="process-paragraphs">
          클리니어 스낵은 <b>한 번에 가능합니다</b>
        </p>

        <div className="process-img-container">
          <Swiper
            className="Process-Swiper"
            spaceBetween={20}
            slidesPerView={isWide ? 3 : 1}
            scrollbar={{ draggable: true }}
            navigation={true}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide className="Process-SwiperSlide">
              <div className="process-item">
                <div className="process-img">
                  <img
                    className="pc-img-serch"
                    src="/image/pc/process/Search Chekcmark.svg"
                  ></img>
                  <img
                    className="m-img-serch"
                    src="/image/mobile/process/Search Chekcmark.svg"
                  ></img>
                </div>
                <div className="process-write">
                  <p className="step">STEP1</p>
                  <h1 className="item-title">간식 큐레이션 컨설팅</h1>
                  <p className="item-paragraphs">
                    방문 상담을 통한 상품 큐레이션 및<br></br>공간에 대한 컨설팅
                    진행
                  </p>
                </div>
              </div>
              <img
                src="/image/pc/ic_arrow_right.png"
                className="first-arrow"
              ></img>
            </SwiperSlide>

            <SwiperSlide className="Process-SwiperSlide">
              <div className="process-item">
                <div className="process-img">
                  <img
                    className="pc-img-delivery"
                    src="/image/pc/process/ic_delivery.svg"
                  ></img>
                  <img
                    className="m-img-delivery"
                    src="image/mobile/process/ic_delivery.svg"
                  ></img>
                </div>
                <div className="process-write">
                  <p className="step">STEP2</p>
                  <h1 className="item-title">정기 배송 및 진열 관리</h1>
                  <p className="item-paragraphs">
                    원하는 주기에 원하는 간식을 배송<br></br>상품 정리, 진열,
                    재고 관리 진행<br></br>
                    (매대 배송2주 소요)
                  </p>
                </div>
              </div>
              <img
                src="/image/pc/ic_arrow_right.png"
                className="second-arrow"
              ></img>
            </SwiperSlide>

            <SwiperSlide className="Process-SwiperSlide">
              <div className="process-item">
                <div className="process-img">
                  <img
                    className="pc-img-history"
                    src="/image/pc/process/History.svg"
                  ></img>
                  <img
                    className="m-img-history"
                    src="/image/mobile/process/History.svg"
                  ></img>
                </div>
                <div className="process-write">
                  <p className="step">STEP3</p>
                  <h1 className="item-title">리포트 제공 및 회계 정산</h1>
                  <p className="item-paragraphs">
                    간식 선호도 분석 리포트 및<br></br>회계정산까지 한 번에 진행
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export { Process };
