import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="header_container">
      <div className="img_container">
        <img className="image" src="/book.jpg" alt="Book.img" />
      </div>
      <h4>Let's discuss about coding Book.</h4>
    </div>
  );
};

export default Header;
