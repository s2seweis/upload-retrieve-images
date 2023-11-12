import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  return (
    <div className='container-navbar'>
      <Navbar className="navbar" bg="dark" variant="dark" style={{ height: '60px' }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">
            Home
          </NavLink>
          <NavLink to="/files" className="text-decoration-none text-light mx-2">
            Files
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/videos" className="text-decoration-none text-light mx-2">
              Video
            </NavLink>
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Menu
            </Dropdown.Toggle>

            <Dropdown.Menu style={{marginRight:'15px'}}>
              <Dropdown.Item> <Link to="/files">Files</Link> </Dropdown.Item>
              <Dropdown.Item> <Link to="/videos">Videos</Link> </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
