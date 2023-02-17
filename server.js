const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(
  session({ secret: "비밀코드", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

var db;
MongoClient.connect(
  "mongodb+srv://2ckdaks:s3528022@cluster0.0qiowcf.mongodb.net/cleanier-snack?retryWrites=true&w=majority",
  function (에러, client) {
    if (에러) return console.log(에러);
    db = client.db("cleanier-snack");

    //서버띄우는 코드 여기로 옮기기
    app.listen("8080", function () {
      console.log("listening on 8080");
    });
  }
);

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

//로그인에 필요함 (로컬스트러지 인증방식)
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
      session: true,
      passReqToCallback: false,
    },
    function (입력한아이디, 입력한비번, done) {
      //console.log(입력한아이디, 입력한비번);
      db.collection("user-login").findOne(
        { id: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과)
            return done(null, false, { message: "존재하지않는 아이디요" });
          if (입력한비번 == 결과.pw) {
            return done(null, 결과);
          } else {
            return done(null, false, { message: "비번틀렸어요" });
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (아이디, done) {
  db.collection("user-login").findOne({ id: 아이디 }, function (에러, 결과) {
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

//요청사항 리스트
app.get("/request", 로그인했니, function (req, res) {
  db.collection("user-request")
    .find({ writer: req.user._id })
    .toArray(function (에러, 결과) {
      console.log(결과);
      res.render("request.ejs", {
        test: 결과,
        사용자: req.user,
        writer: req.user._id,
      });
    });
});

//요청사항 전송
app.post("/add-request", 로그인했니, function (req, res) {
  db.collection("counter").findOne(
    { name: "request-counter" },
    function (에러, 결과) {
      var 총게시물갯수 = 결과.totalRequest;
      db.collection("user-request").insertOne(
        {
          _id: 총게시물갯수 + 1,
          request: req.body.request,
          writer: req.user._id,
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

//간식목록 설정
app.get("/add-snack2", function (req, res) {
  res.render("add-snack.ejs");
});
app.post("/add", function (req, res) {
  db.collection("test2").updateOne(
    { _id: 1 },
    { $push: { snack: { img: "img-1", snack: "snack-1" } } }
  );
  res.redirect("/add-snack2");
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
app.get("/admin-snack-list", function (req, res) {
  db.collection("test")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);
      res.render("admin-snack-list.ejs", { test: 결과 });
    });
});

//고객관리 페이지
app.get("/admin-user-list", function (req, res) {
  db.collection("user-login")
    .find()
    .toArray(function (에러, 결과) {
      console.log(결과);
      res.render("admin-user-list.ejs", { userList: 결과 });
    });
});

//고객상세 페이지
app.get("/admin-user-detail/:id", async function async(req, res) {
  const 업체명 = await db
    .collection("user-login")
    .findOne({ _id: parseInt(req.params.id) });
  const 요청사항 = await db
    .collection("user-request")
    .find({ writer: parseInt(req.params.id) })
    .toArray();
  res.render("admin-user-detail.ejs", { 업체명, 요청사항 });
});

//업체등록
app.get("/sign-up", function (req, res) {
  res.render("sign-up.ejs");
});
app.post("/sign-up", function (req, res) {
  db.collection("counter").findOne(
    { name: "user-counter" },
    function (에러, 결과) {
      var 총게시물갯수 = 결과.totalUser;
      db.collection("user-login").insertOne(
        {
          _id: 총게시물갯수 + 1,
          name: req.body.user_name,
          id: req.body.user_id,
          pw: req.body.user_pw,
        },
        function (에러, 결과) {
          console.log("업체등록 완료");
          db.collection("counter").updateOne(
            { name: "user-counter" },
            { $inc: { totalUser: 1 } },
            function (에러, 결과) {
              if (에러) {
                return console.log(에러);
              }
              console.log("업체카운팅 +1 완료");
              res.redirect("/admin-user-list");
            }
          );
        }
      );
    }
  );
});
