const mysql = require('mysql');
const conn_info = {
    host : '127.0.0.1',    // 모든 컴퓨터의 본인 호스트
    port : '3306',
    user : 'root',
    password : '1234',
    database : 'aws0822'
}

module.exports = {
    init : function() {
        return mysql.createConnection(conn_info);
    },
    connect : function(conn) {
        conn.connect(function(err) {
            if(err) {
                console.error("오류 : " + err);
            } else {
                console.log("succes!");
            }
        });
    },
}