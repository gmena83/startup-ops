# Architecture Decision Records (ADR)

## ADR-001: Pre-Built vs. DIY Automation
* **Context:** Competitors like "DIY Automation" tools require 10-20 hours/week to learn.
* **Decision:** We offer *pre-built* automations only.
* **Consequence:** Reduced flexibility but significantly higher ease of use and instant value for non-tech founders.

## ADR-002: Bilingual First
* **Context:** Targeting a global market of 50M+ founders.
* **Decision:** The codebase must support strict i18n from Day 1.
* **Consequence:** Slower initial development of UI components, but wider immediate market reach in LATAM and US.

## ADR-003: Tiered Processing Limits
* **Context:** Managing AI costs against subscription revenue ($20/mo vs $50/mo).
* **Decision:** Implement strict usage caps (Runs) per user tier (20 runs vs 50 runs).
* **Consequence:** Backend must track "Runs" as a primary consumable metric.