import React from "react";
import { Button } from "react-bootstrap";

const AddButton = props => (
  <Button className="addBtn" variant="light" onClick={props.toggleHandler}>
    DODAJ
  </Button>
);

export default AddButton;
