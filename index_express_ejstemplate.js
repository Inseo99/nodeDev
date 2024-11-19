const express = require('express');
const app = express();  // Express 애플리케이션을 생성
const port = 3003;
const ejs = require("ejs"); // embeded javascript 템플릿 사용(html처럼)
const fs = require("fs");

// db접속
var dbconn = require(__dirname + "/dbconn.js"); // __dirname = 현재 실행 중인 파일의 디렉토리 경로
var conn = dbconn.init();
dbconn.connect(conn);

// body객체안에 데이터를 추출한다.
var bodyparser = require("body-parser");    // 데이터 추출 파서(무언가 추출하는 것) 사용
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));   //url인코딩 깨짐 방지

// 화면 엔진으로 ejs 사용하겠다
app.set("view engine", "ejs");

// ejs가 모여있는 폴더위치를 지정할 수 있다
app.set("views", __dirname + "/views");

app.use("/style", express.static(__dirname + "/style"));    // 가상경로와 폴더매칭

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/");    // 경로호출
});

app.get("/boardWriteTemplate", (req,res)=>{ 
        res.render("boardWrite.ejs")
});

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

const boardList = fs.readFileSync('./views/boardList.ejs', 'utf8')

app.get("/boardListTemplate", (req,res)=>{ 

    var sql = "SELECT * FROM board ORDER BY originbidx DESC, depth ASC";

    conn.query(sql,function(err,results,fields){
        if(err){
            console.log(err);
        }
       var page = ejs.render(boardList,{
            title : "게시글 목록",
            data : results,
       });       
        console.log(results);
        res.send(page);
    });
});

app.listen(port, () => { 
    console.log("server running!");
});
