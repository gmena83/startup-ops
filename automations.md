# Automation Profile: Blogger 0.7 (Deep Research Agent)
Internal ID: blogger_deep_research_v1

User Facing Name: "Deep Research Blog Writer"

Description: An autonomous agent that takes a simple topic, orchestrates 3 distinct research engines (Academic, Web, Sentiment), synthesizes the data, applies a specific style guide, and writes a fully formatted HTML article.

Tier Availability: Professional / Growth (Due to high token cost).

Est. Runtime: 3-5 minutes.

⚡ Workflow Logic & Architecture
This automation follows a Hub-and-Spoke architecture where a central orchestrator delegates tasks to specialized AI models before consolidating the results.

🔄 Trigger: Chat Submission
Type: PIECE_TRIGGER (Form/Chat UI)

Input Data:

message: The user's raw topic or brief.

botName: "Blog Writer"

Immediate Feedback: Returns a response "Thank you! You'll get your article on your email in the next 15 minutes."

🧩 Step-by-Step Execution Map
1. Context & Orchestration (The Brain)
Node: step_14 (Code) & step_2 (OpenAI gpt-4o)

Action:

Calculates current_date to ensure research is fresh.

Orchestrator: Parses the user brief into a massive JSON "Master Plan".

Key Output (JSON Schema):

JSON
{
  "article_thesis": "The central argument generated from the topic.",
  "target_audience": "Defined audience persona.",
  "language": "es" | "en",
  "keyword_strategy": { "primary": "...", "long_tail": [...] },
  "prompts": {
    "academic_research": "...",
    "online_research": "...",
    "sentiment_research": "...",
    "article_writer": "..."
  }
}
2. Multi-Vector Research (Parallel Execution)
The system executes three distinct research tasks based on the prompts generated in Step 1.

Vector A: Academic Research (step_4)

Model: Perplexity sonar-pro

Goal: Find scientific papers and academic quotes.

Output: Markdown list of sources with "Significance Score" and "Justification".

Vector B: Industry/Web Research (step_5)

Model: Google Gemini gemini-2.5-pro

Goal: Find reputable tech news (TechCrunch, Wired) and company blogs.

Constraint: Must avoid academic sources found in Vector A.

Vector C: Sentiment Analysis (step_6)

Model: xAI grok-4-0709

Goal: Scrape X (Twitter) and Reddit for real user complaints and feature requests.

Output: JSON array of "sentiments" (Complaint | Question | Positive Feedback).

3. Style Guide Retrieval
Node: step_8 (Google Docs) & step_15 (Code)

Action: Fetches a specific Google Doc (ID: 1ub4...VtKg) and extracts the raw text to serve as the "Voice & Tone" instruction.

4. The Evaluation Gatekeeper
Node: step_10 (OpenAI gpt-4.1)

Role: "Data Evaluation Expert"

Action: It reads inputs from Vector A, B, and C. It selects only the top 5-7 most compelling pieces of evidence that support the thesis.

Output: A JSON object recommended_sources containing only the approved data points.

5. Content Generation (The Writer)
Node: step_7 (Code) & step_9 (Claude claude-3-7-sonnet-latest)

Input: The "Writer's Brief" (Style Guide + Approved Research).

Strict Constraints:

Must output a single HTML file with embedded CSS.

Must only use the provided research (No hallucinations).

Must adapt design (fonts/colors) to the detected tone.

6. Quality Assurance (Subflow)
Node: step_11 (Subflow)

Action: Calls an external flow to analyze the generated HTML.

Payload: Sends the article HTML.

Expected Return: An "Insights" object containing an improvement summary, issue count, and the final polished article.

7. Final Delivery
Node: step_12 (Code) & step_13 (Gmail)

Action:

Constructs a transactional HTML email wrapper.

Injects "Performance Metrics" (Issues Found, Sources Checked) into the email body.

Sends via Gmail to the user.

💻 Frontend Implementation Guide (StartupOPS)
UI Components Needed
Input Form:

Field: Topic/Brief (Textarea).

Hidden Field: User ID (mapped to email).

