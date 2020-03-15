import React, { Component } from "react";
import { Button } from "react-bootstrap";
import TableContent from "../components/Pigs/TableContent";
import AddForm from "./../components/Pigs/AddForm";

class UnitsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPens: [],
      id: 1,
      showAddForm: false
    };
    this.updateState = this.updateState.bind(this);
    this.toggleAddForm = this.toggleAddForm.bind(this);
    this.updateStateByID = this.updateStateByID.bind(this);
  }

  getPensData = id => {
    fetch(`https://obb-api.herokuapp.com/pens/${id}`)
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

  updateStateByID = id => {
    this.setState({ id: id }, () => this.getPensData(this.state.id));
  };

  toggleAddForm = () => {
    const { showAddForm } = this.state;
    this.setState({ showAddForm: !showAddForm });
  };

  showForm = () => {
    this.toggleAddForm();
  };

  render() {
    return (
      <div className="UnitsContainer">
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
          <Button
            className="addBtn"
            variant="secondary"
            onClick={this.toggleAddForm}
          >
            DODAJ
          </Button>
        </div>
        {this.state.dataPens.map((data, index) => (
          <TableContent
            key={`unit${index}`}
            idPen={this.state.id}
            index={data.id}
            size={data.size}
            isolated={data.isolated ? "TAK" : "NIE"}
            reloadHandler={this.updateStateByID}
          ></TableContent>
        ))}
        {this.state.showAddForm && (
          <AddForm
            id={this.state.id}
            showAddUnitHandler={this.toggleAddForm}
            reloadHandler={this.updateStateByID}
          />
        )}
      </div>
    );
  }
}

export default UnitsContainer;
