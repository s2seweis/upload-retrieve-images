import { useState, useEffect, useContext, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { UserContext } from '../App';
import moment from 'moment';



import '../../src/App.css';
// import ImageCollection from '../components/imageCollection';
import useFileHandler from '../components/hooks/useFileHandler';
import ImageLoader from '../components/ImageLoader';

import { v4 as uuidv4 } from 'uuid';

const EditUserNew = ({ product, isLoading }) => {
  console.log("line:1", product);

  // ### A dynamic parameter is a parameter to an SQL statement for which the value is not specified when the statement is created, initital state:[] no more need for question marks
  const [user, setUser] = useState(product);
  console.log('line:2', user);
  console.log('line:3', user.imageCollection);


  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage,
    setImageFile,
  } = useFileHandler({ imageCollection: user?.imageCollection || [] });

  // ###
  const [fname, setFName] = useState('');
  console.log("line:4", fname);

  const name = fname || user.fname;

  const setData1 = e => {
    const { value } = e.target;
    setFName(value);
  };
  // ###

  const tree = {
    id: user._id,
    name: name,
    // name: user.fname,
    image: user.image,
    image2: user.image2,
    imgpath: user.imgpath,
    date: user.date,
    imageCollection: imageFile?.imageCollection,
    // imageCollection: imageFile
  };

  console.log("line:5", tree);


  const editUser = async tree => {
    console.log('line:6', tree);

    var formData = new FormData();
    formData.append('tree', tree);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/edituser', tree);
    // console.log ('line:15', res);

    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      // history("/")
      console.log('line:7, !success!', res);
    }
  };

  const setData2 = e => {
    // const {value} = e.target;
    editUser(tree);
  };


  const img = user.imgpath;
  console.log("line:8", img);

  const [postImage1, setPostImage1] = useState ({myFile: ''});
  console.log("line:9", postImage1);


  const setData4 = e => {
    // const {value} = e.target;
    setUser({
      _id: user._id,
      __v: user.__v,
      imgpath: user.imgpath,
      image: '',
      image2: user.image2,
      date: user.date,
      fname: user.fname,
    });
    // setPostImage1({ myFile: '' });
    setImage1("");
  };

  const [file1, setFile1] = useState ('');
  console.log("line:10", file1);
  const [image1, setImage1] = useState ();
  console.log("line:11", image1);



  const setimgfile1 = async e => {
    // console.log("line:200", e);

    setFile1 (e.target.files[0]);

    const test1 = e.target.files[0];
    const base64 = await convertToBase64 (test1);
    console.log ('line:12', base64);
    setPostImage1 ({...postImage1, myFile: base64});

    // ### - display image preview
    setImage1 (URL.createObjectURL (e.target.files[0]));
    
    
    setUser({
      _id: user._id,
      __v: user.__v,
      imgpath: user.imgpath,
      image: base64,
      image2: user.image2,
      date: user.date,
      fname: user.fname,
    });


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

  const [file, setFile] = useState('');
  console.log('line:12', file);

  const [postImage, setPostImage] = useState({ myFile: '' });
  console.log('line:13', postImage.myFile);
  console.log('line:14', postImage);

  const [image, setImage] = useState('');
  console.log('line:15', image);

  const setimgfile = async e => {
    console.log('line:16', e);
    console.log('line:17', e.target.files[0]);
    setFile(e.target.files[0]);

    const test = e.target.files[0];
    console.log('line:18', test);
    const base64 = await convertToBase64(test);
    console.log('line:19', base64);
    setPostImage({ ...postImage, myFile: base64 });

    // ### - display image preview
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const setData5 = e => {
    // const {value} = e.target;
    setUser({
      _id: user._id,
      __v: user.__v,
      imgpath: "",
      image: user.image,
      image2: user.image2,
      date: user.date,
      fname: user.fname,
    });
    // setPostImage1({ myFile: '' });
    setImage1("");
  };


  return (
    <div>

      {/* #has currently a problem with the form  */}
      {/* {loading && <SkeletonCard/>} */}

      <div style={{ margin: '15px 0px 0px 15px', display: 'flex' }}>
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
              <Form.Label style={{ margin: '0px 15px' }}>
                Image1
              </Form.Label>

              <Form.Control
                type="file"
                onChange={setimgfile1}
                name="photo"
                // value={user.image}
                // defaultValue={imagePreview1}
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
                <Form.Group style={{ marginTop: '20px' }}>
                  <img
                    style={{ height: '170px' }}
                    src={image1 || user.image }
                    alt="image1"
                  />

                  <div>
                    <Button
                      onClick={setData4}
                      style={{ display: 'block', margin: 'auto' }}
                    >
                      Delete1
                    </Button>

                  </div>

                </Form.Group>
              </div>
            </div>

            {/* </Form.Group> */}

            {/* ### */}

           

            {/* ############################################### */}



            <div
              style={{
                background: 'yellow',
                marginTop: '20px',
                height: '300px',
                width: '300px',
                borderRadius: '20px',
              }}
              className="element_1"
            >
              <Form.Label style={{ margin: '0px 15px' }}>
                Image2
              </Form.Label>

              <Form.Control
                type="file"
                onChange={setimgfile}
                name="photo"
                // value={user.image}
                // defaultValue={imagePreview1}
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
                <Form.Group style={{ marginTop: '20px' }}>
                  <img
                    style={{ height: '170px' }}
                    // src={`/uploads/${user.imgpath}`}
                    src={postImage.myFile || `/uploads/${user.imgpath}` }

                    alt="image1"
                  />

                  <div>
                    <Button
                      onClick={setData5}
                      style={{ display: 'block', margin: 'auto' }}
                    >
                      Delete2
                    </Button>

                  </div>

                </Form.Group>
              </div>
            </div>

            {/* ################################################# */}

            

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

              <Form.Label style={{ margin: '0px 15px' }}>
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
                <Form.Group style={{ marginTop: '20px' }}>
                  <img
                    style={{ height: '170px' }}
                    src={`/uploads/${user.imgpath}`}
                    alt="image2"
                  />
                  <Button
                    onClick={setData6}
                    style={{ display: 'block', margin: 'auto' }}
                  >
                    Delete3
                  </Button>

                </Form.Group>
              </div>
            </div>

            {/* ### */}

          </div>


        </Form>

        {/* ###################################################################### */}

        <div style={{ marginTop: '50px' }}>

          <div
            className="image-collection-top"
            style={{ background: 'aliceblue' }}
          >

            <div className="product-form-field">
              <span className="d-block padding-s">Image Collection</span>
              {!isFileLoading &&
                <label
                  style={{
                    background: 'red',
                    padding: '5px',
                    borderRadius: '15px',
                  }}
                  htmlFor="product-input-file-collection"
                >
                  <input
                    hidden
                    id="product-input-file-collection"
                    multiple
                    onChange={e =>
                      onFileChange(e, {
                        name: 'imageCollection',
                        type: 'multiple',
                      })}
                    type="file"
                  />


                  Choose Images1
                </label>}
            </div>

            <div className="image-collection">

              {/* {imageFile.length >= 1 &&
                imageFile.map(image => ( */}

              {imageFile?.imageCollection?.length >= 1 &&
                imageFile?.imageCollection?.map(image => (
                  <div
                    className="product-form-collection-image"
                    style={{ marginBottom: '20px' }}
                    key={image.id}
                  >
                    <ImageLoader alt="" src={image.url} />

                    <button
                      className="product-form-delete-image"
                      onClick={() =>
                        removeImage({ id: image.id, name: 'imageCollection' })}
                      title="Delete Image"
                      type="button"
                    >
                      Delete
                      <i className="fa fa-times-circle" />
                    </button>

                  </div>
                ))}

            </div>

          </div>

          {/* <Button
            variant="primary"
            // type="submit"
            style={{ marginTop: '100px', marginBottom: '100px' }}
            onClick={setData3}
          >
            Add Array to State
          </Button> */}


          <Button
            variant="primary"
            // type="submit"
            style={{ marginTop: '100px', marginBottom: '100px' }}
            onClick={setData2}
          >
            Submit1
          </Button>


        </div>

      </div>

    </div>
  );
};

export default EditUserNew;

function convertToBase64(file1, file2) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file1, file2);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    // console.log("line:2000", fileReader.result);
    fileReader.onerror = error => {
      reject(error);
    };
  });
}
