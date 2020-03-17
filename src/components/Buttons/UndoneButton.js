import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const UndoneButton = props => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const submitHandler = event => {
    event.preventDefault();

    fetch(`http://obb-api.herokuapp.com/pig-undone-${props.mode}/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .then(handleModalClose());
  };

  return (
    <div className="UndoneBtn">
      <Button variant="dark" onClick={handleModalShow}>
        Wycofaj do kojca
      </Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Czy jesteś pewny?!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Próba przeniesienia jednostki #{props.id} do kojca
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Nie
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Tak, przenieś
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UndoneButton;
