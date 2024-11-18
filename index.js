//console.log("react Hello World");

const http = require('http');   // http 모듈 생성
http.createServer(  // http모듈에서 서버생성
    (req, res) => {
        res.statusCode = 200;   // 연결성공코드
        res.setHeader('Content-Type', 'text/html;charset=utf8');    //  응답 본문이 HTML 형식 - 응답 본문의 인코딩 방식을 UTF-8로 설정
        res.end('손오공');  // 응답을 종료하고 손오공을 출력한다
    }
).listen(3001);
