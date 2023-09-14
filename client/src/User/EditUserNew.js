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
  console.log("line:60", product);

  // ### A dynamic parameter is a parameter to an SQL statement for which the value is not specified when the statement is created, initital state:[] no more need for question marks
  const [user, setUser] = useState(product);
  console.log('line:1.1', user);
  console.log('line:1.2', user.imageCollection);


  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage,
    setImageFile,
  } = useFileHandler({ imageCollection: user?.imageCollection || [] });


  const tree = {
    id: user._id,
    name: user.fname,
    image: user.image,
    image2: user.image2,
    imgpath: user.imgpath,
    date: user.date,
    imageCollection: imageFile?.imageCollection,
    // imageCollection: imageFile
  };

  console.log("line:1000", tree);


  const editUser = async tree => {
    console.log('line:888', tree);

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
      console.log('line:400, !success!', res);
    }
  };

  const setData2 = e => {
    // const {value} = e.target;
    editUser (tree);
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

          ###


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
