import {useState, useEffect, useContext} from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import {useParams} from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';

import { UserContext } from '../App';
import moment from 'moment';


const EditUser = ({match}) => {
  const user = useContext(UserContext);
  // console.log("line:0", user);

  const [totalusers, settotalusers] = useState([]);
  // console.log("line:55", totalusers);

  const [user1, setuser1] = useState();
  // console.log('line:302', user1);
  // console.log('line:303', user1?.imgpath);
  // console.log('line:304', user1?.fname);
  // console.log('line:305', user1?.image);
  // console.log('line:306', user1?.date);


  const olddate = user1?.date;
  // console.log("line:307", olddate);

  const img1 = user1?.image;
  // console.log("line:308", img1);
  const img = user1?.imgpath;
  // console.log("line:309", img);
  const nme = user1?.fname;
  // console.log("line:310", nme);




  // ### Hooks
  const [data, setData] = useState ([]);
  // console.log ('line:1', data);
  // console.log ('line:2', data.image);
  // ###
  const [file, setFile] = useState ('');
  // console.log ('line:3', file);
  // ###
  const [postImage, setPostImage] = useState ({myFile: ''});
  // console.log ('line:4', postImage.myFile);
  console.log ('line:5', postImage);
  // ###  
  const [image, setImage] = useState (data.image);
  console.log ('line:6', image);
  // ###    

  
 
  const imagenew = postImage.myFile
  // console.log("line:6.1", imagenew);

  const setimgfile = async e => {
  
    setFile (e.target.files[0]);

    const test = e.target.files[0];
    const base64 = await convertToBase64 (test);
    setPostImage ({...postImage, myFile: base64});

    // ### - display image preview
    setImage (URL.createObjectURL (e.target.files[0]));
  };

  // ###
  const userid = useParams ();

  const id = userid.userid;
  
  const [fname, setFName] = useState ('');
  // console.log("line:200", fname);

  const name = fname || nme
  console.log("line:201", name);

  const imgnew = imagenew || img1;
  console.log("line:202", imgnew);


  
  const tree =  {id: id, name: name, image: imgnew, imgpath: img, date: olddate }
  console.log("203", tree);

  // ###
  const editUser = async (tree) => {

    var formData = new FormData ();
  // formData.append ('userid', userid);
  formData.append ('tree', tree);
  // console.log ('line:12', formData);

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
  // ###
  const setdata = (e) => {
    const {value} = e.target;
    setFName (value);
  };



  const setdata1 = (e) => {
    // const {value} = e.target;
    editUser (tree);
  };

  const setImageUrl = (e) => {
    // const {value} = e.target;
    setPostImage ("");
  };

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

  let today = new Date (); // get the date
    let day = ('0' + today.getDate ()).slice (-2); //get day with slice to have double digit day
    let month = ('0' + (today.getMonth () + 1)).slice (-2); //get your zero in front of single month digits so you have 2 digit months
    // let date = month + '-' + day + '-' + today.getFullYear ();
    let date = today.getFullYear () + '-' + month + '-' + day;
    console.log ('line:11', date);



    const time1 = moment (user1?.date).format ('L');
    // console.log("line:12", time1);
   
    const time2 = moment (user?.date).format ('L');
    // console.log("line:12", time2);


    const [imageUrl1, setImageUrl1] = useState();
    console.log("line:7", imageUrl1);
  

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
          <Form.Control 
          type="date" 
          name="date" 
          value={user1?.date} 
          // value= {moment (user1?.date).format ('L')}
         
          />
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

        <div style={{display:"flex"}}>
        <Form.Group>
          <img style={{height:"170px"}} 
          src={image || user1?.image}
          alt="test1" />
        <Button 
        onClick={setImageUrl} 
        style={{display:"block", margin:"auto"}} >Delete</Button>
        </Form.Group>

        <Form.Group>
          <img style={{height:"170px"}} 
          src={`/uploads/${user1?.imgpath}`}
          alt="test2" />
        <Button style={{display:"block", margin:"auto"}} >Delete</Button>
        </Form.Group>
          </div>

    

        <Button
          variant="primary"
          // type="submit"
          style={{marginTop: '100px'}}
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
