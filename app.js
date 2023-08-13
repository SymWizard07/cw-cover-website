var http = require('http');

var serverAddr = "127.0.0.1";
var port = 80

var nStatic = require('node-static');
var fileServer = new nStatic.Server('./public');

console.log("Starting Server at: " + serverAddr + `\nPort: ${port}`);
http.createServer(function (req, res) {
    
    fileServer.serve(req, res);

}).listen(80, serverAddr);