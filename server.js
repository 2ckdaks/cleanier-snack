const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "cleanier-snack_react/build"))); //특정폴더의 파일들을 전송가능

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
    await slackBot.chat.postMessage({
      channel: channel,
      text: message,
    });
    res.status(200).send("Success");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

module.exports = sendTodayData;

app.post("/contact", sendTodayData);

app.get("/sendRequest", function (req, res) {
  res.sendFile(path.join(__dirname, "cleanier-snack_react/build/index.html"));
});
