import React, { useState, useEffect } from "react";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar";
import { Body } from "./Components/Body";


function App() {
  // Store all messages here (the brain!)
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Fetch initial message when app starts
  useEffect(() => {
    fetch("http://localhost:3000/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // When user sends a message from Footer
  const handleSendMessage = async (userMessage) => {
    // 1. Add user message to chat immediately
    const userMsg = {
      role: "user",
      text: userMessage,
    };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Show loading (AI is thinking)
    setIsLoading(true);

    try {
      // 3. Send to backend
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage, history: messages }),
      });

      const data = await response.json();

      // 4. Add AI response to chat
      if (response.ok) {
        setMessages((prev) => [...prev, data]);
      } else {
        // If error, show error message
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Sorry, I couldn't connect to the server.",
        },
      ]);
    } finally {
      // 5. Stop loading
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex  flex-col">
        <div className="sticky top-0">
          <Navbar />
        </div>
        <Body messages={messages} />
        <div className="sticky bottom-0">
          <Footer onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

export default App;
