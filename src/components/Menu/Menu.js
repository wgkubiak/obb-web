import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DeleteButton from "../Buttons/DeleteButton";
import UndoneButton from "../Buttons/UndoneButton";
import SoldDeadForm from "../Forms/SoldDeadForm";
import SoldDeadEditForm from "../Forms/SoldDeadEditForm";
import { FiEdit3 } from "react-icons/fi";
import styled from "styled-components";

const StyledMenu = styled.div`
  width: 20em;
  z-index: 2;
  position: fixed;
  background-color: #ffffff;
  left: 0;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.3em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

const StyledHideButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  height: auto;
  margin-right: auto;
  border-radius: 0;
  text-transform: uppercase;
  border: none !important;
  outline: none;
  background-color: #ffffff !important;
  width: auto;
  font-size: small;
  color: #292930 !important;
  
  &:hover {
    color: #000000
  }
`;

const StyledButtonContainer = styled.div`
  position: relative;
  height: 100%;
`;

const StyledOptionButton = styled(Button)`
  color: #ffffff;
  width: 80%;
  margin-top: 0.5em;
  border: none !important;
  outline: none;
  background-color: #718792 !important;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  
  &:hover {
    background-color: #29434e !important;
  }
`;

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
    <StyledMenu>
      <StyledHideButton
        onClick={hideEverything}
      >
        X
      </StyledHideButton>
      <FiEdit3 className="edit-icon" />
      <h4>
        <strong style={{color: "#292930"}}>#{props.id}</strong>
      </h4>
      <StyledButtonContainer>
        {!show && (
          <>
            {(props.mode === "pigs" || props.mode === "dead" || props.mode === "sold") && (
              <StyledOptionButton variant="dark" onClick={props.showExams}>Wyświetl badania</StyledOptionButton>
            )}
            {props.mode === "pigs" && (
              <StyledOptionButton variant="dark">Dodaj badanie</StyledOptionButton>
            )}
            {props.mode === "pigs" && (
              <StyledOptionButton variant="dark" onClick={props.showDeadSoldHandler}>Zgon/Sprzedaż</StyledOptionButton>
            )}
            {(props.mode === "pigs" || props.mode === "global") && (
              <StyledOptionButton variant="dark" onClick={props.showEditHandler}>Edytuj</StyledOptionButton>
            )}
            {(props.mode === "sold") && (
              <StyledOptionButton variant="dark" onClick={props.showEdit}>Edytuj datę/cenę</StyledOptionButton>
            )}
            {(props.mode === "dead") && (
              <StyledOptionButton variant="dark" onClick={props.showEdit}>Edytuj datę zgonu</StyledOptionButton>
            )}
            {(props.mode === "dead" || props.mode === "sold") && (
              <UndoneButton id={props.id} mode={props.mode} hideEverythingHandler={hideEverything} reloadHandler={props.reloadHandler}></UndoneButton>
            )}          
          </>
        )}
        
        {show && <h4 className="deleted-unit-info">Obiekt usunięto</h4>}
        {props.deadSoldMode && <SoldDeadForm id={props.id} showHandler={props.showDeadSoldHandler} hideEverythingHandler={hideEverything} reloadHandler={props.reloadHandler}/>}
        {props.show && <SoldDeadEditForm id={props.id} mode={props.mode} price={props.price} showHandler={props.showEdit} reloadHandler={props.reloadHandler}/>}
        {props.showDead && <SoldDeadEditForm id={props.id} mode={props.mode} showHandler={props.showEdit} reloadHandler={props.reloadHandler}/>}
      </StyledButtonContainer>
      <DeleteButton
              id={props.id}
              url={props.url}
              idPen={props.idPen}
              showSelection={props.showSelection}
              reloadHandler={props.reloadHandler}
              deleteInfoHandler={showInfoHandler}
        />
    </StyledMenu>
  );
};

export default Menu;
