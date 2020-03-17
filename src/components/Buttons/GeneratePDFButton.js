import React from "react";
import { Button } from "react-bootstrap";

const GeneratePDFButton = props => (
  <Button onClick={props.generatePDFHandler} variant="dark">
    Wygeneruj PDF z większą ilością danych
  </Button>
);

export default GeneratePDFButton;
