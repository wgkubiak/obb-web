import React, { useState } from "react";
import { useHistory, BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import {RiLogoutBoxLine} from "react-icons/ri";
import LoginScreen from "./containers/LoginScreen";
import Units from "./containers/Units";
import Global from "./containers/Global";
import Sold from "./containers/Sold";
import DeadUnits from "./containers/DeadUnits";
import Water from "./containers/Water";
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
  const history = useHistory();

  const [logIn, setLogIn] = useState(localStorage.getItem("login"));

  const [showExams, setShowExams] = useState(false);

  const [showAddButton, setShowAddButton] = useState(true);

  const [unitID, setUnitID] = useState("");
  const [reload, setReload] = useState(false);

  const [unitsMode, setUnitsMode] = useState(true);

  const [headerMode, setHeaderMode] = useState("Kojec | 1");
  const [showAddForm, setShowAddForm] = useState(false);

  const routeToMainSite = () => history.push('/');

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
      case "water":
        setHeaderMode("Woda");
        hideButtonHandler();
        break;
      case "dead":
        setHeaderMode("Zgony");
        hideButtonHandler();
        break;
      default:
        break;
    }
  };

  const loginHandler = () => setLogIn(true);

  const logoutHandler = () => {
    setLogIn(false);
    localStorage.clear();
  }

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
    window.scrollTo(0, 0);
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
    <StyledApp className="app">
      {!logIn && <LoginScreen loginHandler={loginHandler} routeHandler={routeToMainSite}/>}
      {showAddButton && logIn && <AddButton toggleHandler={toggleAddForm} />}
      {logIn && (
        <StyledDivTop>
          <StyledParagraphTop>OBBsys</StyledParagraphTop>
          <StyledParagraphMid>{headerMode}</StyledParagraphMid>
        </StyledDivTop>
      )}

      {showExams && logIn && (
        <Exams
          toggleExams={toggleExams}
          unitID={unitID}
          reload={reload}
          reloadHandler={reloadHandler}
          unitsMode={unitsMode}
        />
      )}
      <StyledHiddenReload>{reload.toString()}</StyledHiddenReload>
      {logIn && (
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
             <NavLink to="/login">
              <StyledListGroupItem onClick={() => logoutHandler()} style={{marginTop: "1em"}}>
                  <StyledFigure>
                    <RiLogoutBoxLine style={{color: "white"}} size={24}/>
                  </StyledFigure>
                  <StyledFigcaption>Wyloguj</StyledFigcaption>
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
              unitsModeHandler={setUnitsMode}
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
            <Water
               reloadHandler={reloadHandler}
               reload={reload}
               headerHandler={headerHandler}
            />
          </Route>
          <Route path="/sold">
            <Sold
              toggleExams={toggleExams}
              reloadHandler={reloadHandler}
              reload={reload}
              unitIDHandler={setUnitID}
              headerHandler={headerHandler}
              unitsModeHandler={setUnitsMode}
            />
          </Route>
          <Route path="/dead">
            <DeadUnits
              toggleExams={toggleExams}
              reloadHandler={reloadHandler}
              unitIDHandler={setUnitID}
              reload={reload}
              headerHandler={headerHandler}
              unitsModeHandler={setUnitsMode}
            />
          </Route>
          <Route path="/login">
            <LoginScreen loginHandler={loginHandler}/>
          </Route>
        </Router>
      </div>
      )}
    </StyledApp>
  );
};

export default App;
