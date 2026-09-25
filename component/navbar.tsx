"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemeToggle from "@/component/ThemeToggle"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const pathname = usePathname()
  const megaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaRef.current && !megaRef.current.contains(event.target as Node)) {
        setMegaOpen(false)
      }
    }

    if (megaOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [megaOpen])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Dictionary", path: "/dictionary" },
    { name: "Novel Summarizer", path: "/summarizer" },
    { name: "Bhs24hub AI", path: "/chat" },
  ]

  const dropdownLinks = [
    { name: "Reviews", path: "/comments" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--brand-light)] dark:border-gray-800 bg-[var(--paper)]/90 dark:bg-gray-950/90 backdrop-blur-2xl shadow-sm transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold text-[var(--brand)] tracking-wide">
          BHS24HUB
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--ink)] dark:text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`hover:text-[var(--brand)] transition ${
                pathname === link.path ? "text-[var(--brand)]" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative" ref={megaRef}>
            <button
              onClick={() => setMegaOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-[var(--brand)] transition"
            >
              More <ChevronDown size={16} />
              <span className="ml-1 text-[var(--amber)] animate-bounce" title="More inside">✨</span>
            </button>

            {megaOpen && (
              <div className="absolute top-full right-0 mt-3 w-[350px] bg-white dark:bg-gray-900 border border-[var(--brand-light)] dark:border-gray-700 rounded-xl shadow-xl p-6 grid grid-cols-2 gap-4 z-50">
                <div>
                  <h4 className="font-semibold text-[var(--brand-dark)] dark:text-sky-400 mb-2">More Utility</h4>
                  <ul className="space-y-2 text-sm">
                    {dropdownLinks.map((item) => (
                      <li key={item.path}>
                        <Link href={item.path} className="hover:text-[var(--brand)] dark:text-gray-300 dark:hover:text-sky-400 block">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(true)}>
            <Menu size={24} className="text-[var(--ink)] dark:text-gray-200" />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Slide Panel */}
<div className="relative bg-gradient-to-b from-[var(--paper)] to-white dark:from-gray-950 dark:to-gray-900 w-72 h-[100vh] shadow-lg z-50 animate-slide-in-right p-6 text-[var(--ink)] dark:text-white">
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col gap-6 text-lg font-semibold mt-16  w-[100%] shadow-lg z-50 animate-slide-in-right h-[calc(100vh-4rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="hover:text-[var(--brand)]"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="mt-6 border-t border-[var(--ink)]/10 dark:border-white/30 pt-4">
                <h4 className="text-sm font-bold mb-2 text-[var(--ink)]/70 dark:text-white/80">More</h4>
                <ul className="space-y-2">
                  {dropdownLinks.map((item) => (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className="hover:text-[var(--brand)]"
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}