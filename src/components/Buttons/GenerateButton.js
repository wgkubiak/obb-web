import React from "react";
import { Button } from "react-bootstrap";


const GenerateButton = props => (
  <Button
    onClick={props.generatePDF}
    style={{ width: "20%" }}
    variant="dark"
    >
      <strong>Wygeneruj raport</strong>
  </Button>
)

export default GenerateButton;
