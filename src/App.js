import React, { useState } from "react";
import UnitsContainer from "./containers/UnitsContainer";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [showUnits, setShowUnits] = useState(true);
  const [showForage, setShowForage] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);

  const toggleComponent = (unit, forage, global) => {
    setShowUnits(unit);
    setShowForage(forage);
    setShowGlobal(global);
  }

  const showUnitsHandler = () => toggleComponent(true, false, false);
  const showForageHandler = () => toggleComponent(false, true, false);
  const showGlobalHandler = () => toggleComponent(false, false, true);

  return (
      <div className="App">
        <Navbar
          unitsHandler={showUnitsHandler}
          forageHandler={showForageHandler}
          globalHandler={showGlobalHandler}
        />
        {showUnits && <UnitsContainer />}
      </div>
  );
}

export default App;
