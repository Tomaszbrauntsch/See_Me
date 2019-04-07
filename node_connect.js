
//Initializes Arduino Serial Port
var serialPort = require("serialport");
  sp = new serialPort("/dev/cu.usbmodem621", { //Found it by Tools -> Port -> /dev/cu.XXXX
    baudRate:9600 //Serial.begin
});
//Translate Buffer to UTF8 string
sp.on("open", function() {
  console.log('open');
  sp.on('data', function(data) {
    buf = new Buffer(data);
    data_fixed = buf.toString('utf8');
  console.log(data_fixed);
  });
});

//Creates Server via http (sends out text of serialport data)
var http=require('http');
var server=http.createServer((function(request,response)
{
  response.writeHead(200, {"Content-Type" : "text/html"});
  response.end(data_fixed);
}))

//Creates Server via express (sends text to html)
var express = require("express");
var app = express();
app.get('', function(req, res){
  res.send(data_fixed);
})
app.listen(3000);
