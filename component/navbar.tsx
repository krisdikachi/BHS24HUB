// ...existing imports...
"use client";
import { Menu, X, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
// ...existing code...

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    }
    if (megaOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [megaOpen]);

  return (
    <header className="bg-[#2ecc71] text-white w-[80%] mx-auto my-auto rounded-2xl NavBarParent sticky top-0 z-50 navbar-animate">
      <div className="mx-auto px-4 md:px-6 py-4 flex justify-between items-center w-full">
        <div className="text-2xl text-red-600 font-extrabold tracking-wider drop-shadow-sm">
          BHS24HUB
        </div>

        {/* Toggle menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 lg:gap-8 font-semibold text-sm items-center w-full justify-end">
          <a href="/" className="hover:text-emerald-100 transition duration-200">
            Home
          </a>
          <a href="/books" className="hover:text-emerald-100 transition duration-200">
            Books
          </a>
          <a href="/dictionary" className="hover:text-emerald-100 transition duration-200">
            Dictionary
          </a>
          {/* About (regular link) */}
          <a href="/chat" className="hover:text-emerald-100 transition duration-200">
            Bhs24hub AI
          </a>
          {/* More with MegaDropdown */}
          <div className="relative flex items-center">
            <button
              type="button"
              className="hover:text-emerald-100 transition duration-200 flex items-center gap-1 focus:outline-none"
              onClick={() => setMegaOpen((prev) => !prev)}
              aria-expanded={megaOpen}
              aria-controls="mega-dropdown"
            >
              <span className="flex items-center gap-1">
                More
                <ChevronDown size={18} className="ml-1" />
                <span className="ml-1 text-red-500 animate-bounce" title="More inside">✨</span>
              </span>
            </button>
            {/* Mega Dropdown */}
           {megaOpen && (
  <div
    ref={megaRef}
    id="mega-dropdown"
    className="absolute ml-[-202px]  top-full  mt-3 w-[400px] bg-white text-gray-800 rounded-xl shadow-2xl border border-emerald-200 z-50  sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-fade-in"
    // style={{ maxWidth: "100vw" }}
  >
    <div>
      <h4 className="font-bold text-emerald-700 mb-2">More Utility</h4>
      <ul className="space-y-2">
        {/* <li><a href="/about/team" className="hover:text-emerald-600">Our Team</a></li> */}
        <li><a href="/comments" className="hover:text-emerald-600">Reviews</a></li>
        <li><a href="/about" className="hover:text-emerald-600">About</a></li>
        <li><a href="/contact" className="hover:text-emerald-600">Contact Us</a></li>
      </ul>
    </div>
    {/* <div>
      <h4 className="font-bold text-emerald-700 mb-2">Resources</h4>
      <ul className="space-y-2">
        <li><a href="/about/careers" className="hover:text-emerald-600">Careers</a></li>
        <li><a href="/about/events" className="hover:text-emerald-600">Events</a></li>
        <li><a href="/about/partners" className="hover:text-emerald-600">Partners</a></li>
        <li><a href="/about/news" className="hover:text-emerald-600">News</a></li>
      </ul>
    </div> */}
  </div>
)}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setOpen(false)}
          />
          {/* Side Canvas */}
          <div className="relative bg-[#2ecc71] w-64 h-full shadow-lg animate-slide-in-right p-6">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>
            <nav className="flex flex-col gap-6 font-semibold text-lg mt-12">
              <a href="/" onClick={() => setOpen(false)} className="hover:text-emerald-100">Home</a>
              <a href="/books" onClick={() => setOpen(false)} className="hover:text-emerald-100">Books</a>
              <a href="/chat" onClick={() => setOpen(false)} className="hover:text-emerald-100">Bhs24hub AI</a>
              <a href="/dictionary" onClick={() => setOpen(false)} className="hover:text-emerald-100">Dictionary</a>
              {/* More (mobile) */}
              <button
                type="button"
                className="hover:text-emerald-100 transition duration-200 flex items-center gap-1 focus:outline-none mt-2"
                onClick={() => setMegaOpen((prev) => !prev)}
                aria-expanded={megaOpen}
                aria-controls="mega-dropdown-mobile"
              >
                <span className="flex items-center gap-1">
                  More
                  <ChevronDown size={18} className="ml-1" />
                  <span className="ml-1 text-yellow-300 animate-bounce" title="More inside">✨</span>
                </span>
              </button>
              {megaOpen && (
                <div
                  ref={megaRef}
                  id="mega-dropdown-mobile"
                  className="w-full bg-white text-gray-800 rounded-xl shadow-2xl border border-emerald-200 z-50 p-4 grid grid-cols-1 gap-4 animate-fade-in"
                >
                  <div>
                    <h4 className="font-bold text-emerald-700 mb-2">Quick Links</h4>
                    <ul className="space-y-2">
                      <li><a href="/comments" className="hover:text-emerald-600">Reviews</a></li>
                      <li><a href="/about" className="hover:text-emerald-600">About</a></li>
                      
                      <li><a href="/contact" className="hover:text-emerald-600">Contact Us</a></li>
                    </ul>
                  </div>
                  {/* <div>
                    <h4 className="font-bold text-emerald-700 mb-2">Resources</h4>
                    <ul className="space-y-2">
                      <li><a href="/about/careers" className="hover:text-emerald-600">Careers</a></li>
                      <li><a href="/about/events" className="hover:text-emerald-600">Events</a></li>
                      <li><a href="/about/partners" className="hover:text-emerald-600">Partners</a></li>
                      <li><a href="/about/news" className="hover:text-emerald-600">News</a></li>
                    </ul>
                  </div> */}
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;