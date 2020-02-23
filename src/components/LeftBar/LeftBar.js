import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./LeftBar.css";

class LeftBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="LeftBar">
        <h1 className="list-header">OBB-Sys</h1>
        <ListGroup
          className="list-container"
          variant="flush"
          defaultActiveKey="#obb-groups"
        >
          <ListGroup.Item
            action
            href="#obb-groups"
            variant="dark"
            onClick={this.props.unitsHandler}
          >
            Grupy
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#obb-global"
            variant="dark"
            onClick={this.props.globalHandler}
          >
            Globalne
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#obb-forage"
            variant="dark"
            onClick={this.props.forageHandler}
          >
            Paśnik
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default LeftBar;
