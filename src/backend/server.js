// src/backend/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import { Buffer } from "buffer";
import sharp from "sharp";

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
    credentials: true
  })
);

// Parse JSON request body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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

// Function to compress and resize image
async function processImage(buffer) {
  try {
    // Resize image to max 1024x1024 while maintaining aspect ratio
    // Convert to JPEG format with 80% quality
    const processedImageBuffer = await sharp(buffer)
      .resize(1024, 1024, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    return processedImageBuffer;
  } catch (error) {
    console.error("Error processing image:", error);
    throw new Error("Failed to process image");
  }
}

// Endpoint to process image with Flux model
app.post("/api/process-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    console.log("Received file:", {
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // Process and compress the image
    const processedImageBuffer = await processImage(req.file.buffer);
    console.log("Processed image size:", processedImageBuffer.length);

    // Convert the processed image buffer to base64
    const base64Image = processedImageBuffer.toString("base64");
    
    const fluxUrl = process.env.KOYEB_URL || "https://primitive-cecile-koyom-280bf16d.koyeb.app";
    console.log("Calling Flux model at:", fluxUrl);

    // Call Flux model API directly without health check
    console.log("Sending request to Flux model with payload:", {
      prompt: "A professional headshot"
    });

    const fluxResponse = await axios.post(
      `${fluxUrl}/predict`,
      {
        prompt: "A professional headshot"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        timeout: 120000, // 120 second timeout (2 minutes)
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        validateStatus: null // Allow any status code
      }
    );

    console.log("Flux model response:", {
      status: fluxResponse.status,
      contentType: fluxResponse.headers['content-type'],
      data: typeof fluxResponse.data === 'string' ? 
        fluxResponse.data.substring(0, 200) + '...' : 
        JSON.stringify(fluxResponse.data).substring(0, 200) + '...'
    });

    if (fluxResponse.status === 504) {
      return res.status(504).json({
        error: "Gateway Timeout",
        details: "The Flux model is taking too long to respond. Please try again."
      });
    }

    if (!fluxResponse.data || !fluxResponse.data.images) {
      console.error("Invalid response from Flux model:", fluxResponse.data);
      return res.status(500).json({
        error: "Invalid response from Flux model",
        details: "Response did not contain expected data"
      });
    }

    return res.json({
      images: fluxResponse.data.images
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error: "Failed to process request",
      details: error.message
    });
  }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
