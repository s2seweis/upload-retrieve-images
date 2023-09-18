import {useState, useEffect, useContext, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import {VideoContext} from '../../App';

import '../../../src/App.css';

import VideoPlayer from './VideoPlayer';




const EditVideo = ({match}) => {
  console.log ('line:1', match);

  const [video, setVideo] = useState([]);
  console.log("line:2", video);
  console.log("line:3", video.imgpath);



  // ### useParams
  const userid = useParams ();
  const id = userid.userid;

  const videos = useContext (VideoContext);
  console.log("line:4", videos);

  useEffect (
    () => {
      if (videos.length == 0) {
        console.log ('no videos found');
      } else {
        // setTotalUsers (videos);
        setVideo(videos.find (o => o._id == userid.userid));
        // console.log('line:500', user);
      }
    },
    [videos]
    // [videos]
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
          <VideoPlayer videoUrl={`/videos/${video.imgpath}`}></VideoPlayer>

        </Form>

        {/* ###################################################################### */}

      </div>

    </div>
  );
};

export default EditVideo;


