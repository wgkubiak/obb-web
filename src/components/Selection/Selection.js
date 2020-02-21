import React, { Component } from "react";
import "./Selection.css";
import { Button } from "react-bootstrap";
import DeleteButton from "./../DeleteButton/DeleteButton";

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteInfo: false
    };
    this.showDeleteInfoHandler = this.showDeleteInfoHandler.bind(this);
  }

  showDeleteInfoHandler = () => {
    this.setState({ showDeleteInfo: true });
  };

  render() {
    return (
      <div className="Selection">
        <Button
          className="hide-selection"
          variant="success"
          onClick={this.props.showSelection}
        >
          Ukryj
        </Button>
        <h4>
          Obiekt: <b>#{this.props.id}</b>
        </h4>
        <div className="btnContainer">
          {!this.state.showDeleteInfo && (
            <Button variant="success">Wyświetl badania</Button>
          )}
          {!this.state.showDeleteInfo && (
            <Button variant="success">Dodaj badanie</Button>
          )}
          {!this.state.showDeleteInfo && (
            <Button variant="success">Zgon/Sprzedaż</Button>
          )}
          {!this.state.showDeleteInfo && (
            <DeleteButton
              id={this.props.id}
              idPen={this.props.idPen}
              showSelection={this.props.showSelection}
              reloadHandler={this.props.reloadHandler}
              deleteInfoHandler={this.showDeleteInfoHandler}
            />
          )}
          {this.state.showDeleteInfo && <h4 className="deleted-unit-info">Obiekt usunięto</h4>}
        </div>
      </div>
    );
  }
}

export default Selection;
