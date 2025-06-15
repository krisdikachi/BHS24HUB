"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, BookOpen, BookText, Search } from "lucide-react";



const heroImages = ["/lib5.png", "/lib6.png", "/lib4.png"];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    router.push("/books");
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Left: Text */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Discover the Joy of Reading with <span className="text-[#2ecc17]">BHS24HUB</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 mx-auto lg:mx-0">
                An educational platform designed for students to read books, generate AI summaries, post reviews, and
                access a built-in dictionary.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                <Button asChild className="bg-[#2ecc17] hover:bg-[#25a313] text-white">
                  <Link href="/books">Explore Books</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/about" className="text-[#2ecc17]">Learn More</Link>
                </Button>
              </div>
            </div>
            {/* Right: Carousel */}
          
               <div className="mx-auto lg:ml-auto flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img
                  alt="Students reading"
                  className="object-cover w-full h-full"
                  src="/lib6.png"
                />
              </div>
            </div>


          </div>
        </div>
      </section>

<section className="py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Platform Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to enhance your reading experience
              </p>
                
            </div>
          </div>
                     

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            <div className="flex flex-col items-center space-y-2 rounded-lg border-[#2ecc17] border p-6 shadow-sm">
              <BookOpen className="h-12 w-12 text-[#2ecc17]" />
              <h3 className="text-xl font-bold">Book Library</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Access a wide range of books and novels for educational purposes.
              </p>
                <Link href="/books"><Button variant={"outline"} className="text-[#2ecc17] border-[#2ecc17] cursor-pointer"> More</Button></Link>
            </div>
            <div className="flex flex-col items-center space-y-2 border-[#fff] rounded-lg border p-6 shadow-sm">
              <BookText className="h-12 w-12 text-[#2ecc17]" />
              <h3 className="text-xl font-bold">AI Summaries</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Generate concise AI-powered summaries of any book or novel. <br />
                                <Link href="/chat"><Button variant={"outline"} className="text-[#fff] mt-1.5 border-[#fff] cursor-pointer"> More</Button></Link>

              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 border-[#2ecc17] rounded-lg border p-6 shadow-sm">
              <Search className="h-12 w-12 text-[#2ecc17]" />
              <h3 className="text-xl font-bold">Dictionary</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Look up definitions of words with our built-in dictionary tool.
              </p>
                              <Link href="/dictionary"><Button variant={"outline"} className="text-[#2ecc17] mt-4 border-[#2ecc17] cursor-pointer"> More</Button></Link>

            </div>
            <div className="flex flex-col items-center space-y-2 border-[#fff] rounded-lg border p-6 shadow-sm">
              <MessageSquare className="h-12 w-12 text-[#2ecc17]" />
              <h3 className="text-xl font-bold">Reviews</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Share your thoughts and read reviews from other students.
              </p>
                              <Link href="/comments"><Button variant={"outline"} className="text-[#fff] border-[#fff] mt-4 cursor-pointer"> More</Button></Link>

            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default HeroSection;
