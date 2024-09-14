import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentList from "../components/commentList";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    loadArticleInfo();
  }, [articleId]);

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
      <p>This article has {articleInfo.upvotes} upvotes</p>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <CommentList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
