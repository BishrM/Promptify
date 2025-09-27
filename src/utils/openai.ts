import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY as string;

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // ⚠️ only for hackathon demo
});

/**
 * Generate a response only if verdict is ALLOW.
 * If verdict = BLOCK or NEEDS_FIX → return a message instead of calling OpenAI.
 */
export async function generateResponse(
  prompt: string,
  verdict: "ALLOW" | "BLOCK" | "NEEDS_FIX" = "ALLOW" // default = ALLOW so old calls don't break
): Promise<string> {
  try {
    if (verdict === "BLOCK") {
      return "🚫 This prompt is blocked due to unsafe content.";
    }

    if (verdict === "NEEDS_FIX") {
      return "⚠️ Please rephrase your prompt — it needs fixing.";
    }

    // ✅ Only call OpenAI if ALLOW
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cheaper, faster model
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant. Provide clear, concise, and safe responses.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error: any) {
    console.error("OpenAI API error:", error);

    // ✅ Special handling for 429 (quota exceeded)
    if (error.response?.status === 429) {
      return "⚠️ OpenAI quota exceeded. (Hackathon mode: showing placeholder response)";
    }

    return `❌ OpenAI error: ${
      error.response?.data?.error?.message || error.message || "unknown error"
    }`;
  }
}
