import {useState, useEffect, useContext, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import {VideoContext} from '../../App';

import '../../../src/App.css';

// import VideoPlayer from './VideoPlayer';

const EditVideoChild = props => {
  console.log ('line:1', props.props);

  const [state1, setState1] = useState(props.props)
  console.log("line:2", state1);

//   if(!state1) {
//     return <di>Loading...</di>
//   }

  return (
    <div>

<video controls width="640" height="360">
        <source src={props.props} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    </div>
  );
};

export default EditVideoChild;
