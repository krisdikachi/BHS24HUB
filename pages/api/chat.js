"use client";
import { InferenceClient } from "@huggingface/inference";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const client = new InferenceClient(process.env.HUGGING_FACE_API); // Use API key from environment variable

    try {
        const chatCompletion = await client.chatCompletion({
            provider: "fireworks-ai",
            model: "deepseek-ai/DeepSeek-R1-0528",
            messages: [{ role: "user", content: req.body.message }],
        });

        res.status(200).json(chatCompletion.choices[0].message);
    } catch (error) {
        res.status(500).json({ message: "Error fetching response", error });
    }
}
