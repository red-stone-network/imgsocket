const socket = io();

/* tags */
if (localStorage.getItem("token") == null) {
  const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  localStorage.setItem("token", genRanHex(32));
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