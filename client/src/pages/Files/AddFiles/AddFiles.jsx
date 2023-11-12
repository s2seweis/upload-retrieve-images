import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import placeholder from '../../../assets/images/Placeholder.png';
import styles from './AddFiles.module.css'; // Import the CSS module

const AddFiles = () => {
  const [fname, setFName] = useState('');
  const [file, setFile] = useState('');
  // const [image, setImage] = useState('');
  const [postImage, setPostImage] = useState({ myFile: '' });
  const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  };

  const setimgfile = async (e) => {
    setFile(e.target.files[0]);

    const base64 = await convertToBase64(e.target.files[0]);
    setPostImage({ ...postImage, myFile: base64 });
    // setImage(URL.createObjectURL(e.target.files[0]));
  };

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append('photo', file);
    formData.append('fname', fname);
    formData.append('image', postImage.myFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await axios.post('/addfiles', formData, config);

    if (res.data.status === 401 || !res.data) {
      console.log('error');
    } else {
      history('/files');
    }
  };

  return (
    <div>
      <div className={styles['register-button-container']}>
        <Link to="/files">
          <Button variant="primary">Go Back</Button>
        </Link>
      </div>
      <div className={styles['register-container']}>

        <div className="container mt-3">
          <Form className="mt-3">
            <Form.Group
              className={styles['register-form-group']}
              controlId="formBasicEmail"
            >
              <Form.Label>File Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                onChange={setdata}
                placeholder=""
              />
            </Form.Group>

            <Form.Group
              className={styles['register-form-group']}
              controlId="formBasicPassword"
            >
              <Form.Label>Select Your Image</Form.Label>
              <Form.Control
                type="file"
                onChange={setimgfile}
                name="photo"
                placeholder=""
              />
              <hr />
            </Form.Group>

            <Button variant="success" type="submit" onClick={addUserData}>
              Submit
            </Button>
          </Form>

          <div className={styles['register-align-image']}>
            <img
              className={styles['register-image-preview']}
              src={postImage.myFile || placeholder}
              alt="test"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFiles;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
