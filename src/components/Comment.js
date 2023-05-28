import React from "react";
import { timeSince } from "../timeAgo";

// for the color to the avatar of the User
const COLOURS = [
  "#00bfff",
  "#ff8000",
  "#4CAF50",
  "#555555",
  "#ff4d4d",
  "#8c7373",
  "#bf00ff",
];

const Comment = ({ comment, deleteComment }) => {
  // each comment with its own badge, name, comment and time when it is posted

  return (
    <div>
      <p
        className="badge"
        style={{ backgroundColor: COLOURS[`${comment.color}`] }}
      >
        {comment.name.length > 2 ? comment.name.substring(0, 2) : comment.name}
      </p>
      <div className="comment_container">
        <div className="name_comment">
          <h5>
            {comment.name}{" "}
            <span>
              {comment.rating === 0 || comment.rating === undefined
                ? "N/A"
                : `rating | ${comment.rating}`}
            </span>
          </h5>
          <h6>{comment.comment}</h6>
        </div>
        <div className="time">
          <h6>{timeSince(comment.date)}</h6>
          <button
            className="delete_btn"
            onClick={(e) => deleteComment(comment.id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
