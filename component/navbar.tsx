"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-[#2ecc71] text-white shadow-md border-b border-emerald-600">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
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
        <nav className="hidden md:flex gap-8 font-semibold text-sm">
          <a
            href="/"
            className={`hover:text-emerald-100 transition duration-200 ${
              isActive("/") ? "text-red-600 underline" : ""
            }`}
          >
            Home
          </a>
          <a
            href="/books"
            className={`hover:text-emerald-100 transition duration-200 ${
              isActive("/books") ? "text-red-600 underline" : ""
            }`}
          >
            Books
          </a>
          <a
            href="/dictionary"
            className={`hover:text-emerald-100 transition duration-200 ${
              isActive("/dictionary") ? "text-red-600 underline" : ""
            }`}
          >
            Dictionary
          </a>
          <a
            href="/about"
            className={`hover:text-emerald-100 transition duration-200 ${
              isActive("/about") ? "text-red-600 underline" : ""
            }`}
          >
            About
          </a>
        </nav>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 animate-fade-in-down">
          <nav className="flex flex-col gap-4 font-semibold text-sm">
            <a
              href="/"
              onClick={() => setOpen(false)}
              className={`hover:text-emerald-100 ${
                isActive("/") ? "text-red-600 underline" : ""
              }`}
            >
              Home
            </a>
            <a
              href="/books"
              onClick={() => setOpen(false)}
              className={`hover:text-emerald-100 ${
                isActive("/books") ? "text-red-600 underline" : ""
              }`}
            >
              Books
            </a>
            <a
              href="/dictionary"
              onClick={() => setOpen(false)}
              className={`hover:text-emerald-100 ${
                isActive("/dictionary") ? "text-red-600 underline" : ""
              }`}
            >
              Dictionary
            </a>
            <a
              href="/about"
              onClick={() => setOpen(false)}
              className={`hover:text-emerald-100 ${
                isActive("/about") ? "text-red-600 underline" : ""
              }`}
            >
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;