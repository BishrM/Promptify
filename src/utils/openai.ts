import OpenAI from "openai";

const apiKey =
  "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";

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant. Provide clear, concise, and helpful responses to user prompts.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Error generating AI response. Please check your API key and try again.";
  }
}
