import React from "react";
import {
  StyledGenerateButton,
  StyledExamDownloadIcon,
} from "./../../../Styles";
import { Button } from "react-bootstrap";

const GenerateButton = (props) => {
  const mode = props.mode === "exams" ? true : false;
  return (
    <>
      {!mode && (
        <StyledGenerateButton onClick={props.generatePDF}>
          {props.text}
        </StyledGenerateButton>
      )}
      {mode && (
        <Button
          variant="success"
          className="buttons-button"
          onClick={props.generatePDF}
        >
          <StyledExamDownloadIcon size={32} />
        </Button>
      )}
    </>
  );
};

export default GenerateButton;
