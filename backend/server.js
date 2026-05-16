const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get("/messages", (req, res) => {
  res.json([{ role: "ai", text: "Hi, I am Nexus AI. Please enter your queries!" }]);
});

// NEW — streaming endpoint
app.post("/chat/stream", async (req, res) => {
  const { message, history } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  // SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const messages = [
    ...(history || []).map((msg) => ({
      role: msg.role === "ai" ? "assistant" : "user",
      content: msg.text,
    })),
    { role: "user", content: message },
  ];

  try {
    const stream = await groq.chat.completions.create({
      messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Stream error:", error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

app.listen(port, () => console.log(`✅ Server running on port ${port}`));