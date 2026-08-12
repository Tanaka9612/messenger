//client side
const socket = io();

var messageForm = document.getElementById("messageForm");
var usernameInput = document.getElementById("messageUsername");
var messageInput = document.getElementById("messageInput");
var messages = document.getElementById("messages");
var responseMessage = document.getElementById("responseMessage");
var userCount = document.getElementById("userCount");


// Log the client's socket ID
socket.on('connect', () =>{
    console.log(`User id ${socket.id} is connected`);
});

// Display received system messages
socket.on('systemMessage', (msg)=>{
    console.log(msg);
})

// Display received messages
socket.on('chat message', (data)=>{
    // console.log(`Received data ${data}`);
    addMessage(data);
});

// Display the number of connected users
socket.on('connectedUsers', (users) => {
    userCount.textContent = userCount.textContent.replace(/\d+/, users);
});

// Display validation errors


messageForm.addEventListener("submit", (event) => {
    event.preventDefault(); //so that the page does no refresh itself
    const timestamp = new Date().toISOString();
    if(usernameInput.value){
        socket.emit("chat message", {
            username: usernameInput.value,
            message: messageInput.value, 
            timestamp: timestamp
        });
        messageInput.value="";
        messageInput.focus();
    }
});

function addMessage(text) {
    const paragraph = document.createElement("p");
    const time = new Date(text.timestamp);
    
    let final_time ="";
    if(time.getMinutes() < 10){
        final_time = `${time.getHours()}:0${time.getMinutes()}`;
    }
    else{
        final_time =`${time.getHours()}:${time.getMinutes()}`;
    }
    paragraph.textContent = `${final_time} - ${text.username}: ${text.message}`;
    messages.appendChild(paragraph);
}

