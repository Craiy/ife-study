var express = require("express");
var mainModel = require("../modules");
var util = require("util");

var log = util.log;

var env = process.argv[0];
const CONFIG = require("../config/" + env + ".js");

var router = express.Router();

router.all("/*:url",function(req,res, next){
    //util.log("POINT TO: ", req);
    next();
});

router.post("/xxx", function (req, res, next) {
    var data = req.body;
    util.log(data);
    mainModel.contactServer(data, function (err, msg) {
        if (err) {
            util.log(err);
            res.send("fail");
            return;
        }
        util.log(req.body.method + " response: ", msg.body);

        var re = msg.body;
        if (re.token)
        req.session.key = re.token;
        res.send(re);
    });
});


router.get("/", function (req, res, next) {
    res.render("index");
});

function socketRouter(socket) {
    //socket.on("test", function (msg) {
    //    socket.emit("test", msg);
    //});
}

module.exports = {
    httpRoutes: router,
    socketRoutes: socketRouter
};
