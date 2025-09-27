import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // ⚠️ still unsafe but fine for hackathon demo
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || "No response generated.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Error generating AI response.";
  }
}
export default openai;