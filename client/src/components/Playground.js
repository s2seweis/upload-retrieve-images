import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import moment from 'moment';

import Popup1 from './Popup/Popup1';
import Popup2 from './Popup/Popup2';

import { UserContext } from '../App';



const Playground = () => {

     // ### useContext
  const users = useContext(UserContext);


    const [isOpen, setIsOpen] = useState(false);
    

    // function toggle() {
    //     setIsOpen(true);
    // }


    const setData2 = (e) => {
        // const {value} = e.target;
        setIsOpen(true);
      };



    return (
        <div className="container mt-3">
            <Form className="mt-3">

                <h1>Playground</h1>

                <div className="Playground">
                    
                    {/* {isOpen && <Popup1 />} */}


                    {isOpen ? <Popup1/> : <Popup2/>}
                    
                    <button onClick={setData2}>Toggle show</button>


                </div>


            </Form>

        </div>
    );
};

export default Playground;


