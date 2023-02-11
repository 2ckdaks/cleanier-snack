const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extend: true }));
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://2ckdaks:s3528022@cluster0.0qiowcf.mongodb.net/cleanier-snack?retryWrites=true&w=majority', function(에러, client){
  if (에러) return console.log(에러);
  db = client.db('cleanier-snack');

  db.collection('test').insertOne({이름 : '이창민', 나이 : '26'}, function(req, res){
    console.log('good')
  });

  //서버띄우는 코드 여기로 옮기기
  app.listen('8080', function(){
    console.log('listening on 8080')
  });
})

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/html/login.html");
});

app.get("/request", function (req, res) {
  res.sendFile(__dirname + "/public/html/request.html");
});
app.post('/add', function(req, res){
  console.log(req.body.request);
  res.redirect('/request')
});

app.post("/add", function(req, res) {
  res.send('전송완료')
})

app.get("/snack-list", function (req, res) {
  res.sendFile(__dirname + "/public/html/snack-list.html");
});

app.get("/user-list", function (req, res) {
  res.sendFile(__dirname + "/public/html/user-list.html");
});

