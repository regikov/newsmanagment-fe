import { fetchArticles } from "../api/articles";
import { fetchTopics } from "../api/topics";
import Link from "next/link";
import Header from "@/components/Header";
import "../styles/content-web.css";
import "../globals.css";

export default async function Home() {
  const articles = await fetchArticles();
  const topics = await fetchTopics();

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <div className="scale-container">
      <div>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="container mt-5">
          <div className="row">
            {/* Sidebar */}
            <aside className="col-lg-3 mb-4">
              {/* Topics Section */}
              <div className="list-group-container mb-5">
                <div className="section-title">
                  <h4>Topics</h4>
                  <div className="section-decoration">
                    <span className="line"></span>
                  </div>
                </div>
                <ul className="list-group">
                  {topics.map((topic: any) => (
                    <li key={topic.id} className="list-group-item">
                      <Link href={`/topics/${topic.id}`} className="text-primary">
                        {topic.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Authors Section */}
              <div className="list-group-container">
                <div className="section-title">
                  <h4>Authors</h4>
                  <div className="section-decoration">
                    <span className="line"></span>
                  </div>
                </div>
                <ul className="list-group">
                  {Array.from(new Set(articles.map((a: any) => a.author))).map(
                    (author: string) => (
                      <li
                        key={author}
                        className="list-group-item d-flex align-items-center"
                      >
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            author
                          )}&size=32`}
                          alt={author}
                          className="rounded-circle me-2"
                        />
                        <span className="text-dark">{author}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </aside>

            {/* Main Content */}
            <main className="col-lg-9">
              {/* Featured Article */}
              <section className="list-group-container mb-5">
                <div className="section-title">
                  <h4>Featured Article</h4>
                  <div className="section-decoration">
                    <span className="line"></span>
                  </div>
                </div>
                <div className="card border-0 shadow-sm">
                  <img
                    src={featuredArticle.image}
                    className="card-img-top"
                    alt={featuredArticle.title}
                  />
                  <div className="card-body">
                    <h2 className="card-title text-primary">
                      <Link href={`/articles/${featuredArticle.id}`}>
                        {featuredArticle.title}
                      </Link>
                    </h2>
                    <p className="card-text">
                      {featuredArticle.text.substring(0, 150)}...
                    </p>
                    <Link
                      href={`/articles/${featuredArticle.id}`}
                      className="btn btn-primary"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </section>

              {/* Highlights */}
              <section className="list-group-container">
                <div className="section-title">
                  <h4>Highlights</h4>
                  <div className="section-decoration">
                    <span className="line"></span>
                  </div>
                </div>
                <ul className="list-group">
                  {regularArticles.slice(0, 3).map((article: any) => (
                    <li key={article.id} className="list-group-item">
                      <Link href={`/articles/${article.id}`} className="text-dark">
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Regular Articles Grid */}
              <section className="list-group-container">
                <div className="section-title">
                  <h4>All Articles</h4>
                  <div className="section-decoration">
                    <span className="line"></span>
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {regularArticles.map((article: any) => (
                    <div key={article.id} className="col">
                      <div className="card border-0 shadow-sm">
                        <img
                          src={article.image}
                          className="card-img-top"
                          alt={article.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title text-primary">
                            <Link href={`/articles/${article.id}`}>
                              {article.title}
                            </Link>
                          </h5>
                          <p className="card-text">
                            {article.text.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
