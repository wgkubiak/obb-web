import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TableContent from "../components/Units/TableContent";
import AddForm from "./../components/Forms/AddForm";

const UnitsContainer = ({ initId = 1, initForm = false }) => {
  const [dataPens, setDataPens] = useState([]);
  const [id, setId] = useState(initId);
  const [showAddForm, setShowAddForm] = useState(initForm);

  const getPensData = id => {
    fetch(`https://obb-api.herokuapp.com/pens/${id}`)
      .then(res => res.json())
      .then(res => setDataPens(res))
      .catch(e => e);
  };

  useEffect(() => {
    getPensData(id);
  }, [id]);

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
        <Button className="addBtn" variant="secondary" onClick={toggleAddForm}>
          DODAJ
        </Button>
      </div>
      {dataPens.map((data, index) => (
        <TableContent
          key={`unit${index}`}
          idPen={id}
          index={data.id}
          size={data.size}
          isolated={data.isolated ? "TAK" : "NIE"}
          reloadHandler={updateStateByID}
        ></TableContent>
      ))}
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

export default UnitsContainer;
