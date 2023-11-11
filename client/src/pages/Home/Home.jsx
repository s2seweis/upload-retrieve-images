import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the styling

const Home = () => {
  return (
    <div>
      <div className="hero">
        <h1>Welcome to Our App</h1>
        <p>Explore and share amazing content!</p>
      </div>
      <div className="main-content">
        <div className="content">
          <h2>What You Can Do:</h2>
          <ul>
            <li>
              <Link to="/adduser">Upload Images</Link>
            </li>
            <li>
              <Link to="/users">View Images</Link>
            </li>
            <li>
              <Link to="/addvideo">Upload Videos</Link>
            </li>
            <li>
              <Link to="/videos">View Videos</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
