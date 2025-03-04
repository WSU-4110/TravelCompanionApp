// chat.js
document.addEventListener("DOMContentLoaded", function () {
  // Get the chat container elements from the DOM
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  // Element Check
  if (chatMessages && chatInput && chatSend) {
    chatSend.addEventListener('click', () => {
      const message = chatInput.value.trim(); //input check
      if (message) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = message;
        chatMessages.appendChild(msgDiv);
        chatInput.value = '';
      }
    });
  }
});
