# langchaintest

Desktop chat application demonstrating [Ollama](https://github.com/jmorganca/ollama) with [LangChain](https://github.com/hwchase17/langchain) inside an [Electron](https://www.electronjs.org/) shell.

## Setup

1. Install [Ollama](https://ollama.ai/) and download a model, e.g. `ollama pull llama3` or `ollama pull llama2`.
2. Clone this repository and install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

> **Note**
> When running as `root` (such as inside a container), Electron requires the `--no-sandbox` flag. The start script already includes this flag. On headless systems you may need to run through `xvfb-run` and install common X11/GTK libraries (e.g. `libgtk-3-0`, `libdrm2`, `libgbm1`, `libasound2`, `xvfb`, etc.).

The window presents a minimal ChatGPT‑like interface. A dropdown lets you choose between `llama2` and `llama3` models. Messages are sent to the local Ollama server through LangChain's `ChatOllama` model, and the conversation history is preserved on the renderer side so the model receives the full context.
