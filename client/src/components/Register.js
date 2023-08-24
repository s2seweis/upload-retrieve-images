import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";



// import image100 from '../assets/3.png'


const Register = () => {

  const [fname, setFName] = useState("");

  const [file, setFile] = useState("");
  console.log("line:1", file);

  const [image, setImage] = useState("");
  console.log("line:2", image);

  const [postImage, setPostImage] = useState( { myFile : ""})
  console.log("line:2.1", postImage.myFile);
  console.log("line:2.2", postImage);

  const imagenew = postImage.myFile;
  console.log("line:2.3", imagenew);

  // const [test, setTest] = useState("");
  // console.log("line:3", test);


  const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  }

  const setimgfile = async (e) => {

    console.log("line:100", e);
    console.log("line:101", e.target.files[0]);
    setFile(e.target.files[0])

    const test = e.target.files[0];
    console.log("line:4", test);
    const base64 = await convertToBase64(test);
    console.log("line:5",base64);
    setPostImage({ ...postImage, myFile : base64 })

    // ### - display image preview
    setImage(URL.createObjectURL(e.target.files[0]))



  }




  



  // adduser data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);
    formData.append("image", imagenew);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    const res = await axios.post("/register", formData, config);

    console.log("line:3", formData);
    console.log("line:4", config);



    if (res.data.status === 401 || !res.data) {
      console.log("errror")
    } else {
      // history("/")
      console.log("line:400, !success!");
    }
  }

  




  // ###

  // useEffect(() => {
  //   setImage(URL.createObjectURL(file))
  // }, [file]); // <- add the count variable here

  return (
    <>
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>

        <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" name='fname' onChange={setdata} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
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
        <img src={postImage.myFile} alt="test" />

      </div>
    </>
  )
}

export default Register



function convertToBase64(file){
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}