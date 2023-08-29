import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import moment from 'moment';


const Popup1 = () => {






    return (
        <div className="container mt-3">
            <Form className="mt-3">

                <h1>Popup:1</h1>
                <button 
                // onClick={toggle}
                >Add Image</button>


            </Form>

        </div>
    );
};

export default Popup1;


