"use client";

import { useState } from "react";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Sparkles } from "lucide-react";

interface Character {
  name: string;
  description: string;
}

interface SummaryResult {
  title: string;
  author: string | null;
  grounded: boolean;
  source: string;
  plotSummary: string;
  mainCharacters: Character[];
  themes: string[];
  setting: string;
}

export default function SummarizerPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!title.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-2xl py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="h-7 w-7 text-[#0EA5E9]" />
            AI Novel Summarizer
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter a novel's title and author. If it's in our library, the summary is grounded in the
            real book text &mdash; otherwise we draw on general knowledge.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Novel title (e.g., Treasure Island)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
            className="flex-1"
          />
          <Input
            placeholder="Author (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
            className="flex-1"
          />
          <Button
            onClick={handleSummarize}
            disabled={loading || !title.trim()}
            className="bg-[#0EA5E9] hover:bg-[#0369A1] whitespace-nowrap"
          >
            {loading ? "Summarizing..." : "Summarize"}
          </Button>
        </div>

        {loading && (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </CardContent>
          </Card>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {result && !loading && (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span
                className={`px-3 py-1 rounded-full font-medium flex items-center gap-1 ${
                  result.grounded
                    ? "bg-sky-100 text-sky-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                {result.grounded ? "From our BHS24HUB library" : "General knowledge"}
              </span>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{result.title}</CardTitle>
                {result.author && <CardDescription>by {result.author}</CardDescription>}
              </CardHeader>
              <CardContent>
                <p className="text-justify leading-relaxed">{result.plotSummary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Main Characters</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.mainCharacters?.map((c, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-semibold">{c.name}:</span> {c.description}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{result.setting}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Themes</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {result.themes?.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-sm border border-sky-200"
                  >
                    {t}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}