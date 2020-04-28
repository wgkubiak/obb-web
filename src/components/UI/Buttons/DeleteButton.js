import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  StyledDeleteButtonDiv,
  StyledDeleteButton,
  StyledModalHeader,
  StyledModalBody,
  StyledModalFooter,
  StyledConfirmModalButton,
  StyledModalContent,
  StyledDeleteButtonMain,
  StyledExamDeleteIcon,
} from "./../../../Styles";

const DeleteButton = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  const token = localStorage.getItem("token");
  const remove = () => {
    fetch(`${props.url}${props.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(handleModalClose())
      .then(props.deleteInfoHandler());

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  useEffect(() => {
    console.log(props.url, props.id);
  }, []);

  return (
    <div style={{width: "auto", height: "auto"}}>
      {props.mode && (
        <Button
          className="buttons-button"
          onClick={handleModalShow}
        >
          <StyledExamDeleteIcon size={32} />
        </Button>
      )}
      <StyledDeleteButtonDiv>
        {!props.mode && (
          <StyledDeleteButton variant="danger" onClick={handleModalShow}>
            Usuń
          </StyledDeleteButton>
        )}

        <StyledModalContent show={showModal} onHide={handleModalClose}>
          <StyledModalHeader>
            <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
          </StyledModalHeader>
          <StyledModalBody>
            Próba usunięcia {props.text}jednostki #{props.id}
          </StyledModalBody>
          <StyledModalFooter>
            <StyledDeleteButtonMain
              variant="success"
              onClick={handleModalClose}
            >
              Nie
            </StyledDeleteButtonMain>
            <StyledConfirmModalButton onClick={remove}>
              Tak, usuń
            </StyledConfirmModalButton>
          </StyledModalFooter>
        </StyledModalContent>
      </StyledDeleteButtonDiv>
    </div>
  );
};

export default DeleteButton;
