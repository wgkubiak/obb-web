import React from "react";
import {StyledGenerateButton} from "./../../../Styles";

const GenerateButton = props => (
  <StyledGenerateButton
    onClick={props.generatePDF}
    >
      Wygeneruj raport PDF
  </StyledGenerateButton>
)

export default GenerateButton;
