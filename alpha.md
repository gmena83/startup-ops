# ALPHA.md (Session Startup Protocol)

## 🚀 Objective
This file acts as the **Context Loader** for the AI Agent. Its purpose is to align the AI with the project's current state, mission, and architectural constraints *before* writing a single line of code.

## 📋 Step 1: Context Absorption (The "Read-Only" Phase)
**Instruction to AI:** Before doing anything, strictly read and analyze the following files in this order. Do not skip any.

1.  **`README.md`**: Re-align with the core mission ("Giving Founders Time Back").
2.  **`OMEGA.md` (Last Entry)**: Read the *latest* entry to understand exactly where we left off, what bugs remain, and what the immediate "Next Steps" are.
3.  **`ROADMAP.md`**: Identify which Phase we are in and what the active milestone is.
4.  **`ARCHITECTURE.md`**: Review the *current* stack (Next.js 15, Supabase, Vercel) to ensure no architectural violations are proposed.
5.  **`automations.md`**: If working on backend logic, load the specific node map for the active automation (e.g., `Blogger 0.7` or `Brand SEO`).

## 🔍 Step 2: Environment & State Verification
**Instruction to AI:** Run the following checks to ensure the workspace is ready.

* **Git Status:** Run `git status` to see if there are uncommitted changes from a previous messy session.
* **Dependency Check:** Check `package.json` for new or missing packages.
* **Environment Variables:** Verify that `.env.local` exists (do *not* read the values, just check existence).
* **Supabase Connection:** (If applicable) Verify that the local development environment is linked to the Supabase project.

## 🧠 Step 3: Session Definition (The "Contract")
**Instruction to AI:** Based on Step 1 & 2, generate a **Session Brief** before writing code. You must output this block for my approval:

> **🤖 AI Session Brief**
> * **Current Focus:** [e.g., Implementing Step 5 of the Newsletter Automation]
> * **Starting Point:** [e.g., Logic works, but UI is broken]
> * **Architectural Guardrails:** [e.g., Must use Server Actions, No API Routes]
> * **Goal:** [e.g., Complete the UI form and successfully trigger the webhook]

## ⚡ Step 4: The "Anti-Regression" Test
**Instruction to AI:** Before building new features, briefly run the test suite for the *related* component to ensure we aren't building on broken ground.
* *Command:* `npm test -- [component_name]` (or equivalent)

---
**⛔ STOP.** Wait for user approval of the **Session Brief** before proceeding to code.