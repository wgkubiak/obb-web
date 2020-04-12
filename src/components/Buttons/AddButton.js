import React from "react";
import { Button } from "react-bootstrap";
import {GoPlus} from "react-icons/go";
import styled from 'styled-components';

const StyledAddButton = styled(Button)`
  position: fixed;
  bottom: 5%;
  right: 2%;
  margin-left: 2px;
  height: 4em;
  width: 4em;
  border: none;
  color: #ffffff !important;
  border-radius: 50%;
  background-color: #546e7a !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);

  z-index: 10;

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