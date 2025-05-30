import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-[#2ecc71] text-white py-6 px-3 mt-20 text-center">
    <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
      <a href="/" className="hover:underline font-semibold">Home</a>
      <a href="/books" className="hover:underline font-semibold">Books</a>
      <a href="/dictionary" className="hover:underline font-semibold">Dictionary</a>
      <a href="/about" className="hover:underline font-semibold">About</a>
      <a href="/chat" className="hover:underline font-semibold">Bhs24hub AI</a>
      <a href="/comments" className="hover:underline font-semibold">Reviews</a>
      <a href="/about/contact" className="hover:underline font-semibold">Contact</a>
      <a href="/about/careers" className="hover:underline font-semibold">Careers</a>
      <a href="/about/events" className="hover:underline font-semibold">Events</a>
      <a href="/about/partners" className="hover:underline font-semibold">Partners</a>
      <a href="/about/news" className="hover:underline font-semibold">News</a>
    </div>
    <div className="mt-4 text-sm text-emerald-100">
      &copy; {new Date().getFullYear()} ATL GROUPS. All rights reserved.
    </div>
  </footer>
);

export default Footer;