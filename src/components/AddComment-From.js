import axios from "axios";
import { useState } from "react";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  // articleName == articleId in article-content
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const addComment = async () => {
    try {
      const response = await axios.post(
        `/api/articles/${articleName}/comments`,
        {
          postedBy: name,
          text: commentText,
        }
      );
      console.log("updated Article: ", response.data);
      const updatedArticle = response.data;
      onArticleUpdated(updatedArticle);
      setName("");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <div className="add-comment-from">
      <h3>Add a comment</h3>
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
      <label>
        Comment:
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
          cols={50}
        />
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
