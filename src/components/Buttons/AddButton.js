import React from "react";
import { Button } from "react-bootstrap";

const AddButton = props => (
  <Button className="addBtn" variant="success" onClick={props.toggleHandler}>
    DODAJ
  </Button>
);

export default AddButton;