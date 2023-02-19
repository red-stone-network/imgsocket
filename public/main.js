const socket = io();

function genHexString(len) {
    const hex = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_+~";
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
}

/* tags */
if (localStorage.getItem("token") == null) {
  localStorage.setItem("token", genHexString(32));
}

function shit(data) {
  console.log(data);
  if (data.user == localStorage.getItem("token")) {
    if (data.message[0] == "failure") {
      alert("failed to upload TwT");
    } else {
      document.location.href = "images/"+data.message[1];
    }
  }
}

function upload(files) {
  socket.emit("upload-image", [localStorage.getItem("token"), files[0], files[0].name], (status) => {
    shit(status);
  });    
}

socket.on('return', function (data) {
  shit(data);
});
