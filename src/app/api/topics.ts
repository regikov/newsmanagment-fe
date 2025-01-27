import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5550";

// Fetch all topics
export const fetchTopics = async () => {
  const response = await axios.get(`${API_URL}/topics`);
  return response.data;
};

// Fetch a specific topic by ID
export const fetchTopicById = async (id: string) => {
  const response = await axios.get(`${API_URL}/topics/${id}`);
  return response.data;
};

export const createTopic = async (topic: { title: string; description: string }) => {
  const response = await axios.post(`${API_URL}/topics`, topic);
  return response.data;
};

export const updateTopic = async (id: string, topic: { title: string; description: string }) => {
  const response = await axios.put(`${API_URL}/topics/${id}`, topic);
  return response.data;
};


// Delete a topic by ID
export const deleteTopic = async (id: string) => {
  const response = await axios.delete(`${API_URL}/topics/${id}`);
  return response.data;
};
