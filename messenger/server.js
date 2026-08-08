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

    socket.emit("systemMessage", {
        text: "A user connected."
    })
    
    socket.on("hello", (data) => {
        console.log(data);

        io.emit("systemMessage", {
            text: `${data.username} says hello!`
        });
    });
    socket.on()
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);

        io.emit("systemMessage", {
            text: "A user disconnected."
        });
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});