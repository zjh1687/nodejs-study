
var express = require('express');
var server = express();
var path = require('path');
var axios = require('axios');
//const { json } = require("body-parser");

server.set('views', path.join(__dirname, '/web'));
server.set('views engine', 'ejs');
server.engine('html', require('ejs').renderFile);

server.get('/', (req, res, next) => {


    axios.get('http://localhost/api1').then((Respone)=>{


        console.log(Respone.data);
 
        var arrData = {
            "data" : Respone.data
        }
       
        res.render("clientlist.html", arrData);
    }).catch((Error)=>{
        console.log(Error);
    })
});

module.exports = server;