import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  return (
    <div className='container-navbar'>
      <Navbar className="navbar" bg="dark" variant="dark" style={{ height: '60px' }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">
            Home
          </NavLink>
          <NavLink to="/users" className="text-decoration-none text-light mx-2">
            Files
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/videos" className="text-decoration-none text-light mx-2">
              Video
            </NavLink>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Dropdown
            </Dropdown.Toggle>

            <Dropdown.Menu style={{marginRight:"15px"}}>
              <Dropdown.Item href="#action/1">Option 1</Dropdown.Item>
              <Dropdown.Item href="#action/2">Option 2</Dropdown.Item>
              <Dropdown.Item href="#action/3">Option 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
