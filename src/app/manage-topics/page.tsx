"use client";

import { useState, useEffect } from "react";
import {
  fetchTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../api/topics";
import { fetchArticles } from "../api/articles";
import Header from "@/components/Header";
import "../styles/managers.css";

interface Topic {
  id: string | null;
  title: string;
  description: string;
  articleCount?: number; 
}

export default function ManageTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [formState, setFormState] = useState<Topic>({
    id: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const [topicsData, articlesData] = await Promise.all([
          fetchTopics(),
          fetchArticles(),
        ]);

        const topicsWithArticleCount = topicsData.map((topic: Topic) => ({
          ...topic,
          articleCount: articlesData.filter(
            (article: any) => article.topic_id === topic.id
          ).length,
        }));

        setTopics(topicsWithArticleCount);
      } catch (error) {
        console.error("Error fetching topics or articles:", error);
      }
    };
    getData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formState.id) {
        await updateTopic(String(formState.id), {
          title: formState.title,
          description: formState.description,
        });
      } else {
        await createTopic({
          title: formState.title,
          description: formState.description,
        });
      }


      setFormState({ id: null, title: "", description: "" });
      const updatedTopics = await fetchTopics();
      setTopics(updatedTopics);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to create or update the topic. Check the console for details.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTopic(id);
      const updatedTopics = await fetchTopics();
      setTopics(updatedTopics);
    } catch (error) {
      console.error("Error deleting topic:", error);
      alert("Failed to delete the topic. Check the console for details.");
    }
  };

  const handleEdit = (topic: Topic) => {
    setFormState({ ...topic });
  };

  return (
    <div>
      <Header />
      <div className="scale-container">
        <div className="container mt-5">
          {/* Create New Topic Section */}
          <div className="white-box mb-5">
            <h2 className="section-title text-center mb-4">
              <span className="title-decoration">Create New Topic</span>
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
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formState.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {formState.id ? "Update Topic" : "Create Topic"}
              </button>
            </form>
          </div>

          {/* Topics List Section */}
          <div className="white-box">
            <h2 className="section-title text-center mb-4">
              <span className="title-decoration">Topics</span>
            </h2>
            <table className="table">
              <thead>
                <tr>
                  <th className="fw-bold">Title</th>
                  <th className="fw-bold">Description</th>
                  <th className="fw-bold">Articles</th>
                  <th className="fw-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr key={topic.id}>
                    <td>{topic.title}</td>
                    <td>{topic.description}</td>
                    <td>{topic.articleCount || 0}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(topic)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(String(topic.id))}
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
