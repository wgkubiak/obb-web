import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: 20%;
  background-color: #5E35B1;
  border: none !important;
  border-radius: 0;
  outline: none;

  &:hover {
    background-color: #4527A0
  }
`


const GenerateButton = props => (
  <StyledButton
    onClick={props.generatePDF}
    >
      <strong>Wygeneruj raport PDF</strong>
  </StyledButton>
)

export default GenerateButton;
