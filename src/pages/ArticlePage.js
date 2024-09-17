import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentList from "../components/commentList";
import AddCommentForm from "../components/AddComment-From";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
  });
  const { articleId } = useParams();
  const { canUpvote } = articleInfo;
  const { user, isLoading } = useUser();

  //----------------------------------------------
  useEffect(() => {
    const loadArticleInfo = async () => {
      if (!user) {
        console.error("No user is currently logged in");
        return;
      }
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      //  console.log(response.data);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    if (!isLoading) {
      // Wait until the user is fully loaded
      loadArticleInfo();
    }
  }, [isLoading, articleId, user]);

  //------------------------------------------------------
  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    if (isLoading) return; // Wait until the user is fully loaded
    if (!user) {
      console.error("No user is currently logged in");
      return;
    }

    try {
      const token = await user.getIdToken();
      const headers = token ? { authtoken: token } : {};
      const response = await axios.put(
        `/api/articles/${articleId}/upvotes`,
        null,
        { headers }
      );

      const updatedArticle = response.data;
      setArticleInfo(updatedArticle);
    } catch (error) {
      console.error("Error upvoting article:", error);
    }
  };

  //-----------------------------------------------------
  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvote-section">
        {user ? (
          <button
            onClick={addUpvote}
            disabled={articleInfo.comments.includes(user.email)}
          >
            {canUpvote ? "Upvote" : "Already Upvoted"}
          </button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvotes</p>
      </div>
      {article.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Login to add a comment</button>
      )}
      <CommentList comments={articleInfo.comments || []} />
    </>
  );
};

export default ArticlePage;
