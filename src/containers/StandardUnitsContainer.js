import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import shortid from "shortid";
import AddForm from "./../components/Forms/AddForm";
import AddButton from "./../components/Buttons/AddButton";
import Head from "./../components/Table/Head";
import Body from "./../components/Table/Body";
import Menu from "./../components/Menu/Menu";
import EditUnitForm from "./../components/Forms/EditUnitForm";
import {GoArrowLeft, GoArrowRight} from "react-icons/go"
import styled from "styled-components";

const StyledSVGArrowLeft = styled(GoArrowLeft)`
  color: #5E35B1;
  transition: 500ms;

  &:hover {
    color: #4527A0;
  }
`;

const StyledSVGArrowRight = styled(GoArrowRight)`
  color: #5E35B1;
  transition: 500ms;
  
  &:hover {
    color: #4527A0;
  }
`;

const StandardUnitsContainer = (props, { initId = 1, initForm = false }) => {
  let unitsContainer = useRef(null);

  const _date = new Date();

  const [dataUnits, setDataUnits] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [id, setId] = useState(initId);
  const [idPig, setIdPig] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(_date);
  const [price, setPrice] = useState('0');

  const [showAddForm, setShowAddForm] = useState(initForm);
  const [editMenu, setEditMenu] = useState(false);
  const [showDeadSoldForm, setShowDeadSoldForm] = useState(false);

  const getUnitsData = async (id) => {
    await fetch(`https://obb-api.herokuapp.com/active-pigs/${id}`)
      .then(res => res.json())
      .then(res => setDataUnits(res))
      .catch(e => e);
  };

  useEffect(() => {
    getUnitsData(id);
    props.headerHandler(id);
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
    setShowAddForm(false);
    setShowDeadSoldForm(false);
  }

  const hideEdit = () => {
    setEditMenu(false);
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowAddForm(false);
  };

  const updateState = event => {
    setId(event.target.value);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    setShowMenu(false);
  };

  const showDeadSoldHandler = () => {
    setShowDeadSoldForm(!showDeadSoldForm);
    hideEdit();
  }

  const idIncrease = () => {
    if(id === 6) {
      setId(1);
    } else {
      let identifier = id;
      identifier++;
      setId(identifier);
    }
  }

  const idDescrease = () => {
    if(id === 1) {
      setId(6);
    } else {
      let identifier = id;
      identifier--;
      setId(identifier);
    }  
  }

  return (
    <div className="UnitsContainer">
      <div>
      <StyledSVGArrowLeft size={64} onClick={idDescrease}/>
        <StyledSVGArrowRight size={64} onClick={idIncrease}/>
        <AddButton toggleHandler={toggleAddForm} />
      </div>
      <div className="UnitsTable" ref={e => {unitsContainer = e}}>
        <div className="TableContent">
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
                  showForm={showForm.bind(this, data.idPen, data.id, data.pigGender, data.pigShoppingDate, data.pigShoppingPrice)}
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
              //reloadHandler={props.reloadHandler}
            />
          )}
        </div>
      </div>
      {showAddForm && (
        <AddForm
          id={id}
          showAddUnitHandler={toggleAddForm}
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
    </div>
  );
};

export default StandardUnitsContainer;
