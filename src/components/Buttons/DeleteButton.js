import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteButton = props => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const remove = () => {
    fetch(`${props.url}${props.id}`, {
      method: "DELETE"
    })
    .then(handleModalClose())
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
      <Button variant="danger" onClick={handleModalShow}>
        Usuń
      </Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Czy jesteś pewny?!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Próba usunięcia jednostki #{props.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Nie
          </Button>
          <Button variant="primary" onClick={remove}>
            Tak, usuń
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default DeleteButton;
