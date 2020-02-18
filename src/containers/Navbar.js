import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const navbar = () => {
  return (
    <div className="App">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">OBB-Sys</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Rozwiń" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#global">
                Pomiary globalne
              </NavDropdown.Item>
              <NavDropdown.Item href="#pens">Kojce</NavDropdown.Item>
              <NavDropdown.Item href="#pens-measures">Pomiary</NavDropdown.Item>
              <NavDropdown.Item href="#forage">Paśnik</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navbar;
