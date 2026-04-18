import formidable from "formidable";
import path from "path";
import fs from "fs";

// Disable Next.js default body parser so formidable can handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,   // keep .jpg, .pdf, etc.
    maxFileSize: 5 * 1024 * 1024, // 5 MB limit
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      // Handle file too large error
      if (err.code === 1009) {
        return res.status(400).json({ message: "File too large. Max size is 5MB." });
      }
      return res.status(500).json({ message: "Upload failed", error: err.message });
    }

    const file = files.file?.[0] || files.file;

    if (!file) {
      return res.status(400).json({ message: "No file received" });
    }

    return res.status(200).json({
      message: "File uploaded successfully!",
      fileName: file.originalFilename,
      fileSize: file.size,
      filePath: `/uploads/${path.basename(file.filepath)}`,
    });
  });
}