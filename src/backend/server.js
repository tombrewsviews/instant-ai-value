// src/backend/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import { Buffer } from "buffer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for frontend requests
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON request body
app.use(express.json());

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Endpoint to process image with Flux model
app.post("/api/process-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Convert the image buffer to base64
    const base64Image = req.file.buffer.toString("base64");

    // Call Flux model API
    const fluxResponse = await axios.post(
      process.env.KOYEB_URL || "https://your-domain-prefix.koyeb.app/predict",
      {
        prompt: "A professional headshot",
        image: base64Image,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      images: fluxResponse.data.images,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(500).json({
      error: "Failed to process image",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
