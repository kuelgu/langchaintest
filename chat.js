import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

export function formatMessages(conversation) {
  return conversation.map((m) =>
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  );
}

export function getChatModel(modelName) {
  return new ChatOllama({
    baseUrl: 'http://localhost:11434',
    model: modelName
  });
}

export async function sendChat(conversation, model = 'llama3') {
  const chatModel = typeof model === 'string' ? getChatModel(model) : model;
  const response = await chatModel.invoke(formatMessages(conversation));
  return response.content;
}
