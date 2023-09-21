import {useState, useEffect} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

// import image100 from '../assets/3.png'

import '../../../src/App.css';

const RegisterVideo = () => {


  // ####################################################################### Stores Video:1 on the Server, in the folder videos
  const [selectedVideo, setSelectedVideo] = useState (null);
  console.log ('line:1', selectedVideo);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState (null);
  console.log ('line:2', selectedVideoUrl);
  
  const handleVideoChange = e => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideo (file);
    setSelectedVideoUrl (URL.createObjectURL (file));
  };
  
  const handleSubmit = async e => {
    e.preventDefault ();
    
    if (selectedVideo) {
      const formData = new FormData ();
      formData.append ('video', selectedVideo);
      
      try {
        const response = await axios.post ('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // Handle the response from the server as needed
        console.log ('Server response:', response.data);
      } catch (error) {
        console.error ('Error uploading video:', error);
      }
    } else {
      alert ('Please select a video file.');
    }
  };
  // ####################################################################### Stored in the Database with Grid FS

  const [selectedVideoDb, setSelectedVideoDb] = useState (null);
  console.log ('line:3', selectedVideoDb);
  const [selectedVideoUrlDb, setSelectedVideoUrlDb] = useState (null);
  console.log ('line:4', selectedVideoUrlDb);


  const handleVideoChangeDb = e => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideoDb (file);
    setSelectedVideoUrlDb (URL.createObjectURL (file));
  };

  const video1 = "video1";

  const handleSubmitDb = async e => {
    e.preventDefault ();
    
    if (selectedVideoDb) {
      const formData = new FormData ();
      formData.append ('video', selectedVideoDb);
      // formData.append ('name', video1);
      
      try {
        const response = await axios.post ('/init-video', formData, {
        // const response = await axios.post ('/uploadvideo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // Handle the response from the server as needed
        console.log ('Server response:', response.data);
      } catch (error) {
        console.error ('Error uploading video:', error);
      }
    } else {
      alert ('Please select a video file.');
    }
  };

    // ####################################################################### Stored in the Database with Grid FS


  
  return (
    <div>

      <div style={{margin: '15px 0px 0px 15px', display: 'flex'}}>
        <a href="/video">Go Back</a>
      </div>

      <div style={{backgroundColor: 'aliceblue'}} className="container mt-3">
        <h3>Register Video & Store it on the Server</h3>

        <Form className="mt-3">

          <label style={{marginBottom: '10px'}} htmlFor="videoInput">
            Select a video file:
          </label>
          <br />
          <input
            type="file"
            id="videoInput"
            accept="video/*" // Specify that only video files are allowed
            onChange={handleVideoChange}
            style={{marginBottom:"10px"}}
          />

        </Form>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <video
            controls // Add the controls attribute to display video controls (play, pause, volume, etc.)
            // width="400"
            src={selectedVideoUrl}
            // style={{height:"auto"}}
            className="video-container"
          />
        </div>

        <br />

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit1
        </Button>

      </div>



    {/* ############################################################################################### */}



      <div style={{backgroundColor: 'aliceblue'}} className="container mt-3">
        <h3>Register Video & Store it in the database.</h3>

        <Form className="mt-3">

          <label style={{marginBottom: '10px'}} htmlFor="videoInput">
            Select a video file:
          </label>
          <br />
          <input
            type="file"
            id="videoInput"
            accept="video/*" // Specify that only video files are allowed
            onChange={handleVideoChangeDb}
            style={{marginBottom:"10px"}}
          />

        </Form>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <video
            controls // Add the controls attribute to display video controls (play, pause, volume, etc.)
            // width="400"
            src={selectedVideoUrlDb}
            // style={{height:"auto"}}
            className="video-container"
          />
        </div>

        <br />

        <Button variant="primary" type="submit" onClick={handleSubmitDb}>
          Submit2
        </Button>

      </div>
    </div>
  );
};

export default RegisterVideo;
