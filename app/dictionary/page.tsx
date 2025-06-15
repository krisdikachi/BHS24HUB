"use client";

import Navbar from '@/component/navbar';
import Footer from '@/component/Footer';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';


export default function DefinePage() {
  const [term, setTerm] = useState('');
  const [textbookExplanation, setTextbookExplanation] = useState('');
  const [schoolDefinition, setSchoolDefinition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDefinitions = async () => {
    if (!term) return;
    setLoading(true);
    setError('');
    setTextbookExplanation('');
    setSchoolDefinition('');

    try {
      const wikiRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`
      );
      if (wikiRes.ok) {
        const data = await wikiRes.json();
        setTextbookExplanation(data.extract || 'No detailed explanation found.');
      } else {
        setTextbookExplanation('Failed to fetch Wikipedia data.');
      }
    } catch {
      setTextbookExplanation('Error fetching Wikipedia data.');
    }

    try {
      const dictRes = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`
      );
      if (dictRes.ok) {
        const data = await dictRes.json();
        if (data[0]?.meanings?.[0]?.definitions?.[0]?.definition) {
          setSchoolDefinition(data[0].meanings[0].definitions[0].definition);
        } else {
          setSchoolDefinition('No school-level definition found.');
        }
      } else {
        setSchoolDefinition('Failed to fetch dictionary data.');
      }
    } catch {
      setSchoolDefinition('Error fetching dictionary data.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container ml-auto mr-auto max-w-2xl py-12 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Term Explanation</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Get textbook-like and school-level definitions for academic terms.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Enter a term (e.g., Photosynthesis)"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-1"
          />
          <Button onClick={fetchDefinitions} className="bg-[#2ecc17] hover:bg-[#25a313]">
            Search
          </Button>
        </div>

        {loading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-11/12 mb-2" />
              <Skeleton className="h-4 w-10/12" />
            </CardContent>
          </Card>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Textbook Explanation</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  A concise academic-style overview
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-justify leading-relaxed">
                  {textbookExplanation || 'No data available.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">School Definition</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  A simple definition suitable for classroom use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-justify leading-relaxed">
                  {schoolDefinition || 'No data available.'}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <Footer />

      {/* Floating action icon, if desired later */}
      {/* <Button
        onClick={() => alert('Quick dictionary access')}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-[#2ecc17] hover:bg-[#25a313] shadow-lg"
        size="icon"
      >
        <BookOpen className="h-6 w-6" />
        <span className="sr-only">Quick Lookup</span>
      </Button> */}
    </div>
  );
}