Loader: "Initializing Deep Research Protocols..."

Server Actions (Next.js)
Since this is a long-running process (3-5 mins), do not await the result in the UI.

startBlogAutomation(brief: string)

Call Supabase Edge Function / ActivePieces Webhook.

Store job_id in Supabase automations_log table.

Return "Success" to UI immediately.

checkAutomationStatus(job_id: string)

Poll Supabase for completion (Optional: Webhook updates database).

Environment Variables Required
Fragmento de código
OPENAI_API_KEY=sk-...
PERPLEXITY_API_KEY=pplx-...
GOOGLE_GEMINI_API_KEY=...
XAI_API_KEY=... (Grok)
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_DOCS_OAUTH=...
GMAIL_OAUTH=...

# Automation Profile: Newsletter 0.95 (Weekly AI Briefing)
Internal ID: newsletter_generator_v1

User Facing Name: "Auto-Newsletter Generator"

Description: A fully autonomous editorial agent that scouts the web for news, selects educational topics, finds case studies, and generates a complete HTML newsletter with custom AI-generated images for every section. It also logs used topics to prevent repetition in future weeks.

Tier Availability: Growth / Enterprise (High API cost due to multiple image & research calls).

Est. Runtime: 8-12 minutes.

⚡ Workflow Logic & Architecture
This automation uses a State-Aware Pipeline architecture. Unlike the blog writer, this agent remembers what it wrote last week (via ActivePieces Storage) to ensure fresh content.

🔄 Trigger: Scheduled Event
Type: PIECE_TRIGGER (Schedule)


Timing: Every Week (Monday @ 8:00 AM Puerto Rico Time) 


State Check: Before running, it pulls 4 collections from storage: used_news_topics, used_literacy_terms, used_case_studies, used_apps. 

🧩 Step-by-Step Execution Map
1. The Persona Injector
Node: step_42 (Code)

Action: Defines the "Menatech DNA" (Narrative Connector, 4.3/10 Formality, 7.8/10 Warmth). This text block is injected into every subsequent AI prompt to ensure a consistent voice. 

2. Section A: The News Room (Perplexity + Grok)

Research: step_1 (Perplexity sonar-pro) scans for 8 impactful AI news stories from the last 10 days. 


Constraint: Must exclude topics found in used_news_topics. 


Visuals: step_26 (Grok grok-2-image-1212) generates a header image based on the #1 headline. 

3. Section B: AI Literacy (Gemini + Grok)
Content: step_10 (Gemini gemini-2.0-flash) selects a new AI term (e.g., "RAG", "Fine-tuning") that hasn't been defined in previous newsletters.


Output: A "Concept of the Week" section with a simple definition and business analogy. 


Visuals: step_27 (Grok) generates an abstract visualization of the concept. 

4. Section C: Case Study (Perplexity + Grok)

Research: step_13 (Perplexity) finds a specific company that improved a metric using AI (e.g., "Company X reduced support time by 80%"). 


Visuals: step_29 (Grok) generates a "Tech-focused" image representing the company's success. 

5. Section D: App of the Week (Perplexity + Gemini)

Scout: step_16 (Perplexity) finds a practical AI tool for founders. 


Deep Dive: step_18 (Gemini gemini-2.5-pro) reads the tool's actual documentation URL and writes a "How-to Guide" (Setup in 5 mins). 


Visuals: step_31 (Grok) generates a logo/concept image for the app. 

6. Section E: Dynamic CTA (OpenAI)

Strategy: step_19 (OpenAI gpt-4) reads all the generated content (News + Literacy + App) and writes a custom Call-to-Action connecting the week's topics to Menatech's services. 


Visuals: step_36 (Grok) generates an inspirational image for the CTA. 

7. Data Logging & Assembly

Repository: step_21 (Google Sheets) adds a new row to the "Newsletter Archive" with all generated text and validation status. 


State Update: step_32 - step_33 updates the ActivePieces storage lists with the new topics used today. 


Assembly: step_20 (Code) consolidates all text and image URLs into a massive newsletterData object. 


