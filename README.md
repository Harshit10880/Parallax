# Parallax

**A Self-Optimizing, Multi-Model IDE for Competitive Code Generation**

---

## 1. Problem Statement

AI coding assistants such as Cursor, Antigravity, Claude Code, and Codex have become central to modern software development. Each of these tools is, architecturally, a polished interface wrapped around API calls to one or more underlying language models (for example, Antigravity routes to Gemini and Claude models, Codex routes to GPT models, Cursor uses a mix of its own and third-party models). No single model is consistently the best at every kind of task — one may be stronger at debugging, another at greenfield architecture, another at fast, cheap edits. Developers today are forced to manually switch between separate applications to get a second opinion, with no way to compare outputs side by side, combine the best parts of each, or learn which model tends to win for which kind of task.

There is no way today to run one coding task across multiple AI models at once, compare their answers, and combine the best of each into one result.

## 2. Proposed Solution

Parallax is a lightweight desktop IDE that sends a single coding task to multiple large language models in parallel (for example Claude, GPT, and Gemini family models, subject to public API availability), displays their responses side by side on a comparison dashboard, and lets the developer accept, merge, or discard each response's edits directly into their codebase. Over time, the platform learns which model tends to produce the best result for which category of task, and uses this to recommend or auto-route future tasks.

### 2.1 Two Modes of Operation

- **Battle Mode:** the task is sent to all configured models at once; the dashboard shows every response side by side for comparison and merging.
- **Single Mode:** the task is sent to one chosen model only, for when the user already knows which model they want and doesn't need a comparison — closer to how existing single-model tools already work.

### 2.2 Bring Your Own Key (BYOK)

Because running a task across three or four models multiplies API cost, users will supply their own API keys for the models they want to use, with the platform optionally offering a small free tier or bundled credits for select models. This keeps the platform's own operating cost bounded while giving users direct control over their spend.

### 2.3 Merge Engine

The hardest and most valuable part of the system is not calling multiple APIs in parallel — that is straightforward — but reconciling multiple independent sets of code edits into one coherent result. The merge engine will let a user pick different models' edits for different files or code sections, highlight conflicting changes to the same lines, and produce a single applied patch.

### 2.4 Adaptive Routing ("our own model")

Rather than attempting to train a competing frontier coding model — not realistic within a six-month project, given that comparable models cost hundreds of millions of dollars in compute to build — the project instead builds its own small, purpose-built **routing/ranking system**. This system classifies each incoming task (frontend vs. backend, bug fix vs. new feature, language, estimated complexity) and learns from accumulated task history which of the connected frontier models tends to win for that category, then recommends or auto-selects models accordingly.

