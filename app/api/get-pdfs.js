import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const publicPath = path.join(process.cwd(), "public");
  const files = fs.readdirSync(publicPath);

  // Filter only PDF files
  const pdfFiles = files
    .filter((file) => file.endsWith(".pdf"))
    .map((file) => ({
      name: file,
      path: `/${file}`,
    }));

  res.status(200).json(pdfFiles);
}