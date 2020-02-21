import React, {Component} from 'react';
import './DeleteButton.css';
import {Button} from "react-bootstrap";

class DeleteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.remove = this.remove.bind(this);
    //this.removeHandler = this.removeHandler.bind(this);
  }
  
  //TODO: take care about this.props.idPen (it shows previous?)

  remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-pig/${this.props.id}`, {
      method: 'DELETE',
    })
    .then(this.props.reloadHandler(this.props.idPen));
  }

  
  componentDidMount(){
    console.log(this.props.idPen);
  }

  render() {
    return(
      <div className="DeleteButton">
        <Button variant="danger" onClick={this.remove}>
          X
        </Button>
      </div>
    )
  }
}

export default DeleteButton;
