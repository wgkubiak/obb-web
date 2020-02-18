import React from "react";
import Navbar from "./containers/Navbar";
import UnitsContainer from "./containers/UnitsContainer";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

const app = () => {
  const showUnits = true;
  // const showGlobal = false;
  // const showMeasures = false;
  // const showForage = false;

  return (
    <div className="App">
      <Navbar />
      {showUnits && <UnitsContainer />}
    </div>
  );
};

export default app;
