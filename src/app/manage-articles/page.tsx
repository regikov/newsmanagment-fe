"use client";

import { useState, useEffect } from "react";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../api/articles";
import { fetchTopics } from "../api/topics";
import Header from "@/components/Header";
import "../styles/managers.css";
import "../globals.css";

export default function ManageArticles() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    author: "",
    text: "",
    image: "",
    topicId: "",
    id: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [articlesData, topicsData] = await Promise.all([
          fetchArticles(),
          fetchTopics(),
        ]);
        setArticles(articlesData);
        setTopics(topicsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formState.id) {
        await updateArticle(formState.id, formState);
      } else {
        await createArticle(formState);
      }
      setFormState({
        title: "",
        author: "",
        text: "",
        image: "",
        topicId: "",
        id: null,
      });
      const updatedArticles = await fetchArticles();
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Failed to create or update the article. Check the console for details."
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteArticle(id);
      const updatedArticles = await fetchArticles();
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete the article. Check the console for details.");
    }
  };

  const handleEdit = (article: any) => {
    setFormState({ ...article });
  };

  return (
    <div>
      <Header />
      <div className="scale-container">
        <div className="container mt-5">
          {/* Create Article Section */}
          <div className="white-box mb-5">
            <h2 className="section-title text-center mb-4">
              <span className="title-decoration">Create New Article</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-control"
                  value={formState.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="form-control"
                  value={formState.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Text
                </label>
                <textarea
                  id="text"
                  name="text"
                  className="form-control"
                  value={formState.text}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="form-control"
                  value={formState.image}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="topicId" className="form-label">
                  Topic
                </label>
                <select
                  id="topicId"
                  name="topicId"
                  className="form-select"
                  value={formState.topicId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Topic</option>
                  {topics.map((topic: any) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.title}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {formState.id ? "Update Article" : "Create Article"}
              </button>
            </form>
          </div>

          {/* Articles List Section */}
          <div className="white-box">
            <h2 className="section-title text-center mb-4">
              <span className="title-decoration">Articles</span>
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th className="fw-bold">Title</th>
                  <th className="fw-bold">Author</th>
                  <th className="fw-bold">Views</th>
                  <th className="fw-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article: any) => (
                  <tr key={article.id}>
                    <td>{article.title}</td>
                    <td>{article.author}</td>
                    <td>{article.views || 0}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(article)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(article.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
