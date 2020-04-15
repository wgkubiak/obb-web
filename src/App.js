import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { MdDns, MdWeb, MdEqualizer } from "react-icons/md";
import { GiWaterDrop } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import Units from "./containers/Units";
import Global from "./containers/Global";
import Sold from "./containers/Sold";
import DeadUnits from "./containers/DeadUnits";
import AddButton from "./components/UI/Buttons/AddButton";
import Exams from "./containers/Exams";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styled from "styled-components";

const StyledFigure = styled.figure`
  margin: 0 0 0.1rem !important;
`;

const StyledHeader = styled.header`
  top: 4em;
  width: 10%;
  height: 100%;
  position: fixed;
  background-color: #424242;
  color: #000000;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
`;

const StyledListGroup = styled(ListGroup)`
  top: 0%;
  position: relative;
  width: auto;
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  justify-content: left;
  display: flex;
  flex-direction: column;
  outline: none;
`;

const StyledApp = styled.div`
  text-align: center;
`;

const StyledDivTop = styled.div`
  width: 100%;
  height: 4em;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #424242;
  z-index: 20;
`;

const StyledParagraphTop = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  width: 10%;
  top: 50%;
  left: 0%;
  transform: translate(0%, -50%);
  font-size: calc(2vh + 1vw);
  height: 100%;
  text-align: center;
  background-color: #1b1b1b;
  color: rgba(255, 255, 255, 0.87);
`;

const StyledParagraphMid = styled.div`
  position: absolute;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  top: 0%;
  width: 10%;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
`;

const StyledHiddenReload = styled.h1`
  display: none;
`;
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

  const setHeaderHandler = (id) => setHeaderMode(`Kojec | ${id}`);

  const toggleExams = () => setShowExams(!showExams);

  const setUnit = (id) => setUnitID(id);

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    //TODO: hide menu while toggleAddForm is clicked
  };

  const hideAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <StyledApp>
      {showAddButton && <AddButton toggleHandler={toggleAddForm} />}
      <StyledDivTop>
        <StyledParagraphTop>OBBsys</StyledParagraphTop>
        <StyledParagraphMid>{headerMode}</StyledParagraphMid>
      </StyledDivTop>

      {showExams && (
        <Exams toggleExams={toggleExams} unitID={unitID} reload={reload} />
      )}
      <StyledHiddenReload>{reload.toString()}</StyledHiddenReload>
      <div>
        <Router>
          <StyledHeader>
            <StyledListGroup variant="flush" defaultActiveKey="#obb-groups">
              <NavLink
                exact
                activeStyle={{
                  textDecoration: "underline 1px solid white !important",
                  borderRight: "3px solid #30d158",
                  outline: "none",
                }}
                to="/"
              >
                <StyledListGroupItem>
                  <StyledFigure>
                    <MdWeb size={24} style={{ color: "#30d158" }} />
                  </StyledFigure>
                  <figcaption
                    style={{
                      fontSize: "calc(.8vw + .2vh)",
                      color: "rgba(255, 255, 255, 0.87)",
                      fontWeight: "500",
                    }}
                  >
                    Kojce
                  </figcaption>
                </StyledListGroupItem>
              </NavLink>
              <NavLink
                to="/global"
                activeStyle={{
                  textDecoration: "underline 1px solid white !important",
                  borderRight: "3px solid #30d158",
                  outline: "none",
                }}
              >
                <StyledListGroupItem>
                  <StyledFigure>
                    <MdEqualizer size={24} style={{ color: "#30d158" }} />
                  </StyledFigure>
                  <figcaption
                    style={{
                      fontSize: "calc(.8vw + .2vh)",
                      color: "rgba(255, 255, 255, 0.87)",
                      fontWeight: "500",
                    }}
                  >
                    Globalne
                  </figcaption>
                </StyledListGroupItem>
              </NavLink>

              <NavLink
                to="/forage"
                activeStyle={{
                  textDecoration: "underline 1px solid white !important",
                  borderRight: "3px solid #30d158",
                  outline: "none",
                }}
              >
                <StyledListGroupItem>
                  <StyledFigure>
                    <MdDns size={24} style={{ color: "#30d158" }} />
                  </StyledFigure>
                  <figcaption
                    style={{
                      fontSize: "calc(.8vw + .2vh)",
                      color: "rgba(255, 255, 255, 0.87)",
                      fontWeight: "500",
                    }}
                  >
                    Paśnik
                  </figcaption>
                </StyledListGroupItem>
              </NavLink>

              <NavLink
                to="/water"
                activeStyle={{
                  textDecoration: "underline 1px solid white !important",
                  borderRight: "3px solid #30d158",
                  outline: "none",
                }}
              >
                <StyledListGroupItem>
                  <StyledFigure>
                    <GiWaterDrop size={24} style={{ color: "#30d158" }} />
                  </StyledFigure>
                  <figcaption
                    style={{
                      fontSize: "calc(.8vw + .2vh)",
                      color: "rgba(255, 255, 255, 0.87)",
                      fontWeight: "500",
                    }}
                  >
                    Woda
                  </figcaption>
                </StyledListGroupItem>
              </NavLink>

              <NavLink
                to="/sold"
                activeStyle={{
                  textDecoration: "underline 1px solid white !important",
                  borderRight: "3px solid #30d158",
                  outline: "none",
                }}
              >
                <StyledListGroupItem>
                  <StyledFigure>
                    <FaShoppingCart size={24} style={{ color: "#30d158" }} />
                  </StyledFigure>
                  <figcaption
                    style={{
                      fontSize: "calc(.8vw + .2vh)",
                      color: "rgba(255, 255, 255, 0.87)",
                      fontWeight: "500",
                    }}
                  >
                    Sprzedaż
                  </figcaption>
                </StyledListGroupItem>
              </NavLink>

              <NavLink
                to="/dead"
                activeStyle={{
                  textDecoration: "underline 1px solid white !important",
                  borderRight: "3px solid #30d158",
                  outline: "none",
                }}
              >
                <StyledListGroupItem>
                  <StyledFigure>
                    <TiUserDelete size={24} style={{ color: "#30d158" }} />
                  </StyledFigure>
                  <figcaption
                    style={{
                      fontSize: "calc(.8vw + .2vh)",
                      color: "rgba(255, 255, 255, 0.87)",
                      fontWeight: "500",
                    }}
                  >
                    Zgon
                  </figcaption>
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
          <Route path="/forage">
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
