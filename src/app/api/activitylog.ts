import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5550";

export async function fetchActivityLogs() {
  try {
    const response = await axios.get(`${API_URL}/activity`);
    return response.data; 
  } catch (error: any) {
    console.error("Error fetching activity logs:", error.message || error);
    return []; 
  }
}
