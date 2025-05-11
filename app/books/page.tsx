"use client";
import Navbar from "@/component/navbar";
import React, { useEffect, useState } from "react";

const Books = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
useEffect(() => {
  const fetchPdfs = async () => {
    const response = await fetch("/api/get-pdfs");
    const data = await response.json();
    setPdfFiles(data);
  };

  fetchPdfs();
}, []);
  return (
    <>
      <Navbar />
      <div className="books-section">
        <h2 className="book-header">Some of Our Books:</h2>
        <div className="books-list">
          {pdfFiles.map((pdf, index) => (
            <div className="book-item" key={index}>
              <h3 className="book-header">{pdf.name}</h3>
              <button className="download-button">
                <a
                  href={pdf.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download⬇️
                </a>
              </button>
              <iframe
                src={pdf.path}
                width="70%"
                height="400px"
                title={`Book ${index + 1}`}
                className="book-iframe"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Books;