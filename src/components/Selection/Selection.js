import React, { Component } from "react";
import "./Selection.css";
import { Button } from "react-bootstrap";

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Selection">
        <h4>Obiekt: <b>#{this.props.id}</b></h4>
        <div className="btnContainer">
          <Button variant="dark">Więcej danych</Button>
          <Button variant="primary">Edytuj jednostkę</Button>
          <Button variant="danger">Usuń</Button>
        </div>
      </div>
    );
  }
}

export default Selection;
