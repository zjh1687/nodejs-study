'use strict';

/************* include library **************/
var express             = require('express');
var path               = require('path');
var server             = express();
var axios               =require('axios');


/************* view engine setup **************/
server.set('views',path.join(__dirname,'/web'));
server.set('view engine','ejs');
server.engine('html', require('ejs').renderFile);

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