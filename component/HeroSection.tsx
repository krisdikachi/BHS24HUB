"use client";

import Link from "next/link";
import { BookOpen, Sparkles, Search, MessageSquare, ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "Book Library",
    description: "Dozens of full novels and texts, free to read in the browser.",
    href: "/books",
    icon: BookOpen,
    tab: "bg-[var(--brand)]",
  },
  {
    title: "AI Novel Summarizer",
    description: "Plot, characters, and themes for any novel — ours or the world's.",
    href: "/summarizer",
    icon: Sparkles,
    tab: "bg-[var(--amber)]",
  },
  {
    title: "Dictionary",
    description: "Look up any word without leaving your reading.",
    href: "/dictionary",
    icon: Search,
    tab: "bg-[var(--brand)]",
  },
  {
    title: "Reviews",
    description: "See what other students think, or leave your own.",
    href: "/comments",
    icon: MessageSquare,
    tab: "bg-[var(--amber)]",
  },
];

const HeroSection = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-16 md:py-24 lg:py-28 bg-[var(--paper)] dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1 space-y-5 text-center lg:text-left">
              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl leading-[1.05] tracking-tight text-[var(--ink)] dark:text-white">
                Read, understand, and remember more.
              </h1>
              <p className="max-w-[560px] text-gray-600 md:text-lg dark:text-gray-400 mx-auto lg:mx-0">
                BHS24HUB is a free reading platform for students: a real book library, an AI that
                summarizes any novel, and a built-in dictionary.
              </p>
              <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start pt-2">
                <Link
                  href="/books"
                  className="inline-flex items-center justify-center rounded-md bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white font-medium px-6 py-3 transition"
                >
                  Explore the Library
                </Link>
                <Link
                  href="/summarizer"
                  className="inline-flex items-center justify-center rounded-md border border-[var(--ink)]/20 dark:border-white/20 text-[var(--ink)] dark:text-white font-medium px-6 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
                >
                  Try the AI Summarizer
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-[440px] shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-900 rotate-1">
                <img
                  alt="Students reading at BHS24HUB"
                  className="object-cover w-full h-full"
                  src="/lib6.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)] dark:text-white">
              Everything in one place
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Pick where you want to start.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group relative flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span className={`h-1.5 w-full ${feature.tab}`} />
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <feature.icon className="h-8 w-8 text-[var(--brand)]" strokeWidth={1.75} />
                  <h3 className="font-display text-lg text-[var(--ink)] dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    {feature.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand)] group-hover:gap-1.5 transition-all">
                    Open
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;