import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  width: 20%;
  border: none !important;
  border-radius: 0;
  outline: none;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  background-color:  #546e7a !important;
  
  &:hover {
    background-color: #29434e !important;
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
