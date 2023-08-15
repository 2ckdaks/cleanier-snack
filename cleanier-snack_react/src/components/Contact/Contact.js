import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../Contact/Contact.css";
import axios from "axios";
import { db } from "../../index";
import { Dropdowns } from "../Dropdown/Dropdown";

function Contact({ planName, setPlanName, handlePlanSelect }) {
  const [locationValue, setLocationValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [telValue, setTelValue] = useState("");
  const [peopleValue, setPeopleValue] = useState("");
  const [budgetValue, setBudgetValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [plan, setPlan] = useState("");
  const navigate = useNavigate();

  //전화번호 정규식
  const tel = (e) => {
    const telValue = e.target.value
      .replace(/[^0-9]/g, "")
      .replace(
        /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        "$1-$2-$3"
      )
      .replace("--", "-");
    setTelValue((prev) => {
      return telValue;
    });
    const telInput = e.target;
    const warnMsg = telInput.nextElementSibling;

    if (!telValue) {
      // 입력값이 빈값인 경우
      warnMsg.style.display = "block";
      warnMsg.innerText = "필수 항목입니다.";
      telInput.style.border = "1px solid #F3213B";
    } else if (
      !/^(0(2|[3-9]\d{1}))-(\d{3,4})-(\d{4})$|^01([0|1|6|7|8|9]?)-(\d{3,4})-(\d{4})$/.test(
        telValue
      )
    ) {
      // 입력값이 정규식에 맞지 않는 경우
      warnMsg.style.display = "block";
      warnMsg.innerText = "입력값이 올바르지 않습니다.";
      telInput.style.border = "1px solid #F3213B";
    } else {
      // 입력값이 정규식에 맞는 경우
      warnMsg.style.display = "none";
      telInput.style.border = "1px solid #C2C2C2";
    }
  };

  //이메일 정규식
  const email = (e) => {
    const emailValue = e.target.value.trim(); // trim()으로 입력값의 공백을 제거
    const emailregex =
      /^[A-Za-z0-9!#$%&'*+/=?^"_‘({|})~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^"_‘({|})~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/g;
    const emailInput = e.target;
    const warnMsg = emailInput.nextElementSibling;

    if (emailValue === "") {
      // 값이 비어있는 경우
      warnMsg.style.display = "block";
      warnMsg.innerText = "";
    } else if (!emailregex.test(emailValue)) {
      // 값이 있는 경우 정규식을 검사
      warnMsg.style.display = "block";
      warnMsg.innerText = "입력값이 올바르지 않습니다.";
      emailInput.style.border = "1px solid #F3213B";
    } else {
      // 정규식 검사 통과
      warnMsg.style.display = "none";
      emailInput.style.border = "1px solid #C2C2C2";
    }

    setEmailValue(emailValue);
  };

  //예산 validation
  const budget = (e) => {
    let budgetValue = e.target.value.replace(/[^0-9,]/g, "");
    if (budgetValue === "" || Number(budgetValue) === 0) {
      budgetValue = "";
    }
    const formattedValue =
      budgetValue === ""
        ? ""
        : Number(budgetValue.split(",").join("")).toLocaleString() + " 만원";
    setBudgetValue(formattedValue);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      e.preventDefault();
      const currentValue = budgetValue
        .replace(/ 만원$/, "")
        .split(",")
        .join("");
      const newValue = currentValue.slice(0, -1);
      const formattedValue =
        newValue === "" ? "" : Number(newValue).toLocaleString() + " 만원";
      setBudgetValue(formattedValue);
    }
  };

  //소속직원수 정규식
  const people = (e) => {
    let peopleValue = e.target.value.replace(/[^0-9]/g, "");
    if (peopleValue === "" || Number(peopleValue) === 0) {
      peopleValue = "";
    }
    const formattedValue =
      peopleValue === "" ? "" : Number(peopleValue).toLocaleString();
    setPeopleValue(formattedValue);
  };

  useEffect(() => {
    console.log(telValue);
  }, [telValue]);

  //전송시 필수값 미입력일때
  useEffect(() => {
    const requiredInputs = document.querySelectorAll("input[required]");
    const handleSendButtonClick = () => {
      let isAllInputsValid = true;
      requiredInputs.forEach(function (input) {
        if (input.type === "checkbox") {
          if (!input.checked) {
            isAllInputsValid = false;
            const noneMsg = input.parentNode.parentNode.nextElementSibling;
            if (noneMsg && noneMsg.classList.contains("contact-none-msg")) {
              noneMsg.style.display = "block";
              // 라벨태그의 배경이미지를 변경합니다.
              input.nextElementSibling.style.backgroundImage =
                "url(/image/pc/contact/disagree-err.svg)";
            } else {
              if (
                noneMsg &&
                noneMsg.classList.contains("contact-none-msg") &&
                noneMsg.style.display !== "none"
              ) {
                noneMsg.style.display = "block";
              }
            }
          }
        }
        if (input.value.trim() === "") {
          input.style.border = "1px solid #F3213B";
          const noneMsg = input.nextElementSibling;
          if (noneMsg && noneMsg.classList.contains("contact-none-msg")) {
            noneMsg.style.display = "block";
          }
        }
      });
      if (!isAllInputsValid) {
        const warningMessages = document.querySelectorAll(
          ".contact-none-msg, .contact-warn-msg"
        );
        let warningMessagesHeight = 0;
        warningMessages.forEach(function (msg) {
          if (msg.style.display !== "none") {
            warningMessagesHeight += 3;
          }
        });

        //경고메시지 출력시 height조정
        const containerHeight = window.innerWidth <= 767 ? "1260px" : "1390px";
        document.querySelector(
          ".contact-container"
        ).style.height = `calc(${containerHeight} + ${warningMessagesHeight}px)`;
        return;
      }
    };

    const handleInputChange = (event) => {
      event.target.style.border = "1px solid #00d2b7";
      const noneMsg = event.target.nextElementSibling;
      if (noneMsg && noneMsg.classList.contains("contact-none-msg")) {
        noneMsg.style.display = "none";
      }

      // 체크박스인 경우, 바로 상태를 변경
      requiredInputs.forEach(function (input) {
        if (input.type === "checkbox") {
          if (input.checked) {
            input.nextElementSibling.style.backgroundImage =
              "url(/image/pc/contact/agree.svg)";
            // 체크박스 체크시 필수 항목 안내 문구 숨기기
            const noneMsg = input.parentNode.parentNode.nextElementSibling;
            if (noneMsg && noneMsg.classList.contains("contact-none-msg")) {
              noneMsg.style.display = "none";
            }
          } else {
            input.nextElementSibling.style.backgroundImage =
              "url(/image/pc/contact/disagree.svg)";
          }
        }
      });
    };

    // 입력창에 입력 종료 시
    const handleInputBlur = (event) => {
      const noneingMsg = document.querySelector(
        `#${event.target.id}-noneingMsg`
      );
      if (event.target.value.trim() === "") {
        if (noneingMsg) {
          noneingMsg.style.display = "block";
        }
        event.target.style.border = "1px solid #F3213B";
      } else {
        if (noneingMsg) {
          noneingMsg.style.display = "none";
        }
        event.target.style.border = "";
      }
    };
    requiredInputs.forEach(function (input) {
      input.addEventListener("input", handleInputChange);
      input.addEventListener("blur", handleInputBlur);
    });
    document
      .querySelector(".send-btn")
      .addEventListener("click", handleSendButtonClick);
    return () => {
      document
        .querySelector(".send-btn")
        ?.removeEventListener("click", handleSendButtonClick);
      requiredInputs.forEach(function (input) {
        input.removeEventListener("input", handleInputChange);
        input.removeEventListener("blur", handleInputBlur);
      });
    };
  }, []);

  //견적받기 전송시 실행 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 동작을 막음

    //세션에서 키워드를 불러오고 서버로쏴서 꺼내자

    //전화번호 유효성 검사
    const telInput = e.target.phone;
    const telWarnMsg = telInput.nextElementSibling;
    const telValueLength = telInput.value.replace(/-/g, "").length;
    if (
      !/^(0(2|[3-9]\d{1}))-(\d{3,4})-(\d{4})$|^01([0|1|6|7|8|9]?)-(\d{3,4})-(\d{4})$/.test(
        telValue
      )
    ) {
      telWarnMsg.style.display = "block";
      telWarnMsg.innerText = "입력값이 올바르지 않습니다.";
      return; // 전송 중단
    } else {
      telWarnMsg.style.display = "none";
    }

    // //이메일 유효성 검사
    const emailInput = e.target.mail;
    const emailWarnMsg = emailInput.nextElementSibling;
    const emailValue = emailInput.value;
    const emailregex =
      /^[A-Za-z0-9!#$%&'*+/=?^"_‘({|})~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^"_‘({|})~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/g;

    // 이메일 값이 비어 있거나 정규식에 맞지 않으면 경고 표시 후 전송 중단
    if (emailValue && !emailregex.test(emailValue)) {
      emailWarnMsg.style.display = "block";
      emailWarnMsg.innerText = "입력값이 올바르지 않습니다.";
      emailInput.style.border = "1px solid #F3213B";
      return;
    } else {
      emailWarnMsg.style.display = "none";
      emailInput.style.border = "1px solid #C2C2C2";
    }

    // Firestore에 추가
    try {
      let referrerHost = document.referrer;
      let referrer = "";

      if (referrerHost) {
        referrerHost = new URL(referrerHost).hostname;
        if (referrerHost.includes("naver.com")) {
          if (referrerHost.includes("blog.naver.com")) {
            // blog.naver.com에서 들어왔을 때의 처리 코드를 작성하세요.
            referrer = "네이버 블로그";
          } else {
            referrer = "네이버";
          }
        } else if (referrerHost.includes("google.com")) {
          referrer = "구글";
        } else {
          referrer = "-";
        }
      }

      const isMobile = /Mobile|Android/.test(navigator.userAgent);
      const deviceType = isMobile ? "모바일" : "PC";
      const searchKeyword = new URLSearchParams(document.referrer).get("query");
      const formData = new FormData(e.target);
      const keyword = searchKeyword || "-";
      const currentTime = new Date();
      const koreanTime = new Date(
        currentTime.getTime() +
          currentTime.getTimezoneOffset() * 60000 +
          9 * 3600000
      ).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
      const data = {
        company: e.target.company.value,
        name: e.target.name.value,
        phone: e.target.phone.value,
        mail: e.target.mail.value,
        location: e.target.location.value,
        plan: e.target.plan.value,
        personnel: e.target.personnel.value,
        budget: e.target.budget.value,
        keyword: keyword,
        referrer: referrer,
        deviceType: deviceType,
      };
      const entries = Array.from(formData.entries());

      await db.collection("contact").add({
        company: data.company,
        name: data.name,
        phone: data.phone,
        mail: data.mail,
        location: data.location,
        plan: data.plan,
        personnel: data.personnel,
        budget: data.budget,
        keyword: keyword,
        referrer: referrer,
        deviceType: deviceType,
        date: koreanTime,
      });
      axios({
        method: "POST",
        url: "/contact",
        data: { data },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });

      // 페이지 이동, 데이터 전송
      navigate("/sendRequest", { state: { data } });
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="contact-background" id="contact" name="contact">
      <div className="contact-container">
        <p className="contact-title">클리니어 스낵 문의하기</p>
        <p className="contact-paragraphs">
          클리니어 스낵 <b>문의 남겨주세요</b>
        </p>
        <form id="contact-form" className="form" onSubmit={handleSubmit}>
          <div>
            <p>플랜선택</p>
            <Dropdowns
              planName={planName}
              setPlanName={setPlanName}
              handlePlanSelect={handlePlanSelect}
            />
            <select
              style={{ display: "none" }}
              name="plan"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            >
              <option value="" disabled style={{ color: "#C1C1C1 !important" }}>
                원하시는 플랜을 선택해 주세요
                <img src="/image/pc/contact/Heroicons.v2.svg"></img>
              </option>
              <option value="옐로우 플랜 (월 30만원부터)">
                옐로우 플랜 (월 30만원부터)
              </option>
              <option value="블루 플랜(주 50만원부터)">
                블루 플랜(주 50만원부터)
              </option>
              <option value="그린 플랜(주 80만원부터)">
                그린 플랜(주 80만원부터)
              </option>
            </select>
          </div>

          <div>
            <p>지역</p>
            <input
              // onChange={location}
              maxLength={20}
              placeholder="지역을 입력해 주세요"
              name="location"
            ></input>
            <p className="contact-none-msg">입력값이 올바르지 않습니다.</p>
          </div>

          <div>
            <p>회사명</p>
            <input
              // onChange={company}
              maxLength={20}
              placeholder="회사명을 입력해 주세요"
              name="company"
            ></input>
            <p className="contact-none-msg">입력값이 올바르지 않습니다.</p>
          </div>

          <div>
            <p>담당자명</p>
            <input
              // onChange={name}
              maxLength={20}
              placeholder="담당자님 성함을 입력해 주세요"
              name="name"
            ></input>
            <p className="contact-none-msg">입력값이 올바르지 않습니다.</p>
          </div>

          <div>
            <p>
              연락처<span>*</span>
            </p>
            <input
              required
              placeholder="-를 제외한 숫자만 입력해 주세요"
              name="phone"
              value={telValue}
              onChange={tel}
              maxLength={13}
            ></input>
            <p className="contact-none-msg">필수 항목입니다</p>
          </div>

          <div>
            <p>담당자 이메일</p>
            <input
              type="text"
              placeholder="담당자님 이메일 주소를 입력해 주세요"
              name="mail"
              onChange={email}
              value={emailValue}
            ></input>
            <p className="contact-none-msg">입력값이 올바르지 않습니다.</p>
          </div>

          <div>
            <p>
              소속 직원 수<span>*</span>
            </p>
            <input
              required
              type="text"
              placeholder="숫자만 입력해 주세요"
              name="personnel"
              onChange={people}
              value={peopleValue}
            ></input>
            <p className="contact-none-msg">필수 항목입니다</p>
          </div>

          <div>
            <p>
              한 달 예산<span>*</span>
            </p>
            <input
              required
              type="text"
              placeholder="만 원단위 숫자만 입력해 주세요"
              min={0}
              name="budget"
              onChange={budget}
              value={budgetValue}
              onKeyDown={handleKeyDown}
            ></input>
            <p className="contact-none-msg">필수 항목입니다</p>
          </div>

          <div className="check">
            <div>
              <input
                required
                type="checkbox"
                name="check"
                id="check-box"
              ></input>
              <label for="check-box"></label>
              <p>
                개인정보 제공동의 <span>*</span>
              </p>
            </div>
            <div>
              <a
                href="https://koreaspacedata.notion.site/bcf26ad9571a4a42a2d9b8a272fe3e3a"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>
                  보기 <img src="/image/mobile/contact/svg.svg"></img>{" "}
                </p>
              </a>
            </div>
          </div>
          <p
            className="contact-none-msg"
            style={{ marginTop: "-55px", marginBottom: "28px" }}
          >
            필수 항목입니다
          </p>
          <button id="contact-btn" className="send-btn" type="submit">
            견적받기
          </button>
        </form>
      </div>
    </div>
  );
}

export { Contact };
