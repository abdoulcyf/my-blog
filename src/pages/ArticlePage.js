import { useParams } from "react-router-dom";

import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();

  const article = articles.find((article) => article.name === articleId);

  // const otherArticles = articles.filter((article) => article.name !== articleId);
  // const otherArticle = otherArticles.length > 0 ? otherArticles[0] : null;

  // in case article is not found, display NotFoundPage
  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}

      {/* <h1>{otherArticle.title}</h1>
      {otherArticle.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))} */}
    </>
  );
};

export default ArticlePage;
