import React, { Component } from "react";
import "./UnitsContent.css";
import { Table } from "react-bootstrap";
import Selection from "./../Selection/Selection";

class UnitsContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUnits: [],
      id: this.props.id,
      idPig: '',
      showSelection: false
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection = () => {
    const { showSelection } = this.state;
    this.setState({ showSelection: !showSelection })
  }

  getUnitsData = id => {
    fetch(`https://obb-api.herokuapp.com/active-pigs/${id}`)
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
    this.setState({idPig: id}, () => 
    this.toggleSelection());
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
            { this.state.showSelection && <Selection id={this.state.idPig} idPen={this.props.idPen} showSelection={this.toggleSelection} reloadHandler={this.props.reloadHandler}/> }
      </div>
    );
  }
}

export default UnitsContent;
