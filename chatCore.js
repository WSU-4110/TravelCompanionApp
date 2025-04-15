function getStorageKey(businessId) {
    return "chat_" + businessId;
  }
  
  function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("loggedInUser")) || { username: "Anonymous" };
  }
  
  function saveMessage(storageKey, messages, text, username) {
    if (!text.trim()) return messages;
  
    const newMessage = {
      username: username,
      timestamp: new Date().toISOString(),
      text: text.trim()
    };
  
    messages.push(newMessage);
    localStorage.setItem(storageKey, JSON.stringify(messages));
    return messages;
  }
  
  module.exports = {
    getStorageKey,
    getLoggedInUser,
    saveMessage
  };
  