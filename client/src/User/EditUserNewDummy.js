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

const EditUserNewDummy = ({ product, isLoading }) => {
    console.log("line:60", product);
    console.log("line:61", product);





    return (
        <div>

            <h1>Test!!!!!!</h1>

            {/* #has currently a problem with the form  */}
            {/* {loading && <SkeletonCard/>} */}

            <div style={{ margin: '15px 0px 0px 15px', display: 'flex' }}>
                <a href="/">Go Back</a>
            </div>

            {/* {!loading &&  */}
            <div className="container mt-3">
                <Form className="mt-3">


                    <div className="image-collection">

            

              {product?.imageCollection?.length >= 1 &&
                product?.imageCollection?.map (image => (
                  <div
                    className="product-form-collection-image"
                    style={{marginBottom: '20px'}}
                    key={image.id}
                  >
                    <ImageLoader alt="" src={image.url} />

                    <button
                      className="product-form-delete-image"
                    //   onClick={() =>
                    //     removeImage ({id: image.id, name: 'imageCollection'})}
                      title="Delete Image"
                      type="button"
                    >
                      Delete
                      <i className="fa fa-times-circle" />
                    </button>

                  </div>
                ))}

            </div>


                </Form>

                {/* ###################################################################### */}



            </div>

        </div>
    );
};

export default EditUserNewDummy;


