import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import '../../../../src/App.css';
import './AddVideo.css';

const AddVideo = () => {
  // ####################################################################### Stores Video:1 on the Server, in the folder videos
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const handleVideoChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideo(file);
    setSelectedVideoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedVideo) {
      const formData = new FormData();
      formData.append('video', selectedVideo);

      try {
        const response = await axios.post('/add-video-server', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response from the server as needed
        console.log('Server response:', response.data);
        window.location.href = '/videos';
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    } else {
      alert('Please select a video file.');
    }
  };
  // ####################################################################### Stored in the Database with Grid FS

  const [selectedVideoDb, setSelectedVideoDb] = useState(null);
  const [selectedVideoUrlDb, setSelectedVideoUrlDb] = useState(null);

  const handleVideoChangeDb = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideoDb(file);
    setSelectedVideoUrlDb(URL.createObjectURL(file));
  };

  const handleSubmitDb = async (e) => {
    e.preventDefault();

    if (selectedVideoDb) {
      const formData = new FormData();
      formData.append('video', selectedVideoDb);

      try {
        const response = await axios.post('/init-video', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response from the server as needed
        console.log('Server response:', response.data);
        window.location.href = '/videos';
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    } else {
      alert('Please select a video file.');
    }
  };

  // ####################################################################### Stored in the Database with Grid FS

  return (
    <div>
      <div style={{ margin: '15px' }} className="nav-link">
        <Link to="/videos">
          <Button variant="primary">Go Back</Button>
        </Link>
      </div>

      <div style={{}} className="container-addvideo">
        <h3>Add Video & Store it on the Server</h3>

        <Form className="mt-3">
          <label style={{ marginBottom: '10px' }} htmlFor="videoInput">
            Select a video file:
          </label>
          <br />
          <input
            type="file"
            id="videoInput"
            accept="video/*" // Specify that only video files are allowed
            onChange={handleVideoChange}
            style={{ marginBottom: '10px' }}
          />
        </Form>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <video
            controls // Add the controls attribute to display video controls (play, pause, volume, etc.)
            src={selectedVideoUrl}
            className="video-container"
          />
        </div>

        <br />

        <Button variant="success" type="submit" onClick={handleSubmit}>
          Submit1
        </Button>
      </div>

      {/* ############################################################################################### */}

      <div style={{}} className="container-addvideo">
        <h3>Add Video & Store it in the database.</h3>
        <h5>
          Currently its still not working properly, at the moment its only
          possible to stream the first video that someone uploaded, each upload
          needs to get its own folder for storing the fs chunks inside of it.
        </h5>

        <Form className="mt-3">
          <label style={{ marginBottom: '10px' }} htmlFor="videoInput">
            Select a video file:
          </label>
          <br />
          <input
            type="file"
            id="videoInput"
            accept="video/*" // Specify that only video files are allowed
            onChange={handleVideoChangeDb}
            style={{ marginBottom: '10px' }}
          />
        </Form>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <video
            controls // Add the controls attribute to display video controls (play, pause, volume, etc.)
            src={selectedVideoUrlDb}
            className="video-container"
          />
        </div>

        <br />

        <Button variant="success" type="submit" onClick={handleSubmitDb}>
          Submit2
        </Button>
      </div>
    </div>
  );
};

export default AddVideo;
