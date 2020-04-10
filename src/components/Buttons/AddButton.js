import React from "react";
import { Button } from "react-bootstrap";
import styled from 'styled-components';

const StyledAddButton = styled(Button)`
  margin-left: 2px;
  border: none;
  color: #ffffff !important;
  background-color: #c75b39 !important;
  border-radius: 0;
  
  &:hover {
    background-color: #ff8a65 !important;
  }
`;

const AddButton = props => (
  <StyledAddButton variant="light" onClick={props.toggleHandler}>
    DODAJ
  </StyledAddButton>
);

export default AddButton;
