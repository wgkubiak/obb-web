import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteButton from "../Buttons/DeleteButton";
import UndoneButton from "../Buttons/UndoneButton";
import SoldDeadForm from "../Forms/SoldDeadForm";
import { FiEdit3 } from "react-icons/fi";

const Menu = (props, { initShow = false }) => {
  const [show, setShow] = useState(initShow);
  const [showDeadSoldForm, setShowDeadSoldForm] = useState(false);

  const showDeadSoldHandler = () => setShowDeadSoldForm(!showDeadSoldForm);

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
            {(props.mode === "pigs" || props.mode === "dead") && (
              <Button variant="dark">Wyświetl badania</Button>
            )}
            {props.mode === "pigs" && (
              <Button variant="dark">Dodaj badanie</Button>
            )}
            {props.mode === "pigs" && (
              <Button variant="dark" onClick={showDeadSoldHandler}>Zgon/Sprzedaż</Button>
            )}
            {(props.mode === "pigs" || props.mode === "dead" || props.mode === "sold") && (
              <Button variant="dark">Edytuj</Button>
            )}
            {(props.mode === "dead" || props.mode === "sold") && (
              <UndoneButton id={props.id} mode={props.mode}></UndoneButton>
            )}
            <DeleteButton
              id={props.id}
              url="https://obb-api.herokuapp.com/delete-pig/"
              idPen={props.idPen}
              showSelection={props.showSelection}
              reloadHandler={props.reloadHandler}
              deleteInfoHandler={showInfoHandler}
            />
          </>
        )}
        {show && <h4 className="deleted-unit-info">Obiekt usunięto</h4>}
        {showDeadSoldForm && <SoldDeadForm id={props.id} showHandler={showDeadSoldHandler}/>}
      </div>
    </div>
  );
};

export default Menu;
