# OMEGA.md (Session Shutdown Protocol)

## 🛑 Objective
This file acts as the **State Saver**. Its purpose is to serialize the current coding context into text so that the next session (Alpha) can pick up *exactly* where this one left off, with zero "context switching" cost.

## 📝 Step 1: Documentation & Log (The "Flight Recorder")
**Instruction to AI:** Append a new entry to the `SESSION_LOG` section below. It must contain:

1.  **Date & Time:**
2.  **Completed Tasks:** specific filenames created or modified.
3.  **Key Decisions:** Did we change an API schema? Did we swap a library? Why?
4.  **Unfinished Business:** What is *half-baked*? (e.g., "The UI parses the JSON, but the CSS grid is misaligned on mobile").

## 🧹 Step 2: Code Hygiene (The Janitor)
**Instruction to AI:** Perform these specific cleanup actions:

1.  **Linting:** Run `npm run lint --fix` to ensure code style matches `CONTRIBUTING.md`.
2.  **Comment Cleanup:** Remove any `// TODO: Remove this debug log` or `console.log` statements used during debugging.
3.  **Type Check:** Run `tsc --noEmit` to ensure no strict type errors were introduced.
4.  **File Placement:** Verify that no components were created in the wrong directory (e.g., ensure UI components are in `/components/ui` and logic is in `/lib` or `/app/actions`).

## 🗺️ Step 3: Roadmap & Architecture Sync
**Instruction to AI:**
* If we completed a feature, **mark it as [x]** in `ROADMAP.md`.
* If we changed how data flows (e.g., added a new Supabase table), **update `ARCHITECTURE.md`**.
* If we added a new automation logic step, **update `automations.md`**.

## 🚀 Step 4: The "Next Session" Setup
**Instruction to AI:** Generate a specific "Copy-Paste" prompt for the *next* Alpha run. This allows the user to simply paste a command to restart immediately.

> **Next Session Prompt:**
> "Resume work on [Feature X]. Last session ended with [Specific Error/Status]. The file `src/components/forms/analysis-form.tsx` is open and needs [Specific Fix]. Reference `OMEGA.md` entry #[ID] for details."

## 💾 Session Log
*(The AI appends entries below this line)*

### 2026-01-25 - Session ID: bseo_phase2_init
* **Summary:** Completed Phase 2 backend foundation. Set up Supabase integration and Brand SEO Server Action infrastructure.
* **Files Created:**
  - `.env.example` - API keys template for 6 AI models + Supabase
  - `src/lib/supabase/client.ts` - Browser Supabase client
  - `src/lib/supabase/server.ts` - Server Supabase client with cookie auth
  - `src/lib/supabase/index.ts` - Barrel export
  - `src/lib/schemas/brand-seo.ts` - Zod validation + TypeScript types
  - `src/app/actions/brand-seo.ts` - Server Action with run balance check
* **Files Modified:**
  - `src/app/dashboard/automations/brand-seo/page.tsx` - Connected to Server Action
  - `package.json` - Added @supabase/supabase-js, @supabase/ssr, zod, resend
* **Key Decisions:**
  - Used Zod 4.x syntax with `.issues` for error iteration
  - Server Action returns immediately (async AI processing via email)
  - Stub implementations for run balance and job logging (connect to Supabase in next session)
* **Pending:**
  - Populate `.env.local` with actual API keys
  - Create Supabase database tables (users, runs, automations_log)
  - Implement actual 6-model AI consensus orchestration
* **Next Up:** Create AI orchestration module with parallel model calls (Perplexity, Grok, GPT-4o, Claude, DeepSeek, Gemini)

---

### [YYYY-MM-DD] - Session ID: [Generated ID]
* **Summary:** Implemented the "Multi-Model Consensus" logic for Brand SEO.
* **Files Touched:** `app/actions/brand-audit.ts`, `components/brand-report.tsx`.
* **Pending:** The "Grok" API call is timing out after 30s. Needs a retry mechanism.
* **Next Up:** Implement exponential backoff for the API calls.