import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import useFileHandler from '../../../components/hooks/useFileHandler';
import ImageLoader from '../../../components/ImageLoader/ImageLoader';
import convertToBase64 from './Base64';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './EditFiles.css';

const EditFilesForm = ({ product }) => {
  const [user, setUser] = useState(product);

  const { imageFile, isFileLoading, onFileChange, removeImage } =
    useFileHandler({ imageCollection: user?.imageCollection || [] });

  const [fname, setFName] = useState('');
  const name = fname || user?.fname;

  const setData1 = (e) => {
    const { value } = e.target;
    setFName(value);
  };

  const tree = {
    id: user?._id,
    name: name,
    image: user?.image,
    image2: user?.image2,
    imgpath: user?.imgpath,
    date: user?.date,
    imageCollection: imageFile,
  };

  const [file, setFile] = useState();

  const editUser = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append('photo', file);
    formData.append('id', user._id);
    formData.append('name', name);
    formData.append('image', user.image);
    formData.append('image2', user.image2);
    formData.append('imgpath', user.imgpath);
    formData.append('date', user.date);

    imageFile?.imageCollection.forEach((collection, index) => {
      const { id, url } = collection; // Destructure the object properties
      formData.append(`imageCollection[${index}][id]`, id);
      formData.append(`imageCollection[${index}][url]`, url);
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
    };

    console.log('line:300', tree);

    const res = await axios.post('/editfiles', formData, config);
    
    if (res.data.status === 401 || !res.data) {
      console.log('errror');
    } else {
      // history("/files")
      console.log('!success!', res);
      window.location.href = '/files';
    }
  };

  // const img = user?.imgpath;
  const [postImage1, setPostImage1] = useState({ myFile: '' });
  // const [file1, setFile1] = useState('');
  const [image1, setImage1] = useState();

  const setData4 = () => {
    setUser({
      _id: user._id,
      __v: user.__v,
      imgpath: user.imgpath,
      image: '',
      image2: user.image2,
      date: user.date,
      fname: user.fname,
    });
    setImage1('');
  };

  const setimgfile1 = async (e) => {
    // setFile1(e.target.files[0]);
    const test1 = e.target.files[0];
    const base64 = await convertToBase64(test1);
    setPostImage1({ ...postImage1, myFile: base64 });
    setImage1(URL.createObjectURL(e.target.files[0]));

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

  const [postImage, setPostImage] = useState({ myFile: '' });
  // const [image, setImage] = useState('');

  const setimgfile = async (e) => {
    setFile(e.target.files[0]);
    const test = e.target.files[0];
    const base64 = await convertToBase64(test);
    setPostImage({ ...postImage, myFile: base64 });
    // setImage(URL.createObjectURL(e.target.files[0]));
  };

  const setData5 = () => {
    setUser({
      _id: user._id,
      __v: user.__v,
      imgpath: '',
      image: user.image,
      image2: user.image2,
      date: user.date,
      fname: user.fname,
    });
    setImage1('');
  };

  return (
    <div>
      <div style={{ margin: '15px' }} className="nav-link">
        <Link to="/files">
          <Button variant="primary">Go Back</Button>
        </Link>
      </div>

      <div className="container mt-3">
        <h3>Edit Files Form</h3>
        <Form className="mt-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>File Name</Form.Label>
            <Form.Control
              defaultValue={user?.fname}
              onChange={setData1}
              type="text"
              name="fname"
              placeholder=""
            />
          </Form.Group>
          <div className="images-copy">
            <div className="element_1 green">
              <Form.Label>Image1</Form.Label>
              <Form.Control
                type="file"
                onChange={setimgfile1}
                name="photo"
                placeholder=""
              />

              <div className="image-preview-container">
                <Form.Group>
                  <img src={image1 || user?.image} alt="image1" />
                  <div>
                    <Button onClick={setData4}>Delete1</Button>
                  </div>
                </Form.Group>
              </div>
            </div>
            <div className="element_1 yellow">
              <Form.Label>Image2</Form.Label>
              <Form.Control
                type="file"
                onChange={setimgfile}
                name="photo"
                placeholder=""
              />

              <div className="image-preview-container">
                <Form.Group>
                  <img
                    src={postImage.myFile || `/uploads/${user?.imgpath}`}
                    alt="image1"
                  />
                  <div>
                    <Button onClick={setData5}>Delete2</Button>
                  </div>
                </Form.Group>
              </div>
            </div>
          </div>
        </Form>
        <div>
          <div className="image-collection-top">
            <div className="product-form-field">
              <span className="d-block padding-s">Image Collection</span>
              {!isFileLoading && (
                <label
                  className="red-label"
                  htmlFor="product-input-file-collection"
                >
                  <input
                    hidden
                    id="product-input-file-collection"
                    multiple
                    onChange={(e) =>
                      onFileChange(e, {
                        name: 'imageCollection',
                        type: 'multiple',
                      })
                    }
                    type="file"
                  />
                  Choose Images1
                </label>
              )}
            </div>

            <div className="image-collection">
              {imageFile?.imageCollection?.length >= 1 &&
                imageFile?.imageCollection?.map((image) => (
                  <div className="product-form-collection-image" key={image.id}>
                    <ImageLoader alt="" src={image.url} />
                    <button
                      className="product-form-delete-image"
                      onClick={() =>
                        removeImage({ id: image.id, name: 'imageCollection' })
                      }
                      title="Delete Image"
                      type="button"
                    >
                      Delete <i className="fa fa-times-circle" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <Button variant="primary" onClick={editUser}>
            Submit1
          </Button>
        </div>
      </div>
    </div>
  );
};

EditFilesForm.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    __v: PropTypes.number,
    imgpath: PropTypes.string,
    image: PropTypes.string,
    image2: PropTypes.string,
    date: PropTypes.string,
    fname: PropTypes.string,
    imageCollection: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }),
};

export default EditFilesForm;
