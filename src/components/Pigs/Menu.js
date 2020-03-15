import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import { FiEdit3 } from "react-icons/fi";

const Menu = (props, { initShow = false }) => {
  const [show, setShow] = useState(initShow);

  const showInfoHandler = () => {
    setShow(true);
  };

  return (
    <div className="Selection">
      <Button
        className="hide-selection"
        variant="dark"
        onClick={props.showMenu}
      >
        Ukryj
      </Button>
      <FiEdit3 className="edit-icon" />
      <h4>
        <strong>#{props.id}</strong>
      </h4>
      <div className="btnContainer">
        {!show && (
          <>
            <Button variant="dark">Wyświetl badania</Button>
            <Button variant="dark">Dodaj badanie</Button>
            <Button variant="dark">Zgon/Sprzedaż</Button>
            <Button variant="dark">Edytuj</Button>
            <DeleteButton
              id={props.id}
              idPen={props.idPen}
              showSelection={props.showSelection}
              reloadHandler={props.reloadHandler}
              deleteInfoHandler={showInfoHandler}
            />
          </>
        )}
        {show && <h4 className="deleted-unit-info">Obiekt usunięto</h4>}
      </div>
    </div>
  );
};

export default Menu;
