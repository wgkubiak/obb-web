import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteButton from "../Buttons/DeleteButton";
import UndoneButton from "../Buttons/UndoneButton";
import SoldDeadForm from "../Forms/SoldDeadForm";
import SoldDeadEditForm from "../Forms/SoldDeadEditForm";
import { FiEdit3 } from "react-icons/fi";

const Menu = (props, { initShow = false }) => {
  const [show, setShow] = useState(initShow);
  
  const showInfoHandler = () => {
    setShow(true);
  };

  const hideEverything = () => {
    props.showMenu();
    if(props.showEditHandler !== undefined && props.showEditHandler !== null) {
      props.hideEditHandler();
    }
  }

  return (
    <div className="Selection">
      <Button
        className="hide-selection"
        variant="dark"
        onClick={hideEverything}
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
            {(props.mode === "pigs" || props.mode === "dead" || props.mode === "sold") && (
              <Button variant="dark">Wyświetl badania</Button>
            )}
            {props.mode === "pigs" && (
              <Button variant="dark">Dodaj badanie</Button>
            )}
            {props.mode === "pigs" && (
              <Button variant="dark" onClick={props.showDeadSoldHandler}>Zgon/Sprzedaż</Button>
            )}
            {(props.mode === "pigs") && (
              <Button variant="dark" onClick={props.showEditHandler}>Edytuj</Button>
            )}
            {(props.mode === "sold") && (
              <Button variant="dark" onClick={props.showEdit}>Edytuj datę/cenę</Button>
            )}
            {(props.mode === "dead") && (
              <Button variant="dark" onClick={props.showEdit}>Edytuj datę zgonu</Button>
            )}
            {(props.mode === "dead" || props.mode === "sold") && (
              <UndoneButton id={props.id} mode={props.mode} hideEverythingHandler={hideEverything}></UndoneButton>
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
        {props.deadSoldMode && <SoldDeadForm id={props.id} showHandler={props.showDeadSoldHandler} hideEverythingHandler={hideEverything}/>}
        {props.show && <SoldDeadEditForm id={props.id} mode={props.mode} price={props.price} showHandler={props.showEdit}/>}
        {props.showDead && <SoldDeadEditForm id={props.id} mode={props.mode} showHandler={props.showEdit}/>}
      </div>
    </div>
  );
};

export default Menu;
