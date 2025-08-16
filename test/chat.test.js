import test from 'node:test';
import assert from 'node:assert/strict';
import { formatMessages, sendChat, getChatModel } from '../chat.js';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { ChatOllama } from '@langchain/community/chat_models/ollama';

test('formatMessages converts roles to LangChain messages', () => {
  const conversation = [
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi there' }
  ];
  const messages = formatMessages(conversation);
  assert.equal(messages.length, 2);
  assert.ok(messages[0] instanceof HumanMessage);
  assert.ok(messages[1] instanceof AIMessage);
  assert.equal(messages[0].content, 'Hello');
  assert.equal(messages[1].content, 'Hi there');
});

test('sendChat invokes provided model and returns its content', async () => {
  const mockModel = {
    invoke: async (msgs) => {
      return { content: 'mock response' };
    }
  };
  const response = await sendChat([{ role: 'user', content: 'Hello' }], mockModel);
  assert.equal(response, 'mock response');
});

test('getChatModel creates a ChatOllama for the requested model name', () => {
  const model = getChatModel('llama3');
  assert.ok(model instanceof ChatOllama);
});
