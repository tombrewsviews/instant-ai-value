// src/services/apiService.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const processWithFlux = async (text) => {
  try {
    const response = await fetch(`${API_URL}/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to process with Flux-1");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
