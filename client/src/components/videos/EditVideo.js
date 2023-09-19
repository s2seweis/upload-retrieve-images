import {useState, useEffect, useContext, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import {VideoContext} from '../../App';

import EditVideoChild from './EditVideoChild';

import '../../../src/App.css';

import VideoPlayer from './VideoPlayer';

const EditVideo = ({match}) => {
  console.log ('line:1', match);

  const [videoUrl, setVideoUrl] = useState ('');
  console.log ('line:1.1', videoUrl);

  const [video, setVideo] = useState ([]);
  console.log ('line:2', video);
  console.log ('line:3', video.data);

  // ######
  const base64Data = btoa (video.data);
  console.log ('line:4', base64Data);

  console.log ('line:5', video.imgpath);
  console.log ('line:6', video.data);

  const [videoData, setVideoData] = useState (null);
  console.log ('line:7', videoData);

  // const blob = new Blob ([video.data], {type: 'video/mp4'});
  // const videoUrl = URL.createObjectURL (blob);
  // console.log ('line:5', videoUrl);

  // ### useParams
  const userid = useParams ();
  const id = userid.userid;

  const videos = useContext (VideoContext);
  console.log ('line:5', videos);

  useEffect (
    () => {
      if (videos.length == 0) {
        console.log ('no videos found');
      } else {
        // setTotalUsers (videos);
        setVideo (videos.find (o => o._id == userid.userid));
        // console.log('line:500', user);
      }
    },
    [videos]
    // [videos]
  );

  // useEffect (() => {
  //   async function fetchVideoData () {
  //     try {
  //       // Convert the binary data to a Blob and create a video URL
  //       const blob = new Blob ([video.data], {type: 'video/mp4'});
  //       const videoUrl = URL.createObjectURL (blob);

  //       setVideoData (videoUrl);
  //     } catch (error) {
  //       console.error ('Error fetching video data:', error);
  //     }
  //   }

  //   fetchVideoData ();
  // }, []);

  // if (!videoData) {
  //   return <div>Loading...</div>;
  // }

  useEffect (
    () => {
      async function fetchVideoUrl () {
        try {
          const response = await axios.get (`/api/videos/${userid.userid}`, {
            responseType: 'arraybuffer', // Specify the response type as arraybuffer
          });

          // Convert the binary data to a Blob and create a video URL
          const blob = new Blob ([response.data], {type: 'video/mp4'});
          const url = URL.createObjectURL (blob);

          setVideoUrl (url);
        } catch (error) {
          console.error ('Error fetching video URL:', error);
        }
      }

      fetchVideoUrl ();
    },
    [userid.userid]
  );

  return (
    <div>

      <div style={{margin: '15px 0px 0px 15px', display: 'flex'}}>
        <a href="/video">Go Back</a>
      </div>

      {/* {!loading &&  */}
      <div className="container mt-3">
        <Form className="mt-3">

          <h3>Content</h3>
          <VideoPlayer videoUrl={`/videos/${video.imgpath}` || videoData} />

          {/* <EditVideoChild props={base64Data} /> */}

          <EditVideoChild props={videoUrl} />

        </Form>

        <video controls width="640" height="360">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>

    </div>
  );
};

export default EditVideo;
