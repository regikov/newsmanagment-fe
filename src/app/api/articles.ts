import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5550";

export const fetchArticles = async () => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
};

export const fetchArticleById = async (id: number) => {
  const response = await axios.get(`${API_URL}/articles/${id}`);
  return response.data;
};

export const createArticle = async (data: any) => {
  const response = await axios.post(`${API_URL}/articles`, data);
  return response.data;
};

export const updateArticle = async (id: number, data: any) => {
  await axios.put(`${API_URL}/articles/${id}`, data);
};

export const deleteArticle = async (id: number) => {
  const shouldDelete = window.confirm("Are you sure you want to delete this article?");
  if (!shouldDelete) return; 

  try {

    await axios.delete(`${API_URL}/articles/${id}`);
    alert("Article deleted successfully");
  
    window.location.reload(); 
  } catch (error) {
    console.error("Error deleting article:", error);
    alert("Failed to delete the article. Please try again.");
  }
};
