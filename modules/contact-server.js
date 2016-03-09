/**
 * Created by Yu on 15/10/20.
 */
var request = require('request');

var env = process.argv[0];
const CONFIG = require("../config/" + env + ".js");

function contactServer(data, callback) {
    var url = CONFIG.serverUrl;
    request.post({
    	url: url,
        body: data,
        json: true
    }, callback);
}


module.exports = contactServer;