// api/chat.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { prompt, language, intent } = req.body;

  try {
    // Gemini fetch (replace with your Gemini API key)
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBhCyXBuD4oK4k3dGVL_kWKE6_80uxm38Y", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const result = await response.json();
    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

    res.status(200).json({ response: reply });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ response: "⚠️ Gemini request failed." });
  }
}
