import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

const StyledOptionButton = styled(Button)`
  color: #ffffff;
  width: 80%;
  margin-top: 0.5em;
  border: none !important;
  outline: none;
  background-color: #424242 !important;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  
  &:hover {
    background-color: #30d158 !important;
  }
`;

const StyledModalContent = styled(Modal)`
  color: rgba(255, 255, 255, 0.87) !important
`;

const StyledModalBody = styled(Modal.Body)`
  border-bottom: none;
  background-color: #1b1b1b !important;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.87)
`;

const StyledModalHeader = styled(Modal.Header)`
  background-color: #424242 !important;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.87)
`;

const StyledConfirmButton = styled(Button)`
  background-color: #ff373b !important;
  border: none !important;
  outline: none;
  height: "auto";

  &:hover {
    background-color: #ff262b !important;
  }
`;

const StyledModalFooter = styled(Modal.Footer)`
  border-top: none;
  background-color: #1b1b1b !important;
  border-radius: 0;
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
          <Button variant="success" style={{backgroundColor: "#30d158", height: "auto"}} onClick={handleModalClose}>
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
