import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import image100 from '../assets/3.png'

const Playground = () => {
  const [fname, setFName] = useState('');
  console.log("line:1", fname);

  const [file, setFile] = useState('');
  console.log('line:2', file);

  const [image, setImage] = useState('');
  console.log('line:3', image);

  const [postImage, setPostImage] = useState({ myFile: '' });
  console.log('line:4', postImage.myFile);
  console.log('line:5', postImage);

  const imagenew = postImage.myFile;
  console.log('line:6', imagenew);

  // const [test, setTest] = useState("");
  // console.log("line:3", test);

  const history = useNavigate();

  const setdata = e => {
    const { value } = e.target;
    setFName(value);
  };

  const setimgfile = async e => {
    console.log('line:7', e);
    console.log('line:8', e.target.files[0]);
    setFile(e.target.files[0]);

    const test = e.target.files[0];
    console.log('line:9', test);
    const base64 = await convertToBase64(test);
    console.log('line:10', base64);
    setPostImage({ ...postImage, myFile: base64 });

    // ### - display image preview
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // adduser data

  const test = "john"
  console.log("line:10.1", test);

  const addUserData = async e => {
    console.log("line:11", e);
    e.preventDefault();

    var formData = new FormData();
    formData.append('photo', file);
    formData.append('fname', fname);
    formData.append('image', imagenew);
    formData.append('add', test);

    console.log("line:11.1", file);
    console.log("line:11.2", formData);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/playground', formData, config);

    console.log("line:12", res);
    console.log('line:13', formData);
    console.log('line:14', config);

    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      // history("/")
      console.log('line:15, !success!');
    }
  };

  // ###

  // useEffect(() => {
  //   setImage(URL.createObjectURL(file))
  // }, [file]); // <- add the count variable here

  return (

    <div>

      <div style={{ margin: '15px 0px 0px 15px', display: 'flex' }}>
        <a href="/">Go Back</a>
      </div>


      <div className="container mt-3">
      <h1>Playground</h1>
        {/* <h1>Upload Your Img Here</h1> */}

        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              onChange={setdata}
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control
              type="file"
              onChange={setimgfile}
              name="photo"
              placeholder=""
            />
            {/* <Form.Control type="file" onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} name='photo' placeholder="" /> */}

            {/* <Form.Control type="file" onChange={(e) => { setTest(e.target.files[0]) }} name='photo' placeholder="" /> */}
            <h3>Test for getting the state</h3>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form>
        {/* <button style={{marginTop:"20px"}} onClick={(e) => setImage(URL.createObjectURL(test))}>Image?</button> */}

        {/* \        <img src={image100}></img> */}
        <img style={{width:"300px", marginTop:"50px"}} src={postImage.myFile} alt="test" />

      </div>
    </div>

  );
};

export default Playground;

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
