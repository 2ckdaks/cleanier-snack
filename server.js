// 필요한 모듈 및 환경 설정 가져오기
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require("dotenv").config(); // 환경 변수를 .env 파일에서 로드

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "cleanier-snack_react/build"))); // 정적 파일 제공

//서버 띄우기
app.listen(8080, function () {
  console.log("listening on 8080");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "cleanier-snack_react/build/index.html"));
});

// slack으로 post요청
const { WebClient } = require("@slack/web-api");
const token = process.env.SLACK_TOKEN;
const channel = process.env.SLACK_CHANNEL;
const slackBot = new WebClient(token);

const sendTodayData = async (req, res) => {
  console.log(req.body);
  try {
    // 요청에서 데이터 추출
    const {
      plan,
      location,
      company,
      name,
      phone,
      mail,
      personnel,
      budget,
      check,
      keyword,
      referrer,
      deviceType,
    } = req.body["data"];

    // Slack 메시지 생성
    const message = `*🍪스낵 문의가 도착했습니다!*\n
    *• 회사명:* ${company}\n
    *• 담당자명:* ${name}\n
    *• 연락처:* ${phone}\n
    *• 이메일:* ${mail}\n
    *• 지역:* ${location}\n
    *• 플랜:* ${plan}\n
    *• 소속 직원수:* ${personnel} 명\n
    *• 한 달 예산:* ${budget}\n
    *• 유입 키워드:* ${keyword}\n
    *• 유입 경로:* ${referrer}\n
    *• 기기:* ${deviceType}\n`;

    console.log(message);
    console.log(company);

    // Slack으로 메시지 전송
    await slackBot.chat.postMessage({
      channel: channel,
      text: message,
    });
    res.status(200).send("Success");
    // 오류 발생 시 오류 응답
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// sendTodayData 함수를 모듈로 내보내기
module.exports = sendTodayData;

// "/contact" 경로에 대한 POST 요청 처리
app.post("/contact", sendTodayData);

// "/sendRequest" 경로에 대한 GET 요청 처리
app.get("/sendRequest", function (req, res) {
  // 정적 HTML 파일을 응답으로 보냄
  res.sendFile(path.join(__dirname, "cleanier-snack_react/build/index.html"));
});
