import articles from "../pages/article-content";
import { Link } from "react-router-dom";
const ArticlesList = () => {
  return (
    <>
      <h3>Articles</h3>
      {articles.map((article) => (
        <Link
          className="article-list-item"
          to={`/articles/${article.name}`}
          key={article.name}
        >
          <h4>{article.title}</h4>
          <p>{article.content[0].substring(0, 150)}...</p>
        </Link>
      ))}
    </>
  );
};

export default ArticlesList;
