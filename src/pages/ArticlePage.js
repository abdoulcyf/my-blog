import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentList from "../components/commentList";
import AddCommentForm from "../components/AddComment-From";

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

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvotes`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  // const otherArticles = articles.filter((article) => article.name !== articleId);
  // const otherArticle = otherArticles.length > 0 ? otherArticles[0] : null;

  // in case article is not found, display NotFoundPage
  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvote-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvotes} upvotes</p>
      </div>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <AddCommentForm
        articleName={article}
        onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
      />
      <CommentList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
