import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div className="Table">
        <h3>Kojec {this.props.index}<br/>(Rozmiar: {this.props.size}m) Izolatka: {this.props.isolated}</h3>
        <p>Miejsce na tabelę</p>
      </div>
    );
  }
};

export default Table;
