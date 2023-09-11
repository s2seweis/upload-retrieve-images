import React from 'react';
import {useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';

import '../../../src/App.css';
import {v4 as uuidv4} from 'uuid';
import useFileHandler from '../hooks/useFileHandler';
import ImageLoader from '../ImageLoader';

const ImageCollection = isLoading => {
  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage,
  } = useFileHandler ({imageCollection: []});

  console.log ('line:233', imageFile);

  return (
    <div>

      <div className="image-collection-top" style={{background: 'aliceblue'}}>

        <div className="product-form-field">
          <span className="d-block padding-s">Image Collection</span>
          {!isFileLoading &&
            <label
              style={{background: 'red', padding: '5px', borderRadius: '15px'}}
              htmlFor="product-input-file-collection"
            >
              <input
                hidden
                id="product-input-file-collection"
                multiple
                onChange={e =>
                  onFileChange (e, {name: 'imageCollection', type: 'multiple'})}
                type="file"
              />
              Choose Images1
            </label>}
        </div>

        <div className="image-collection">

          {imageFile.imageCollection.length >= 1 &&
            imageFile.imageCollection.map (image => (
              <div
                className="product-form-collection-image"
                style={{marginBottom: '20px'}}
                key={image.id}
              >
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

    </div>
  );
};

export default ImageCollection;
