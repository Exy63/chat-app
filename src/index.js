const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New Websocket connection");

  socket.emit("message", "Welcome!");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("The server is up on port", port);
});
