# Architecture & Tech Stack

## 🏗 High-Level Overview
StartupOPS is a **Next.js 15 (App Router)** application deployed on **Vercel**. It uses **Supabase** as a Backend-as-a-Service (BaaS) for database, authentication, and AI orchestration.

### The Stack
* **Frontend:** Next.js 15 (React Server Components), Tailwind CSS, Lucide Icons.
* **Component Library:** `shadcn/ui` (Radix UI + Tailwind).
* **Backend Logic:** Next.js Server Actions (for mutations) + Supabase Edge Functions (for long-running AI tasks).
* **Database:** Supabase PostgreSQL with Row Level Security (RLS).
* **Auth:** Supabase Auth (SSR) with Google OAuth & Magic Links.
* **AI Orchestration:** Vercel AI SDK (streaming) or OpenAI API via Supabase Edge Functions.

---

## 🔄 Data Flow Patterns

### 1. The "Zero-API" Pattern (Standard CRUD)
For fetching user data (e.g., "Past Automations"), we use **React Server Components (RSC)** to fetch directly from Supabase.
* *Flow:* User Request -> Next.js Server Component -> Supabase (Cached) -> UI.
* *Benefit:* No "useEffect" spaghetti; faster load times.

### 2. The AI Automation Pattern (The Core Product)
For generating invoices or emails, we use **Server Actions** to ensure security and run counting.
1.  **User Input:** User fills a form (shadcn/ui Form).
2.  **Server Action:** Validates "Run" balance in Supabase.
3.  **Processing:** Calls OpenAI/Anthropic (via Vercel AI SDK).
4.  **Streaming:** The result (e.g., email draft) streams text-to-speech or text-to-screen instantly.
5.  **Storage:** Result is saved to `public.results` table in Supabase.

---

## 📂 Project Structure (App Router)
```bash
/app
  /login        # Auth pages
  /dashboard    # Protected user area
  /api          # Webhooks (Stripe/Supabase)
/components
  /ui           # shadcn/ui primitives (Button, Card)
  /automations  # Business logic components (InvoiceGenerator)
/lib
  /supabase     # Supabase clients (Server/Client/Admin)
  /utils.ts     # Helper functions
/supabase
  /migrations   # SQL database schema
  /functions    # Edge functions (if Python/Deno needed)