import React, { useState } from "react";
import DeleteButton from "../UI/Buttons/DeleteButton";
import UndoneButton from "../UI/Buttons/UndoneButton";
import SoldDeadForm from "../UI/Forms/SoldDeadForm";
import SoldDeadEditForm from "../UI/Forms/SoldDeadEditForm";
import {
  StyledOptionButton,
  StyledMenuIcon,
  StyledMenu,
  StyledHideButton,
  StyledButtonContainer,
  StyledDeleteInfo,
} from "./../../Styles";

const Menu = (props, { initShow = false }) => {
  const [show, setShow] = useState(initShow);

  const showInfoHandler = () => {
    setShow(true);
  };

  const hideEverything = () => {
    props.showMenu();
    if (props.showEditHandler !== undefined && props.showEditHandler !== null) {
      props.hideEditHandler();
    }
  };

  return (
    <StyledMenu>
      <StyledHideButton onClick={hideEverything}>X</StyledHideButton>
      <StyledMenuIcon />
      <h4>
        <strong>#{props.id}</strong>
      </h4>
      <StyledButtonContainer>
        {!show && (
          <>
            {(props.mode === "pigs" ||
              props.mode === "dead" ||
              props.mode === "sold") && (
              <StyledOptionButton variant="dark" onClick={props.showExams}>
                Wyświetl badania
              </StyledOptionButton>
            )}
            {props.mode === "pigs" && (
              <StyledOptionButton
                variant="dark"
                onClick={props.showDeadSoldHandler}
              >
                Zgon/Sprzedaż
              </StyledOptionButton>
            )}
            {(props.mode === "pigs" || props.mode === "global") && (
              <StyledOptionButton
                variant="dark"
                onClick={props.showEditHandler}
              >
                Edytuj
              </StyledOptionButton>
            )}
            {props.mode === "sold" && (
              <StyledOptionButton variant="dark" onClick={props.showEdit}>
                Edytuj datę/cenę
              </StyledOptionButton>
            )}
            {props.mode === "dead" && (
              <StyledOptionButton variant="dark" onClick={props.showEdit}>
                Edytuj datę zgonu
              </StyledOptionButton>
            )}
            {(props.mode === "dead" || props.mode === "sold") && (
              <UndoneButton
                id={props.id}
                mode={props.mode}
                hideEverythingHandler={hideEverything}
                reloadHandler={props.reloadHandler}
              ></UndoneButton>
            )}
          </>
        )}

        {show && <StyledDeleteInfo>Obiekt usunięto</StyledDeleteInfo>}
        {props.deadSoldMode && (
          <SoldDeadForm
            id={props.id}
            showHandler={props.showDeadSoldHandler}
            hideEverythingHandler={hideEverything}
            reloadHandler={props.reloadHandler}
          />
        )}
        {props.show && (
          <SoldDeadEditForm
            id={props.id}
            mode={props.mode}
            price={props.price}
            showHandler={props.showEdit}
            reloadHandler={props.reloadHandler}
          />
        )}
        {props.showDead && (
          <SoldDeadEditForm
            id={props.id}
            mode={props.mode}
            showHandler={props.showEdit}
            reloadHandler={props.reloadHandler}
          />
        )}
      </StyledButtonContainer>
      {/* TODO: test it a little bit more, if buttons hides and shows up in good moment */}
      {!show && (
        <DeleteButton
          id={props.id}
          url={props.url}
          idPen={props.idPen}
          showSelection={props.showSelection}
          reloadHandler={props.reloadHandler}
          deleteInfoHandler={showInfoHandler}
        />
      )}
    </StyledMenu>
  );
};

export default Menu;
