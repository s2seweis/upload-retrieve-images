import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import './EditVideo.css';
import { VideoContext } from '../../../AppRouter';
import { Calendar2Plus } from 'react-bootstrap-icons';
// not in use at the moment but makes sense
// import VideoPlayer from '../../../components/VideoPlayer/VideoPlayer';

const EditVideo = () => {

  const [videoData, setVideoData] = useState(null);
  const [data, setData] = useState();
  const userid = useParams();
  const id = userid.userid;
  const [video, setVideo] = useState();
  const videos = useContext(VideoContext);

  // ####################################################################### Video:1 | Stores on the Server, in the folder videos
  const [selectedVideo, setSelectedVideo] = useState(null);
  console.log('line:5', selectedVideo);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  console.log('line:6', selectedVideoUrl);

  const handleVideoChange = e => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideo(file);
    setSelectedVideoUrl(URL.createObjectURL(file));
  };

  useEffect(
    () => {
      if (videos.length == 0) {
        console.log('no videos found');
      } else {
        setVideo(videos.find(o => o._id == id));
      }
    },
    [videos]
  );

  const [selectedVideoDb, setSelectedVideoDb] = useState(null);
  console.log('line:3', selectedVideoDb);
  const [selectedVideoUrlDb, setSelectedVideoUrlDb] = useState(null);
  console.log('line:4', selectedVideoUrlDb);


  const handleVideoChangeDb = e => {
    const file = e.target.files[0]; // Get the first selected file
    setSelectedVideoDb(file);
    setSelectedVideoUrlDb(URL.createObjectURL(file));
  };

  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const getVideoUrl = async () => {
      try {
        const response = await axios.get("/video-stream", {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: 'blob', // Set responseType to 'blob' for binary data
        });

        if (response.status === 200) {
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'video/mp4' });

          // Generate a URL for the Blob
          const url = URL.createObjectURL(blob);
          setVideoUrl(url);
        } else {
          console.error('Error fetching video');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getVideoUrl();
  }, []);

  return (
    <div>
      <div style={{ margin: "15px" }} className="nav-link">
        <Link to="/videos">
          <Button variant="primary">Go Back</Button>
        </Link>
      </div>
      {/* ### Video:1 */}
      <div style={{}} className="container-addvideo">
        <h3>Edit & Store it on the Server</h3>
        <Form className="mt-3">
          <label style={{ marginBottom: '10px' }} htmlFor="videoInput">
            Select a video file:1
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
          <video src={`/Videos/${video?.imgpath}` || videoData} id="videoPlayer" controls muted="muted" autoplay>
          </video>
        </div>
        <br />
      </div>
      {/* ### Video:2 */}
      <div style={{}} className="container-addvideo">
        <h3>Edit & Store it in the database.</h3>
        <Form className="mt-3">
          <label style={{ marginBottom: '10px' }} htmlFor="videoInput">
            Select a video file:2
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
          <video id="videoPlayer" controls muted="muted" autoplay>
            <source src="/video-stream" type="video/mp4" />
          </video>
        </div>
        <br />
      </div>
    </div>
  );
};

export default EditVideo;
