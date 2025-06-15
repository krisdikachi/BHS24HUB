"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const Herosectionsecond: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 text-center py-12 px-4 shadow-xl my-8 border border-[#2ecc71]/30">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2ecc71]">
          AI Novel Summarizer
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
          Instantly get concise, insightful summaries of your favorite novels using advanced AI. 
          Save time, discover key points, and never miss out on great stories!
        </p>
        <Link href="/chat">
          <Button
            className="bg-[#2ecc71] hover:bg-[#25a313] text-white px-6 sm:px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition duration-200"
          >
            Try it now
            <span
              className="ml-2 text-yellow-300 animate-bounce"
              title="Exciting feature"
            >
              ✨
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Herosectionsecond;