This is scoped realistically for a semester: it does not need to be a heavy trained neural network. A practical version tracks win-rate per model per task category (which model's output was accepted vs. edited vs. discarded, for this user/team) and weights future routing based on that accumulated history. The key distinguishing property is **memory of outcomes** — the system improves the more it's used, rather than judging each request fresh with no history (see Section 6.4 for how this differs from existing routing implementations).

This routing layer, trained on the team's own usage data, is the platform's genuine original intellectual contribution: the frontier model API calls are a commodity input, but the decision of which model to use, and when, is not.

### 2.5 Analytics Dashboard

A dashboard surfaces win-rate, latency, and cost per model, per task category, so both the routing system and the user can see, in plain terms, which model is actually earning its keep over time.

## 3. Phase 2 — Remote / Mobile Trigger

Once the desktop app has a backend task-orchestration service (needed anyway to manage parallel API calls, queuing, and history), that backend can be exposed to a second, lightweight client: a mobile-friendly interface that lets a developer submit a task and check on its status remotely, without the full desktop IDE. This requires no change to the core architecture — only adding a second client on top of the existing backend API.

## 4. Proposed Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Desktop shell / IDE | Tauri + Rust | Lightweight, fast, small binary size vs. Electron |
| Orchestration backend | Python | Mature async HTTP + first-class SDKs for all major model APIs |
| Model access | Provider APIs (BYOK) | Direct calls to Claude, GPT, Gemini family APIs, subject to availability |
| Routing system | Lightweight classifier / win-rate tracker (Python) | Small, trainable within project timeframe on the team's own task data |
| Remote client (Phase 2) | Web-based mobile-friendly client | Talks to the same backend API, no architecture change |

## 5. Related Work & Differentiation

We researched the closest existing tools across four layers — coding agents, orchestration shells, general multi-model comparison, and model-access infrastructure — to confirm where the real gap is.

### 5.1 BYOK Coding Agents (single model at a time)

Cline, Aider, and the now-discontinued Continue.dev let a developer choose which model handles a coding task, but only one model works on a given task at a time. None offer simultaneous multi-model execution, comparison, or merging.

### 5.2 Warp 2.0 (closest coding-agent precedent)

Warp's agent runtime can spawn Claude Code, OpenAI Codex, and Antigravity CLI as managed sub-agents inside one terminal interface. It is the nearest existing example of running multiple coding agents from a single place, but it does not provide side-by-side comparison, a merge engine, or learned routing based on outcome history — the user still picks and manages each agent manually.

### 5.3 AI Fiesta (closest UX precedent)

AI Fiesta sends one prompt to multiple models (ChatGPT, Gemini, Claude, DeepSeek, and others) at once and shows all replies side by side, with an automatic best-answer picker. This validates the demand for "battle mode" as a workflow, but it is a general chat app with no repo awareness, no file editing, and no merge engine — it never touches a codebase.

### 5.4 Mesh API (closest infrastructure precedent)

Mesh API (also by AI Fiesta) offers one unified, OpenAI-compatible endpoint to call over a thousand models, including an auto-router that classifies each incoming prompt and picks a model based on cost, speed, or quality preference. This is a genuine routing feature, but it is a **stateless, per-request classifier** — it reads only the current prompt's content and has no memory of past outcomes; every request is judged fresh from zero. Parallax's routing is designed to work the opposite way: it learns from accumulated outcome history (which model's code was actually accepted, edited, or discarded, by task category, over time) and improves its routing decisions the more the platform is used. Mesh API also operates purely as backend plumbing, with no comparison dashboard, merge engine, or IDE layer.

Mesh API also claims cost savings of up to 40% on some models versus provider list price. This appears to come from (1) zero platform markup fee, (2) bulk/negotiated provider pricing passed through on certain models, and (3) auto-routing simple tasks to cheaper models instead of always using an expensive frontier model — not a flat discount across all models.

### 5.5 Hyperion (adjacent orchestration project)

Hyperion is a multi-workspace shell that runs several AI agents in parallel on *different* tasks within a project (e.g. one agent on auth, another on the API, another on tests), alongside terminals, a kanban board, and versioned prompts. It solves workflow organization across many tasks, not comparison of multiple models on the *same* task — a structurally different problem from Parallax's battle-and-merge mechanism, despite surface similarities (both are Tauri-based, both involve multiple AI agents at once).

### 5.6 Summary of the Gap

No existing tool combines all three of: simultaneous multi-model execution on one task, a dedicated merge engine for reconciling conflicting code edits, and a routing layer that learns from a team's own outcome history rather than judging each prompt fresh. That combination is the specific gap Parallax is built to fill.

## 6. Team Task Division (5 Members, 3 Core Tasks Each)

Every task below is a core functional component of the product, not setup or boilerplate work.

| Member | Core Responsibility Area | Three Core Tasks |
|---|---|---|
| 1 | Model Orchestration | Multi-provider API adapter (normalizing request/response formats) · Parallel async dispatch engine with timeout/failure handling · BYOK key management and per-model cost tracking |
| 2 | Comparison &amp; Merge Engine | Side-by-side response/diff comparison logic · Merge engine to combine selected pieces of multiple model outputs · Conflict resolution for overlapping file/line edits |
| 3 | Routing Intelligence | Task classifier (task type, language, complexity) · Performance history tracker (win rate, latency, accept/reject per model) · Adaptive routing/ranking system trained on that history |
| 4 | Repo Context &amp; IDE Shell | Codebase context builder (deciding what file context each model receives) · Tauri-based IDE shell (file tree, editor pane, applying diffs back to files) · In-app task/session history |
| 5 | Dashboard &amp; Remote Layer | Analytics dashboard (win-rate, cost, latency per model) · Backend task API/queue service used by all clients · Mobile-friendly remote trigger client (Phase 2) |

## 7. Feasibility & Cost Notes

- Not every third-party product's exact in-house model is available via public API (e.g. Cursor's own Composer model is proprietary); the platform compares publicly accessible frontier models, which still spans the major providers.
- Running Battle Mode multiplies API cost per task by the number of models used; BYOK shifts this cost to the user, with an optional limited free tier.
- Training a competing frontier coding model in six months is not feasible; the project's genuine model-building effort is the small, scoped routing/ranking system, which is realistic within the timeframe.
- The core technical risk is the merge engine (reconciling conflicting edits across models), which is correctly scoped as the most demanding and most differentiating piece of the system.

## 8. Target Users & Value Proposition

**Target users:** students learning to code, freelancers and indie developers, small dev teams/startups, hackathon and competitive coders, and open-source contributors — broadly, anyone who codes and either pays for just one AI tool and lives with its blind spots, or manually juggles multiple tools to get a second opinion.

**Why it's useful to them:**
- No single model is best at everything — comparing catches what one tool alone would miss.
- Saves money — one BYOK tool instead of multiple separate subscriptions.
- Saves time — no manual tab-switching or re-explaining the same problem to different apps.
- Builds trust in the output — agreement across models is a stronger signal than one model's answer alone.
- Gets smarter about the user specifically — learns which model wins for their kind of work over time.

## 9. Roadmap Summary

- **Phase 1 (semester project):** desktop IDE, multi-model battle/single mode, merge engine, routing system, analytics dashboard, BYOK.
- **Phase 2 (future work):** backend exposed to a lightweight mobile client for remote task submission and monitoring.

---

*Parallax — Semester Project Brief*
