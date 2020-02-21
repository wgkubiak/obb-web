import React, { Component } from "react";
import { Button } from "react-bootstrap";
import UnitsTable from "./../components/UnitsTable/UnitsTable";
import AddUnitForm from "./../components/AddUnitForm/AddUnitForm";

class UnitsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPens: [],
      id: 1,
      showAddUnitForm: false
    };
    this.updateState = this.updateState.bind(this);
    this.toggleAddUnitForm = this.toggleAddUnitForm.bind(this);
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
    this.setState({ id: id }, () =>
      this.getPensData(this.state.id)
    );
  };

  toggleAddUnitForm = () => {
    const { showAddUnitForm } = this.state;
    this.setState({ showAddUnitForm: !showAddUnitForm })
  }

  showForm = () => {
    this.toggleAddUnitForm();
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
          <Button className="addBtn" variant="secondary" onClick={this.toggleAddUnitForm}>
            DODAJ
          </Button>
        </div>
        {this.state.dataPens.map((data, index) => (
          <UnitsTable
            key={`unit${index}`}
            index={data.id}
            size={data.size}
            isolated={data.isolated ? "TAK" : "NIE"}
            reloadHandler={this.updateStateByID}
          ></UnitsTable>
        ))}
        { this.state.showAddUnitForm && <AddUnitForm />}        
      </div>
    );
  }
}

export default UnitsContainer;
