import React, { useState, useEffect } from "react";
import CommentsContainer from "../components/CommentsContainer";
import { v4 as uuidv4 } from "uuid";
import { StarRatingInput, css } from "react-star-rating-input";
import insertCss from "insert-css";
import axios from "axios";

import "../styles/home.css";

const HomePage = () => {
  // To set name and comment
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

  insertCss(css);

  // To set the Details into a variable
  const [details, setDetails] = useState({
    id: "",
    name: "",
    comment: "",
    rating: "",
    date: Date,
  });

  // For setting the Id, Name, Comment to a particular variable
  const [data, setData] = useState([]);

  // To set Color to the user Avatar
  const color = Math.floor(Math.random() * 7);

  // for fetching the data from the json server
  //  METHOD : GET
  const fetchDate = async () => {
    const response = await axios.get("http://localhost:3003/comments");
    return response.data;
  };

  // for adding the comment to the json server
  //  METHOD : POST
  const addComment = async (details) => {
    const response = await axios.post(
      "http://localhost:3003/comments",
      details
    );
    setData([...data, response.data]);
  };

  // for adding the comment to the json server
  //  METHOD : DELETE
  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:3003/comments/${id}`);
    const response = await axios.get("http://localhost:3003/comments");
    setDetails(response.data);
  };

  // For setting the Data into the server and clearing the inputs aand preventing the reload of the page
  const formSubmit = (e) => {
    e.preventDefault();

    setComment("");
    setName("");
    setRatingInput(0);
    addComment({
      id: uuidv4(),
      name: name,
      comment: comment,
      rating: ratingInput,
      date: new Date(Date.now()).getTime(),
      color: color,
    });
  };

  const submitAddComment = () => {
    setDetails({
      id: uuidv4(),
      name: name,
      comment: comment,
      rating: ratingInput,
      date: new Date(Date.now()),
    });
  };

  // for calling the fetchDate to get the comments
  useEffect(() => {
    const getComments = async () => {
      const data = await fetchDate();
      setData(data.reverse());
    };
    getComments();
  }, [details]);

  return (
    <div className="interactive_Section">
      {/*---------------- Form container which contains the input and submit button --------------------*/}
      <div className="form_container">
        <h5>Express Your View on this book</h5>
        <form className="row g-3" onSubmit={formSubmit}>
          <div className="mb3">
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="mb3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              placeholder="Comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              required
              rows="5"
            ></textarea>
          </div>

          <StarRatingInput
            className="rating_stars"
            size={5}
            value={ratingInput}
            onChange={(e) => setRatingInput(e)}
          />

          <button
            type="submit"
            className="btn btn-success"
            onClick={submitAddComment}
          >
            Comment
          </button>
        </form>
      </div>
      {/* ---------------------------the container for comments-------------------------------------- */}
      <div className="comments_container">
        <div className="comment_length">
          <span>{data.length}</span> Comments
        </div>
        <CommentsContainer data={data} deleteComment={deleteComment} />
      </div>
    </div>
  );
};

export default HomePage;
