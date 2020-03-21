import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import shortid from "shortid";
import AddForm from "./../components/Forms/AddForm";
import AddButton from "./../components/Buttons/AddButton";
import Head from "./../components/Table/Head";
import Body from "./../components/Table/Body";
import Menu from "./../components/Menu/Menu";
import EditUnitForm from "./../components/Forms/EditUnitForm";

const StandardUnitsContainer = (props, { initId = 1, initForm = false }) => {
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
    getUnitsData(id)
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

 

  return (
    <div className="UnitsContainer">
      <div>
        <select
          className="penSelect"
          id="pens"
          onChange={updateState.bind(this)}
          value={id}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <AddButton toggleHandler={toggleAddForm} />
      </div>
      <div className="UnitsTable">
        <div className="TableContent">
          <Table bordered hover variant="dark">
            <thead>
              <Head data={["Kojec", "Id", "Płeć", "Data zakupu", "Cena"]} />
            </thead>
            <tbody>
              {dataUnits.map((data, index) => (
                <Body
                  key={`${data.id}${shortid.generate()}`}
                  data={data}
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
