//server side sockets 
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    let connectedUsers = (io.sockets.sockets).size; // get the size of the users connected to the socket
    let usersLeft = connectedUsers-1;
    console.log( `Connected users: ${connectedUsers}`);
    socket.emit("systemMessage", {
        text: "A user connected."
    })
    io.emit('connectedUsers', connectedUsers);
    socket.on("chat message", (data) => { 
        console.log(data);
        io.emit("chat message", (data));
    });
    socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    io.emit("systemMessage", {
        text: "A user disconnected."
    });
    io.emit("connectedUsers", usersLeft);
});
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});