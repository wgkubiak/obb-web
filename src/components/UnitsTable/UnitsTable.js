import React, { Component } from "react";
import "./UnitsTable.css";

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
        <h4>
          {this.props.index}
          <br />
          (Rozmiar: {this.props.size}m) Izolatka: {this.props.isolated}
        </h4>
        <p>Miejsce na tabelę</p>
      </div>
    );
  }
}

export default UnitsTable;
