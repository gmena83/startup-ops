interface AIProviderResponse {
    text: string;
    durationMs: number;
}

/**
 * Robust JSON parser that handles code blocks and common LLM formatting issues
 */
export function robustJSONParse(text: string): unknown {
    try {
        // 1. Try direct parsing
        return JSON.parse(text);
    } catch {
        // 2. Strip markdown code blocks ```json ... ```
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                return JSON.parse(jsonMatch[1]);
            } catch {
                // Continue to step 3
            }
        }

        // 3. Try to find the first { and last }
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
            try {
                return JSON.parse(text.substring(firstBrace, lastBrace + 1));
            } catch {
                // Failed
            }
        }

        throw new Error(`Failed to parse JSON from AI response: ${text.substring(0, 100)}...`);
    }
}

/**
 * OpenAI Provider (GPT-4o)
 */
export async function callOpenAI(prompt: string, apiKey: string, model: string = "gpt-4o"): Promise<AIProviderResponse> {
    const start = Date.now();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "OpenAI API Error");

    return {
        text: data.choices[0].message.content,
        durationMs: Date.now() - start
    };
}

/**
 * Anthropic Provider (Claude 3.7)
 * Note: Claude 3.7 isn't out yet, falling back to 3.5 Sonnet or checking map
 */
export async function callAnthropic(prompt: string, apiKey: string, model: string = "claude-3-5-sonnet-20240620"): Promise<AIProviderResponse> {
    const start = Date.now();
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
            model,
            max_tokens: 4096,
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Anthropic API Error");

    return {
        text: data.content[0].text,
        durationMs: Date.now() - start
    };
}

/**
 * Perplexity Provider (Sonar)
 */
export async function callPerplexity(prompt: string, apiKey: string, model: string = "sonar-pro"): Promise<AIProviderResponse> {
    const start = Date.now();
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model, // "sonar-pro" or similar
            messages: [{ role: "user", content: prompt }]
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Perplexity API Error");

    return {
        text: data.choices[0].message.content,
        durationMs: Date.now() - start
    };
}

/**
 * Google Gemini Provider
 */
export async function callGemini(prompt: string, apiKey: string, model: string = "gemini-1.5-flash"): Promise<AIProviderResponse> {
    const start = Date.now();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Gemini API Error");

    return {
        text: data.candidates[0].content.parts[0].text,
        durationMs: Date.now() - start
    };
}

/**
 * xAI Grok Provider
 */
export async function callGrok(prompt: string, apiKey: string, model: string = "grok-beta"): Promise<AIProviderResponse> {
    const start = Date.now();
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            messages: [{ role: "system", content: "You are a helpful assistant. Output valid JSON." }, { role: "user", content: prompt }]
            // Grok might not support response_format: json_object yet, relying on prompt
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Grok API Error");

    return {
        text: data.choices[0].message.content,
        durationMs: Date.now() - start
    };
}

/**
 * DeepSeek Provider
 */
export async function callDeepSeek(prompt: string, apiKey: string, model: string = "deepseek-chat"): Promise<AIProviderResponse> {
    const start = Date.now();
    const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "DeepSeek API Error");

    return {
        text: data.choices[0].message.content,
        durationMs: Date.now() - start
    };
}
