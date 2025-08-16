import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  sendMessage: (conversation) => ipcRenderer.invoke('chat:send', conversation)
});
