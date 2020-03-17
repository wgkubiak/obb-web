import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import shortid from "shortid";
import AddForm from "./../components/Forms/AddForm";
import AddButton from "./../components/Buttons/AddButton";
import Head from "./../components/Table/Head";
import Body from "./../components/Table/Body";
import Menu from "./../components/Menu/Menu";

const StandardUnitsContainer = (props, { initId = 1, initForm = false }) => {
  const [dataUnits, setDataUnits] = useState([]);
  const [idPig, setIdPig] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  // const [dataPens, setDataPens] = useState([]);
  const [id, setId] = useState(initId);
  const [showAddForm, setShowAddForm] = useState(initForm);

  // const getPensData = id => {
  //   fetch(`https://obb-api.herokuapp.com/pens/${id}`)
  //     .then(res => res.json())
  //     .then(res => setDataPens(res))
  //     .catch(e => e);
  // };

  const getUnitsData = id => {
    fetch(`https://obb-api.herokuapp.com/active-pigs/${id}`)
      .then(res => res.json())
      .then(res => setDataUnits(res))
      .catch(e => e);
  };

  useEffect(() => {
    // getPensData(id);
    getUnitsData(id);
  }, [id]);

  const showForm = id => {
    setIdPig(id);
    toggleMenu();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const updateState = event => {
    setId(event.target.value);
  };

  const updateStateByID = id => {
    setId(id);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

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
                  showForm={showForm.bind(this, data.id)}
                />
              ))}
            </tbody>
          </Table>
          {showMenu && (
            <Menu
              mode="pigs"
              id={idPig}
              idPen={id}
              showMenu={toggleMenu}
              //reloadHandler={props.reloadHandler}
            />
          )}
        </div>
      </div>
      {showAddForm && (
        <AddForm
          id={id}
          showAddUnitHandler={toggleAddForm}
          reloadHandler={updateStateByID}
        />
      )}
    </div>
  );
};

export default StandardUnitsContainer;
