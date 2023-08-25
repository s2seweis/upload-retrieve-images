import { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

import { useParams } from 'react-router-dom';







const EditUser = ({match}) => {

  const [data, setData] = useState([]);
  console.log("line:1", data);



  const userid  = useParams();
  console.log('line:300', userid);

  var formData = new FormData();
    formData.append("userid", userid);
    console.log("line:301", formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    


  const editUser = async (userid) => {

    const id = userid.userid;
    console.log("line999", id);

    console.log("line:302", userid.userid);
    
    const res = await axios.post("/edituser",userid,id, config);
    console.log("line:303", res);
    console.log("line:399", res.data);
    console.log("line:304", userid);

    if (res.data.status === 401 || !res.data) {
        console.log("errror")
    } else {
        setData(res.data)
    }

}


useEffect(() => {
  editUser(userid)
}, [])

  return (
    <>
      <div className="container mt-3">
        <h1>here into goes the data</h1>

        <img src={data.image} ></img>
        <h3> {data.fname}</h3>
        <h3> {data.date}</h3>
        <h3> {data._id}</h3>
   

        <Form className='mt-3'>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control data={data.fname} value={data.fname} type="text" name={data.fname}  placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file"  name='photo' placeholder="" />
            {/* <Form.Control type="file" onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} name='photo' placeholder="" /> */}

            {/* <Form.Control type="file" onChange={(e) => { setTest(e.target.files[0]) }} name='photo' placeholder="" /> */}
            <h3>Test for getting the state</h3>
          </Form.Group>


          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>

      </div>
    </>
  )
}

export default EditUser



