const CommentList = ({ comments }) => {
  return (
    <>
      <h3>Comments:</h3>
      {comments.map((comment, index) =>
        comment.postedBy === "" || comment.text === "" ? null : (
          <div className="comment" key={index}>
            <h4>{comment.postedBy}</h4>
            <p>{comment.text}</p>
          </div>
        )
      )}
    </>
  );
};

export default CommentList;
