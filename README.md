<div align="center">
  <img src="assets/banner.png" alt="Parallax Banner" width="100%" />
</div>

<h1 align="center">⚡ Parallax</h1>

<p align="center">
  <b>A Self-Optimizing, Multi-Model IDE for Competitive Code Generation</b>
</p>

<p align="center">
  <a href="#-features"><img src="https://img.shields.io/badge/features-8_highlights-6C5CE7?style=for-the-badge&labelColor=1a1a2e" alt="Features" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/stack-Tauri_·_React_·_Rust_·_Python-00CEC9?style=for-the-badge&labelColor=1a1a2e" alt="Tech Stack" /></a>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/quickstart-3_minutes-00B894?style=for-the-badge&labelColor=1a1a2e" alt="Quickstart" /></a>
  <br />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-FF6B6B?style=flat-square&labelColor=1a1a2e" alt="License" /></a>
  <img src="https://img.shields.io/badge/status-beta-FFC312?style=flat-square&labelColor=1a1a2e" alt="Beta" />
  <img src="https://img.shields.io/badge/platform-Windows_·_macOS_·_Linux-74b9ff?style=flat-square&labelColor=1a1a2e" alt="Platforms" />
</p>

---

## 📖 Overview

**Parallax** is a lightweight desktop IDE that sends a single coding task to **multiple large language models in parallel** — think Claude, GPT, and Gemini — and displays their responses **side by side** on a comparison dashboard. Pick the best parts of each, merge them into your codebase, and let the platform learn **which model wins for which kind of task** over time.

> No single model is best at everything. Why settle for one opinion?

---

## ✨ Features

### ⚔️ Battle Mode
Fire the same prompt at multiple models simultaneously and watch their responses land in real time. Compare approaches, spot what one missed that another caught, and merge the best of each into your code.

### 🎯 Single Mode
Already know which model you want? Send the task to one model only — no comparison needed, no extra cost.

### 🧩 Merge Engine
The hardest part of multi-model coding: reconciling conflicting edits. Pick different models' changes for different files or sections, resolve conflicts, and produce a single, clean patch.

### 🧠 Adaptive Routing
A lightweight model trained on your team's own usage data learns which model tends to win for frontend vs. backend vs. bug-fix tasks. Over time, Parallax **auto-recommends** (or auto-routes) the model most likely to produce the best result.

### 🏆 Best-Response Selection
- **Objective metrics** — latency, token usage, cost per response
- **LLM-as-a-judge** — an independent model scores each candidate on correctness, completeness, and code quality
- You get a **recommendation** with full transparency — accept it or override it.

### 📊 Analytics Dashboard
| View | What it tells you |
|------|-------------------|
| **Win-rate Leaderboard** | Which model gets accepted most, filtered by task category |
| **Cost Tracker** | API cost per model, running totals per session and overall |
| **Speed Comparison** | How fast each model responds, shown per battle |

### 🔑 Bring Your Own Key (BYOK)
Supply your own API keys for the models you use. Full control over your spend — no vendor lock-in, no shared billing pool.

### 📱 Remote Trigger
Submit tasks and check status from your phone via a lightweight mobile-friendly client, using the same backend that powers the desktop app.

---

## 🆚 Why Parallax?

| Feature | Cursor / Aider / Cline | Warp 2.0 | AI Fiesta | **Parallax** |
|---------|:----------------------:|:--------:|:--------:|:--------:|
| Multi-model on one task | ❌ One at a time | ✅ Sub-agents | ✅ Chat only | ✅ **Full IDE** |
| Side-by-side comparison | ❌ | ❌ | ✅ Chat | ✅ **Code** |
| Merge engine | ❌ | ❌ | ❌ | ✅ |
| Learned routing from your history | ❌ | ❌ | ❌ | ✅ |
| Repo-aware file editing | ✅ | ✅ | ❌ | ✅ |

No existing tool combines all three of: **simultaneous multi-model execution**, **a merge engine for code**, and **a routing layer that learns from your team's outcomes**.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   Desktop App                    │
│           (Tauri · Rust · React)                 │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  Battle   │  │  Single  │  │   Analytics   │  │
│  │   Mode    │  │   Mode   │  │   Dashboard   │  │
│  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       └──────────┬──┘                │           │
│                  ▼                   │           │
│        ┌────────────────┐            │           │
│        │  Merge Engine  │            │           │
│        └────────────────┘            │           │
└───────────────────┬───────────────────┘           │
                   │  REST API                     │
┌────────────────────▼────────────────────────────┐  │
│              Backend / Orchestrator            │  │
│      (Python · REST · PostgreSQL)              │  │
│  ┌────────────┐  ┌──────────┐  ┌───────────┐  │  │
│  │ Task Queue │  │  Router  │  │  History   │  │  │
│  │            │  │  (ML)    │  │   Store    │  │  │
│  └────────────┘  └──────────┘  └───────────┘     │  │
└──────────────────┬─────────────────────────────┘  │
                   │                                │
     ┌─────────────┼─────────────┐                   │
     ▼             ▼             ▼                    │
  ┌──────┐    ┌──────┐     ┌──────┐                  │
  │Claude│    │ GPT  │     │Gemini│  ...              │
  └──────┘    └──────┘     └──────┘                  │
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| 🖥️ **Desktop App** | [Tauri](https://tauri.app/) (Rust) |
| 🎨 **Frontend** | React · TypeScript · JavaScript |
| 🌐 **Website** | Next.js · Tailwind CSS |
| ⚙️ **Backend** | Python · REST API |
| 🗄️ **Database** | PostgreSQL |
| 🤖 **AI/ML** | LLM APIs · Model Routing (ML) |
| 🔧 **Version Control** | Git · GitHub |

---

## 🚀 Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/) (latest stable)
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)
- [PostgreSQL](https://www.postgresql.org/) (v15+)

### Installation

```bash
# Clone the repository
git clone https://github.com/Harshit10880/Parallax.git
cd parallax

# Install frontend dependencies
npm install

# Set up Python backend
cd backend
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Add your API keys to .env

# Start the application
npm run tauri dev
```

> ⚠️ You'll need API keys for the models you want to use. Parallax never charges model-access fees — you bring your own keys.

---

## 🗺️ Roadmap

- [x] Project architecture & design
- [ ] Minimal prototype with Battle Mode (2+ models)
- [ ] Merge engine v1 — basic file-level conflict resolution
- [ ] Analytics dashboard — win rates, costs, latency
- [ ] Adaptive routing — ML model trained on outcome data
- [ ] Best-response judge integration
- [ ] Remote trigger (mobile-friendly client)
- [ ] Public beta release

---

## 👥 Target Audience

- **Students** — explore how different models approach the same problem
- **Freelancers** — one tool, multiple model perspectives, no separate subscriptions
- **Developers / Engineers** — catch what a single model would miss, save time switching contexts

---

## 🤝 Contributing

We're in early development and open to contributions! Here's how to get involved:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

Please read our [contributing guidelines](CONTRIBUTING.md) before starting.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for developers who want more than one model's opinion.
  <br />
  <a href="https://github.com/Harshit10880/Parallax/issues">Report Bug</a>
  ·
  <a href="https://github.com/Harshit10880/Parallax/issues">Request Feature</a>
  ·
  <a href="https://github.com/Harshit10880/Parallax/discussions">Ask a Question</a>
</p>
