import React, {Component} from 'react';
import axios from "axios";
import './DeleteButton.css';
import {Button} from "react-bootstrap";

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: 0
    };
    this.remove = this.remove.bind(this);
  }
  
  remove = () => {
    axios.delete(`https://obb-api.herokuapp.com/delete-pig/${this.props.id}`)
      .then(res => console.log('It worked!')); 
  }

  // TODO: first remove, then reload component, not other way
  removeHandler = () => {
    this.remove();
    this.props.reloadHandler();
  }

  render() {
    return(
      <div className="DeleteButton">
        <Button variant="danger" onClick={this.removeHandler}>
          X
        </Button>
      </div>
    )
  }
}

export default DeleteButton;
