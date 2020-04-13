import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { MdDns, MdWeb, MdEqualizer } from "react-icons/md";
import { GiWaterDrop } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import StandardUnitsContainer from "./containers/StandardUnitsContainer";
import GlobalDataContainer from "./containers/GlobalDataContainer";
import SoldUnitsContainer from "./containers/SoldUnitsContainer";
import DeadUnitsContainer from "./containers/DeadUnitsContainer";
import AddButton from "./components/Buttons/AddButton";
import ExamContainer from "./containers/ExamContainer";
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
  background-color: #546e7a;
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
  background-color: #546e7a;
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
  background-color: #29434e;
  color: #ffffff;
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
  color: #ffffff;
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
    switch(mode) {
      case "standard": 
        setHeaderMode(`Kojec | ${unit}`)
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
  }

  const showButtonHandler =() => {
    setShowAddButton(true)
  }

  const hideButtonHandler = () => {
    setShowAddButton(false)
  }

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
        <ExamContainer
          toggleExams={toggleExams}
          unitID={unitID}
          reload={reload}
        />
      )}
      <StyledHiddenReload>{reload.toString()}</StyledHiddenReload>
      <div>
        <Router>
          <StyledHeader>
            <StyledListGroup variant="flush" defaultActiveKey="#obb-groups">
              <Link to="/">
                <StyledListGroupItem>
                  <StyledFigure>
                    <MdWeb size={24} style={{ color: "white" }} />
                  </StyledFigure>
                  <figcaption
                    style={{ fontSize: "calc(.8vw + .2vh)", color: "white" }}
                  >
                    Kojce
                  </figcaption>
                </StyledListGroupItem>
              </Link>
              <Link to="/global">
                <StyledListGroupItem>
                  <StyledFigure>
                    <MdEqualizer size={24} style={{ color: "white" }} />
                  </StyledFigure>
                  <figcaption
                    style={{ fontSize: "calc(.8vw + .2vh)", color: "white" }}
                  >
                    Globalne
                  </figcaption>
                </StyledListGroupItem>
              </Link>

              <Link to="/forage">
                <StyledListGroupItem>
                  <StyledFigure>
                    <MdDns size={24} style={{ color: "white" }} />
                  </StyledFigure>
                  <figcaption
                    style={{ fontSize: "calc(.8vw + .2vh)", color: "white" }}
                  >
                    Paśnik
                  </figcaption>
                </StyledListGroupItem>
              </Link>

              <Link to="/water">
                <StyledListGroupItem>
                  <StyledFigure>
                    <GiWaterDrop size={24} style={{ color: "white" }} />
                  </StyledFigure>
                  <figcaption
                    style={{ fontSize: "calc(.8vw + .2vh)", color: "white" }}
                  >
                    Woda
                  </figcaption>
                </StyledListGroupItem>
              </Link>

              <Link to="/sold">
                <StyledListGroupItem>
                  <StyledFigure>
                    <FaShoppingCart size={24} style={{ color: "white" }} />
                  </StyledFigure>
                  <figcaption
                    style={{ fontSize: "calc(.8vw + .2vh)", color: "white" }}
                  >
                    Sprzedaż
                  </figcaption>
                </StyledListGroupItem>
              </Link>

              <Link to="/dead">
                <StyledListGroupItem>
                  <StyledFigure>
                    <TiUserDelete size={24} style={{ color: "white" }} />
                  </StyledFigure>
                  <figcaption
                    style={{ fontSize: "calc(.8vw + .2vh)", color: "white" }}
                  >
                    Zgon
                  </figcaption>
                </StyledListGroupItem>
              </Link>
            </StyledListGroup>
          </StyledHeader>
          <Route exact path="/">
            <StandardUnitsContainer
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
            <GlobalDataContainer
              reloadHandler={reloadHandler}
              reload={reload}
              showAddForm={showAddForm}
              hideAddForm={hideAddForm}
              headerHandler={headerHandler}
            />
          </Route>
          <Route path="/forage">
            <StandardUnitsContainer
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
            <StandardUnitsContainer
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
            <SoldUnitsContainer
              reloadHandler={reloadHandler}
              reload={reload}
              headerHandler={headerHandler}
            />
          </Route>
          <Route path="/dead">
            <DeadUnitsContainer
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
