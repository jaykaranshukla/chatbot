const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Groq setup
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.get("/messages", (req, res) => {
  res.json([
    {
      role: "ai",
      text: "Hi, I am your personal chatbot. Please enter your queries!",
    },
  ]);
});

app.post("/chat", async (req, res) => {
  try {
    const { message,history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("📨 Received:", message);

    const messages = [
      ...(history || []).map((msg) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: message },
    ];
    const completion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = completion.choices[0].message.content;
    console.log("✅ Replied successfully");

    res.json({
      role: "ai",
      text: reply,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({
      error: "API failed",
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
