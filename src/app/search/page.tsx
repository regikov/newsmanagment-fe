"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


interface Article {
  id: number;
  title: string;
  text: string;
  views: number;
  created_at: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5550";
        const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setArticles(data);
      } catch (err: any) {
        console.error("Error fetching search results:", err.message);
        setError(err.message);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="container mt-5">
      <h1>Search Results</h1>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group mt-3">
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id} className="list-group-item">
              <h5>{article.title}</h5>
              <p>{article.text.substring(0, 150)}...</p>
              <small>Views: {article.views} | Created At: {new Date(article.created_at).toLocaleDateString()}</small>
            </li>
          ))
        ) : (
          <li className="list-group-item">No results found for "{query}"</li>
        )}
      </ul>
    </div>
  );
}
