"use client";

import "../../styles/article.css";

interface Article {
  id: number;
  title: string;
  image: string;
  text: string;
  author: string;
}

export default function ArticleClient({
  article,
  device,
}: {
  article: Article;
  device: string;
}) {
  if (device === "tablet") {
    return (
      <div className="tablet-preview-container">
        <div className="tablet-body">
          <div className="tablet-camera"></div>
          <div className="tablet-screen">
            <div className="article-container">
              <h1>{article.title}</h1>
              <img src={article.image} alt={article.title} />
              <p className="article-author">By {article.author || "Unknown Author"}</p>
              <p className="article-text">{article.text}</p>
              <button onClick={() => history.back()} className="tablet-button">
                Back
              </button>
            </div>
          </div>
          <div className="tablet-home-button"></div>
        </div>
      </div>
    );
  }

  if (device === "phone") {
    return (
      <div className="phone-frame">
        <div className="phone-screen">
          <div className="article-container">
            <h1>{article.title}</h1>
            <img src={article.image} alt={article.title} />
            <p className="article-author">By {article.author || "Unknown Author"}</p>
            <p className="article-text">{article.text}</p>
            <button onClick={() => history.back()} className="phone-button">
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`article-container ${device}`}>
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} />
      <p className="article-author">By {article.author || "Unknown Author"}</p>
      <p className="article-text">{article.text}</p>
      <button onClick={() => history.back()}>Back</button>
    </div>
  );
}