Audio: step_39 (ElevenLabs) generates an audio summary of the newsletter (Podcast version). 

8. Delivery

Drafting: step_14 (Code) renders the final HTML email using a dark-mode responsive template. 


Notification: step_37 (Gmail) sends the proof to gonzalo@menatech.cloud. 

💻 Frontend Implementation Guide (StartupOPS)
UI Components Needed
Newsletter Dashboard:

Status Indicators: "Researching News...", "Generating Images...", "Compiling HTML".

Archive View: Table displaying past newsletters (fetched from Supabase/Google Sheets).

Manual Override: Button to "Regenerate Section" (requires separating the flow into sub-flows).

Server Actions (Next.js)
triggerWeeklyNewsletter()

Note: Usually triggered by CRON, but useful for manual testing.

Calls the ActivePieces Webhook.

getNewsletterPreview(id: string)

Fetches the HTML content from Supabase (mapped from Step 38 tables-create-records).

Environment Variables Required
All variables from Blogger 0.7, plus:

GOOGLE_SHEETS_ID (For the archive).

ELEVENLABS_API_KEY (For audio summary).

RESEND_API_KEY (For final mass delivery).

⚠️ Critical Implementation Note for IDE
The Code steps in this workflow (Steps 3, 28, 30, 2) contain regex logic to strip Markdown code blocks (json ... ) from AI responses. Instruction: When porting this to the codebase, ensure we use a robust JSON parsing utility (try/catch with cleanup) because LLMs often return "chatty" JSON.

# Automation Profile: Meeting Analyst (The Automated Agency)
Internal ID: meeting_analyst_v1

User Facing Name: "Auto-Proposal Generator"

Description: A complex workflow that turns raw meeting transcripts (from Otter.ai/Fireflies) into a comprehensive project suite. It doesn't just summarize; it acts as a Solutions Architect, Financial Analyst, and Legal Team to generate a full proposal, technical execution plan, and legal contracts.

Tier Availability: Enterprise Only (High value, complex multi-model reasoning).

Est. Runtime: 10-15 minutes.

⚡ Workflow Logic & Architecture
This automation follows a Waterfall Enrichment architecture. Information flows linearly, gathering density and structure at each step, transforming vague spoken words into legally binding documents.

🔄 Trigger: New Email (Otter/Transcript)
Type: PIECE_TRIGGER (Gmail)

Filter: Checks for emails with the label Otter.

Preprocessing: step_19 (Code) cleans the email body, stripping "Fwd:" headers and extracting the original meeting date to ensure timelines are accurate.

🧩 Step-by-Step Execution Map
1. The Extraction Engine (Gemini)
Node: step_1 (Gemini gemini-2.5-pro)

Task: Reads the raw, messy transcript.

Extraction: structured JSON containing:

Mission & Objectives: The "Why" and "What".

Business Model: How the client plans to make money (Tiers, Pricing).

Features: Specific functional requirements.

Client Data: Infers Industry and Region if not explicitly stated.

2. The Solutions Architect (Gemini)
Node: step_2 (Gemini gemini-2.5-pro)

Role: "Lead AI Solutions Architect".

Action: Takes the extracted scope and generates a Project Orchestration Plan.

Key Output:

A "Technical Plan" with phases, deliverables, and tech stack.

Directives for the Research Agent (what risks to investigate).

Crucial: If budget/time are unknown, it defaults to a standard MVP scope.

3. The Market Researcher (Perplexity)
Node: step_18 (Perplexity sonar-reasoning-pro)

Objective: Validates the architect's plan against reality.

Search Targets:

Technical Challenges: Implementation risks for the specific stack.

Commercial Alternatives: Finds "Low-Code" competitors (Airtable, Zapier) to offer as a cheaper alternative (Scenario B).

ROI Data: Finds benchmarks (e.g., "Manual data entry costs companies $X/hour") to justify the investment.

4. The Financial Analyst (Gemini)
Node: step_8 (Gemini gemini-2.5-pro)

Input: Project Scope + Market Research + Contractor Rate Card (from Google Docs step_20).

Action: Generates a Dual Scenario Financial Model:

