/**
 * scripts/extract-book-texts.js
 *
 * Run this LOCALLY (not on Vercel) once, and whenever you add/remove books:
 *
 *   npm install pdf-parse --save-dev
 *   node scripts/extract-book-texts.js
 *
 * It reads every PDF in /public, pulls out the text, trims it to a safe
 * length for the Gemini free tier, and writes the result to
 * data/book-texts.json. That JSON file gets committed to the repo and
 * STATICALLY IMPORTED by the summarize API route (see pages/api/summarize.js) —
 * this avoids the classic Vercel bug where runtime fs.readdirSync/readFileSync
 * calls against /public fail in production because the public folder isn't
 * bundled into serverless functions.
 *
 * We only keep an excerpt (not the full novel) per book to stay well under
 * the Gemini free-tier per-request token budget. ~60,000 characters is
 * roughly the first several chapters of most novels — enough for the AI to
 * identify main characters, setting, and the opening plot arc accurately,
 * without blowing the free quota on a single request.
 */

const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_PATH = path.join(process.cwd(), "data", "book-texts.json");
const MAX_CHARS_PER_BOOK = 60000;

async function main() {
  const files = fs.readdirSync(PUBLIC_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  console.log(`Found ${files.length} PDFs. Extracting text...`);

  const result = {};

  for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file);
    try {
      const buffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(buffer);
      const text = parsed.text.replace(/\s+/g, " ").trim();
      result[file] = text.slice(0, MAX_CHARS_PER_BOOK);
      console.log(`  ✓ ${file} (${text.length} chars extracted, stored ${result[file].length})`);
    } catch (err) {
      console.warn(`  ✗ Skipped ${file}: ${err.message}`);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
  console.log(`\nWrote ${Object.keys(result).length} entries to ${OUTPUT_PATH}`);
  console.log("Commit data/book-texts.json to your repo so it deploys with the app.");
}

main();