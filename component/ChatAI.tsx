"use client";
import { useState } from "react";

const ChatAI = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleChat = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat with DeepSeek AI</h1>
      <input
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleChat}>Send</button>
      <h2>Response:</h2>
      <p>{response}</p>
    </div>
  );
};

export default ChatAI;
