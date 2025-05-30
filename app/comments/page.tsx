"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/component/navbar";
import Feedback from "@/component/Feedback";

interface Comment {
  comment: string;
  date: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/feedback")
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  return (<>
    <Navbar />

    <section className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">All Comments</h1>
      <ul className="space-y-4">
        {comments.map((c, i) => (
          <li key={i} className="bg-white bg-opacity-80 rounded p-3 text-gray-800 shadow">
            <span className="block">{c.comment}</span>
            <span className="block text-xs text-gray-500 mt-1">{new Date(c.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </section>

    <Feedback />

    </>
  );
}