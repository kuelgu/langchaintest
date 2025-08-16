const messagesDiv = document.getElementById('messages');
const promptInput = document.getElementById('prompt');
const sendBtn = document.getElementById('send');
const modelSelect = document.getElementById('model');

let conversation = [];

function addMessage(role, content) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = content;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function send() {
  const text = promptInput.value.trim();
  if (!text) return;
  promptInput.value = '';
  addMessage('user', text);
  conversation.push({ role: 'user', content: text });
  addMessage('assistant', '...');

  const reply = await window.api.sendMessage(conversation, modelSelect.value);
  conversation.push({ role: 'assistant', content: reply });
  messagesDiv.lastChild.textContent = reply;
}

sendBtn.addEventListener('click', send);
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') send();
});
