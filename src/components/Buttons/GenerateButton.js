import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: "100%";
  background-color: #c75b39;
  border: none !important;
  outline: none; 
`


const GenerateButton = props => (
  <StyledButton
    onClick={props.generatePDF}
    variant="dark"
    >
      <strong>Wygeneruj raport</strong>
  </StyledButton>
)

export default GenerateButton;
