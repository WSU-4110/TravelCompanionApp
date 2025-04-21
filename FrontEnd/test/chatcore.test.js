const { getStorageKey, getLoggedInUser, saveMessage } = require('../chatcore'); 

// 🔧 Mock localStorage for Node.js
global.localStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

// 🧼 Reset localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

// ✅ Test cases
test('getStorageKey returns correct key', () => {
  expect(getStorageKey("abc123")).toBe("chat_abc123");
});

test('getLoggedInUser returns Anonymous if not logged in', () => {
  expect(getLoggedInUser()).toEqual({ username: "Anonymous" });
});

test('getLoggedInUser returns stored user', () => {
  localStorage.setItem("loggedInUser", JSON.stringify({ username: "Hady" }));
  expect(getLoggedInUser()).toEqual({ username: "Hady" });
});

test('saveMessage adds a new message to the array and localStorage', () => {
  const key = "chat_test";
  const messages = [];
  const result = saveMessage(key, messages, "Hello!", "Hady");

  expect(result.length).toBe(1);
  expect(result[0].text).toBe("Hello!");
  expect(result[0].username).toBe("Hady");

  const saved = JSON.parse(localStorage.getItem(key));
  expect(saved.length).toBe(1);
});

test('saveMessage ignores empty messages', () => {
  const key = "chat_test";
  const messages = [{ text: "Hi", username: "Hady", timestamp: new Date().toISOString() }];
  const result = saveMessage(key, messages, "  ", "Hady");

  expect(result.length).toBe(1); // unchanged
});

test('saveMessage trims the message', () => {
  const key = "chat_test";
  const messages = [];
  const result = saveMessage(key, messages, "  Yo  ", "Hady");

  expect(result[0].text).toBe("Yo");
});