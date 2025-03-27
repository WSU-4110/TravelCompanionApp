
// chat.js

// Log in user pull
const currentUser = JSON.parse(localStorage.getItem("loggedInUser"))?.username || "Guest";

// doc references
const chatDisplay = document.getElementById("chat-display");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// load chat from storage
let chatLog = JSON.parse(localStorage.getItem("chatLog")) || [];

// timestamp
function formatTimestamp(iso) {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

// display chat
function renderChat() {
  chatDisplay.innerHTML = "";
  chatLog.forEach((msg) => {
    const msgEl = document.createElement("div");
    msgEl.classList.add("chat-message");
    msgEl.innerHTML = `
      <strong>${msg.user}</strong>: ${msg.text}
      <div style="font-size: 0.8em; color: gray;">${formatTimestamp(msg.timestamp)}</div>
    `;
    chatDisplay.appendChild(msgEl);
  });
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// send chat
function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  const message = {
    user: currentUser,
    text,
    timestamp: new Date().toISOString()
  };
  chatLog.push(message);
  localStorage.setItem("chatLog", JSON.stringify(chatLog));
  chatInput.value = "";
  renderChat();
}

// event listeners
sendBtn?.addEventListener("click", sendMessage);
chatInput?.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

// render on start
renderChat();
