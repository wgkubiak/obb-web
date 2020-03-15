import React, { Component } from "react";
import UnitsContainer from "./containers/UnitsContainer";
import Navbar from "./components/Navbar/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUnits: true,
      showForage: false,
      showGlobal: false
    };
    this.toggleComponent = this.toggleComponent.bind(this);
    this.showUnitsHandler = this.showUnitsHandler.bind(this);
    this.showForageHandler = this.showForageHandler.bind(this);
    this.showGlobalHandler = this.showGlobalHandler.bind(this);
  }

  toggleComponent = (unit, forage, global) => {
    this.setState({ showUnits: unit }, () =>
      this.setState({ showForage: forage }, () =>
        this.setState({ showGlobal: global })
      )
    );
  };

  showUnitsHandler = () => {
    this.toggleComponent(true, false, false);
  };

  showForageHandler = () => {
    this.toggleComponent(false, true, false);
  };

  showGlobalHandler = () => {
    this.toggleComponent(false, false, true);
  };

  render() {
    return (
      <div className="App">
        <Navbar
          unitsHandler={this.showUnitsHandler}
          forageHandler={this.showForageHandler}
          globalHandler={this.showGlobalHandler}
        />
        {this.state.showUnits && <UnitsContainer />}
      </div>
    );
  }
}

export default App;
