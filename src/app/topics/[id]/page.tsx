import { fetchTopicById } from "../../api/topics";
import Link from "next/link";

export default async function TopicPage({ params }: { params: { id: string } }) {
  const topic = await fetchTopicById(params.id);

  return (
    <div className="container mt-5">
      <h2>{topic.title}</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {topic.articles.map((article: any) => (
          <div key={article.id} className="col">
            <div className="card">
              <img
                src={article.image}
                className="card-img-top"
                alt={article.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link href={`/articles/${article.id}`}>{article.title}</Link>
                </h5>
                <p className="card-text">
                  {article.text.substring(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
