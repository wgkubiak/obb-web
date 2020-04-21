import React from "react";
import {StyledGenerateButton} from "./../../../Styles";

const GenerateButton = props => (
  <StyledGenerateButton
    onClick={props.generatePDF}
    >
      {props.text}
  </StyledGenerateButton>
)

export default GenerateButton;
