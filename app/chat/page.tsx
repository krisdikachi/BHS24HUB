"use client";
import { useState } from "react";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer";

function stripThinkTags(text: string) {
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, '') // Remove <think>...</think>
    .replace(/\*/g, '') // Remove all asterisks
    .trim();
}

const ChatAI = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

if (Array.isArray(data)) {
      setResponse(stripThinkTags(data.map(msg => msg.content).join("\n")));
    } else if (typeof data === "object" && data.content) {
      setResponse(stripThinkTags(data.content));
    } else {
      setResponse("Sorry, I couldn't understand that.");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center py-10 px-2">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-emerald-700 text-center mb-2">Chat with BHS24HUB AI</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded-lg border border-emerald-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-800"
              onKeyDown={e => { if (e.key === "Enter") handleChat(); }}
              disabled={loading}
            />
            <button
              onClick={handleChat}
              className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-60"
              disabled={loading}
            >
              Send
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-emerald-700 mb-2">Response:</h2>
            <div className="min-h-[80px] bg-emerald-50 rounded-lg p-4 shadow-inner text-gray-800 font-mono whitespace-pre-line">
              {loading ? (
                <span className="animate-pulse text-emerald-600 font-semibold">Thinking<span className="animate-bounce">...</span></span>
              ) : (
                response || <span className="text-gray-400">AI response will appear here.</span>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ChatAI;