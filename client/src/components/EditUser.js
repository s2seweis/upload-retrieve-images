import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

import { useParams } from 'react-router-dom';





const EditUser = ({match}) => {

  const [data, setData] = useState([]);
  console.log("line:1", data);



  let { userid } = useParams();
  console.log('line:300', userid);

  var formData = new FormData();
    formData.append("photo", userid);
    


  const getUserData = async () => {
    const res = await axios.post("/edituser", formData, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (res.data.status === 401 || !res.data) {
        console.log("errror")
    } else {
        setData(res.data.getUser)
    }

}


useEffect(() => {
  getUserData()
}, [])

  return (
    <>
      <div className="container mt-3">
        <h1>here into goes the data</h1>

        {/* <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" name='fname' onChange={setdata} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
      
            <h3>Test for getting the state</h3>
          </Form.Group>


          <Button variant="primary" type="submit" onClick={addUserData}>
            Submit
          </Button>
        </Form> */}
      
        {/* <img src={postImage.myFile} alt="test" /> */}

      </div>
    </>
  )
}

export default EditUser



