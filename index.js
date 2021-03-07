const { TIMEOUT } = require('dns');
const express = require('express');
const path =require('path');
require('dotenv').config();


//app de express
const app = express();

// Node Server 



const server = require('http').createServer(app);
module.exports.io  = require('socket.io')(server);
require('./sockets/socket')



// Path público
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));
/*
var io = require('socket.io')(3000,{
    pingInterval: 10000,
    pingTimeout: 5000,
});

*/

server.listen(process.env.PORT,(err)=>{

    if(err) throw new Error(err);

    console.log('servidor corriendo en puerto!',process.env.PORT);

});