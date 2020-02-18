import React, { Component } from "react";
import "./UnitsContent.css";
import { Table } from "react-bootstrap";

class UnitsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUnits: [],
      id: this.props.id
    };
  }

  getUnitsData = id => {
    fetch(`http://localhost:3000/active-pigs/${id}`)
      .then(res => res.json())
      .then(res => this.setState({ dataUnits: res }))
      .catch(e => e);
  };

  componentDidMount() {
    this.getUnitsData(this.props.id);
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ id: this.props.id }, () =>
      this.getUnitsData(this.props.id)
    );
  }

  showForm = id => {
    alert(`${id}`);
  };

  render() {
    return (
      <div className="UnitsContent">
        <Table bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Płeć</th>
              <th>Data zakupu</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataUnits.map((data, index) => (
              <tr
                key={`${data.id}key`}
                onClick={this.showForm.bind(this, data.id)}
              >
                <td>{data.id}</td>
                <td>{data.pigGender === "m" ? "Samiec" : "Samica"}</td>
                <td>{data.pigShoppingDate.substring(0, 10)}</td>
                <td>{data.pigShoppingPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UnitsContent;
