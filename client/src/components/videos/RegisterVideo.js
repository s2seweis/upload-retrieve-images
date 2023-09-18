import {useState, useEffect} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// import image100 from '../assets/3.png'

const RegisterVideo = () => {


  const [selectedVideo, setSelectedVideo] = useState (null);
  console.log("line:1", selectedVideo);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState (null);
  console.log ('line:2', selectedVideoUrl);

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
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response from the server as needed
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    } else {
      alert('Please select a video file.');
    }
  };

  return (
    <div>

      <div style={{margin: '15px 0px 0px 15px', display: 'flex'}}>
        <a href="/">Go Back</a>
      </div>

      <div className="container mt-3">
        <h3>Register Video</h3>

        <Form className="mt-3">

     

          <label htmlFor="videoInput">Select a video file:</label>
          <input
            type="file"
            id="videoInput"
            accept="video/*" // Specify that only video files are allowed
            onChange={handleVideoChange}
          />

          <Button variant="primary" type="submit" 
          onClick={handleSubmit}
          >
            Submit
          </Button>

        </Form>

        <video
          controls // Add the controls attribute to display video controls (play, pause, volume, etc.)
          width="400" // Set the width of the video element
          src={selectedVideoUrl}
        />

      </div>
    </div>
  );
};

export default RegisterVideo;

