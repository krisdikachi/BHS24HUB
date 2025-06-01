"use client";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer";
import React, { useEffect, useState, useRef } from "react";

const Books = () => {
  interface PdfFile {
    name: string;
    path: string;
  }

  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const bookRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      const response = await fetch("/api/get-pdfs");
      const data = await response.json();
      setPdfFiles(data);
    };
    fetchPdfs();
  }, []);

  // Scroll to book section when selected from dropdown or sidebar
  useEffect(() => {
    if (selectedBook && bookRefs.current) {
      const idx = pdfFiles.findIndex(pdf => pdf.name === selectedBook);
      if (idx !== -1 && bookRefs.current[idx]) {
        bookRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [selectedBook, pdfFiles]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block md:w-1/4 bg-emerald-50 p-6 rounded-l-2xl shadow-lg sticky top-24 h-fit self-start">
          <h3 className="text-lg font-bold text-emerald-700 mb-4">Book List</h3>
          <ul className="space-y-2">
            {pdfFiles.map((pdf, idx) => (
              <li key={idx}>
                <button
                  className="w-full text-left px-3 py-2 rounded hover:bg-emerald-100 transition text-emerald-700 font-semibold"
                  onClick={() => setSelectedBook(pdf.name)}
                >
                  {pdf.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        {/* Dropdown for mobile */}
        <div className="block md:hidden w-full px-4 mt-4">
          <select
            className="w-full rounded p-2 border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            value={selectedBook}
            onChange={e => setSelectedBook(e.target.value)}
          >
            <option value="">Select a book...</option>
            {pdfFiles.map((pdf, idx) => (
              <option key={idx} value={pdf.name}>{pdf.name}</option>
            ))}
          </select>
        </div>
        {/* Books List */}
        <div className="books-section flex-1 px-2 md:px-8 py-8">
          <h2 className="book-header mb-6">Some of Our Books:</h2>
          <div className="books-list space-y-10">
            {pdfFiles.map((pdf, index) => (
              <div
                className="book-item mb-8"
                key={index}
                ref={el => (bookRefs.current[index] = el)}
                id={pdf.name.replace(/\s+/g, "-").toLowerCase()}
              >
                <h3 className="book-header text-xl font-bold text-emerald-700 mb-2">{pdf.name}</h3>
                <button className="download-button mb-2">
                  <a
                    href={pdf.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-white bg-emerald-600 px-4 py-2 rounded hover:bg-emerald-700 transition"
                  >
                    Download⬇️
                  </a>
                </button>
                <iframe
                  src={pdf.path}
                  width="100%"
                  height="400px"
                  title={`Book ${index + 1}`}
                  className="book-iframe rounded shadow"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Books;