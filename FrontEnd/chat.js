(function() {
  // Initializes a chat box for a business in a given container.
  function createChatBox(businessId, containerId) {
    // Set unique storage key and load saved messages.
    var storageKey = "chat_" + businessId;
    var messages = JSON.parse(localStorage.getItem(storageKey)) || [];
    // Get logged in user (default to Anonymous).
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || { username: "Anonymous" };
    // Get container element.
    var container = document.getElementById(containerId);
    if (!container) { console.error("Container with ID '" + containerId + "' not found."); return; }
    container.innerHTML = "";
    
    // Create chat display area.
    var chatDisplay = document.createElement("div");
    chatDisplay.style.border = "1px solid #ccc";
    chatDisplay.style.padding = "10px";
    chatDisplay.style.height = "300px";
    chatDisplay.style.overflowY = "scroll";
    chatDisplay.style.backgroundColor = "#f9f9f9";
    
    // Render messages into the chat display.
    function renderMessages() {
      chatDisplay.innerHTML = "";
      messages.forEach(function(msg) {
        var msgDiv = document.createElement("div");
        var date = new Date(msg.timestamp);
        msgDiv.innerHTML = "<strong>" + msg.username + "</strong> [" + date.toLocaleString() + "]: " + msg.text;
        msgDiv.style.marginBottom = "10px";
        chatDisplay.appendChild(msgDiv);
      });
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
    renderMessages();
    
    // Create input field and send button.
    var inputContainer = document.createElement("div");
    inputContainer.style.marginTop = "10px";
    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Type your message here...";
    inputField.style.width = "80%";
    var sendButton = document.createElement("button");
    sendButton.innerText = "Send";
    sendButton.style.width = "18%";
    sendButton.style.marginLeft = "2%";
    
    // Send message on button click.
    sendButton.addEventListener("click", function() {
      var messageText = inputField.value.trim();
      if (messageText === "") return;
      var newMessage = {
        username: loggedInUser.username,
        timestamp: new Date().toISOString(),
        text: messageText
      };
      messages.push(newMessage);
      localStorage.setItem(storageKey, JSON.stringify(messages));
      renderMessages();
      inputField.value = "";
    });
    
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(sendButton);
    
    // Append display and input areas to container.
    container.appendChild(chatDisplay);
    container.appendChild(inputContainer);
    
    // Optional external method to send a message programmatically.
    container.sendMessage = function(text) {
      text = text.trim();
      if (text === "") return;
      var newMessage = {
        username: loggedInUser.username,
        timestamp: new Date().toISOString(),
        text: text
      };
      messages.push(newMessage);
      localStorage.setItem(storageKey, JSON.stringify(messages));
      renderMessages();
    };
  }
  
  // Expose createChatBox globally.
  window.createChatBox = createChatBox;
  
  // Automatically initialize chat boxes for elements with data-business-id.
  document.addEventListener("DOMContentLoaded", function() {
    var chatContainers = document.querySelectorAll("[data-business-id]");
    chatContainers.forEach(function(container) {
      var businessId = container.getAttribute("data-business-id");
      if (businessId && container.id) {
        createChatBox(businessId, container.id);
      }
    });
  });
})();
