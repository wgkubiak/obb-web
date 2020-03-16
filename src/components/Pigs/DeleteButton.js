import React from "react";
import { Button } from "react-bootstrap";

const DeleteButton = props => {
  const remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-pig/${props.id}`, {
      method: "DELETE"
    })
    .then(props.deleteInfoHandler());
    //TODO: Reload after remove
  };

  // const removeHandler = async () => {
  //   await remove().then(
  //     props.reloadHandler(props.idPen)
  //   );
  // }

  return (
    <div className="DeleteButton">
      <Button variant="danger" onClick={remove}>
        Usuń obiekt
      </Button>
    </div>
  );
};

export default DeleteButton;
