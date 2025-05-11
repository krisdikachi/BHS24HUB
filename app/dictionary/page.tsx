// pages/define.js
"use client";
import Navbar from '@/component/navbar';
import React, { useState } from 'react';

export default function DefinePage() {
  const [term, setTerm] = useState('');
  const [textbookExplanation, setTextbookExplanation] = useState('');
  const [schoolDefinition, setSchoolDefinition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Removed aiExplanation state
  // const [aiExplanation, setAiExplanation] = useState('');

  const fetchDefinitions = async () => {
    if (!term) return;
    setLoading(true);
    setError('');
    setTextbookExplanation('');
    setSchoolDefinition('');
    // setAiExplanation(''); // Removed

    try {
      // Wikipedia summary
      const wikiRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`
      );
      if (wikiRes.ok) {
        const data = await wikiRes.json();
        setTextbookExplanation(data.extract || 'No detailed explanation found.');
      } else {
        setTextbookExplanation('Failed to fetch Wikipedia data.');
      }
    } catch (err) {
      setTextbookExplanation('Error fetching Wikipedia data.');
    }

    try {
      // Dictionary API
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
    } catch (err) {
      setSchoolDefinition('Error fetching dictionary data.');
    }

    // Removed AI explanation fetch
    /*
    try {
      const aiRes = await fetch('/api/ai-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ term }),
      });
      if (aiRes.ok) {
        const aiData = await aiRes.json();
        setAiExplanation(aiData.explanation);
      } else {
        const errorData = await aiRes.json();
        setAiExplanation(`Error: ${errorData.error || 'Failed to fetch AI explanation.'}`);
      }
    } catch (err) {
      setAiExplanation('Error fetching AI explanation.');
    }
    */

    setLoading(false);
  };

  return (
    <div>
      <title>Textbook-like Explanation</title>
      <meta name="description" content="Get textbook-like explanations and school-level definitions for terms." />
      <link rel="icon" href="/favicon.ico" />

      <Navbar />
      <div className='PARENTDIV' style={{ maxWidth: '700px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
        <h1>Term Explanation</h1>
        <input
          type="text"
          placeholder="Enter a term (e.g., Photosynthesis)"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            width: '80%',
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #2ecc17',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={fetchDefinitions}
          style={{
            padding: '0.5rem 1rem',
            marginLeft: '1rem',
            fontSize: '1rem',
            background: '#2ecc17',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Search
        </button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <div>
            <h2 className='book-header'>Textbook Explanation</h2>
            <p style={{ textAlign: 'justify' }}>{textbookExplanation || 'No data available.'}</p>

            <h2 className='book-header'>School Definition</h2>
            <p style={{ textAlign: 'justify' }}>{schoolDefinition || 'No data available.'}</p>

            {/* Removed AI-Generated Explanation section */}
            {/*
            <h2 className='book-header'>AI-Generated Explanation</h2>
            <p style={{ textAlign: 'justify' }}>{aiExplanation || 'No data available.'}</p>
            */}
          </div>
        )}
      </div>
    </div>
  );
}