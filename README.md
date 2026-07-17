# Parallax

**A Self-Optimizing, Multi-Model IDE for Competitive Code Generation**

---

## 1. Problem Statement

AI coding assistants such as Cursor, Antigravity, Claude Code, and Codex have become central to modern software development. Each of these tools is, architecturally, a polished interface wrapped around API calls to one or more underlying language models. No single model is consistently the best at every kind of task — one may be stronger at debugging, another at greenfield architecture, another at fast, cheap edits. Developers today are forced to manually switch between separate applications to get a second opinion, with no way to compare outputs side by side, combine the best parts of each, or learn which model tends to win for which kind of task.

## 2. Proposed Solution

Parallax is a lightweight desktop IDE that sends a single coding task to multiple large language models in parallel (for example Claude, GPT, and Gemini family models, subject to public API availability), displays their responses side by side on a comparison dashboard, and lets the developer accept, merge, or discard each response's edits directly into their codebase. Over time, the platform learns which model tends to produce the best result for which category of task, and uses this to recommend or auto-route future tasks.

### 2.1 Two Modes of Operation

- **Battle Mode:** the task is sent to all configured models at once; the dashboard shows every response side by side for comparison and merging.
- **Single Mode:** the task is sent to one chosen model only, for when the user already knows which model they want and doesn't need a comparison.

### 2.2 Bring Your Own Key (BYOK)

Because running a task across three or four models multiplies API cost, users will supply their own API keys for the models they want to use, with the platform optionally offering a small free tier or bundled credits for select models. This keeps the platform's own operating cost bounded while giving users direct control over their spend.

### 2.3 Merge Engine

The hardest and most valuable part of the system is not calling multiple APIs in parallel — that is straightforward — but reconciling multiple independent sets of code edits into one coherent result. The merge engine lets a user pick different models' edits for different files or code sections, highlight conflicting changes to the same lines, and produce a single applied patch.

### 2.4 Adaptive Routing

The platform fine-tunes a small model on the team's own usage data — logging which model's output was accepted, edited, or discarded for each task category (frontend, backend, bug-fix, and so on). Over time, this lets the system learn which model tends to win for which kind of task, and use that to recommend or auto-route future tasks to the model most likely to produce the best result for that category.

### 2.5 Best-Response Selection

Selecting the strongest response combines two layers. Objective metrics — latency, token usage, and cost per response — are computed directly, with no model needed. Alongside these, a separate LLM acts as a judge: it reviews all candidate responses against a scoring rubric (correctness, completeness, code quality) and produces a score for each, then auto-recommends the strongest pick. The user can accept this recommendation or override it and choose differently. This judge is distinct from the adaptive routing system in Section 2.4: the judge scores the candidates for one task, right now, while the routing system learns from the accumulated outcomes of many such judgments over time.

### 2.6 Analytics Dashboard

The dashboard surfaces three views identified as the most useful for a semester build:

- **Win-rate leaderboard:** filterable by task category (for example frontend vs. backend), showing which model was accepted most often for that category, based on what the user actually kept.
- **Cost tracker:** API cost per model, including token usage, with running totals per session and overall.
- **Speed/latency comparison:** how long each model took to respond, shown per battle.

A separate task history log was considered but left out of this dashboard, since the existing chat/session history already covers that need.

### 2.7 Remote Trigger

Because the desktop app already runs on a backend task-orchestration service (needed to manage parallel API calls, queuing, and history), that same backend can be exposed to a lightweight, mobile-friendly client, letting a developer submit a task and check its status remotely without opening the full desktop IDE. This uses the existing backend directly, with no separate architecture required.

## 3. Tech Stack

- **Desktop Application:** Tauri, Rust
- **App Frontend:** React
- **Product Website:** Next.js, Tailwind CSS
- **Backend / Orchestration:** Python, REST API
- **Database:** PostgreSQL
- **AI/ML:** LLM APIs, Machine Learning (Model Routing)
- **Languages:** TypeScript, JavaScript
- **Version Control:** Git, GitHub

## 4. Related Work &amp; Differentiation

We researched the closest existing tools across three layers — coding agents, general multi-model comparison, and model-access infrastructure — to confirm where the real gap is.

### 4.1 BYOK Coding Agents (single model at a time)

Cline, Aider, and the now-discontinued Continue.dev let a developer choose which model handles a coding task, but only one model works on a given task at a time. None offer simultaneous multi-model execution, comparison, or merging.

### 4.2 Warp 2.0 (closest coding-agent precedent)

Warp's agent runtime can spawn Claude Code, OpenAI Codex, and Antigravity CLI as managed sub-agents inside one terminal interface. It is the nearest existing example of running multiple coding agents from a single place, but it does not provide side-by-side comparison, a merge engine, or learned routing based on outcome history — the user still picks and manages each agent manually.

### 4.3 AI Fiesta (closest UX precedent)

AI Fiesta sends one prompt to multiple models (ChatGPT, Gemini, Claude, DeepSeek, and others) at once and shows all replies side by side, with an automatic best-answer picker. This validates the demand for "battle mode" as a workflow, but it is a general chat app with no repo awareness, no file editing, and no merge engine — it never touches a codebase.

### 4.4 Mesh API (closest infrastructure precedent)

Mesh API (also by AI Fiesta) offers one unified, OpenAI-compatible endpoint to call over a thousand models, including an auto-router that classifies each incoming prompt and picks a model based on cost, speed, or quality preference. This is a genuine routing feature, but it is a **stateless, per-request classifier** — it reads only the current prompt and has no memory of past outcomes. Parallax's routing works the opposite way: it learns from accumulated outcome history and improves its routing decisions the more the platform is used. Mesh API also operates purely as backend plumbing, with no comparison dashboard, merge engine, or IDE layer.

### 4.5 Summary of the Gap

No existing tool combines all three of: simultaneous multi-model execution on one task, a dedicated merge engine for reconciling conflicting code edits, and a routing layer that learns from a team's own outcome history rather than judging each prompt fresh. That combination is the specific gap Parallax is built to fill.

## 5. Target Users &amp; Value Proposition

**Target Users:**

- Students
- Freelancers
- Developers / Software Engineers

**Why it's useful to them:**

- No single model is best at everything — comparing catches what one tool alone would miss.
- Saves money — one BYOK tool instead of multiple separate subscriptions.
- Saves time — no manual tab-switching or re-explaining the same problem to different apps.
- Gets smarter about the user specifically — learns which model wins for their kind of work over time.

---

*Parallax — Semester Project Brief*
