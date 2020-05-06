import React from 'react';
import './global.css';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'

function App() {

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
