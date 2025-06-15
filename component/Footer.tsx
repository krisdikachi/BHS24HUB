import React from "react";

const Footer: React.FC = () => (
  <footer className="relative bg-[#2ecc71] text-white py-5 px-3 mt-20 text-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 shadow-2xl overflow-hidden">
    {/* 3D polygon effect background */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <polygon points="0,120 1440,0 1440,120" fill="#27ae60" opacity="0.18" />
        <polygon points="0,120 0,60 1440,0 1440,120" fill="#1abc9c" opacity="0.12" />
      </svg>
    </div>
    <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center py-2">
      <a href="/" className="hover:underline font-semibold drop-shadow">Home</a>
      <a href="/books" className="hover:underline font-semibold drop-shadow">Books</a>
      <a href="/dictionary" className="hover:underline font-semibold drop-shadow">Dictionary</a>
      <a href="/about" className="hover:underline font-semibold drop-shadow">About</a>
      <a href="/chat" className="hover:underline font-semibold drop-shadow">Bhs24hub AI</a>
      <a href="/comments" className="hover:underline font-semibold drop-shadow">Reviews</a>
      <a href="/about/contact" className="hover:underline font-semibold drop-shadow">Contact</a>
      <span className="opacity-60 cursor-not-allowed font-semibold drop-shadow">Careers</span>
      <span className="opacity-60 cursor-not-allowed font-semibold drop-shadow">Events</span>
      <span className="opacity-60 cursor-not-allowed font-semibold drop-shadow">Partners</span>
      <span className="opacity-60 cursor-not-allowed font-semibold drop-shadow">News</span>
    </div>
    <div className="relative z-10 mt-3 text-sm text-emerald-100 font-mono drop-shadow">
      &copy; {new Date().getFullYear()} ATL GROUPS. All rights reserved.
    </div>
  </footer>
);

export default Footer;