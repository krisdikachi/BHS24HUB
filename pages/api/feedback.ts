import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const COMMENTS_FILE = path.join(process.cwd(), "comments.json");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { comment } = req.body;
    if (!comment) return res.status(400).json({ error: "Comment required" });

    // Save comment to file
    let comments = [];
    if (fs.existsSync(COMMENTS_FILE)) {
      comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));
    }
    const newComment = { comment, date: new Date().toISOString() };
    comments.unshift(newComment);
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments.slice(0, 100), null, 2)); // keep last 100

    // Send email notification
    try {
      await resend.emails.send({
        from: "BHS24HUB <onboarding@resend.dev>",
        to: "androtechlistgroup@gmail.com",
        subject: "New Feedback Received",
        text: comment,
      });
    } catch (e) {
      // Ignore email errors for now
    }

    return res.status(200).json({ success: true });
  }

  // GET: return all comments
  if (req.method === "GET") {
    let comments = [];
    if (fs.existsSync(COMMENTS_FILE)) {
      comments = JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf-8"));
    }
    return res.status(200).json(comments);
  }

  res.status(405).end();
}