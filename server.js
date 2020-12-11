

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

    if(req.query.sensor_type !== null && req.query.sensor_type !== undefined){
        student.sensor_type = req.query.sensor_type;
    }
    if(req.query.sensor_value !== null && req.query.sensor_value !== undefined){
        student.sensor_value = req.query.sensor_value;
    }
    if(req.query.ins_date !== null && req.query.ins_date !== undefined){
        student.ins_date = req.query.ins_date;
    }
    if(req.query.mbr_id !== null && req.query.mbr_id !== undefined){
        student.mbr_id = req.query.mbr_id;
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
