import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { HumanMessage, AIMessage } from '@langchain/core/messages';

export function formatMessages(conversation) {
  return conversation.map((m) =>
    m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)
  );
}

const defaultModel = new ChatOllama({
  baseUrl: 'http://localhost:11434',
  model: 'llama2'
});

export async function sendChat(conversation, model = defaultModel) {
  const response = await model.invoke(formatMessages(conversation));
  return response.content;
}
