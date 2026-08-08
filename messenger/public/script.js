
const socket = io();

var messageForm = document.getElementById("messageForm");
var usernameInput = document.getElementById("messageUsername");
var messageInput = document.getElementById("messageInput");
var messages = document.getElementById("messages");
var responseMessage = document.getElementById("responseMessage");
var userCount = document.getElementById("userCount");

// Log the client's socket ID
socket.on('connection', (socket) =>{
    console.log("A user with ID " + socket.id + " is connected")
});


// Display received system messages
socket.on('systemMessage', (msg)=>{
    console.log(msg);
} )

// Display received messages
// socket.on('messages', (msgs)={

// });

// Display the number of connected users


// Display validation errors


messageForm.addEventListener("submit", (event) => {
    event.preventDefault(); //so that the page does no refresh itself
    socket.emit("hello", {
        username: event.target.usernameInput,
        message: event.target.messageInput
    });
    usernameInput="";
    messageInput="";
});

function addMessage(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    messages.appendChild(paragraph);
}