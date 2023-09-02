import {useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import {UserContext} from '../App';
import moment from 'moment';

// import Popup1 from './Popup/Popup1';
// import Popup2 from './Popup/Popup2';

// Skeleton Component
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css'
// import SkeletonCard from "./skeleton/SkeletonCard";

const EditUser = ({match}) => {
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
  console.log ('line:1.1', user);
  console.log ('line:1', user.image);

  const [testState1, setTestState1] = useState ();
  console.log ('line1.9', testState1);

  const [file1, setFile1] = useState ('');
  const [file2, setFile2] = useState ('');

  const [postImage1, setPostImage1] = useState ({myFile: ''});
  console.log ('line:2', postImage1.myFile);

  const [postImage2, setPostImage2] = useState ({myFile: ''});
  console.log ('line:3', postImage2.myFile);

  const [image1, setImage1] = useState ();
  console.log ('line:4', image1);
  const [image2, setImage2] = useState ();
  console.log ('line:5', image2);

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
  // the problem is here, i have no access to the state of user.image or can i overwrite it by a sprecific query
  // i could write it out the json objetct, add all proberties, and make the part of user.image dynamic
  const img1 = user.image;
  const imgnew = imagenew1 || img1;

  // ### Data for update the MongoDB
  const tree = {id: id, name: name, image: imgnew, imgpath: img, date: olddate};
  console.log ('line:100', tree);
  // ###

  // ### - Initial State for the Image1
  const imagePreview1 = imagenew1 || img1;
  console.log ('line:3999', imagePreview1);

  const testState2 = imagePreview1;
  console.log ('3998', testState2);

  const [testState, setTestState] = useState ();
  console.log ('line:4000', testState);

  console.log ('line:101', image1);

  const imagePreview2 = imagenew2;
  console.log ('line:101', image1);
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
    setTestState1 ("");
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
    console.log ('line:15', res);

    if (res.data.status === 401 || !res.data) {
      console.log ('errror');
    } else {
      // history("/")
      console.log ('line:400, !success!');
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
  //   setLoading(true);
  //   const timer = setTimeout(() => {
  //     setTotalUsers(users);
  //     setUser(users.find(o => o._id == userid.userid));
  //     setLoading(false);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [users]);

  // ### - Test

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
            <Form.Control
              type="date"
              name="date"
              value={user.date}
              // value= {moment (user.date).format ('L')}
            />
          </FormGroup>

          <FormGroup>
            <Form.Label>ID:</Form.Label>
            <Form.Control type="text" name="id" value={user._id} />
          </FormGroup>

          <div className="images-copy">

            <Form.Group className="mb-3" controlId="formBasicPassword">

              <Form.Label>
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
              <Form.Group style={{marginTop: '40px'}}>
                <img
                  style={{height: '170px'}}
                  src={imagePreview1}
                  alt="image1"
                />

                <Button
                  // onClick={setData3}
                  style={{display: 'block', margin: 'auto'}}
                >
                  Delete
                </Button>

              </Form.Group>

              <Form.Label>
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
              <Form.Group style={{marginTop: '40px'}}>
                <img
                  style={{height: '170px'}}
                  // src={`/uploads/${user.imgpath}`}
                  src={imagePreview2}
                  alt="image2"
                />
                <Button
                  // onClick={}
                  style={{display: 'block', margin: 'auto'}}
                >
                  Delete
                </Button>

              </Form.Group>

            </Form.Group>

          </div>

          <Form.Group style={{marginTop: '500px'}}>
            <img
              style={{height: '170px'}}
              src={`/uploads/${user.imgpath}`}
              // src={imagePreview2}
              // alt="test2"
            />
            <Button
              // onClick={}
              style={{display: 'block', margin: 'auto'}}
            >
              Delete
            </Button>

          </Form.Group>

          <div style={{display: 'flex'}}>

            {/* ## - Need to add Skeleton elements until state is rendered */}

            {/* 2. Image */}

          </div>

          <Button
            variant="primary"
            // type="submit"
            style={{marginTop: '100px'}}
            onClick={setData2}
          >
            Submit1
          </Button>

          <div style={{marginTop: '100px'}}>

            <Button
              variant="primary"
              // type="submit"
              style={{marginTop: '100px'}}
              onClick={setData3}
            >
              Test State 1
            </Button>
            <Button
              variant="primary"
              // type="submit"
              style={{marginTop: '100px'}}
              onClick={setData4}
            >
              Delete Test State 1
            </Button>

            <img
              style={{height: '170px'}}
              // src={`/uploads/${user.imgpath}`}
              src={testState1}
              alt="Test State 1"
            />

          </div>

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
