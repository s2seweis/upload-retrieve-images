import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"
// ###

import { List } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

// ###
import 'bootstrap/dist/css/bootstrap.min.css';

const Offcanvas1 = () => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className='offcanvas-container'
        // style={{backgroundColor:"black"}}
        >


            <Button variant="primary" onClick={handleShow}>

                <Icon.List />

            </Button>



            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <div className='grid' style={{ display: "grid", fontSize:"1.3rem" }}>
                       
                        <NavLink to="/" className="">Users</NavLink>
                        <NavLink to="/adduser" className="">Add Users</NavLink>
                        <NavLink to="/video" className="">Video</NavLink>
                        <NavLink to="/addvideo" className="">Add Video</NavLink>
                        <NavLink to="#" className="">Coming Soon</NavLink>
                   
                    </div>
                </Offcanvas.Body>
            </Offcanvas>




        </div>
    )
}

export default Offcanvas1;