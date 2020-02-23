import React, { Component } from "react";
import "./Selection.css";
import { Button } from "react-bootstrap";
import DeleteButton from "./../DeleteButton/DeleteButton";
import { FiEdit3 } from "react-icons/fi";

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
          variant="dark"
          onClick={this.props.showSelection}
        >
          Ukryj
        </Button>
        <FiEdit3 className="edit-icon" />
        <h4>
          <strong>#{this.props.id}</strong>
        </h4>
        <div className="btnContainer">
          {!this.state.showDeleteInfo && (
            <Button variant="dark">Wyświetl badania</Button>
          )}
          {!this.state.showDeleteInfo && (
            <Button variant="dark">Dodaj badanie</Button>
          )}
          {!this.state.showDeleteInfo && (
            <Button variant="dark">Zgon/Sprzedaż</Button>
          )}
          {!this.state.showDeleteInfo && <Button variant="dark">Edytuj</Button>}
          {!this.state.showDeleteInfo && (
            <DeleteButton
              id={this.props.id}
              idPen={this.props.idPen}
              showSelection={this.props.showSelection}
              reloadHandler={this.props.reloadHandler}
              deleteInfoHandler={this.showDeleteInfoHandler}
            />
          )}
          {this.state.showDeleteInfo && (
            <h4 className="deleted-unit-info">Obiekt usunięto</h4>
          )}
        </div>
      </div>
    );
  }
}

export default Selection;
