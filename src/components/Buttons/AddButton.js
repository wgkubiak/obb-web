import React from "react";
import { Button } from "react-bootstrap";
import {GoPlus} from "react-icons/go";
import styled from 'styled-components';

const StyledAddButton = styled(Button)`
  position: fixed;
  top: calc(50% - 4em);
  right: 2%;
  margin-left: 2px;
  height: 4em;
  width: 4em;
  border: none;
  color: #ffffff !important;
  background-color: #651FFF !important;
  border-radius: 50%;
  
  &:hover {
    background-color: #4527A0 !important;
  }
`;

const AddButton = props => (
  <StyledAddButton onClick={props.toggleHandler}>
    <GoPlus size={24}></GoPlus>
  </StyledAddButton>
);

export default AddButton;
