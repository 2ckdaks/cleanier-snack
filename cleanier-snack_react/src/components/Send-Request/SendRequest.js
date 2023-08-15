import "./../Send-Request/SendRequest.css";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

function SendRequest() {
  const location = useLocation();
  const data = location.state?.data;
  console.log(data);

  return (
    <>
      <Helmet>
        <script>
          {`
            gtag('event', 'conversion', {'send_to': 'AW-415199110/GXrECLXxjp8YEIbf_cUB'});
          `}
        </script>
      </Helmet>
      <div className="send-container">
        <h1 className="send-message">제출완료</h1>
        <div className="report">
          <div className="report-message">
            <div className="check-mark">
              <img src="/image/pc/sendRequest/check-mark.svg"></img>
            </div>
            <p>
              아래 내용과 같이 제출이 완료되었습니다.<br></br>매니저 확인 후
              연락드리겠습니다.
            </p>
          </div>

          <div className="report-contents">
            <ul>
              <li>
                <div>
                  <span className="sendRequest-form">플랜 선택 :</span>
                  <span className="user-write">{data.plan}</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="sendRequest-form">지역 :</span>
                  <span className="user-write">{data.location}</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="sendRequest-form">회사명 :</span>
                  <span className="user-write">{data.company}</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="sendRequest-form">담당자명 :</span>
                  <span className="user-write">{data.name}</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="sendRequest-form">연락처 :</span>
                  <span className="user-write">{data.phone}</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="sendRequest-form">담당자 이메일 :</span>
                  <span className="user-write">{data.mail}</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="sendRequest-form">소속 직원 수 :</span>
                  <span className="user-write">{data.personnel} 명</span>
                </div>
              </li>
              <li>
                <div>
                  <span className="sendRequest-form">한 달 예산 :</span>
                  <span className="user-write">{data.budget}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <a href="/">
          <button>홈으로 이동하기</button>
        </a>
      </div>
    </>
  );
}

export { SendRequest };
