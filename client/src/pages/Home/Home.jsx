import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the styling

const Home = () => {
  return (
    <div>
      <div className="hero">
        <h1>Welcome to my image/video App</h1>
        <p>Handle images and videos with Mongo DB</p>
      </div>
      <div className="main-content">
        <div className="content">
          <h2>What You Can Do:</h2>
          <div>
            <div>
              <Link to="/addfiles">
                Upload Images/Image Collection on the server or to the Mongo DB
              </Link>
            </div>
            <ol>
              <li>Upload ...</li>
              <li>Delete ...</li>
              <li>Edit ...</li>
              <li>View Images and Image Collections </li>
            </ol>
            <div>
              <Link to="/addvideo">
                Upload Videos on the server or to the Mongo DB via (FS Bucket)
              </Link>
            </div>
            <ol>
              <li>Render ther videos from the server via Url</li>
              <li>
                Allows you to Stram the Video Data from the Server with Grifd Fs
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
