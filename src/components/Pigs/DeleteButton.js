import React from "react";
import { Button } from "react-bootstrap";

const DeleteButton = props => {
  const remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-pig/${props.id}`, {
      method: "DELETE"
    })
    //TODO: Reload after remove
      .then(props.reloadHandler(props.idPen))
      .then(props.deleteInfoHandler());
  };

  return (
    <div className="DeleteButton">
      <Button variant="danger" onClick={remove}>
        Usuń obiekt
      </Button>
    </div>
  );
};

export default DeleteButton;
