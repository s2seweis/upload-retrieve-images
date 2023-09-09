import {useState, useEffect, useContext, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import {UserContext} from '../App';
import moment from 'moment';

import '../../src/App.css';

// ### Test: Image Collection

import ImageCollection from './imageCollection';

import { v4 as uuidv4 } from 'uuid';

// import Popup1 from './Popup/Popup1';
// import Popup2 from './Popup/Popup2';

// Skeleton Component
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css'
// import SkeletonCard from "./skeleton/SkeletonCard";

const EditUser = ({match}) => {

  const ref = useRef ();
  // console.log("line:5000", ref);
  const handleClick = e => {
    // console.log("line:5001", e);
    ref.current.click ();
  };
  // Skeleton Coponent
  // const [loading, setLoading] = useState(false);

  // ### useContext
  const users = useContext (UserContext);

  // ### useParams
  const userid = useParams ();
  const id = userid.userid;

  // ### Hooks - call it to add some state to the functional component/ [currentState, functionToUpdate]

  // ### A dynamic parameter is a parameter to an SQL statement for which the value is not specified when the statement is created, initital state:[] no more need for question marks
  const [user, setUser] = useState ([]);
  // console.log ('line:1.1', user);
  // console.log ('line:1', user.image);
  // console.log ('line:1.4', user.image2);
  // console.log ('line:1.5', user.fname);

  const newUser = {
    _id: user._id,
    __v: user.__v,
    imgpath: user.imgpath,
    image: '',
    date: user.date,
    fname: user.fname,
  };
  // console.log ('line:1.2', newUser);

  const [testState1, setTestState1] = useState ();
  // console.log ('line1.9', testState1);

  const [file1, setFile1] = useState ('');
  const [file2, setFile2] = useState ('');
  // // ###
  // const [file3, setFile3] = useState ('');
  // const [file4, setFile4] = useState('');
  // console.log("line:1.1", file4);
  // console.log("line:1.2", file4.myFile);

  // const numbersOne = [1, 2, 3];
  // const numbersTwo = [ {id: uuidv4(), img: file4.myFile } ];
  // const combined = [...numbersTwo];
  // console.log("line:1.3", combined);

  // console.log("line:2", file3);
  // // ###

  const [postImage1, setPostImage1] = useState ({myFile: ''});
  // console.log ('line:2', postImage1.myFile);

  const [postImage2, setPostImage2] = useState ({myFile: ''});
  // console.log ('line:3', postImage2.myFile);
  // console.log ('line:3.1', postImage2);

  const [image1, setImage1] = useState ();
  // console.log ('line:4', image1);
  const [image2, setImage2] = useState ();
  // console.log ('line:5', image2);

  const [fname, setFName] = useState ('');

  // instead give the old date, give the date of the last change and give the date of the building
  const olddate = user.date;

  const img = user.imgpath;

  // ### block
  const nme = user.fname;
  const name = fname || nme;
  // ###

  // ### block
  const imagenew1 = postImage1.myFile;
  const imagenew2 = postImage2.myFile;
  const imagenew3 = postImage2.myFile;
  // the problem is here, i have no access to the state of user.image or can i overwrite it by a sprecific query
  // i could write it out the json objetct, add all proberties, and make the part of user.image dynamic
  const img1 = user.image;
  const imgnew = imagenew1 || img1;

  const img2 = user.image2;

  const imagePreview2 = imagenew2 || img2;

  // ### Data for update the MongoDB
  const tree = {
    id: id,
    name: name,
    image: imgnew,
    image2: imagePreview2,
    imgpath: img,
    date: olddate,
  };
  // console.log ('line:100', tree);
  // ###

  // ### - Initial State for the Image1
  const imagePreview1 = imagenew1 || img1;
  // console.log ('line:3999', imagePreview1);

  const testState2 = imagePreview1;
  // console.log ('3998', testState2);

  const [testState, setTestState] = useState ();
  // console.log ('line:4000', testState);

  // console.log ('line:101', image1);

  // ###

  // e = short var reference for event object which will be passed to event handlers

  // ### on change function for the 1 image
  const setimgfile1 = async e => {
    // console.log("line:200", e);

    setFile1 (e.target.files[0]);

    const test1 = e.target.files[0];
    const base64 = await convertToBase64 (test1);
    console.log ('line:3000', base64);
    setPostImage1 ({...postImage1, myFile: base64});

    // ### - display image preview
    setImage1 (URL.createObjectURL (e.target.files[0]));
  };

  // ### on change function for the 2 image
  const setimgfile2 = async e => {
    // console.log("line:200", e);

    setFile2 (e.target.files[0]);

    const test2 = e.target.files[0];
    const base64 = await convertToBase64 (test2);
    setPostImage2 ({...postImage1, myFile: base64});

    // ### - display image preview
    setImage2 (URL.createObjectURL (e.target.files[0]));
  };
  // ### Add File to the ImageCollection Array
  // const setimgfilecollection = async e => {
  //   // console.log("line:200", e);

  //   setFile3 (e.target.files[0]);

  //   const testNewFile = e.target.files[0];
  //   const base64NewFile = await convertToBase64 (testNewFile);
  //   console.log("line:4", base64NewFile);
  //   setFile4 ({myFile: base64NewFile});

  //   // ### - display image preview
  //   // setImage2 (URL.createObjectURL (e.target.files[0]));
  // };

  // ###
  const setData1 = e => {
    const {value} = e.target;
    setFName (value);
  };

  const setData2 = e => {
    // const {value} = e.target;
    editUser (tree);
  };

  const setData3 = e => {
    // const {value} = e.target;
    setTestState1 (user.image);
  };
  const setData4 = e => {
    // const {value} = e.target;
    setUser ({
      _id: user._id,
      __v: user.__v,
      imgpath: user.imgpath,
      image: '',
      date: user.date,
      fname: user.fname,
    });
    setPostImage1 ({myFile: ''});
  };

  const setData5 = e => {
    setUser ({
      _id: user._id,
      __v: user.__v,
      imgpath: user.imgpath,
      image: user.image,
      image2: '',
      date: user.date,
      fname: user.fname,
    });
    setPostImage2 ('');
  };

  const setData6 = e => {
    // const {value} = e.target;
    setUser ({
      _id: user._id,
      __v: user.__v,
      imgpath: '',
      image: user.image,
      image2: user.image2,
      date: user.date,
      fname: user.fname,
    });
    // setPostImage1({ myFile: '' });
  };

  // ### Function for the POST request
  const editUser = async tree => {
    var formData = new FormData ();
    formData.append ('tree', tree);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post ('/edituser', tree);
    // console.log ('line:15', res);

    if (res.data.status === 401 || !res.data) {
      console.log ('errror');
    } else {
      // history("/")
      // console.log ('line:400, !success!');
    }
  };

  // ### UseEffect Call - for set the totalUsers & user

  useEffect (
    () => {
      if (users.length == 0) {
        console.log ('no users found');
      } else {
        // setTotalUsers (users);
        setUser (users.find (o => o._id == userid.userid));
        // console.log('line:500', user);
      }
    },
    [users]
  );

  //  ### with Skeleton Component: Alternative!!!

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setData3();
  //     // setTestState1 (user.image)
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setTotalUsers(users);
  //     setUser(users.find(o => o._id == userid.userid));
  //     setLoading(false);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [users]);

  // ### - Test

  // document.getElementById ('buttonid').addEventListener ('click', openDialog);

  function openDialog () {
    document.getElementById ('fileid').click ();
  }

  return (
    <div>

      {/* #has currently a problem with the form  */}
      {/* {loading && <SkeletonCard/>} */}

      <div style={{margin: '15px 0px 0px 15px', display: 'flex'}}>
        <a href="/">Go Back</a>
      </div>

      {/* {!loading &&  */}
      <div className="container mt-3">
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              defaultValue={user.fname}
              onChange={setData1}
              type="text"
              name="fname"
              placeholder=""
            />
          </Form.Group>

          <FormGroup>
            <Form.Label>Date:</Form.Label>
            <Form.Control type="date" name="date" value={user.date} />
          </FormGroup>

          <FormGroup>
            <Form.Label>ID:</Form.Label>
            <Form.Control type="text" name="id" value={user._id} />
          </FormGroup>

          <div className="images-copy">

            <div
              style={{
                background: 'green',
                marginTop: '20px',
                height: '300px',
                width: '300px',
                borderRadius: '20px',
              }}
              className="element_1"
            >
              <Form.Label style={{margin: '0px 15px'}}>
                Image1
              </Form.Label>

              <Form.Control
                type="file"
                onChange={setimgfile1}
                name="photo"
                // value={user.image}
                defaultValue={imagePreview1}
                placeholder=""
              />

              {/* 1. Image Preview */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Form.Group style={{marginTop: '20px'}}>
                  <img
                    style={{height: '170px'}}
                    src={imagePreview1}
                    alt="image1"
                  />

                  <div>
                    <Button
                      onClick={setData4}
                      style={{display: 'block', margin: 'auto'}}
                    >
                      Delete1
                    </Button>
                    <Button
                      // onClick={setData4}
                      style={{display: 'block', margin: 'auto'}}
                    >
                      Add1
                    </Button>
                  </div>

                </Form.Group>
              </div>
            </div>

            {/* </Form.Group> */}

            {/* ### */}

            <div
              style={{
                background: 'yellow',
                height: '300px',
                marginTop: '20px',
                width: '300px',
                borderRadius: '20px',
              }}
              className="element_2"
            >

              <Form.Label style={{margin: '0px 15px'}}>
                Image2
              </Form.Label>

              <Form.Control
                type="file"
                onChange={setimgfile2}
                name="photo"
                // value={user.image}
                defaultValue={imagePreview2}
                placeholder=""
              />

              {/* 2. Image Preview */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Form.Group style={{marginTop: '20px'}}>
                  <img
                    style={{height: '170px'}}
                    // src={`/uploads/${user.imgpath}`}
                    src={imagePreview2}
                    alt="image2"
                  />
                  <Button
                    onClick={setData5}
                    style={{display: 'block', margin: 'auto'}}
                  >
                    Delete2
                  </Button>

                </Form.Group>
              </div>
            </div>

            {/* ### Image3 */}

            <div
              style={{
                background: 'red',
                height: '300px',
                marginTop: '20px',
                width: '300px',
                borderRadius: '20px',
              }}
              className="element_2"
            >

              <Form.Label style={{margin: '0px 15px'}}>
                Image3
              </Form.Label>

              {/* 2. Image Preview */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Form.Group style={{marginTop: '20px'}}>
                  <img
                    style={{height: '170px'}}
                    src={`/uploads/${user.imgpath}`}
                    alt="image2"
                  />
                  <Button
                    onClick={setData6}
                    style={{display: 'block', margin: 'auto'}}
                  >
                    Delete2
                  </Button>

                </Form.Group>
              </div>
            </div>

            {/* ### */}

          </div>

          {/* ### */}

          <Button
            variant="primary"
            // type="submit"
            style={{marginTop: '100px', marginBottom: '100px'}}
            onClick={setData2}
          >
            Submit1
          </Button>

          <br></br>

          {/* <button onClick={handleClick}> */}
          {/* <input
          style={{marginBottom:"50px"}} 
          // ref={ref}
          onChange={setimgfilecollection} 
          multiple
          type="file" 
          /> */}

          {/* <Form.Control
                type="file"
                onChange={setimgfile2}
                name="photo"
                // value={user.image}
                defaultValue={imagePreview2}
                placeholder=""
              /> */}
          {/* </button> */}

          <ImageCollection />

        </Form>

      </div>
      {/* } */}

    </div>
  );
};

export default EditUser;

function convertToBase64 (file1, file2) {
  return new Promise ((resolve, reject) => {
    const fileReader = new FileReader ();
    fileReader.readAsDataURL (file1, file2);
    fileReader.onload = () => {
      resolve (fileReader.result);
    };
    // console.log("line:2000", fileReader.result);
    fileReader.onerror = error => {
      reject (error);
    };
  });
}
