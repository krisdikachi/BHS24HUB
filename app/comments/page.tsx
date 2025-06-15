"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/component/navbar";
import Feedback from "@/component/Feedback";
import Footer from "@/component/Footer";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

interface Comment {
  comment: string;
  date: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/feedback")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setComments(data.slice(0, 2)); // limit to 2 comments
        } else {
          setComments([]);
          console.error("API did not return an array:", data);
        }
      })
      .catch(err => {
        setComments([]);
        console.error("Failed to fetch comments:", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <section className="max-w-4xl mx-auto py-12 px-4 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-[#2ecc17]">User Comments</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Here's what users are saying about <span className="text-[#2ecc17] font-semibold">BHS24HUB</span>.
          </p>
        </div>

        {comments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comments.map((c, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base text-[#2ecc17]">Comment #{i + 1}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {new Date(c.date).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{c.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-6">No comments yet.</div>
        )}
      </section>

      <Feedback />
      <Footer />
    </>
  );
}
