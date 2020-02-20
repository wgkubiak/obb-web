import React, { Component } from "react";
import "./UnitsTable.css";
import UnitsContent from "./../UnitsContent/UnitsContent";

class UnitsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div className="UnitsTable">
        <UnitsContent id={this.props.index} reloadHandler={this.props.reloadHandler} />
      </div>
    );
  }
}

export default UnitsTable;
