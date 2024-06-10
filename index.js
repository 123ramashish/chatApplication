const socket = io.connect("http://127.0.0.1:3000");

const username = prompt("Enter your name!");
socket.emit("join", { username });

const userNameSpan = document.getElementById("userNameSpan");
const connectedUsers = document.getElementById("connected_users");
const typingIndicator = document.getElementById("typing");

socket.on("message", (message) => {
  userNameSpan.innerHTML = message.text;
  document.querySelector(
    ".list-group-item"
  ).innerText = `Connected users: ${message.users.length}`;

  connectedUsers.innerHTML = message.users
    .map(
      (user) => `
        <button type="button" class="list-group-item list-group-item-success">
          <span id="status-dot" class="mx-1"></span>
          ${user}
        </button>
      `
    )
    .join("");
});

const inputMessage = document.getElementById("myInput");
const messageForm = document.querySelector(".msger-inputarea");
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = inputMessage.value.trim();
  if (message !== "") {
    socket.emit("newMessage", { username, message });
    inputMessage.value = "";
    typingIndicator.innerText = null;
  }
});

socket.on("updateMessage", (data) => {
  const messageContainer = document.createElement("div");
  messageContainer.className = "msg-bubble";
  const messageInfo = document.createElement("div");
  messageInfo.className = "msg-info";
  const messageInfoName = document.createElement("div");
  messageInfoName.className = "msg-info-name";
  messageInfoName.innerText = data.username;
  const messageInfoTime = document.createElement("div");
  messageInfoTime.className = "msg-info-time";
  messageInfoTime.innerText = data.time;
  const messageText = document.createElement("div");
  messageText.className = "msg-text";
  messageText.innerText = data.message;
  messageInfo.appendChild(messageInfoName);
  messageInfo.appendChild(messageInfoTime);
  messageContainer.appendChild(messageInfo);
  messageContainer.appendChild(messageText);
  document.querySelector(".msger-chat").appendChild(messageContainer);
});

inputMessage.addEventListener("input", (e) => {
  typingIndicator.innerText = `${username} is typing...`;
});
