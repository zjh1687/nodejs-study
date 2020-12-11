'use strict';

/************* include library **************/
var express             = require('express');
var path               = require('path');
var server             = express();
var axios               =require('axios');
var cron                = require('node-cron');

/************* view engine setup **************/
server.set('views',path.join(__dirname,'/web'));
server.set('view engine','ejs');
server.engine('html', require('ejs').renderFile);
//////////////////////////////// node-cron /////////////////////////////////


cron.schedule('*/5 * * * * *', () =>{

    console.log('매1, 2, 4, 5 분 마다 실행');

    var sensorType ='t';
    var sensorVal =90;
    var userId='20151417';

    axios.get('http://localhost:3000/api/inSsenor?sensor_type='+sensorType+'&sensor_value='+sensorVal+'&sensor_user='+userId).then((Response)=>{
}).catch((error)=>{
    console.log(error);
});

});


/************* Routing **************/
// client Index
server.get('/',(req, res, next) =>{

    axios.get('http://localhost/api').then((Response)=>{
        console.log(Response.data);
       
        
      var arrData = {
            "data": Response.data
        }
        //console.log(Response.data);
        res.render("clientList1.html",arrData);
    }).catch((Error)=>{
        console.log(Error);
    })
});

module.exports =server;