import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  StyledDeleteButtonDiv,
  StyledDeleteButton,
  StyledModalHeader,
  StyledModalBody,
  StyledModalFooter,
  StyledConfirmModalButton,
  StyledModalContent,
} from "./../../../Styles";

const DeleteButton = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const remove = () => {
    fetch(`${props.url}${props.id}`, {
      method: "DELETE",
    })
      .then(handleModalClose())
      .then(props.deleteInfoHandler());

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <StyledDeleteButtonDiv>
      <StyledDeleteButton variant="danger" onClick={handleModalShow}>
        Usuń
      </StyledDeleteButton>

      <StyledModalContent show={showModal} onHide={handleModalClose}>
        <StyledModalHeader>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>Próba usunięcia jednostki #{props.id}</StyledModalBody>
        <StyledModalFooter>
          <Button
            variant="success"
            style={{ backgroundColor: "#30d158", height: "auto" }}
            onClick={handleModalClose}
          >
            Nie
          </Button>
          <StyledConfirmModalButton onClick={remove}>
            Tak, usuń
          </StyledConfirmModalButton>
        </StyledModalFooter>
      </StyledModalContent>
    </StyledDeleteButtonDiv>
  );
};

export default DeleteButton;
