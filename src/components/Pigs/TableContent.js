import React, { useState, useEffect} from "react";
import { Table } from "react-bootstrap";
import Menu from "./Menu";

const TableContent = props => {
  const [dataUnits, setDataUnits] = useState([]);
  const [idPig, setIdPig] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const getUnitsData = id => {
    fetch(`https://obb-api.herokuapp.com/active-pigs/${id}`)
      .then(res => res.json())
      .then(res => setDataUnits(res))
      .catch(e => e);
  };

  const showForm = id => {
    setIdPig(id);
    toggleMenu();
  };

  useEffect(() => {
    getUnitsData(props.idPen);
  }, [dataUnits, props.idPen]);

  return (
    <div className="UnitsTable">
      <div className="TableContent">
        <Table bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Płeć</th>
              <th>Data zakupu</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {dataUnits.map((data, index) => (
              <tr key={`${data.id}key`} onClick={showForm.bind(this, data.id)}>
                <td>{data.id}</td>
                <td>{data.pigGender === "m" ? "Samiec" : "Samica"}</td>
                <td>{data.pigShoppingDate.substring(0, 10)}</td>
                <td>{data.pigShoppingPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {showMenu && (
          <Menu
            id={idPig}
            idPen={props.idPen}
            showMenu={toggleMenu}
            reloadHandler={props.reloadHandler}
          />
        )}
      </div>
    </div>
  );
};

export default TableContent;
