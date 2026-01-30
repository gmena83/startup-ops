## 🤖 Automation Profile: Prompt Generator V7 (Lead Magnet)

* **Internal ID:** `prompt_gen_lead_magnet`
* **User Facing Name:** "The Architect | AI Prompt Generator"
* **Description:** A free tool that researches the official documentation of any AI platform (Lovable, Replit, Midjourney) and constructs a "Master Prompt" optimized for that specific tool's latest features.
* **Tier Availability:** Free (Rate limited to 1 per email/day).
* **Est. Runtime:** 2-3 minutes.

### ⚡ Workflow Logic (ActivePieces)

* **Trigger:** Webhook
* **Inputs:** `tool_name` (e.g., "Lovable"), `task_description` (e.g., "Build a CRM"), `email`.
* **Process:**
    1. **Research:** Perplexity scans the *latest* official docs for `tool_name`.
    2. **Strategy:** Claude 3.5 Sonnet drafts 3 prompt variants (Basic, Intermediate, Advanced).
    3. **Synthesis:** GPT-4o merges them into a "Master Prompt".
    4. **Production:** PDF.co generates a PDF Guide.
* **Delivery:** Gmail sends the PDF to the user.

### 🔌 API / Webhook Contract

* **Endpoint:** `POST https://cloud.activepieces.com/api/v1/webhooks/...` (Get this from your ActivePieces flow)
* **Payload:**

    ```json
    {
      "tool_name": "string",
      "task_description": "string",
      "user_email": "string"
    }
    ```
