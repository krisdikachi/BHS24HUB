import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Removed NEXT_PUBLIC_ prefix
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { term } = req.body;

  if (!term) {
    return res.status(400).json({ error: 'Term is required' });
  }

  // In your ai-explanation.js
if (!process.env.OPENAI_API_KEY) {
  console.error('OpenAI API key not configured');
  return res.status(500).json({ error: 'Server configuration error' });
}

  try {
    const prompt = `Provide a clear, textbook-like explanation for the term: "${term}". 
      Focus on educational and school-level details. 
      Format the response in clear paragraphs with proper grammar.`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.7,
    });

    const explanation = response.data.choices[0]?.text?.trim() || 'No explanation available';

    return res.status(200).json({ explanation });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Error fetching AI explanation',
      details: error.response?.data?.error?.message || error.message 
    });
  }
}