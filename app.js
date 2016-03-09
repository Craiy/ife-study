#!/usr/bin/env node

process.argv.splice(0,2);

//Module dependencies.
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var numCpus = require('os').cpus();

//路由
var httpRoutes = require('./routes/index').httpRoutes;
//var socketRoutes = require('./routes/index').socketRoutes;

//env & port
var env = process.argv[0];
const CONFIG = require("./config/" + env + ".js");
var port = CONFIG.port || "3000";

var app = express();
expressSet(app);

var server = http.createServer(app);
//var socketIoServer = io(server);

//socketIoServer.on("connection", socketRoutes);  //websocket route

server.listen(port, function () {
    return util.log("application start listening on port " + port + ", env on " + env);
});


process.on("uncaughtException",function(err){
   util.log(err);
})


function expressSet(app) {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    //app.use(logger('tiny'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', httpRoutes); //route
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
    app.set('port', port);
}
