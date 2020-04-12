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
  height: 4em;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #546e7a;
  z-index: 20;
`;

const StyledParagraphTop = styled.div`
  position: relative;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  width: 10%;
  top: 50%;
  left: 0%;
  transform: translate(0%, -50%);
  font-size: calc(2vh + 1vw);
  height: 100%;
  text-align: center;
  background-color: #29434e;
  color: #ffffff;
`;

const StyledParagraphMid = styled.div`
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  top: 0%;
  width: 10%;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  text-align: center;
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

  const [headerMode, setHeaderMode] = useState("Kojec (1)");

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

  const setHeaderHandler = id => setHeaderMode(`Kojec (${id})`); 
  const showUnitsHandler = () => toggleComponent("Kojec (1)", true);
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
        <StyledParagraphTop>OBBsys</StyledParagraphTop>
        <StyledParagraphMid>{headerMode}</StyledParagraphMid>
      </StyledDivTop>
      {showGlobal && (
        <GlobalDataContainer reloadHandler={reloadHandler} reload={reload} />
      )}
      {showUnits && (
        <StandardUnitsContainer
          headerHandler={setHeaderHandler}
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
