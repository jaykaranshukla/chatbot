import React, { useState, useEffect } from "react";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar";
import { Body } from "./Components/Body";

const API_URL = "https://chatbot-backend-uey2.onrender.com";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSendMessage = async (userMessage) => {
    const userMsg = { role: "user", text: userMessage };

    // 1. Add user message
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // 2. Add empty AI message — we'll fill it word by word
    setMessages((prev) => [...prev, { role: "ai", text: "" }]);

    try {
      const response = await fetch(`${API_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // 3. Read stream chunk by chunk
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              // 4. Append each word to the last message
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "ai",
                  text: updated[updated.length - 1].text + parsed.content,
                };
                return updated;
              });
            }
          } catch (e) {
            // skip bad chunks
          }
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          text: "Sorry, something went wrong.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0">
        <Navbar />
      </div>
      <Body messages={messages} isLoading={isLoading} />
      <div className="sticky bottom-0">
        <Footer onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;