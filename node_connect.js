//Initializes Arduino Serial Port
var serialPort = require("serialport");
  sp = new serialPort("/dev/ttyACM1", { //Found it by Tools -> Port -> /dev/cu.XXXX
    baudRate:9600 //Serial.begin
});
//Translate Buffer to UTF8 string
sp.on('open', function()
	  {
	console.log('open')
});

var data_fixed
var fs = require("fs");
sp.on('data', function(serialData){
buf = new Buffer(serialData);
data_convert = buf.toString('utf8');
console.log(data_convert);
data_fixed = data_convert;
});



//Creates Server via http when the response of data_fixed is updated, activate the express section
var http=require('http');
http.createServer((function(request,response)
{
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.end(data_fixed);
}))

//Creates Server via express sends text to localhost:3000, used just to see what it is currently
//Cors is used to prevent and error from occuring
var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
app.get('/data', function(req, res){
	res.send(data_fixed);
});
app.listen(3000);