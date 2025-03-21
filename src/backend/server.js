// src/backend/server.js
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

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

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Endpoint to process text with Flux-1 model
app.post("/api/process", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Call Flux-1 API
    // Replace with actual Flux-1 API endpoint and authentication
    const fluxResponse = await axios.post(
      process.env.FLUX_API_URL || "https://api.flux.com/v1/generate",
      {
        prompt: text,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUX_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json({
      result: fluxResponse.data,
      input: text,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      error: "Failed to process request",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
