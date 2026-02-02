import React, { useEffect, useState, useRef } from "react";

export const Body = ({ messages, isLoading }) => {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-grow bg-gray-100 w-3/4 p-3 gap-2 overflow-y-auto mx-auto">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "ai" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-2xl p-3 ${
              msg.role === "ai" ? "bg-gray-300" : "bg-blue-500"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};
