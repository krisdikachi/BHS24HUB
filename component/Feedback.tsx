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
    <section className="w-full max-w-6xl mx-auto my-12  shadow-xl overflow-hidden bg-white border border-emerald-100 flex flex-col md:flex-row transition-all">
      {/* Left Image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto relative">
        <Image
          src="/feedback4.png"
          alt="Feedback"
          width={800}
          height={600}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 flex flex-col justify-center px-6 py-8 md:px-10 bg-[#ffffff] text-gray-800">
        <h2 className="text-3xl font-bold text-[#2ecc71] mb-4 text-center md:text-left">We Value Your Feedback</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <textarea
            className="rounded-xl p-4 text-gray-700 resize-none min-h-[100px] border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
            placeholder="Tell us what you think..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#2ecc71] hover:bg-[#29b765] text-white font-semibold px-6 py-3 rounded-full transition shadow-md"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Feedback"}
          </button>
          {msg && <p className="text-center text-[#2ecc71] font-medium">{msg}</p>}
        </form>

        {/* Divider */}
        <div className="border-t border-emerald-100 my-4"></div>

        {/* Recent Comments */}
        <div className="bg-emerald-50 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-700 mb-3 text-center">Recent Feedback</h3>
          <ul className="space-y-3">
            {comments.map((c, i) => (
              <li
                key={i}
                className="bg-white rounded-xl p-4 shadow text-sm text-gray-700 border border-emerald-100"
              >
                <p>{c.comment}</p>
                <span className="block text-xs text-gray-400 mt-2">{new Date(c.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="text-center mt-3">
            <a href="/comments" className="text-emerald-700 underline hover:text-emerald-900 text-sm font-medium">
              See all comments
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
