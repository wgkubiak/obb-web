import React, { Component } from "react";
import "./Selection.css";
import { Button } from "react-bootstrap";
import DeleteButton from "./../DeleteButton/DeleteButton";

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Selection">
        <Button className="hide-selection" variant="success" onClick={this.props.showSelection}>X</Button>
        <h4>
          Obiekt: <b>#{this.props.id}</b>
        </h4>
        <div className="btnContainer">
          <Button variant="success">Wyświetl badania</Button>
          <Button variant="success">Dodaj badanie</Button>
          <Button variant="success">Zgon/Sprzedaż</Button>
          <DeleteButton
            id={this.props.id}
            idPen={this.props.idPen}
            showSelection={this.props.showSelection}
            reloadHandler={this.props.reloadHandler}
          />
        </div>
      </div>
    );
  }
}

export default Selection;
