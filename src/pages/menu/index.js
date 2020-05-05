import React from 'react';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'

import { Link } from 'react-router-dom';

export default function Menu() {


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>  A-PDF</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" > Home</Nav.Link>
                        <Nav.Link >Info</Nav.Link>
                        <NavDropdown title="Ferramentas" id="basic-nav-dropdown">
                            <NavDropdown.Item  as={Link} to="/">Assinar PDF</NavDropdown.Item>
                            <NavDropdown.Item  as={Link} to="/">Comprimir PDF</NavDropdown.Item>
                            <NavDropdown.Item  as={Link} to="/">Dividir PDF</NavDropdown.Item>
                            <NavDropdown.Item   as={Link} to="/">Juntar PDF</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

}