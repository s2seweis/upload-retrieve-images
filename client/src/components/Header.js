import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-2">Users</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/register" className="text-decoration-none text-light mx-2">Register</NavLink>
                        <NavLink to="/edituser/:userid" className="text-decoration-none text-light mx-2">Edit</NavLink>
                        <NavLink to="/playground" className="text-decoration-none text-light mx-2">Playground</NavLink>
                    </Nav>
                    <NavLink to="#" className="text-decoration-none text-light mx-2">Empty</NavLink>
                </Container>
            </Navbar>
        </>
    )
}

export default Header