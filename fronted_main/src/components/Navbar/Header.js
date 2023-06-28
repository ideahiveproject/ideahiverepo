

import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png';


const Header = () => {
    return (
        <>
            <Navbar bg="light" variant="light" expand="lg">
                <Container>
                   <Navbar.Brand as={NavLink} to="/">
                        <img
                            src={logo}
                            width="100"
                            height="100"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
               
               
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                      <NavLink to="/Home" className="nav-link text-dark fs-4 mx-2">Home</NavLink>
                      <NavLink to="/About" className="nav-link text-dark fs-4 mx-2">About Us</NavLink>
                      <NavLink to="/Register" className="nav-link text-dark fs-4 mx-2">Register</NavLink>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header