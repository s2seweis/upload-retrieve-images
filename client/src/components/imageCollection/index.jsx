import React from 'react';
import {useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';

import data from '../../assets/json/images.json';

// import '../../../src/App.css';
import '../../../src/App.css';

import {v4 as uuidv4} from 'uuid';

import useFileHandler from '../hooks/useFileHandler';

import ImageLoader from '../ImageLoader';



const ImageCollection = isLoading => {
  const [state, setState] = useState (data);
  console.log ('line:100', state);

  // ###
  const [file3, setFile3] = useState ();
  console.log ('line:0.9', file3);
  const [file4, setFile4] = useState ('');
  console.log ('line:1.1', file4);
  console.log ('line:1.2', file4.myFile);

  const numbersOne = [1, 2, 3];
  const numbersTwo = [{id: uuidv4 (), img: file4.myFile}];
  const combined = [...numbersTwo];
  console.log ('line:1.3', combined);
  console.log ('line:2', file3);

  // ###

  const setimgfilecollection = async e => {
    console.log ('line:200', e);

    setFile3 (e.target.files);

    const testNewFile = e.target.files;
    console.log ('line:3.9', testNewFile);

    const base64NewFile = await convertToBase64 (testNewFile);
    console.log ('line:4', base64NewFile);
    setFile4 ({myFile: base64NewFile});

    // ### - display image preview
    // setImage2 (URL.createObjectURL (e.target.files[0]));
  };

  const deleteById = id => {
    console.log ('line:200', id);
    setState (oldValues => {
      return oldValues.filter (fruit => fruit.id !== id);
    });
  };

  // ###

  const combinedImageArray = [...numbersTwo, ...state];
  console.log ('line:201', combinedImageArray);

  // ###

  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage,
  } = useFileHandler ({imageCollection: []});

  console.log ('line:233', imageFile);

  return (
    <div>

      <div style={{display: 'flex', marginBottom: '100px'}} className="level_1">

        <div className="level_2">
          {state.map (fruit => (
            <div>
              <div className="level_3">
                <img
                  className="img_Collection"
                  style={{height: '150px', width: 'auto'}}
                  src={fruit.img + '.jpg'}
                  alt={fruit.title}
                />
              </div>
              {/* <a href={link}>Link</a> */}

              <div
                style={{display: 'flex', justifyContent: 'space-around'}}
                className="button_ImageCollection"
              >

                <Button onClick={() => deleteById (fruit.id)}>Add</Button>
                <Button onClick={() => deleteById (fruit.id)}>Delete</Button>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* <input
        style={{}}
        // ref={ref}
        onChange={setimgfilecollection}
        multiple
        type="file"
      /> */}

      <div className='image-collection-top' style={{background:"aliceblue"}}>

        <div className="product-form-field">
          <span className="d-block padding-s">Image Collection</span>
          {!isFileLoading &&
            <label
              style={{background: 'red', padding: '5px', borderRadius: '15px'}}
              htmlFor="product-input-file-collection"
            >
              <input
                // disabled={isLoading}
                hidden
                id="product-input-file-collection"
                multiple
                onChange={e =>
                  onFileChange (e, {name: 'imageCollection', type: 'multiple'})}
                // readOnly={isLoading}
                type="file"
              />
              Choose Images1
            </label>}
        </div>

        <div
          className="image-collection"
          // style={{display: 'flex', marginTop: '25px', justifyContent: 'center'}}
        >

          {imageFile.imageCollection.length >= 1 &&
            imageFile.imageCollection.map (image => (
              <div className="product-form-collection-image" style={{marginBottom:"20px"}} key={image.id}>
                <ImageLoader alt="" src={image.url} />

                <button
                  className="product-form-delete-image"
                  onClick={() =>
                    removeImage ({id: image.id, name: 'imageCollection'})}
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

      {/* <input type="file" name="filefield" multiple="multiple" /> */}

    </div>
  );
};

export default ImageCollection;

function convertToBase64 (file1, file2) {
  return new Promise ((resolve, reject) => {
    const fileReader = new FileReader ();
    fileReader.readAsDataURL (file1, file2);
    fileReader.onload = () => {
      resolve (fileReader.result);
    };
    // console.log("line:2000", fileReader.result);
    fileReader.onerror = error => {
      reject (error);
    };
  });
}
