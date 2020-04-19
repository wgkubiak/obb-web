import React from "react";
import { GoPlus } from "react-icons/go";
import { StyledAddButton } from "./../../../Styles";

const AddButton = (props) => (
  <StyledAddButton onClick={props.toggleHandler}>
    <GoPlus size={24}></GoPlus>
  </StyledAddButton>
);

export default AddButton;
