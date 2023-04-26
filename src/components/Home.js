import React from "react";
import "./Style/style.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
    className="home_container"
    >
      <div className="home">
        {/* <Link to="statistic" className="child_container">
          სტატისტიკა
        </Link> */}
        <Link to="rate" className="child_container">
          შეფასება
        </Link>
        {/* <Link to="questions" className="child_container">
          კითხვები
        </Link> */}
      </div>
      <div className="image_container">
        <img src="./images/FLAG.png" className="image" alt="" />
      </div>
    </div>
  );
};

export default Home;
