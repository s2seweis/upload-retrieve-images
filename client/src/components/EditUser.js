import {useState, useEffect, useContext} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import {useParams} from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';

import { UserContext } from '../App';

const EditUser = ({match}) => {
  const user = useContext(UserContext);
  console.log("line:0", user);

  const [totalusers, settotalusers] = useState([]);
  console.log("line:55", totalusers);

  const [user1, setuser1] = useState();
  console.log('line:302', user1);

  // ### Hooks
  const [data, setData] = useState ([]);
  console.log ('line:1', data);
  console.log ('line:2', data.image);
  // ###
  const [file, setFile] = useState ('');
  console.log ('line:3', file);
  // ###
  const [postImage, setPostImage] = useState ({myFile: ''});
  console.log ('line:4', postImage.myFile);
  console.log ('line:5', postImage);
  // ###  
  const [image, setImage] = useState (data.image);
  console.log ('line:6', image);
  // ###    
 
  const imagenew = postImage.myFile
  console.log("line:6.1", imagenew);

  const setimgfile = async e => {
    // console.log ('line:7', e);
    // console.log ('line:8', e.target.files[0]);
    setFile (e.target.files[0]);

    const test = e.target.files[0];
    // console.log ('line:9', test);
    const base64 = await convertToBase64 (test);
    // console.log ('line:10', base64);
    setPostImage ({...postImage, myFile: base64});

    // ### - display image preview
    setImage (URL.createObjectURL (e.target.files[0]));
  };

  // ###
  const userid = useParams ();
  // console.log ('line:11', userid);
  // console.log ('line:12', userid.userid);
  // ###
  const id = userid.userid;
  
  const [fname, setFName] = useState ('');
  console.log("line:200", fname);
  
  const tree =  {id: id, name: fname, image: imagenew}
  console.log("201", tree);

  // ###
  const editUser = async (tree) => {

    var formData = new FormData ();
  // formData.append ('userid', userid);
  formData.append ('tree', tree);
  console.log ('line:12', formData);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
    // const id = userid.userid;
    // console.log ('line:13', id);

    // console.log ('line:14', userid.userid);

    const res = await axios.post ('/edituser', tree);
    console.log ('line:15', res);
    // console.log ('line:16', res.data);
    // console.log ('line:17', userid);

    if (res.data.status === 401 || !res.data) {
      console.log ('errror');
    } else {
      // history("/")
      console.log ('line:400, !success!');
    }
  };
  // ###
  const setdata = (e) => {
    const {value} = e.target;
    setFName (value);
  };



  const setdata1 = (e) => {
    // const {value} = e.target;
    editUser (tree);
  };

  



  // ###
  // const editUserSubmit = async (e, userid) => {
  //   console.log("line444", e);
  //   e.preventDefault ();

  //   var formData = new FormData ();
  //   // formData.append ('photo', file);
  //   formData.append ('fname', fname);
  //   formData.append ('image', imagenew);
  //   console.log("5555", formData);

  //   const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };

  //   console.log("line:14", userid);
  //   const res = await axios.post ('/edituser-submit', formData, config);
  //   console.log("line:1000", res);
  //   console.log ('line:33', formData);
  //   console.log ('line:44', config);

  //   if (res.data.status === 401 || !res.data) {
  //     console.log ('errror');
  //   } else {
  //     // history("/")
  //     console.log ('line:400, !success!');
  //   }
  // };
  // ###

 


  // ###
  // useEffect (() => {
  //   editUser (tree);
  // }, []);
  // ###

  useEffect(
    () => {
      if (user.length == 0) {
        // dispatch(getAllUsers());
      } else {
        settotalusers(user);
        setuser1(user.find(o => o._id == userid.userid));
        console.log('line:303', user1);
      }
    },
    [user]
  );

  

  return (
    <div className="container mt-3">

   

      <Form value={data} className="mt-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            defaultValue={user1?.fname}
            onChange={setdata}
            type="text"
            name="fname"
            placeholder=""
          />
        </Form.Group>

        <FormGroup>
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" name="date" value={user1?.date} />
        </FormGroup>

        <FormGroup>
          <Form.Label>ID:</Form.Label>
          <Form.Control type="text" name="id" value={user1?._id} />
        </FormGroup>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Image
          </Form.Label>
          <Form.Control
            type="file"
            onChange={setimgfile}
            name="photo"
            // value={user1.image}
            defaultValue={user1?.image}
            placeholder=""
          />
        </Form.Group>

        <Form.Group>
          <img 
          src={image || user1?.image}
           alt="test" />
        </Form.Group>

        {/* <Button
          variant="primary"
          // type="submit"
          style={{marginTop: '20px'}}
          // onClick={editUser(tree)}
        >
          Submit
        </Button> */}

        <Button
          variant="primary"
          // type="submit"
          style={{marginTop: '20px'}}
          onClick={setdata1}
        >
          Submit1
        </Button>

      </Form>

    </div>
  );
};

export default EditUser;

function convertToBase64 (file) {
  return new Promise ((resolve, reject) => {
    const fileReader = new FileReader ();
    fileReader.readAsDataURL (file);
    fileReader.onload = () => {
      resolve (fileReader.result);
    };
    fileReader.onerror = error => {
      reject (error);
    };
  });
}
