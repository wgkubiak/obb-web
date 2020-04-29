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
        <StyledGenerateButton onClick={(event) => props.generatePDF(event)}>
          {props.text}
        </StyledGenerateButton>
      )}
      {mode && (
        <Button
          variant="success"
          className="buttons-button"
          onClick={(event) => props.generatePDF(event)}
        >
          <StyledExamDownloadIcon size={32} />
        </Button>
      )}
    </>
  );
};

export default GenerateButton;
