import React, {Component} from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">OBB-Sys</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Rozwiń" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#global" onClick={this.props.globalHandler}>
                  Pomiary globalne
                </NavDropdown.Item>
                <NavDropdown.Item href="#pens" onClick={this.props.unitsHandler}>Kojce</NavDropdown.Item>
                <NavDropdown.Item href="#forage" onClick={this.props.forageHandler}>Paśnik</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
};

export default Header;
