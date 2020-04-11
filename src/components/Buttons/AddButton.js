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
  border-radius: 50%;
  background-color: #546e7a !important;
  
  &:hover {
    background-color: #29434e !important;
  }
`;

const AddButton = props => (
  <StyledAddButton onClick={props.toggleHandler}>
    <GoPlus size={24}></GoPlus>
  </StyledAddButton>
);

export default AddButton;