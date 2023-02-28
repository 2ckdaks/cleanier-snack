const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
app.set("view engine", "ejs");
const bcrypt = require("bcrypt");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
let multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/snack-img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var path = require("path");
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("PNG, JPG만 업로드하세요"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { name } = require("ejs");
const { stringify } = require("querystring");
require("dotenv").config();

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

var db;
MongoClient.connect(process.env.DB_URL, function (에러, client) {
  if (에러) return console.log(에러);
  db = client.db("cleanier-snack");

  //서버띄우는 코드 여기로 옮기기
  app.listen(8080, function () {
    console.log("listening on 8080");
  });
});

//메인 페이지
app.get("/", function (req, res) {
  res.render("index.ejs");
});

//로그인 페이지
app.get("/login", function (req, res) {
  res.render("login.ejs");
});
app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/fail" }),
  function (req, res) {
    res.redirect("/index-login");
  }
);
app.get("/fail", function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<script>alert('id/pw가 일치하지 않습니다. ')</script>");
  res.write('<script>window.location="login"</script>');
});

app.get("/index-login", function (req, res) {
  res.render("index-login.ejs");
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      db.collection("login").findOne(
        { id: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          bcrypt.compare(입력한비번, 결과.pw, function (에러, isMatch) {
            if (isMatch) {
              return done(null, 결과);
            } else {
              return done(null, false, { message: "Wrong Password" });
            }
          });
        }
      );
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  db.collection("login").findOne({ id: 아이디 }, function (에러, 결과) {
    done(null, 결과);
  });
});

function 로그인했니(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

//고객 확인 페이지
app.get("/request", 로그인했니, async function (req, res) {
  const client = await db
    .collection("login")
    .findOne({ _id: ObjectId(req.user._id) });
  const request = await db
    .collection("user-request")
    .find({ writer: ObjectId(req.user._id) })
    .toArray();
  const snack = await db.collection("snack-list").find().toArray();
  const user_snack = await db
    .collection("user-snack")
    .find({ client: String(req.user._id) })
    .toArray();
  res.render("request.ejs", { client, request, snack, user_snack });
  // db.collection("user-request")
  //   .find({ writer: req.user._id })
  //   .toArray(function (에러, 결과) {

  //     res.render("request.ejs", {
  //       total: 결과,
  //       사용자: req.user,
  //       writer: req.user._id,
  //       good: req.user.good,
  //     });
  //   });
});

//요청사항 전송
app.post("/add-request", function (req, res) {
  db.collection("counter").findOne(
    { name: "request-counter" },
    function (에러, 결과) {
      var 총게시물갯수 = 결과.totalRequest;
      db.collection("user-request").insertOne(
        {
          _id: 총게시물갯수 + 1,
          request: req.body.request,
          writer: req.user._id,
          good: 0,
        },
        function (에러, 결과) {
          console.log("요청사항 전송 완료");
          db.collection("counter").updateOne(
            { name: "request-counter" },
            { $inc: { totalRequest: 1 } },
            function (에러, 결과) {
              if (에러) {
                return console.log(에러);
              }
              console.log("요청사항 +1 완료");
              res.redirect("/request");
            }
          );
        }
      );
    }
  );
});

//요청사항 삭제
app.delete("/delete-request", function (req, res) {
  req.body._id = parseInt(req.body._id);
  db.collection("user-request").deleteOne(req.body, function (에러, 결과) {
    console.log("삭제완료");
    res.redirect("/request");
  });
});

app.post("/update-good", function (req, res) {
  db.collection("user-request").updateOne(
    { _id: parseInt(req.body._id) },
    { $inc: { good: 1 } },
    function (에러, 결과) {
      if (에러) {
        console.log(에러);
      }
      res.redirect("/request");
    }
  );
});

//로그아웃
app.get("/logout", 로그인했니, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.redirect("/login");
  });
});

