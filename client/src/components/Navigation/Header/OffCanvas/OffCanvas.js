import React from 'react'
import { NavLink } from "react-router-dom"
import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

const OffCanvas = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='offcanvas-container'
        >
            <Button variant="primary" onClick={handleShow}>
                <Icon.List />
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='grid' style={{ display: "grid", fontSize: "1.3rem" }}>
                        <NavLink to="/" className="">Home</NavLink>
                        <NavLink to="/files" className="">Users</NavLink>
                        <NavLink to="/adduser" className="">Add Users</NavLink>
                        <NavLink to="/videos" className="">Video</NavLink>
                        <NavLink to="/addvideo" className="">Add Video</NavLink>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default OffCanvas;