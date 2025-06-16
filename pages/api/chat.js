// pages/api/chat.ts (or .js if you’re not using TypeScript)

import { InferenceClient } from "@huggingface/inference";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const apiKey = process.env.HUGGING_FACE_API;
  if (!apiKey) {
    return res.status(500).json({ message: "Missing Hugging Face API Key" });
  }

  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ message: "Invalid or missing message input" });
  }

  const client = new InferenceClient(apiKey);

  try {
    const chatCompletion = await client.chatCompletion({
      provider: "fireworks-ai",
      model: "deepseek-ai/DeepSeek-R1-0528",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Answer clearly, directly, and only respond to the user's question without introductions or closing statements.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = chatCompletion?.choices?.[0]?.message;

    if (!reply) {
      return res.status(500).json({ message: "No response from AI" });
    }

    res.status(200).json(reply);
  } catch (error) {
    console.error("AI error:", error);
    res.status(500).json({ message: "Error fetching AI response", error: error.message || error.toString() });
  }
}
