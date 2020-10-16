//엄격한 코드 검사


//sangwon chul
//yoon - kim

//SCSCSCSCSCSCSCSC
//asdasdasd
'use strict';
/************* include library **************/
var express = require('express');
var api     = express();
var db      = require('./db');
var mysql = require('mysql');

//시작할때 db.js 새로 만들어서 복붙하기

var dbInfo = {

    host: 'ls-712a3de0f216372c332622b5ed5c6f22fe2f67bd.cu0xyssgzj43.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbmasteruser',
    password:'zEnILaK%Ua`M48R!d]-6[ErR2tZ|kGU',
    database: 'BU',
    multipleStatements: true
}



/* var dbconnection = mysql.createConnection({
    host : dbInfo.host,
    user : dbInfo.user,
    password : dbInfo.password,
    database : dbInfo.database
}); */



/************* Routing **************/
//api Index
api.get('/', (req, res, next) => {

   
    console.log("init start");
    db.query(' select * from sensor_data ' , function(error, results, fields){
        if (error) {
            console.log(error);
        }

        console.log(results);

    });

    
    res.send("Welcome is API Fucntion");
});

/************* Routing **************/
//api Index
api.get('/sensor', (req, res, next) => {
    
    console.log("init start");
    db.query(' select * from sensor_data ' , function(error, results, fields){

        console.log(results);
    })

    res.send("Welcome is API Fucntion");
});


/* api.post('/sensor', (req, res, next) => {
    var sql = " insert into sensor_data (sensor_type, sensor_value, sensor_usr_id, ins_date, upd_date ) values ('"+ req.body.sensor_type +"', "+ req.body.sensor_value +", '"+ req.body.sensor_usr_id +"', now() , now()) ";
    console.log(sql);
    dbconnection.connect();
    console.log("init start");
    dbconnection.query(sql , function(error, results, fields){

        console.log(error);
        console.log(results);
        res.send(results);
    })

    //req.body.sensorIdx
    //req.body.sensorType
    //req.body.sensorValue

}); */

api.post('/insSensor', (req, res, next) => {

    var sensorType = req.body.sensorType;// "";
    var sensorValue = req.body.sensorValue;//"";
    var userId = req.body.userId; //"";
    
    var sql = " insert into sensor_data (sensor_type, sensor_value, sensor_usr_id, ins_date, upd_date ) values ";
    sql += " ('"+ sensorType +"', "+ sensorValue +", '"+ userId +"', now() , now()) ";
    console.log(sql);
    dbconnection.connect();

    console.log("init start");
    dbconnection.query(sql , function(error, results, fields){

        console.log(error);
        console.log(results);
        res.send(results);
    })

    //req.body.sensorIdx
    //req.body.sensorType
    //req.body.sensorValue

});
api.get('/hello', (req, res, next) => {
    res.send("HTTP GET > Hello Nodejs");
});

api.post('/hello', (req, res, next) => {
    res.send("HTTP POST > Hello Nodejs");
});

//Query String
// ex) http://localhost/api/echo?param1=123&param2=321
api.get('/query_echo', (req, res, next) => {
    res.send(req.query);
});


module.exports = api;
