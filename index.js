const goodFiletypes = ["png","jpg","jpeg","jfif","gif"];
const bannedTokens = [];

const mntmode = false;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

function genHexString(len) {
    const hex = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_+~";
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

server.listen(port, function () {
  if (mntmode == true) {
    console.log('---IMGSOCKET - MAINTENANCE MODE---\nServer listening at port %d', port);
  } else {
    console.log('---IMGSOCKET---\nServer listening at port %d', port);
  }
});

// Routing
app.use(express.static('public'));

// Chatroom
var fs = require('fs') 

io.on('connection', function (socket) {
  socket.on('upload-image', function (data, callback) {
    console.log(data[0]+" sent a file");
    
    console.log(data[1]);
    console.log("FILENAME: "+data[2]);
    
    var split = data[2].split(".");
    var random = genHexString(9);
    console.log(random);
    if (goodFiletypes.includes(split[1].toLowerCase()) == true) {
      console.log("start");
      fs.writeFile("public/images/"+random+"."+split[1], data[1], (err) => {
        var e2 = err ? "failure" : "success"
        console.log(e2);
        
        callback({
          user: data[0],
          message: [err, random+"."+split[1]]
        });
        console.log("succ")
        console.log("end")
      });
      var newData = "USER TOKEN: "+data[0]
      fs.writeFile("public/images/"+random+"."+split[1]+".data", newData, (err) => {
        var e2 = err ? "failure" : "success"
        console.log(e2);
        
        console.log("succ")
        console.log("end")
      });
    }
  });
});
//lol
