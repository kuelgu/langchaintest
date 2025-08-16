import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HumanMessage, AIMessage } from 'langchain/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const model = new ChatOllama({
  baseUrl: 'http://localhost:11434',
  model: 'llama2'
});

ipcMain.handle('chat:send', async (event, conversation) => {
  const messages = conversation.map((m) =>
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  );
  const response = await model.invoke(messages);
  return response.content;
});
