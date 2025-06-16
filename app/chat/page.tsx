"use client";
import { useState } from "react";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer";

function stripThinkTags(text: string) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/\*/g, '');
    
}

interface Message {
  sender: "user" | "ai";
  text: string;
}

const ChatAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    let aiText = "";

    if (Array.isArray(data)) {
      aiText = stripThinkTags(data.map((msg) => msg.content).join("\n"));
    } else if (typeof data === "object" && data.content) {
      aiText = stripThinkTags(data.content);
    } else {
      aiText = "Sorry, I couldn't understand that.";
    }

    const aiMessage: Message = { sender: "ai", text: aiText };
    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center py-10 px-2">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-emerald-700 text-center mb-2">
            Chat with BHS24HUB AI
          </h1>

          {/* Chat Bubbles */}
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-xl shadow ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-4 py-2 rounded-xl shadow text-gray-600 rounded-bl-none">
                  <span className="animate-pulse">Thinking<span className="animate-bounce">...</span></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleChat();
              }}
              disabled={loading}
              className="flex-1 rounded-lg border border-emerald-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
            />
            <button
              onClick={handleChat}
              className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-60"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ChatAI;
