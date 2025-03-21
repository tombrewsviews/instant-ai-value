
import { toast } from "sonner";

// Replace this with your deployed backend URL when available
const API_BASE_URL = "http://localhost:5000";

/**
 * Generic API client function for making fetch requests
 */
async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    toast.error("Failed to fetch data from the server");
    throw error;
  }
}

// API endpoints
export const api = {
  // Health check endpoint
  healthCheck: () => apiClient<{ status: string; message: string }>("/api/health"),
  
  // Get all profiles
  getProfiles: () => apiClient<Array<{ id: number; name: string; title: string; photo: string }>>("/api/profiles"),
};

export default api;
