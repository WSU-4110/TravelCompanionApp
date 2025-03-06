// Send a chat message.
function sendChat() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  let username = (user && user.username) ? user.username : "UnknownUser";
  let input = document.getElementById("chatInput");
  let msg = input.value.trim();
  if (!msg) return;
  let chatMessage = { timestamp: new Date().toLocaleString(), user: username, text: msg };
  let chatData = JSON.parse(localStorage.getItem("chatLog")) || [];
  chatData.push(chatMessage);
  localStorage.setItem("chatLog", JSON.stringify(chatData));
  addMessageToChat(chatMessage);
  input.value = "";
}

// Load and display chat messages.
function loadChatMessages() {
  let chatData = JSON.parse(localStorage.getItem("chatLog")) || [];
  chatData.forEach(msg => addMessageToChat(msg));
}

// Append a chat message.
function addMessageToChat(msgObj) {
  let chatMessagesDiv = document.getElementById("chatMessages");
  let messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message");
  messageDiv.innerHTML = `<span class="chat-time">[${msgObj.timestamp}]</span> <span class="chat-user">${msgObj.user}:</span> <span class="chat-text">${msgObj.text}</span>`;
  chatMessagesDiv.appendChild(messageDiv);
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}
