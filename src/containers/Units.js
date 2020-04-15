import React, { useState, useEffect, useRef } from "react";
import { Table, Button } from "react-bootstrap";
import shortid from "shortid";
import AddForm from "../components/UI/Forms/AddForm";
import Head from "../components/UI/Table/Head";
import Body from "../components/UI/Table/Body";
import Menu from "../components/Menu/Menu";
import EditUnitForm from "../components/UI/Forms/EditUnitForm";
import styled from "styled-components";
import ArrowKeysReact from "arrow-keys-react";

const StyledButton = styled(Button)`
  margin-top: 1em;
  margin-right: 1em;
  margin-left: 1em;
  border-radius: .5;
  border: none;
  background-color: #30d158 !important;
  outline: none;

  &:hover {
    background-color: #29b64c !important;
  }
`;

const StyledUnitsContainer = styled.div`
  top: 8%;
  width: 88%;
  height: 90%;
  position: absolute;
  right: 1%;
  transform: translate(0%, 0%);
  margin: auto;
  outline: none;
`;

const StyledUnitsTable = styled.div`
  padding-top: 0em;
  padding-bottom: 0em;
  margin: 0 auto;
  margin-bottom: 1em !important;
  margin-top: 1em !important;
  background-color: #424242;
  width: 100%;
  transition-duration: 0.5s;
  border-radius: 0.25em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  font-size: 1em;
`;

const StyledTableContent = styled.div`
  background-color: transparent !important;
  padding: 1em;
`;

const Units = (props, { initId = 1, initForm = false }) => {
  const _date = new Date();

  const [dataUnits, setDataUnits] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [id, setId] = useState(initId);
  const [idPig, setIdPig] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(_date);
  const [price, setPrice] = useState("0");
  const [editMenu, setEditMenu] = useState(false);
  const [showDeadSoldForm, setShowDeadSoldForm] = useState(false);

  const getUnitsData = async (id) => {
    await fetch(`https://obb-api.herokuapp.com/active-pigs/${id}`)
      .then((res) => res.json())
      .then((res) => setDataUnits(res))
      .catch((e) => e);
  };

  useEffect(() => {
    getUnitsData(id);
    
    props.headerHandler("standard", id);

    ArrowKeysReact.config({
      left: () => idDecrease(),
      right: () => idIncrease(),
    });
  }, [id, props.reload]); //..,data] makes loop //id should change only on select

  const showForm = (pen, id, gender, date, price) => {
    setId(pen);
    setIdPig(id);
    props.setUnitID(id);
    setGender(gender);
    setDate(date);
    setPrice(price);

    toggleMenu();
  };

  const toggleEdit = () => {
    setEditMenu(!editMenu);
  };

  const hideEdit = () => {
    setEditMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const showDeadSoldHandler = () => {
    setShowDeadSoldForm(!showDeadSoldForm);
    hideEdit();
  };

  const idIncrease = () => {
    if (id === 6) {
      setId(1);
    } else {
      let identifier = id;
      identifier++;
      setId(identifier);
    }
  };

  const idDecrease = () => {
    if (id === 1) {
      setId(6);
    } else {
      let identifier = id;
      identifier--;
      setId(identifier);
    }
  };

  return (
    <StyledUnitsContainer {...ArrowKeysReact.events} tabIndex="1">
      <div>
        <StyledButton onClick={idDecrease}>Poprzedni</StyledButton>
        <StyledButton onClick={idIncrease}>Następny</StyledButton>    
      </div>
      <StyledUnitsTable>
        <StyledTableContent>
          <Table bordered hover variant="dark">
            <thead>
              <Head data={["ID", "Płeć", "Data zakupu", "Cena"]} divider={5} />
            </thead>
            <tbody>
              {dataUnits.map((data, index) => (
                <Body
                  mode="standard"
                  key={`${data.id}${shortid.generate()}`}
                  data={data}
                  divider={5}
                  showForm={showForm.bind(
                    this,
                    data.idPen,
                    data.id,
                    data.pigGender,
                    data.pigShoppingDate,
                    data.pigShoppingPrice
                  )}
                />
              ))}
            </tbody>
          </Table>
          {showMenu && (
            <Menu
              mode="pigs"
              id={idPig}
              idPen={id}
              url="https://obb-api.herokuapp.com/delete-pig/"
              deadSoldMode={showDeadSoldForm}
              showExams={props.toggleExams}
              showMenu={toggleMenu}
              showDeadSoldHandler={showDeadSoldHandler}
              reloadHandler={props.reloadHandler}
              showEditHandler={toggleEdit}
              hideEditHandler={hideEdit}
            />
          )}
        </StyledTableContent>
      </StyledUnitsTable>
      {props.showAddForm && (
        <AddForm
          id={id}
          showAddUnitHandler={props.hideAddForm}
          reloadHandler={props.reloadHandler}
        />
      )}
      {editMenu && (
        <EditUnitForm
          id={id}
          idPig={idPig}
          gender={gender}
          date={date}
          price={price}
          showEditHandler={toggleEdit}
          reloadHandler={props.reloadHandler}
          showMenuHandler={toggleMenu}
          showDeadSoldHandler={showDeadSoldHandler}
        />
      )}
    </StyledUnitsContainer>
  );
};

export default Units;
