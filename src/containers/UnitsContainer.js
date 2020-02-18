import React, { Component } from "react";
import UnitsTable from "../components/UnitsTable/UnitsTable";

class UnitsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getData = () => {
    fetch("http://localhost:3000/pens")
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(e => e);
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className="App">
        {this.state.data.map((data, index) => (
          <UnitsTable
            key={index}
            index={data.id}
            size={data.size}
            isolated={data.isolated ? 'TAK' : 'NIE'}
          ></UnitsTable>
        ))}
      </div>
    );
  }
}

export default UnitsContainer;
