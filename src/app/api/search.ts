import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5550";

export async function searchArticles(query: string) {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching search results:", error.message || error);
    return [];
  }
}
