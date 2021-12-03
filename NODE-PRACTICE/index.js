var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.json());    // application/json
app.use(cors())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/test/:id', function(req, res) {

    var userId = req.params.id;

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'andrew',
        password : '20160995',
        database : 'node_practice'
    });

    connection.connect();
    const getUserQurey = `SELECT * FROM UserInfo WHERE userId = ${userId};` // 백틱
    const gerUserResult = connection.query(getUserQurey, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send('회원정보가 조회되지 않았습니다.');
        }
        else {
            res.send(rows);
        }
    });
    connection.end();

});

app.post('/signUp', function(req, res) {

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'andrew',
        password : '20160995',
        database : 'node_practice'
    });

    connection.connect();
    const addUserQurey = `INSERT INTO UserInfo (name, age) VALUES ('푸바', 27);` // 백틱
    const addUserResult = connection.query(addUserQurey, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send('회원정보 등록에 실패했습니다.');
        }
        else {
            res.send(rows);
        }
    });
    connection.end();
});


app.get('/memos', function(req, res) {

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'andrew',
        password : '20160995',
        database : 'web_practice'
    });

    connection.connect();
    const getMemoQurey = `SELECT * FROM Memo ORDER BY memoId DESC;` // 백틱
    const getMemoResult = connection.query(getMemoQurey, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send('메모가 조회되지 않았습니다.');
        }
        else {
            res.send(rows);
        }
    });
    connection.end();

});

app.post('/memos', function(req, res) {

    var nickName = req.body.nickName;
    var content = req.body.content;

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'andrew',
        password : '20160995',
        database : 'web_practice'
    });

    connection.connect();
    const addMemoQurey = `INSERT INTO Memo (nickName, content) 
                            VALUES ('${nickName}', '${content}');` // 백틱
    const addMemoResult = connection.query(addMemoQurey, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send('메모 등록에 실패했습니다.');
        }
        else {
            res.send(rows);
        }
    });
    connection.end();

});

app.delete('/memos/:id', function(req, res) {

    var memoId = req.params.id;

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'andrew',
        password : '20160995',
        database : 'web_practice'
    });

    connection.connect();
    const getUserQurey = `DELETE FROM Memo WHERE memoId = ${memoId};` // 백틱
    const gerUserResult = connection.query(getUserQurey, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.send('메모 삭제에 실패했습니다.');
        }
        else {
            res.send(rows);
        }
    });
    connection.end();
});

app.listen(3000);