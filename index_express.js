const express = require('express');
const app = express();
const port = 3002;

app.use("/main", express.static(__dirname + "/public"));    // 가상경로와 폴더매칭

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
// 아래와 비슷한 표현
// function 함수이름(req, res) {
//     res.sendRedirect(경로);
//     return;
//     }

app.listen(port, () => {
    console.log("Listen : ${port}");
});