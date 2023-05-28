import Comment from "./Comment";

// for Iterating the Comments and Displaying
const CommentsContainer = ({ data, deleteComment }) => {
  return (
    <>
      <div>
        {data.length === 0 ? (
          <p className="empty">No Comments</p>
        ) : (
          data.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              deleteComment={deleteComment}
            />
          ))
        )}
      </div>
    </>
  );
};

export default CommentsContainer;
