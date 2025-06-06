import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { message } = req.body;

  if (!message) return res.status(400).json({ response: "Message missing." });

  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

  const prompt = `You are a legal AI assistant that helps users understand their legal rights under Indian law. Be concise, clear, and always cite the relevant laws, acts, or rights when possible.

User message: ${message}

Answer in simple language. If unsure or if the query needs a real lawyer, advise accordingly.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text();
    res.status(200).json({ response: text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ response: "Error from Gemini API." });
  }
}