Scenario A (High-Tech): Custom development (Cursor/Replit). Higher cost, higher scalability.

Scenario B (Low-Code): Rapid prototype (Airtable/Make). Lower cost, faster time-to-market.

ROI Analysis: Calculates the "Cost of Inaction" (Annual loss if they don't buy).

5. The Proposal Writer (OpenAI)
Node: step_9 (OpenAI gpt-5.1 / gpt-4o)

Role: "World-class Business Strategist".

Action: Weaves the dry financial numbers and technical scope into a persuasive narrative.

Strategy: Frames the decision as "Speed vs. Scale" rather than "Cheap vs. Expensive".

6. The Document Factory (PDF.co + Drive)
This section runs in parallel to generate three distinct PDF assets:

Asset A: The Proposal (step_22 -> step_12)

Generates a beautiful HTML proposal with ROI tables, payment schedules (35/30/35 split), and "Next Steps".

Converts to PDF.

Asset B: The Legal Pack (step_26 -> step_27)

Generates NDA (Non-Disclosure Agreement), MSA (Master Services Agreement), and SOW (Statement of Work).

Injects client details automatically.

Converts to PDF.

Asset C: The Execution Manual (step_15 -> step_3)

Model: Claude 3.7 Sonnet (step_15).

Role: "Vibecoder".

Action: writes a detailed technical guide.

For Devs: Copy-paste prompts for Cursor/Windsurf.

For No-Coders: Logic maps for Zapier/Make.

Converts to PDF.

7. Final Assembly & Notification
Archival: step_11 (Google Sheets) logs the project details, calculated margins, and utility into a master tracking sheet.

Storage: All PDFs are uploaded to a specific Google Drive folder named after the project (step_13).

Delivery: step_16 (Gmail) sends a summary email to you (Gonzalo) with links to the Drive folder containing the 3 generated PDFs.

💻 Frontend Implementation Guide (StartupOPS)
UI Components Needed
"Upload Transcript" Dropzone:

Allow users to manually upload a .txt or .vtt file if they don't use the email trigger.

Proposal Reviewer:

A view to edit the financials JSON before the PDF is generated (Human-in-the-loop).

Why? You might want to adjust the margin or add a specific discount before sending.

Server Actions (Next.js)
processMeetingTranscript(text: string)

Triggers the workflow.

Returns a job_id.

getProposalDraft(job_id: string)

Polls for the JSON output of Step 9.

Allows the frontend to render a "Preview" of the proposal.

Environment Variables Required
All previous variables, plus:

PDF_CO_API_KEY (Critical for document generation).

GOOGLE_DRIVE_PARENT_FOLDER_ID (Where project folders are created).

CONTRACTOR_RATES_DOC_ID (Google Doc ID with your cost basis).

⚠️ Critical Implementation Note
The PDF Generation steps (step_22, step_26, step_28) use raw HTML strings inside the code blocks. Instruction: When porting to Next.js, do not keep these as massive template strings in the backend logic. Move them to React Email components or dedicated Handlebars templates to make them maintainable and testable. The AI code blocks currently perform heavy string manipulation that is prone to breaking if special characters appear in the client's name.

# Automation Profile: AI Focus Group (Market Validator)
Internal ID: market_validator_v1

User Facing Name: "AI Focus Group & Market Scanner"

Description: Instantly validates a new product, price, or feature by simulating a focus group of 5 distinct AI personas. It cross-references this feedback with live competitor analysis and social media sentiment to generate a comprehensive "Go/No-Go" report.

Tier Availability: Growth / Enterprise (Uses the most expensive inference models: Claude 3.7 + Perplexity + Grok).

Est. Runtime: 5-8 minutes.

⚡ Workflow Logic & Architecture
This automation uses a Multi-Model Consensus architecture. It doesn't rely on a single AI's opinion; it creates a "Virtual Panel" (Claude) and checks it against "Real World Data" (Perplexity/Grok) to reduce hallucination and bias.

🔄 Trigger: Webhook (Typeform/Form)
Type: PIECE_TRIGGER (Webhook)

Input Data:

Project Name

Product Description

Target Segment

Business Model

Item to React To (The core variable: e.g., "New Pricing Tier" or "New Logo").

Preprocessing: step_1 (Code) maps messy Typeform field IDs (e.g., 2yQiPZNgUIgQ) to readable keys (e.g., Project Name).

🧩 Step-by-Step Execution Map
1. The Persona Factory (OpenAI)
Node: step_3 (OpenAI gpt-4.1)

Task: Generates 5 realistic customer personas based on the submitted business model and pain points.

Output: JSON array containing specific demographics, frustrations, and decision-making styles (e.g., "Skeptical CTO", "Budget-Conscious Freelancer").

2. The Virtual Focus Group (Claude)
Node: step_5 (Claude 3.7 Sonnet)

Role: "Focus Group Moderator"

Action: Simulates a conversation where the 5 generated personas react to the user's input.

Key Constraint: "Do not all agree." It forces diverse perspectives and honest objections.

Output: Detailed transcripts of the personas' reactions + a "Summary of Key Takeaways."

3. The Reality Check (Perplexity + Grok)
Running in parallel to the simulation:

Competitor Scan: step_8 (Perplexity sonar-reasoning-pro) finds 3-4 real-world competitors and analyzes their pricing/features.

Sentiment Scan: step_7 (Grok grok-4-0709) scans X (Twitter) and Reddit to find actual user complaints about those competitors.

Market Synthesis: step_15 (Claude 3.7 Sonnet) merges the Competitor Data and Sentiment Data into a "Market Landscape" report.

4. Strategic Recommendations
Node: step_6 (Claude 3.7 Sonnet)

Task: Acts as a "Business Consultant."

Input: Only the Focus Group Feedback.

Output: 3-5 concrete, actionable steps to improve the product based solely on the simulated feedback (e.g., "Clarify your pricing page because Persona A was confused").

5. Visual Identity
Node: step_13 (DALL-E 3)

Action: Generates a high-quality "Concept Image" representing the solution's core value proposition (used for the report cover).

6. Report Assembly & Delivery
Node: step_11 (Code)

Action: Uses the marked library to convert all Markdown outputs (from Claude/Grok) into a beautiful, CSS-styled HTML report.

Delivery: step_12 (Gmail) sends the final "Market Validation Report" to the user.

💻 Frontend Implementation Guide (StartupOPS)
UI Components Needed
"New Validation" Form:

This is the most complex form in the app. It needs fields for:

"Who is this for?" (Target Audience)

"What are we testing?" (The Concept)

"What is the context?" (Business Model)

Report Viewer:

Since the output is HTML (step_11), you can render this directly in a secure <iframe> or a sanitized div within the user's dashboard history.

Server Actions (Next.js)
submitFocusGroup(data: ValidationSchema)

Validates input length (Critical: Too short inputs lead to generic personas).

Posts to the ActivePieces Webhook URL.

Environment Variables Required
Standard set, plus:

GROK_API_KEY (xAI) - Essential for the social sentiment step.

TYPEFORM_SECRET (If verifying webhook signatures).

⚠️ Critical Implementation Note for IDE
JSON Robustness: step_1 contains a hardcoded map of Typeform IDs (2yQiPZNgUIgQ -> Project Name). Instruction: In the production codebase, do not hardcode field IDs. Create a mapping configuration in the database or use a stable internal API schema so that changing the form provider (e.g., moving from Typeform to Tally) doesn't break the entire automation code block.

# Automation Profile: Brand & SEO Analyst (The Consensus Engine)
Internal ID: brand_seo_consensus_v1

User Facing Name: "Deep Market Scanner"

Description: A "shock and awe" market analysis tool. Instead of relying on one AI, it simultaneously deploys 6 different top-tier models (Perplexity, Grok, GPT-4o, Claude 3.7, DeepSeek, Gemini) to analyze your website. It then aggregates their findings to identify your "True Competitors" (consensus) vs. who you think your competitors are.

Tier Availability: Enterprise (Extreme token usage: 6 parallel agent calls + 1 massive synthesis call).

Est. Runtime: 3-5 minutes (Parallel execution makes it surprisingly fast).

⚡ Workflow Logic & Architecture
This automation uses a Parallel Multi-Agent Consensus architecture.

Scatter: The user's input is broadcast to 6 distinct AI agents simultaneously.

Gather: Each agent returns its own independent analysis of the market.

Synthesize: A "Super-Analyst" node reads all 6 reports to find overlapping patterns (Consensus) and discards hallucinations.

🔄 Trigger: Webhook (Typeform)
Type: PIECE_TRIGGER (Webhook)

Input Data:

Company Name & Website URL.

Value Proposition & Problem Solved.

Target Audience & Region.

Known Competitors (Who the user thinks they compete with).

Preprocessing: step_1 (Code) maps Typeform field IDs to a clean JSON object.

🧩 Step-by-Step Execution Map
1. The Council of Six (Parallel Analysis)
The system executes six analysis tasks in parallel. Each model is given a specific "persona" to bias its search slightly differently:

The Researcher: Perplexity (Sonar Pro) - Focuses on live web index and ranking.

The Critic: Grok (xAI) - Ordered to be "brutally honest" and find real-world threats on social media.

The Strategist: GPT-4o (OpenAI) - Focuses on "Traditional vs. AI SEO" strategies.

The Analyst: Claude 3.7 (Anthropic) - Focuses on deep semantic understanding of the value prop.

The Logician: DeepSeek (V3) - Focuses on technical SEO and structural recommendations.

The Trend Spotter: Gemini (1.5 Flash) - Focuses on search visibility trends.

2. The Great Synthesis (OpenAI)
Node: step_16 (OpenAI gpt-4o)

Role: "Elite Data Synthesizer".

Input: The raw JSON outputs from all 6 agents.

Complex Logic:

Consensus Algorithm: It creates a master list of all mentioned competitors and counts the frequency. If "Competitor X" appears in 5 out of 6 reports, they are marked as a "True Consensus Competitor."

Reality Check: It compares the "Consensus" list against the user's "Known Competitors" to highlight blind spots.

Strategy Filtering: It reviews the 30+ combined SEO tips and selects only the Top 10 most impactful ones that appeared across multiple reports.

3. The Designer (Gemini)
Node: step_9 (Gemini gemini-1.5-pro)

Role: "UI/UX Designer".

Task: Takes the dry JSON synthesis and codes a Responsive HTML Email.

Features:

Inline CSS: For maximum email client compatibility.

Visual Ranking: Highlights the user's brand in the competitor tables (using a specific background color) to visually show where they rank.

Clickable Links: All competitor URLs are formatted as direct links.

4. Delivery
Node: step_10 (Gmail)

Action: Sends the fully rendered HTML report directly to the user's inbox with the subject: "AI-Powered SEO Analysis Report for [Company Name]".

💻 Frontend Implementation Guide (StartupOPS)
UI Components Needed
"Brand Audit" Form:

Field: Website URL (Must validate as a live URL).

Field: Competitors (Tag input).

Visuals: Display the logos of the 6 models being used to increase perceived value ("Powered by OpenAI, Google, Anthropic, xAI, Perplexity, DeepSeek").

Server Actions (Next.js)
startBrandAudit(data)

Trigger the webhook.

User Feedback: Since this runs 6 parallel high-power models, the loading state might take 30-60 seconds. Display a progress bar: "Consulting Claude... Consulting Perplexity... Synthesizing Data..."

Environment Variables Required
Standard set, plus:

DEEPSEEK_API_KEY (New provider).

CLOCKIFY_API_KEY (Optional: The automation has vestigial nodes for time tracking, can be ignored or implemented for internal cost auditing).

# Automation Profile: Style Extractor (The Digital Twin)
Internal ID: style_extractor_v2

User Facing Name: "AI Voice & Style Cloner"

Description: A sophisticated multi-modal analyzer that ingests a user's past emails, LinkedIn posts, and voice notes. It uses forensic psycholinguistics to build a unified "Communication Style Guide" and a "Master System Prompt" that allows any LLM to write exactly like the user.

Tier Availability: Enterprise / Professional (Requires high-context audio processing and complex chain-of-thought reasoning).

Est. Runtime: 5-8 minutes.

⚡ Workflow Logic & Architecture
This automation uses a Convergent Analysis architecture. It treats Text and Audio as separate data streams that are analyzed independently before being merged into a unified "Holistic Profile."

🔄 Trigger: Webhook (Typeform/Tally)
Type: PIECE_TRIGGER (Webhook)

Input Data:

Email Samples (3x Text Blocks)

LinkedIn Samples (3x Text Blocks)

Long-form Samples (2x Text Blocks)

Audio Sample (URL to a voice note or recording)

Context (Job Title, Industry, Target Audience)

Preprocessing: step_2 (Code) normalizes the messy webhook payload and concatenates the text samples into a single massive string for analysis.

🧩 Step-by-Step Execution Map
1. Stream A: Text Analysis (Psycholinguistics)
Node: step_1 (OpenAI gpt-5 / gpt-4o)

Role: "Senior Psycholinguistic Analyst".

Task: Scores the text on 6 dimensions (Formality, Warmth, Authority, Enthusiasm, Precision, Emotion).

Output: A JSON analysis of rhetorical devices, sentence complexity, and signature markers.

2. Stream B: Audio Analysis (Vocal DNA)
Transcribe: step_3 (OpenAI Whisper) converts the audio file to text.

Analyze: step_4 (OpenAI gpt-4-turbo) acts as a "Communication Analyst."

Focus: Extracts "Cognitive Style" (linear vs. associative), "Emotional Palette," and "Vocal Energy" that text alone cannot capture.

3. Deep Profiling (The "Why")
Node: step_9 (Claude sonnet-3.5)

Role: "Forensic Profiler".

Action: Looks for the "Unsaid"—logic jumps, values, and taboos. It builds a psychological blueprint of how the user thinks, not just how they speak.

4. The Synthesis (Merging Streams)
Node: step_5 (OpenAI gpt-4.1)

Task: Weighs the Written Analysis vs. Spoken Analysis based on the user's specific context (Industry/Audience).

Output: A final, unified JSON profile with definitive scores (e.g., formality_final: 6.8).

5. Asset Generation (The Deliverables)
This phase generates three distinct products:

Asset 1: The "Quick Wins" (step_13 - Claude): Personalized ROI analysis and 3 immediate tips to improve communication.

Asset 2: The "Master Prompt" (step_14 - OpenAI): A copy-paste block of code (### AI Writing Prompt ###) that the user can paste into ChatGPT/Claude to "install" their voice.

Asset 3: The Style Guide (step_6 - Claude): A detailed manual (Dos/Don'ts, Vocabulary, Tone) generated as JSON.

6. Final Assembly
Node: step_11 (Gemini gemini-2.5-pro)

Action: Takes the JSON Style Guide and codes a beautiful, standalone HTML Document with embedded CSS.

Delivery: step_7 (Gmail) sends the HTML file directly to the user.

💻 Frontend Implementation Guide (StartupOPS)
UI Components Needed
"Voice Cloning" Wizard:

Step 1: Text Inputs (Paste 3 recent emails).

Step 2: Social Inputs (Paste 2 LinkedIn posts).

Step 3: Voice Sample (Audio Recorder component or File Upload).

UX Note: Display a "Profile Strength" meter that fills up as they add more samples.

Server Actions (Next.js)
submitStyleSamples(formData)

Needs to handle file upload (Audio) to a bucket (Supabase Storage) first, then pass the public URL to the automation webhook.

Critical: The automation expects a URL for audio, not binary data.

Environment Variables Required
Standard set, plus:

OPENAI_API_KEY (Access to Whisper & GPT-4o).

ANTHROPIC_API_KEY (Claude 3.5 Sonnet).

⚠️ Critical Implementation Note
Audio Handling: step_3 (Whisper) often fails if the file is too large (>25MB). Instruction: In the frontend or Next.js API route, implement a check. If the audio file > 25MB, compress it using ffmpeg or split it before sending the URL to the automation.