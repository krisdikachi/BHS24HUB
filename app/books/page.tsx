"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import Navbar from "@/component/navbar";
import Footer from "@/component/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PdfFile {
  name: string;
  path: string;
}

const genres = ["All", "Science", "Literature", "Technology", "History"];

export default function BooksPage() {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<PdfFile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    const fetchPdfs = async () => {
      const response = await fetch("/api/get-pdfs");
      const data = await response.json();
      setPdfFiles(data);
      setFilteredBooks(data);
    };
    fetchPdfs();
  }, []);

  useEffect(() => {
    let books = pdfFiles;

    if (selectedGenre !== "All") {
      books = books.filter((book) => book.name.toLowerCase().includes(selectedGenre.toLowerCase()));
    }

    if (searchTerm) {
      books = books.filter((book) => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredBooks(books);
  }, [searchTerm, selectedGenre, pdfFiles]);

  return (
    <>
      <Navbar />
      <div className="container py-12">
        <div className="space-y-4 text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Book Library</h1>
          <p className="text-gray-500 md:text-xl dark:text-gray-400 max-w-2xl mx-auto">
            Explore our PDF library curated for your educational success.
          </p>
        </div>

        {/* Search and Genre Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search books..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={genre === selectedGenre ? "default" : "outline"}
                className={genre === selectedGenre ? "bg-[#2ecc17] hover:bg-[#25a313]" : ""}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book, idx) => (
            <Card key={idx} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-[2/3] bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
                PDF
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-2">{book.name.replace(/\.[^/.]+$/, "")}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">PDF Book</p>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                  A detailed educational PDF file. Click below to view or download.
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button asChild className="flex-1 bg-[#2ecc17] hover:bg-[#25a313]">
                  <Link href={book.path} target="_blank">
                    <BookOpen className="mr-2 h-4 w-4" /> Read
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href={book.path} download>
                    Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
