const express = require('express');
const app = express();  // Express 애플리케이션을 생성
const port = 3002;

var dbconn = require(__dirname + "/dbconn.js"); // __dirname = 현재 실행 중인 파일의 디렉토리 경로
var conn = dbconn.init();
dbconn.connect(conn);

var bodyparser = require("body-parser");    // 데이터 추출 파서(무언가 추출하는 것) 사용
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));   //url인코딩 깨짐 방지

app.use("/style", express.static(__dirname + "/style"));    // 가상경로와 폴더매칭

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/");    // 경로호출
});
// 아래와 비슷한 표현
// 익명함수 - 한번만 사용하기때문에 이름이 없다
// (req, res) {
//     res.sendRedirect(경로);
//     return;
//     }

app.get("/boardWrite", (req,res)=>{   // 겟방식으로 가상경로띄우기
        res.sendFile(__dirname+"/boardWrite.html");
    }
);

app.post("/boardWriteAction", function(req, res) {
    var body = req.body;
    console.log(body);

    var sql = "INSERT INTO board(originbidx, depth, level_, subject, contents, writer, password, midx) VALUE(null, 0, 0, ?, ?, ?, ?, 101)";
    var sql2 = "UPDATE board SET originbidx = (SELECT A.maxbidx FROM (SELECT max(bidx) AS maxbidx FROM board) A) WHERE bidx = (SELECT A.maxbidx FROM (SELECT max(bidx) AS maxbidx FROM board) A)";
    var params = [body.subject, body.writer, body.contents, body.password];
    
    console.log(sql);

    conn.query(sql, params, function(err, results, fields) {
        if(err) {
            console.log(err);
        }
        console.log(results);
    });

    conn.query(sql2, params, function(err, results, fields) {
        if(err) {
            console.log(err);
        }
        console.log(results);
    });

    res.redirect("/");
});

app.listen(port, () => { 
    console.log("server running!");
});
