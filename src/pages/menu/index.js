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
                        <Nav.Link > <Link to="/"> Home </Link> </Nav.Link>
                        <Nav.Link href="#link">Info</Nav.Link>
                        <NavDropdown title="Ferramentas" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Assinar PDF</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Comprimir PDF</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Dividir PDF</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.4">Juntar PDF</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );

}