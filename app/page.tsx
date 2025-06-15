"use client";
import HeroSection from "@/component/HeroSection";
import Navbar from "@/component/navbar";

import Feedback from "@/component/Feedback";
import Footer from "@/component/Footer";
import HeroSectionsecond from "@/component/Herosectionsecond";
export default function Home() {
  return (
    <>
    <Navbar />

      <HeroSection />
    
      {/* <NovelPreview /> */}

      <HeroSectionsecond />
      <Feedback />
    
  
<Footer />
          </>
  );
}



