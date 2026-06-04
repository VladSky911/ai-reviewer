# AI Reviewer

> AI-powered code review tool built with React, TypeScript, and Claude API

![AI Reviewer](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)
![Claude API](https://img.shields.io/badge/Claude-Sonnet-D4A027?style=flat)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)

## What it does

Paste any code snippet, select a language, and get an instant AI-powered review categorized by severity:

- 🔴 **Critical** — security vulnerabilities, crashes, data corruption
- 🟡 **Warning** — bad practices, performance issues, potential bugs
- 🔵 **Info** — style, readability, minor improvements
- 🟢 **Good** — highlights what's done well

## Tech stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Framework  | React 18 + TypeScript         |
| Build tool | Vite                          |
| Editor     | CodeMirror 6                  |
| Styling    | Tailwind CSS v3               |
| AI         | Claude Sonnet (Anthropic API) |
| Streaming  | Fetch API with SSE            |

## Architecture

src/
├── components/
│ ├── CodeEditor.tsx # CodeMirror editor with language support
│ ├── IssueCard.tsx # Single review issue with severity badge
│ ├── LanguageSelector.tsx # JS / TS / Python switcher
│ └── ReviewPanel.tsx # Review results with skeleton loader
├── hooks/
│ └── useReview.ts # State management for review flow
├── services/
│ └── claude.service.ts # Claude API + SSE streaming
├── prompts/
│ └── review.prompt.ts # Structured prompt with severity rules
└── types/
└── index.ts # Shared TypeScript types

## Key technical decisions

**Streaming responses** — Claude API is consumed via Server-Sent Events so results appear token by token, giving instant feedback instead of waiting for the full response.

**Prompt as a module** — The review prompt lives in `src/prompts/` as a typed function, making it easy to version, test, and swap independently from the API layer.

**Structured JSON output** — The prompt enforces a strict JSON schema so the response can be parsed directly into typed `Issue[]` without any post-processing heuristics.

## Getting started

1. Clone the repo

```bash
   git clone https://github.com/YOUR_USERNAME/ai-reviewer.git
   cd ai-reviewer
```

2. Install dependencies

```bash
   npm install
```

3. Run the dev server

```bash
   npm run dev
```

4. Open `http://localhost:5173`, click **Review code** and paste your Anthropic API key when prompted

> Get your API key at [console.anthropic.com](https://console.anthropic.com)

## License

MIT
