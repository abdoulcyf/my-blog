import axios from "axios";
import { useState } from "react";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [commentText, setCommentText] = useState("");
  const { user, isLoading } = useUser(); // Destructure user and isLoading from useUser

  const addComment = async () => {
    if (isLoading) return; // Wait until the user is fully loaded
    if (!user) {
      console.error("No user is currently logged in");
      return;
    }

    try {
      const token = await user.getIdToken();
      const headers = token ? { authtoken: token } : {};

      const response = await axios.post(
        `/api/articles/${articleName}/comments`,
        {
          postedBy: user.email,
          text: commentText,
        },
        { headers }
      );

      const updatedArticle = response.data;
      onArticleUpdated(updatedArticle);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="add-comment-form">
      <h3>Add a comment</h3>
      {user && <p>You are posting as {user.email}</p>}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        rows={4}
        cols={50}
      />
      <button onClick={addComment} disabled={isLoading}>
        Add Comment
      </button>
    </div>
  );
};

export default AddCommentForm;
