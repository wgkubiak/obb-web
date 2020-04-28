import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  StyledOptionButton,
  StyledDeleteButtonMain,
  StyledConfirmModalButton,
  StyledModalContent,
  StyledModalBody,
  StyledModalHeader,
  StyledModalFooter,
} from "./../../../Styles";

const UndoneButton = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    fetch(`http://obb-api.herokuapp.com/pig-undone-${props.mode}/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: null,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(handleModalClose())
      .then(props.hideEverythingHandler());

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <>
      <StyledOptionButton variant="dark" onClick={handleModalShow}>
        Wycofaj do kojca
      </StyledOptionButton>
      <StyledModalContent show={showModal} onHide={handleModalClose}>
        <StyledModalHeader>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>
          Próba przeniesienia jednostki #{props.id} do kojca
        </StyledModalBody>
        <StyledModalFooter>
          <StyledDeleteButtonMain variant="success" onClick={handleModalClose}>
            Nie
          </StyledDeleteButtonMain>
          <StyledConfirmModalButton variant="primary" onClick={submitHandler}>
            Tak, przenieś
          </StyledConfirmModalButton>
        </StyledModalFooter>
      </StyledModalContent>
    </>
  );
};

export default UndoneButton;
