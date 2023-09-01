import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { UserContext } from '../App';
import moment from 'moment';

import Popup1 from './Popup/Popup1';
import Popup2 from './Popup/Popup2';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import SkeletonCard from "./skeleton/SkeletonCard";



const EditUser = ({ match }) => {

  const [loading, setLoading] = useState(false);



  // ### useContext
  const users = useContext(UserContext);

  // ### useParams
  const userid = useParams();
  const id = userid.userid;


  // ### Hooks - call it to add some state to the functional component/ [currentState, functionToUpdate]
  const [totalUsers, setTotalUsers] = useState([]);
  console.log("line:0", totalUsers);
  const [user, setUser] = useState();
  console.log("line:1.1", user);
  console.log("line:1", user?.image);
  const [file, setFile] = useState('');
  const [postImage, setPostImage] = useState({ myFile: '' });
  console.log("line:2", postImage.myFile);
  const [image, setImage] = useState();
  console.log("line:3", image);
  const [fname, setFName] = useState('');


  const olddate = user?.date;
  const img1 = user?.image;
  const img = user?.imgpath;
  const nme = user?.fname;
  const imagenew = postImage.myFile
  const name = fname || nme
  const imgnew = imagenew || img1;
  // ### Data for update the MongoDB 
  const tree = { id: id, name: name, image: imgnew, imgpath: img, date: olddate }
  console.log("line:100", tree);


  // ### - Initial State for the Image1

  const image1 = imagenew || img1 ;
  console.log("line:101", image1);




  // ### Function calls

  // e = short var reference for event object which will be passed to event handlers

  const setimgfile = async e => {
    // console.log("line:200", e);

    setFile(e.target.files[0]);

    const test = e.target.files[0];
    const base64 = await convertToBase64(test);
    setPostImage({ ...postImage, myFile: base64 });

    // ### - display image preview
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // ###
  const setData1 = (e) => {
    const { value } = e.target;
    setFName(value);
  };

  const setData2 = (e) => {
    // const {value} = e.target;
    editUser(tree);
  };

  const setData3 = (e) => {
    // const {value} = e.target;
    setImage("");
  };


  // ### Function for the POST request
  const editUser = async (tree) => {
    // console.log("line:200", tree);

    var formData = new FormData();
    // formData.append ('userid', userid);
    formData.append('tree', tree);
    // console.log ('line:12', formData);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };


    const res = await axios.post('/edituser', tree);
    console.log('line:15', res);


    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      // history("/")
      console.log('line:400, !success!');
    }
  };

  // ### UseEffect Call - for set the totalUsers & user

  // useEffect(
  //   () => {
  //     if (users.length == 0) {
  //       console.log("no users found");
  //     } else {
  //       setTotalUsers(users);
  //       setUser(users.find(o => o._id == userid.userid));
  //       // console.log('line:500', user);
  //     }
  //   },
  //   [users]
  // );


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTotalUsers(users);
      setUser(users.find(o => o._id == userid.userid));
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [users]);

  


  // ### - Test

  const [isOpen, setIsOpen] = useState(false);


  // function toggle() {
  //     setIsOpen(true);
  // }


  const setData4 = (e) => {
    // const {value} = e.target;
    setIsOpen(false);

  };
  const setData5 = (e) => {
    // const {value} = e.target;
    setIsOpen(true);
  };

  const setData6 = (e) => {
    // const {value} = e.target;
    setIsOpen(true);
  };



  return (


    <div>


      {/* #has currently a problem with the form  */}
      {loading && <SkeletonCard/>}


     
      <div style={{ margin: '15px 0px 0px 15px', display: 'flex' }}>
        <a href="/">Go Back</a>
      </div>



      



      {/* {!loading &&  */}
      <div className="container mt-3">
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              defaultValue={user?.fname}
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
              value={user?.date}
            // value= {moment (user?.date).format ('L')}

            />
          </FormGroup>

          <FormGroup>
            <Form.Label>ID:</Form.Label>
            <Form.Control type="text" name="id" value={user?._id} />
          </FormGroup>

          <Form.Group className="mb-3" controlId="formBasicPassword">


            <Form.Label>
              Image1
            </Form.Label>
            <Form.Control
              type="file"
              onChange={setimgfile}
              name="photo"
              // value={user.image}
              defaultValue={image1}
              placeholder=""
            />
          </Form.Group>

          <div style={{ display: "flex" }}>

            {/* ## - Need to add Skeleton elements until state is rendered */}
            {/* 1. Image */}
            <Form.Group>
              <img style={{ height: "170px" }}
                src={image1}
              // alt="test1" 
              />
              <Button
                onClick={setData3}
                style={{ display: "block", margin: "auto" }} >Delete</Button>
              <Button
                // onClick={setData3} 
                style={{ display: "block", margin: "auto" }} >Add</Button>
            </Form.Group>
            
            {/* 2. Image */}
            <Form.Group>
              <img style={{ height: "170px" }}
                src={`/uploads/${user?.imgpath}`}
              // alt="test2" 
              />
              <Button
                // onClick={}
                style={{ display: "block", margin: "auto" }} >Delete</Button>
            </Form.Group>



          </div>



          <Button
            variant="primary"
            // type="submit"
            style={{ marginTop: '100px' }}
            onClick={setData2}
          >
            Submit1
          </Button>

        </Form>


        <h1>Playground</h1>

        <div className="Playground">

          {/* {isOpen && <Popup1 />} */}


          {isOpen ? <div><h1>test</h1><button onClick={setData4}>Add Image</button></div> : <button onClick={setData5}>Delete</button>}




        </div>

      

      </div>
      {/* } */}


      

    </div>



  );
};

export default EditUser;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = error => {
      reject(error);
    };
  });
}
