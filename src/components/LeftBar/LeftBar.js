import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import "./LeftBar.css";
import { MdDns, MdWeb, MdEqualizer } from "react-icons/md";
import {GiWaterDrop} from "react-icons/gi";
import {FaShoppingCart} from "react-icons/fa";
import {TiUserDelete} from "react-icons/ti";

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
            <MdDns className="bar-icon"/>
            Grupy
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#obb-global"
            variant="dark"
            onClick={this.props.globalHandler}
          >
            <MdEqualizer className="bar-icon"/>
            Globalne
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#obb-forage"
            variant="dark"
            onClick={this.props.forageHandler}
          >
            <MdWeb className="bar-icon"/>
            Paśnik
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#obb-water"
            variant="dark"
            onClick={this.props.forageHandler}
          >
            <GiWaterDrop className="bar-icon"/>
            Woda
          </ListGroup.Item>
          
          <ListGroup.Item
            action
            href="#obb-sold"
            variant="dark"
            onClick={this.props.forageHandler}
          >
            <FaShoppingCart className="bar-icon"/>
            Sprzedaż
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#obb-death"
            variant="dark"
            onClick={this.props.forageHandler}
          >
            <TiUserDelete className="bar-icon"/>
            Zgon
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default LeftBar;
