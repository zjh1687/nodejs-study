

//엄격한 코드 검사
'use strict';

/************* include library **************/
var express             = require('express');
var path                = require('path');
var server              = express();

/************* view engine setup **************/
server.set('views', path.join(__dirname, '/web'));

server.set('view engine', 'ejs');
server.engine('html', require('ejs').renderFile);


server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, '/web')));


/************* Routing **************/

//intro
server.get('/', (req, res, next) => {
    res.render("index.html");
});

//form
server.get('/frm', (req, res, next) => {
    res.render("form.html");
});

//Quary String에 대하여 알아보자
server.get('/study', (req, res, next) => {

    // http://localhost/study?id=1234&name=백석대&age=?

    let student = {
        id : 0,
        name : "손님",
        age : 5
    }

    if(req.query.id !== null && req.query.id !== undefined){
        student.id = req.query.id;
    }
    if(req.query.name !== null && req.query.name !== undefined){
        student.name = req.query.name;
    }
    if(req.query.age !== null && req.query.age !== undefined){
        student.age = req.query.age;
    }
    console.log(student);
    res.render("iWillStudy.html", student);
});


//구구단 페이지
server.get('/99dan',  (req, res, next) => {

    // http://localhost/99dan?primary=8

    let gugudan = {
        primary : 2,
        length : 9
    }

    if(req.query.primary !== null && req.query.primary !== undefined){
        gugudan.primary = req.query.primary;
    }
  /* integer check */
  let val = parseInt(req.query.primary);

  console.log (Number.isInteger(val));

  if(Number.isInteger(val)==true){
    if(val>1 && val<10){

        res.render("99dan.html", gugudan);

    }else{

        res.send("범위가 다릅니다.");

    }
  
  }else{

    res.send("숫자가 아닙니다.");

  }
  
});

module.exports = server;
