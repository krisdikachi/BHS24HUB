"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface PdfFile {
  name: string;
  path: string;
}

const NovelPreview = () => {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      const response = await fetch("/api/get-pdfs");
      const data = await response.json();
      setPdfFiles(data);
    };
    fetchPdfs();
  }, []);

  return (<>

  <h3 className="font-xl font-bold text-black text-center">The Novel Section</h3>
 
  
    <div className="bg-white rounded-lg shadow mt-8 px-6 py-4 flex items-center justify-between">
      <ul className="flex flex-col gap-6">
        {pdfFiles.slice(0, 2).map((pdf, idx) => (
          <li key={idx} className="novel-3d flex items-center gap-4 px-4 py-3">
            <span className="text-emerald-700 font-bold text-lg drop-shadow">{idx + 1}.</span>
            <Image
              src="/mini.png"
              alt={pdf.name}
              width={48}
              height={64}
              className="rounded shadow"
            />
            <a
              href={pdf.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-mono underline hover:text-emerald-900 font-bold"
            >
              {pdf.name}
            </a>
          </li>
        ))}
      </ul>
      <Link
        href="/books"
        className="ml-8 text-emerald-600 font-bold font-cursive hover:underline whitespace-nowrap"
      >
        See more &rarr;
      </Link>
    </div>
    
    </>
  );
};

export default NovelPreview;