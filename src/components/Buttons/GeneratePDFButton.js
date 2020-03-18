import React from "react";
import { Button } from "react-bootstrap";

const GeneratePDFButton = props => (
  <Button
    onClick={props.generatePDFHandler}
    style={{ width: "20%" }}
    variant="dark"
  >
    <strong>Wygeneruj raport</strong>
  </Button>
);

export default GeneratePDFButton;
