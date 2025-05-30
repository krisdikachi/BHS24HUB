// pages/about.js
"use client";
import React from 'react';
import Navbar from '@/component/navbar';
// import Image from 'next/image';
export default function AboutPage() {
  return (
    <div>
      <title>About Us | School Library</title>
      <meta name="description" content="Learn more about our School Library web application and our mission." />
      <link rel="icon" href="/favicon.ico" />

      <Navbar />
 {/* <Image
          src="/feedback.png"
          alt="Feedback"
          width={800}
          height={600}
          // className="object-cover w-full h-full"
          // style={{ minHeight: "100%" }}
        /> */}

      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Us</h1>
        <p style={{ lineHeight: '1.6', textAlign: 'justify' }}>
          Welcome to our School Library platform. Our mission is to make academic resources easily accessible to students and educators. 
          We believe that learning should be engaging, simple, and available to everyone.
        </p>

        <p style={{ lineHeight: '1.6', textAlign: 'justify', marginTop: '1rem' }}>
          This platform provides a digital catalog of books, articles, and academic terms. 
          Whether you&apos;re looking for definitions, textbook-style explanations, or AI-generated content to better understand a topic, 
          we&apos;ve got you covered.
        </p>

        <p style={{ lineHeight: '1.6', textAlign: 'justify', marginTop: '1rem' }}>
          Built with ❤️ by the AndroTechlist Group, this application combines technology with education to support students in their academic journey.
        </p>

        <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#2ecc17' }}>
          Thank you for using our platform!
        </p>
      </div>
    </div>
  );
}
