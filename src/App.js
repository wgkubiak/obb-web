import React, { useState } from "react";
import StandardUnitsContainer from "./containers/StandardUnitsContainer";
import GlobalDataContainer from "./containers/GlobalDataContainer";
import SoldUnitsContainer from "./containers/SoldUnitsContainer";
import DeadUnitsContainer from "./containers/DeadUnitsContainer";
import ExamContainer from "./containers/ExamContainer";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styled from "styled-components";

const StyledApp = styled.div`
  text-align: center;
`;

const StyledDivTop = styled.div`
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #29434e;
  z-index: 20;
`;

const StyledParagraphTop = styled.div`
  margin-bottom: 0.1em;
  margin-top: 0.1em;
  color: #ffffff;
`;

const StyledHiddenReload = styled.h1`
  display: none
`
const App = () => {
  const [showUnits, setShowUnits] = useState(true);
  // const [showForage, setShowForage] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);
  // const [showWater, setShowWater] = useState(false);
  const [showSold, setShowSold] = useState(false);
  const [showDead, setShowDead] = useState(false);
  const [showExams, setShowExams] = useState(false);

  const [unitID, setUnitID] = useState("");
  const [reload, setReload] = useState(false);

  const [headerMode, setHeaderMode] = useState("Kojce");

  const toggleComponent = (mode, unit, forage, global, water, sold, dead) => {
    setShowUnits(unit);
    // setShowForage(forage || false);
    setShowGlobal(global || false);
    // setShowWater(water || false);
    setShowSold(sold || false);
    setShowDead(dead || false);
    setHeaderMode(mode);
  };

  const reloadHandler = () => {
    setReload(!reload);
  };

  const showUnitsHandler = () => toggleComponent("Kojce", true);
  const showForageHandler = () => toggleComponent("Paśnik", false, true);
  const showGlobalHandler = () =>
    toggleComponent("Globalne pomiary", false, false, true);
  const showWaterHandler = () =>
    toggleComponent("Woda", false, false, false, true);
  const showSoldHandler = () =>
    toggleComponent("Sprzedaż", false, false, false, false, true);
  const showDeadHandler = () =>
    toggleComponent("Zgony", false, false, false, false, false, true);

  const toggleExams = () => setShowExams(!showExams);

  const setUnit = (id) => setUnitID(id);

  return (
    <StyledApp>
      <Navbar
        unitsHandler={showUnitsHandler}
        forageHandler={showForageHandler}
        globalHandler={showGlobalHandler}
        waterHandler={showWaterHandler}
        soldHandler={showSoldHandler}
        deadHandler={showDeadHandler}
      />
      <StyledDivTop>
        <StyledParagraphTop>OBB-SYS | {headerMode}</StyledParagraphTop>
      </StyledDivTop>
      {showGlobal && (
        <GlobalDataContainer reloadHandler={reloadHandler} reload={reload} />
      )}
      {showUnits && (
        <StandardUnitsContainer
          toggleExams={toggleExams}
          setUnitID={setUnit}
          reloadHandler={reloadHandler}
          reload={reload}
        />
      )}
      {showSold && (
        <SoldUnitsContainer
          isOn={showSold}
          reloadHandler={reloadHandler}
          reload={reload}
        />
      )}
      {showDead && (
        <DeadUnitsContainer
          isOn={showDead}
          reloadHandler={reloadHandler}
          reload={reload}
        />
      )}
      {showExams && (
        <ExamContainer
          toggleExams={toggleExams}
          unitID={unitID}
          reload={reload}
        />
      )}
      <StyledHiddenReload>{reload.toString()}</StyledHiddenReload>
    </StyledApp>
  );
};

export default App;
