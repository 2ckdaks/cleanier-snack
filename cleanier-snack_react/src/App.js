import "./App.css";
import { Kakao } from "./components/Kakao/kakao";
import { Nav } from "./components/Nav/Nav";
import { Banner } from "./components/Banner/Banner";
import { Advangages } from "./components/Advantages/Advantages";
import { Process } from "./components/Process/Process";
import { Plan } from "./components/Plan/Plan";
import { Review } from "./components/Review/Review";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { SendRequest } from "./components/Send-Request/SendRequest";
import { useEffect, useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Cleanier } from "./components/Cleanier/Cleanier";
import { Tel } from "./components/Tel/Tel";
import { Dropdowns } from "./components/Dropdown/Dropdown";
import ReactGA from "react-ga";
import RouteChangeTracker from "./components/RouteChangeTracker";
import TagManager from "react-gtm-module";
import { Helmet } from "react-helmet";

const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID; // 환경 변수에 저장된 추적ID 가져오기
ReactGA.initialize(gaTrackingId, { debug: true }); // react-ga 초기화 및 debug 사용
ReactGA.pageview(window.location.pathname); // 추적하려는 page 설정

const tagManagerArgs = {
  gtmId: "%REACT_APP_GTM_ID%",
};

TagManager.initialize(tagManagerArgs);

function App() {
  RouteChangeTracker();
  const [planName, setPlanName] = useState(""); // App.js에서 planName 상태 추가

  const handlePlanSelect = (plan) => {
    setPlanName(plan);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Kakao />
              <Banner />
              <Advangages />
              <Process />
              <Plan
                planName={planName}
                setPlanName={setPlanName}
                handlePlanSelect={handlePlanSelect}
              />
              <Review />
              <Contact
                planName={planName}
                setPlanName={setPlanName}
                handlePlanSelect={handlePlanSelect}
              />
              <Footer />
              <Tel />
            </>
          }
        />
        <Route
          path="/sendRequest"
          element={
            <>
              <Helmet>
                {/* Event snippet for 스낵_견적요청완료 conversion page */}
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `
        gtag('event', 'conversion', {'send_to': 'AW-415199110/GXrECLXxjp8YEIbf_cUB'});
      `,
                  }}
                />
              </Helmet>
              <Nav />
              <SendRequest />
              <Cleanier />
              <Footer />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
