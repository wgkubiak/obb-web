import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Units from "./containers/Units";
import Global from "./containers/Global";
import Sold from "./containers/Sold";
import DeadUnits from "./containers/DeadUnits";
import AddButton from "./components/UI/Buttons/AddButton";
import Exams from "./containers/Exams";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  StyledApp,
  StyledFigure,
  StyledHeader,
  StyledListGroup,
  StyledListGroupItem,
  StyledFigcaption,
  StyledDivTop,
  StyledParagraphTop,
  StyledParagraphMid,
  StyledHiddenReload,
  StyledForageIcon,
  StyledGlobalIcon,
  StyledPastureIcon,
  StyledWaterIcon,
  StyledSoldIcon,
  StyledDeadIcon,
} from "./Styles";

const App = () => {
  const [showExams, setShowExams] = useState(false);

  const [showAddButton, setShowAddButton] = useState(true);

  const [unitID, setUnitID] = useState("");
  const [reload, setReload] = useState(false);

  const [headerMode, setHeaderMode] = useState("Kojec | 1");
  const [showAddForm, setShowAddForm] = useState(false);

  const headerHandler = (mode, unit) => {
    switch (mode) {
      case "standard":
        setHeaderMode(`Kojec | ${unit}`);
        showButtonHandler();
        break;
      case "global":
        setHeaderMode("Pomiary globalne");
        showButtonHandler();
        break;
      case "sold":
        setHeaderMode("Sprzedane");
        hideButtonHandler();
        break;
      case "dead":
        setHeaderMode("Zgony");
        hideButtonHandler();
        break;
    }
  };

  const showButtonHandler = () => {
    setShowAddButton(true);
  };

  const hideButtonHandler = () => {
    setShowAddButton(false);
  };

  const reloadHandler = () => {
    setReload(!reload);
  };

  const toggleExams = () => setShowExams(!showExams);

  const setUnit = (id) => setUnitID(id);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const hideAddForm = () => {
    setShowAddForm(false);
  };

  const activeStyle = {
    textDecoration: "underline 1px solid white !important",
    borderRight: "3px solid #30d158",
    outline: "none",
  };

  return (
    <StyledApp>
      {showAddButton && <AddButton toggleHandler={toggleAddForm} />}
      <StyledDivTop>
        <StyledParagraphTop>OBBsys</StyledParagraphTop>
        <StyledParagraphMid>{headerMode}</StyledParagraphMid>
      </StyledDivTop>

      {showExams && (
        <Exams toggleExams={toggleExams} unitID={unitID} reload={reload} reloadHandler={reloadHandler} />
      )}
      <StyledHiddenReload>{reload.toString()}</StyledHiddenReload>
      <div>
        <Router>
          <StyledHeader>
            <StyledListGroup variant="flush" defaultActiveKey="#obb-groups">
              <NavLink exact activeStyle={activeStyle} to="/">
                <StyledListGroupItem>
                  <StyledFigure>
                    <StyledForageIcon size={24} />
                  </StyledFigure>
                  <StyledFigcaption>Kojce</StyledFigcaption>
                </StyledListGroupItem>
              </NavLink>
              <NavLink to="/global" activeStyle={activeStyle}>
                <StyledListGroupItem>
                  <StyledFigure>
                    <StyledGlobalIcon size={24} />
                  </StyledFigure>
                  <StyledFigcaption>Globalne</StyledFigcaption>
                </StyledListGroupItem>
              </NavLink>
              <NavLink to="/water" activeStyle={activeStyle}>
                <StyledListGroupItem>
                  <StyledFigure>
                    <StyledWaterIcon size={24} />
                  </StyledFigure>
                  <StyledFigcaption>Woda</StyledFigcaption>
                </StyledListGroupItem>
              </NavLink>
              <NavLink to="/sold" activeStyle={activeStyle}>
                <StyledListGroupItem>
                  <StyledFigure>
                    <StyledSoldIcon size={24} />
                  </StyledFigure>
                  <StyledFigcaption>Sprzedaż</StyledFigcaption>
                </StyledListGroupItem>
              </NavLink>
              <NavLink to="/dead" activeStyle={activeStyle}>
                <StyledListGroupItem>
                  <StyledFigure>
                    <StyledDeadIcon size={24} />
                  </StyledFigure>
                  <StyledFigcaption>Zgon</StyledFigcaption>
                </StyledListGroupItem>
              </NavLink>
            </StyledListGroup>
          </StyledHeader>
          <Route exact path="/">
            <Units
              toggleExams={toggleExams}
              setUnitID={setUnit}
              reloadHandler={reloadHandler}
              reload={reload}
              showAddForm={showAddForm}
              hideAddForm={hideAddForm}
              headerHandler={headerHandler}
            />
          </Route>
          <Route path="/global">
            <Global
              reloadHandler={reloadHandler}
              reload={reload}
              showAddForm={showAddForm}
              hideAddForm={hideAddForm}
              headerHandler={headerHandler}
            />
          </Route>
          <Route path="/water">
            <Units
              toggleExams={toggleExams}
              setUnitID={setUnit}
              reloadHandler={reloadHandler}
              reload={reload}
              showAddForm={showAddForm}
              hideAddForm={hideAddForm}
              headerHandler={headerHandler}
            />
          </Route>
          <Route path="/sold">
            <Sold
              reloadHandler={reloadHandler}
              reload={reload}
              headerHandler={headerHandler}
            />
          </Route>
          <Route path="/dead">
            <DeadUnits
              reloadHandler={reloadHandler}
              reload={reload}
              headerHandler={headerHandler}
            />
          </Route>
        </Router>
      </div>
    </StyledApp>
  );
};

export default App;
