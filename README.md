# langchaintest

Desktop chat application demonstrating [Ollama](https://github.com/jmorganca/ollama) with [LangChain](https://github.com/hwchase17/langchain) inside an [Electron](https://www.electronjs.org/) shell.

## Setup

1. Install [Ollama](https://ollama.ai/) and download a model, e.g. `ollama pull llama2`.
2. Clone this repository and install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

The window presents a minimal ChatGPT‑like interface. Messages are sent to the local Ollama server through LangChain's `ChatOllama` model. The conversation history is preserved on the renderer side so the model receives the full context.
