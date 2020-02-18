import React, { Component } from "react";
import { Button } from "react-bootstrap";
import UnitsTable from "../components/UnitsTable/UnitsTable";

class UnitsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPens: [],
      id: 1
    };
    this.updateState = this.updateState.bind(this);
  }

  getPensData = id => {
    fetch(`http://localhost:3000/pens/${id}`)
      .then(res => res.json())
      .then(res => this.setState({ dataPens: res }))
      .catch(e => e);
  };

  componentDidMount() {
    this.getPensData(this.state.id);
  }

  updateState = event => {
    this.setState({ id: event.target.value }, () =>
      this.getPensData(this.state.id)
    );
  };

  render() {
    return (
      <div className="App">
        <div>
          <select
            className="penSelect"
            id="pens"
            onChange={this.updateState.bind(this)}
            value={this.state.id}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <Button className="addBtn" variant="secondary">
            DODAJ
          </Button>
        </div>
        {this.state.dataPens.map((data, index) => (
          <UnitsTable
            key={`unit${index}`}
            index={data.id}
            size={data.size}
            isolated={data.isolated ? "TAK" : "NIE"}
          ></UnitsTable>
        ))}
      </div>
    );
  }
}

export default UnitsContainer;
