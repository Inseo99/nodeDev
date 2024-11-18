const express = require('express');
const app = express();  // Express 애플리케이션을 생성
const port = 3002;

var dbconn = require(__dirname + "/dbconn.js"); // __dirname = 현재 실행 중인 파일의 디렉토리 경로
var conn = dbconn.init();
dbconn.connect(conn);

var bodyparser = require("body-parser");    // 데이터 추출 파서 사용
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));   //url인코딩 깨짐 방지

app.use("/main", express.static(__dirname + "/public"));    // 가상경로와 폴더매칭

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
// 아래와 비슷한 표현
// function 함수이름(req, res) {
//     res.sendRedirect(경로);
//     return;
//     }

app.post("/boardWriteAction", function(req, res) {
    var body = req.body;
    console.log(body);
});

app.listen(port, () => {
    console.log("server running!");
});