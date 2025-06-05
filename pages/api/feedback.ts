import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { comment } = req.body;
    if (!comment) return res.status(400).json({ error: "Comment required" });

    const { error } = await supabase
      .from('comments')
      .insert([{ comment, date: new Date().toISOString() }]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('date', { ascending: false })
      .limit(100);

    if (error) {
      console.error("Supabase fetch error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  res.status(405).end();
}