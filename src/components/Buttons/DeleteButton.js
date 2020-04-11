import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

const StyledDeleteButtonDiv = styled.div`
  position: relative;
  right: 0px;
  width: 100%;
  margin-top: 0.5em;
  outline: none;
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
  background-color: #5E35B1 !important
`;

const StyledConfirmButton = styled(Button)`
  background-color: #651FFF !important;
  border: none !important;
  outline: none;
  
  &:hover {
    background-color: #6200EA !important
  }
`;

const StyledModalFooter = styled(Modal.Footer)`
  border-top: none;
  background-color: #eeeeee !important;
  color: #000000
`;

const StyledDeleteButton = styled(Button)`
  position: relative;
  width: 100%;
  border-radius: 0;
  background-color: #651FFF !important;
  height: auto;
  border: none !important;
  outline: none;

  &:hover {
    background-color: #6200EA !important;
  }
`;

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
    
    setTimeout(() => {
      props.reloadHandler();
    }, 500)
  };

  return (
    <StyledDeleteButtonDiv>
      <StyledDeleteButton variant="danger" onClick={handleModalShow}>
        USUŃ
      </StyledDeleteButton>

      <StyledModalContent show={showModal} onHide={handleModalClose}>
        <StyledModalHeader>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>Próba usunięcia jednostki #{props.id}</StyledModalBody>
        <StyledModalFooter>
          <Button variant="secondary" onClick={handleModalClose}>
            Nie
          </Button>
          <StyledConfirmButton onClick={remove}>
            Tak, usuń
          </StyledConfirmButton>
        </StyledModalFooter>
      </StyledModalContent>
    </StyledDeleteButtonDiv>
  );
};

export default DeleteButton;
