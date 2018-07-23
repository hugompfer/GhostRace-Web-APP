"use strict";
 
var http = require("http");
const express = require('express');
const app = express(); 
var session = require('express-session');

/* body parsers*/
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("www"));

/* Routes */
const usersRoutes=require('./routes/users');
const sessionsRoutes=require('./routes/sessions');
const levelsRoutes=require('./routes/levels');
const charactersRoutes=require('./routes/characters');
const statisticsRoutes=require('./routes/statistics');;
const signinRoutes=require('./routes/signin');
const statisticsTypesRoutes=require('./routes/statisticsType');
const accountRoutes=require('./routes/account');

class Server
{
    constructor()
    {
        this.port = 8080;
        this.ip = "localhost";
        this.start();
    }
 
    start()
    {
        this.server = http.createServer(app);
        app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true
          }));
        app.use('/users',usersRoutes);
        app.use('/sessions',sessionsRoutes);
        app.use('/levels',levelsRoutes);
        app.use('/characters',charactersRoutes);
        app.use('/statistics',statisticsRoutes);
        app.use('/signin',signinRoutes);
        app.use('/statisticsType',statisticsTypesRoutes);
        app.use('/account',accountRoutes);
        
        console.log("Server created");
    }
 
    listen()
    {
        this.server.listen(this.port, this.ip);
        console.log("Server listening for connections");
    }
 
    
}
 
module.exports.Server = Server;