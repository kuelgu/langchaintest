import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  sendMessage: (conversation, model) =>
    ipcRenderer.invoke('chat:send', conversation, model)
});
