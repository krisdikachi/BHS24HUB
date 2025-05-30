import React from "react";
import Link from "next/link";

const Herosectionsecond: React.FC = () => {
    return (
        <section className="bg-gradient-to-r from-[#11998e] to-[#38ef7d] text-white py-8 px-4 text-center rounded-md shadow-2xl my-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                AI Novel Summarizer
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto mb-8">
                Instantly get concise, insightful summaries of your favorite novels using advanced AI. Save time, discover key points, and never miss out on great stories!
            </p>
            <Link href="/chat">
                <button
                    className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-emerald-100 transition"
                >
                    Try it now   <span className="ml-1 text-red-500 animate-bounce" title="More inside">✨</span>
                </button>
            </Link>
        </section>
    );
};

export default Herosectionsecond;