//간식관리
app.get("/admin-snack-list", 로그인했니, function (req, res) {
  if (req.user._id == "63fc4dac0eb3605d0e573c6c") {
    db.collection("snack-list")
      .find()
      .toArray(function (에러, 결과) {
        res.render("admin-snack-list.ejs", { snack: 결과 });
      });
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('관리자 권한이 없습니다. ')</script>");
    res.write('<script>window.location="index-login"</script>');
  }
});

//간식목록 추가
app.get("/add-snack", 로그인했니, function (req, res) {
  if (req.user._id == "63fc4dac0eb3605d0e573c6c") {
    res.render("add-snack.ejs");
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('관리자 권한이 없습니다. ')</script>");
    res.write('<script>window.location="index-login"</script>');
  }
});
app.post("/add-snack", upload.single("snack_img"), function (req, res) {
  req.body._id = ObjectId(req.body._id);
  db.collection("snack-list").insertOne({
    name: req.body.snack_name,
    img: req.body.snack_img,
  });
  res.redirect("/admin-snack-list");
});

//간식목록 삭제
app.delete("/snack-delete", function (req, res) {
  db.collection("snack-list").deleteOne(
    { _id: ObjectId(req.body._id) },
    function (에러, 결과) {
      if (에러) {
        console.log(에러);
      }
      res.status(200).send({ message: "삭제 성공" });
    }
  );
});

//고객관리 페이지
app.get("/admin-user-list", 로그인했니, function (req, res) {
  if (req.user._id == "63fc4dac0eb3605d0e573c6c") {
    db.collection("login")
      .find()
      .toArray(function (에러, 결과) {
        res.render("admin-user-list.ejs", { userList: 결과 });
      });
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('관리자 권한이 없습니다. ')</script>");
    res.write('<script>window.location="index-login"</script>');
  }
});

//고객상세 페이지
app.get("/admin-user-detail/:id", 로그인했니, async function async(req, res) {
  if (req.user._id == "63fc4dac0eb3605d0e573c6c") {
    const client = await db
      .collection("login")
      .findOne({ _id: ObjectId(req.params.id) });
    const request = await db
      .collection("user-request")
      .find({ writer: ObjectId(req.params.id) })
      .toArray();
    const snack = await db.collection("snack-list").find().toArray();
    const user_snack = await db
      .collection("user-snack")
      .find({ client: req.params.id })
      .toArray();
    res.render("admin-user-detail.ejs", { client, request, snack, user_snack });
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('관리자 권한이 없습니다. ')</script>");
    res.write('<script>window.location="index-login"</script>');
  }
});

//고객간식 추가
app.post("/snack-plus", function (req, res) {
  db.collection("user-snack").insertOne({
    snack_src: req.body.snack_img,
    snack_name: req.body.snack_name,
    client: req.body.client,
  });
  res.status(200).send({ message: "추가 성공" });
});

//고객간식 삭제
app.delete("/user-snack-delete", function (req, res) {
  db.collection("user-snack").deleteOne(
    { _id: ObjectId(req.body._id) },
    function (에러, 결과) {
      if (에러) {
        console.log(에러);
      }
      res.status(200).send({ message: "삭제 성공" });
    }
  );
});

//업체등록
app.get("/sign-up", 로그인했니, function (req, res) {
  if (req.user._id == "63fc4dac0eb3605d0e573c6c") {
    res.render("sign-up.ejs");
  } else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('관리자 권한이 없습니다. ')</script>");
    res.write('<script>window.location="index-login""</script>');
  }
});

app.post("/sign-up", (req, res) => {
  let id = req.body.user_id;
  let pw = req.body.user_pw;
  let name = req.body.user_name;
  const saltRounds = 10;

  bcrypt.hash(pw, saltRounds, (err, hash) => {
    try {
      db.collection("login").findOne(
        {
          id: id,
        },
        (error, result) => {
          if (result) {
            res.send({
              code: 0,
            });
          } else {
            db.collection("login").insertOne(
              {
                id: id,
                pw: hash,
                name: name,
              },
              (error, result) => {
                res.redirect("/admin-user-list");
              }
            );
          }
        }
      );
    } catch {
      console.log("err: " + err);
    }
  });
});
