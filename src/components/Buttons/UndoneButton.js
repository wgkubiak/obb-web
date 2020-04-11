import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

const StyledOptionButton = styled(Button)`
  color: #ffffff;
  width: 80%;
  margin-top: 0.5em;
  border: none !important;
  outline: none;
  background-color: #718792 !important;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  
  &:hover {
    background-color: #29434e !important;
  }
`;

const StyledModalContent = styled(Modal)`
  color: #eeeeee !important
`;

const StyledModalBody = styled(Modal.Body)`
  border-bottom: none;
  background-color: #eeeeee !important;
  color: #000000
`;

const StyledModalHeader = styled(Modal.Header)`
background-color: #546e7a !important;
`;

const StyledModalFooter = styled(Modal.Footer)`
  border-top: none;
  background-color: #eeeeee !important;
  color: #000000
`;

const StyledConfirmButton = styled(Button)`
  border: none !important;
  outline: none;
  background-color: #546e7a !important;

  &:hover {
    background-color: #29434e !important;
  }
`;


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
      .then(handleModalClose())
      .then(props.hideEverythingHandler());

      setTimeout(() => {
        props.reloadHandler();
      }, 500)
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
          <Button variant="secondary" onClick={handleModalClose}>
            Nie
          </Button>
          <StyledConfirmButton variant="primary" onClick={submitHandler}>
            Tak, przenieś
          </StyledConfirmButton>
        </StyledModalFooter>
      </StyledModalContent>
    </>
  );
};

export default UndoneButton;
