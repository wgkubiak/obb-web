import React, { Component } from "react";
import "./DeleteButton.css";
import { Button } from "react-bootstrap";

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPen: this.props.idPen
    };
    this.remove = this.remove.bind(this);
  }

  //TODO: take care about this.props.idPen (it shows previous?) // TEST IT A LITTLE BIT MORE (IT WORKS?)

  remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-pig/${this.props.id}`, {
      method: "DELETE"
    })
      .then(this.props.reloadHandler(this.state.idPen))
      .then(this.props.deleteInfoHandler());
  };

  componentDidMount() {
    console.log(this.state.idPen);
  }

  render() {
    return (
      <div className="DeleteButton">
        <Button variant="danger" onClick={this.remove}>
          Usuń obiekt
        </Button>
      </div>
    );
  }
}

export default DeleteButton;
