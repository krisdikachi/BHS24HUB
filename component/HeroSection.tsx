"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Use only this one

const heroImages = [
  '/lib5.png',
  '/lib6.png',
  '/lib4.png',
];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter(); // ✅ define BEFORE using it

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    router.push('/books'); // ✅ now works correctly
  };

  return (
    <section className="hero-section mt-[-100px]" style={{ backgroundColor: '' }}>
      <div className="hero-container">
        <Image
          src={heroImages[currentImageIndex]}
          alt="Hero Image"
          width={800}
          height={600}
          layout="responsive"
          className="hero-image"
        />
        <div className="hero-content text-white text-center mt-0">
          <h1 className="text-4xl font-bold mb-2">Welcome to Our Educational Library Platform</h1>
          <p className="mb-4 pHERO">
            Explore a vast collection of educational resources and engage in
            knowledge-rich experiences.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-emerald-600 px-4 py-2 rounded hover:bg-emerald-100 transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
