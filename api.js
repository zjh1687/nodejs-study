//엄격한 코드 검사

'use strict';
/************* include library **************/
var express = require('express');
var api     = express();
var db      = require('./db');

 /*  var dbInfo = {
    host: 'ls-712a3de0f216372c332622b5ed5c6f22fe2f67bd.cu0xyssgzj43.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'dbmasteruser',
    password:'buackr!!##',
    database: 'BU',
    multipleStatements: true
}
  */


 /*  var db = mysql.createConnection({
    host : db.host,
    user : db.user,
    password : db.password,
    database : db.database
}); 
  */


/************* Routing **************/
//api Index
api.get('/', (req, res, next) => {
    //db.connect();
   
    console.log("init start");
    db.query(' select * from sensor_data ' , function(error, results, fields){
        if (error) {
            console.log(error);
            
        }

        console.log(results);
        res.send(results);
    });

    
   
    
});

/************* Routing **************/
//api Index
api.get('/sensor', (req, res, next) => {
    
    console.log("init start");
    db.query(' select * from sensor_data ' , function(error, results, fields){

        console.log(results);
        res.send(results);
    })

    res.send("Welcome is API Fucntion"+results);
    
});


 api.get('/inSsensor', (req, res, next) => {

    var sql = " insert into sensor_data (sensor_type, sensor_value, sensor_user, ins_date) values ('"+ req.query.sensor_type +"', "+ req.query.sensor_value +", '"+ req.query.sensor_user +"', now()) ";
    console.log(sql);
    console.log("init start");
     db.query(sql , function(error, results, fields){

         console.log(error);
         console.log(results);
        res.send(results);
     })
     
    //req.body.sensorIdx
    //req.body.sensorType
    //req.body.sensorValue

});

api.post('/insSensor', (req, res, next) => {

    var sensorType = req.body.sensorType;// "";
    var sensorValue = req.body.sensorValue;//"";
    var userId = req.body.userId; //"";
    
    var sql = " insert into sensor_data (sensor_type, sensor_value, sensor_user, ins_date) values ";
    sql += " ('"+ sensorType +"', "+ sensorValue +", '"+ userId +"', now()) ";
    console.log(sql);
     db.connect();

    console.log("init start");
    db.query(sql , function(error, results, fields){

        //console.log(error);
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