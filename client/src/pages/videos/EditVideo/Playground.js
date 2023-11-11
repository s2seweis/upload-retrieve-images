import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import './EditVideo.css';
import { VideoContext } from '../../../AppRouter';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';

const EditVideo = () => {


const userid = useParams();
const id = userid.userid;

  const [video, setVideo] = useState();
  console.log("500", video);
  const videos = useContext(VideoContext);
  console.log('line:5', videos);

  useEffect(
    () => {
      if (videos.length == 0) {
        console.log('no videos found');
      } else {
        // setTotalUsers (videos);
        setVideo(videos.find(o => o._id == id));
        // console.log('line:500', user);
      }
    },
    [videos]
  );

  // ####################################################################### Video:1 | On the Server, in the folder videos
  const [selectedVideo, setSelectedVideo] = useState(null);
  console.log('line:1', selectedVideo);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  console.log('line:2', selectedVideoUrl);

  const handleVideoChange = e => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideo(file);
    setSelectedVideoUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
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
  // ####################################################################### Video:2 | In the Database with Grid FS

  const [selectedVideoDb, setSelectedVideoDb] = useState(null);
  console.log('line:3', selectedVideoDb);
  const [selectedVideoUrlDb, setSelectedVideoUrlDb] = useState(null);
  console.log('line:4', selectedVideoUrlDb);


  const handleVideoChangeDb = e => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideoDb(file);
    setSelectedVideoUrlDb(URL.createObjectURL(file));
  };

  const handleSubmitDb = async e => {
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
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    } else {
      alert('Please select a video file.');
    }
  };

  // ####################################################################### Video:2 | In the Database with Grid FS

  return (
    <div>

      <div style={{ margin: "15px" }} className="nav-link">
        <Link to="/videos">
          <Button variant="primary">Go Back</Button>
        </Link>
      </div>

      <div style={{}} className="container-addvideo">
        <h3>Edit & Store it on the Server</h3>

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
            style={{ marginBottom: "10px" }}
          />

        </Form>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <video
            controls // Add the controls attribute to display video controls (play, pause, volume, etc.)
            src={selectedVideoUrl}
            className="video-container"
          /> */}
          <VideoPlayer videoUrl={`/videos/${video.imgpath}` || videoData} />
        </div>

        <br />

        <Button variant="success" type="submit" onClick={handleSubmit}>
          Submit1
        </Button>

      </div>

      {/* ############################################################################################### */}

      <div style={{}} className="container-addvideo">
        <h3>Edit & Store it in the database.</h3>

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
            style={{ marginBottom: "10px" }}
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

export default EditVideo;
