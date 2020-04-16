import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: 100%;
  border: none !important;
  border-radius: 0;
  position: relative;
  margin-top: 2em;
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  background-color:  #30d158 !important;
  
  &:hover {
    background-color: #29b64c !important;
  }
`


const GenerateButton = props => (
  <StyledButton
    onClick={props.generatePDF}
    >
      Wygeneruj raport PDF
  </StyledButton>
)

export default GenerateButton;
