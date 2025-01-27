import { fetchArticles } from "../api/articles";
import { fetchTopics } from "../api/topics";
import Link from "next/link";
import Userheader from "@/components/Userheader";
import { FaTimes } from "react-icons/fa";
import "../styles/content-mobile.css";

export default async function iPhonePreview() {
  const articles = await fetchArticles();
  const topics = await fetchTopics();

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <div className="iphone-preview-container">
      {/* Close Button */}
      <div className="close-button">
        <Link href="/preview">
          <FaTimes className="close-icon" />
        </Link>
      </div>

      {/* iPhone Frame */}
      <div className="iphone-frame">
        <div className="iphone-body">
          <div className="iphone-camera"></div>
          <div className="iphone-screen">
            <div className="scale-container">
              <Userheader />
              <div className="container mt-3">
                {/* Topics Dropdown */}
                <div className="dropdown mb-4">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select a Topic
                  </button>
                  <ul className="dropdown-menu">
                    {topics.map((topic: any) => (
                      <li key={topic.id}>
                        <Link
                          href={`/topics/${topic.id}?device=mobile`}
                          className="dropdown-item"
                        >
                          {topic.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Article */}
                <section className="list-group-container mb-4">
                  <h4>Featured Article</h4>
                  <div className="card">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{featuredArticle.title}</h5>
                      <p className="card-text">
                        {featuredArticle.text.substring(0, 100)}...
                      </p>
                      <Link
                        href={`/articles/${featuredArticle.id}?device=mobile`}
                        className="btn btn-primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </section>

                {/* Highlights */}
                <section className="list-group-container mb-4">
                  <h4>Highlights</h4>
                  <ul>
                    {regularArticles.slice(0, 3).map((article: any) => (
                      <li key={article.id}>
                        <Link href={`/articles/${article.id}?device=mobile`}>
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Regular Articles */}
                <section className="list-group-container">
                  <h4>All Articles</h4>
                  <ul>
                    {regularArticles.map((article: any) => (
                      <li key={article.id}>
                        <Link href={`/articles/${article.id}?device=mobile`}>
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>

          {/* Add Home Button */}
          <div className="iphone-home-button"></div>
        </div>
      </div>
    </div>
  );
}
