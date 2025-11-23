import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateReply(args: {
  systemPrompt: string;
  userMessage: string;
}) {
  const { systemPrompt, userMessage } = args;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  return completion.choices[0]?.message?.content ?? "";
}
