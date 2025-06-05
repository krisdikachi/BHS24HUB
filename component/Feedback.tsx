"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Comment {
  comment: string;
  date: string;
}

const Feedback = () => {
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_SITE_URL || "https://bhs24hub.vercel.app"
        : "";
    fetch(`${baseUrl}/api/feedback`)
      .then(res => res.json())
      .then(data => setComments(data.slice(0, 2)))
      .catch(err => console.error("Failed to fetch comments:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
   const res = await fetch("/api/feedback", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ comment }),
});
const result = await res.json();
setLoading(false);

if (res.ok) {
  setMsg("Thank you for your feedback!");
  setComment("");
  fetch("/api/feedback")
    .then(res => res.json())
    .then(data => setComments(data.slice(0, 2)));
} else {
  setMsg(result.error || "Failed to send feedback.");
  console.error("Feedback API error:", result.error);
}
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-12 rounded-2xl shadow-lg overflow-hidden bg-[#2ecc71] bg-opacity-90 flex flex-col md:flex-row">
      {/* Left: Hero Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto relative flex-shrink-0">
        <Image
          src="/feedback4.png"
          alt="Feedback"
          width={800}
          height={600}
          className="object-cover w-full h-full"
          style={{ minHeight: "100%" }}
        />
      </div>
      {/* Right: Form and Comments */}
      <div className="md:w-1/2 w-full flex flex-col justify-center p-6 md:p-10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">We Value Your Feedback</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <textarea
            className="rounded p-3 text-gray-800 resize-none min-h-[80px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Send us your feedback..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-white text-emerald-600 font-bold px-6 py-2 rounded hover:bg-emerald-100 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Feedback"}
          </button>
          {msg && <div className="text-white text-center">{msg}</div>}
        </form>
        <div className="border-t border-emerald-200 my-4"></div>
        <div className="bg-white bg-opacity-80 rounded-xl p-4 shadow">
          <h3 className="text-lg font-semibold text-emerald-700 mb-2 text-center">Recent Comments</h3>
          <ul className="space-y-4">
            {comments.map((c, i) => (
              <li key={i} className="rounded p-3 text-gray-800 bg-emerald-50 shadow">
                <span className="block">{c.comment}</span>
                <span className="block text-xs text-gray-500 mt-1">{new Date(c.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="text-center mt-2">
            <a href="/comments" className="text-emerald-700 underline hover:text-emerald-900">See all comments</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;