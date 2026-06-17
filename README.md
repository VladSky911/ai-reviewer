# 🤖 AI Reviewer — AI-Powered Code Review Tool

**AI Reviewer** is a real-time AI code review tool that analyzes code snippets and provides **structured, severity-based feedback** using modern LLMs.

> ⚡ Designed for developers who want instant feedback without waiting for human review.

---

## 🚀 Live Demo

👉 https://ai-reviewer-seven.vercel.app

---

## 🧠 Overview

Code reviews are essential — but slow.

AI Reviewer solves this by providing:

* instant feedback
* structured issue categorization
* actionable improvements

All in a **developer-friendly UI with real-time streaming responses**.

---

## ✨ Core Features

### ⚡ Instant AI Code Review

* Paste any code snippet
* Select programming language
* Get structured feedback in seconds

---

### 🚦 Severity-Based Analysis

Each issue is categorized for clarity:

* 🔴 **Critical**

  * Security vulnerabilities
  * Crashes
  * Data corruption risks

* 🟡 **Warning**

  * Performance issues
  * Anti-patterns
  * Potential bugs

* 🔵 **Info**

  * Readability improvements
  * Code style suggestions

* 🟢 **Good**

  * Highlights of well-written code

---

### 🔄 Real-Time Streaming (SSE)

* Uses **Server-Sent Events**
* Response appears token-by-token
* Eliminates “waiting time” UX

---

### 🧩 Structured Output (JSON)

* Strict response schema enforced via prompt
* Parsed directly into typed objects
* No regex or fragile parsing

---

### 💻 Developer-Focused UX

* CodeMirror 6 editor with syntax highlighting
* Language switching (JS / TS / Python)
* Clean review panel with categorized issues
* Skeleton loaders for better perceived performance

---

## 🏗 Architecture

### Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS

### Editor

* CodeMirror 6

### AI Layer

* Claude Sonnet (Anthropic API)
* Streaming via Fetch + SSE

---

### 🔄 Data Flow

```
User Input → Prompt Builder → Claude API (SSE) → Stream Parser → UI Rendering
```

---

## 🔧 Key Technical Decisions

### 1. Streaming via SSE

Instead of waiting for full responses:

* Faster perceived performance
* Progressive rendering of results
* Better developer experience

---

### 2. Prompt as a First-Class Module

```
src/prompts/review.prompt.ts
```

* Fully typed prompt generator
* Easy to version and improve
* Decoupled from API logic

---

### 3. Strict JSON Schema Output

The model is forced to return:

* predictable structure
* typed `Issue[]`
* no post-processing hacks

---

### 4. Separation of Concerns

* UI → components/
* Logic → hooks/
* API → services/
* Prompt → prompts/

Clean and scalable architecture.

---

## 📂 Project Structure

```
src/
├── components/
├── hooks/
├── services/
├── prompts/
└── types/
```

---

## 🧠 Why This Project Matters

This project demonstrates:

* Advanced AI integration in frontend apps
* Streaming architectures (SSE)
* Prompt engineering with structured outputs
* Clean separation of concerns
* Developer tooling mindset

---

## 🛠 Tech Stack

* **Frontend:** React 18, TypeScript, Vite
* **Editor:** CodeMirror 6
* **Styling:** Tailwind CSS
* **AI:** Claude Sonnet (Anthropic API)
* **Streaming:** Fetch API + SSE

---

## ⚙️ Getting Started

### 1. Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-reviewer.git
cd ai-reviewer
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run development server

```bash
npm run dev
```

---

### 4. Open in browser

```
http://localhost:5173
```

Paste your **Anthropic API key** when prompted.

---

## 🔐 Security Notes

* API key is entered client-side (for demo purposes)
* For production:

  * move to backend proxy
  * use environment variables
  * avoid exposing keys in frontend

---

## 💡 Future Improvements

* GitHub PR integration
* Inline code annotations
* Multi-file analysis
* Team collaboration mode
* Custom rule sets (lint-style configs)
* AI fine-tuned for specific languages

---

## 📄 License

MIT License

---

## 👤 Author

**Vladimir**
AI Developer · Fullstack Builder

