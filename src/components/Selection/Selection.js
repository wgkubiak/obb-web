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
        <h4>Obiekt: <b>#{this.props.id}</b></h4>
        <div className="btnContainer">
          <Button variant="dark">Wyświetl badania</Button>
          <Button variant="primary">Dodaj badanie</Button>
          <Button variant="danger">Zgon/Sprzedaż</Button>
          <DeleteButton id={this.props.id} reloadHandler={this.props.reloadHandler}/>
        </div>
      </div>
    );
  }
}

export default Selection;
