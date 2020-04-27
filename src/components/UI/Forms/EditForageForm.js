import React, { useState, useMemo } from "react";
import { Form, Modal } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import {
  StyledDeleteButton,
  StyledModalContent,
  StyledModalHeader,
  StyledModalBody,
  StyledModalFooter,
  StyledConfirmModalButton,
  StyledFormControlShort,
  StyledEditForm,
  StyledHideButton,
  StyledFormLabel,
  StyledDatePicker,
  StyledSubmitButton,
  StyledEditButtonsContainer,
  StyledDeleteButtonMain,
} from "./../../../Styles";

registerLocale("pl", pl);

const EditForageForm = (props) => {
  let defaultDate = new Date();

  const [creationDate, setCreationDate] = useState(defaultDate);
  const [expirationDate, setExpirationDate] = useState(defaultDate);
  const [about, setAbout] = useState(props.about);
  const [qty, setQty] = useState(props.qty);
  const [price, setPrice] = useState(props.price);
  const [producer, setProducer] = useState(props.producer);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const data = useMemo(
    () => ({
      fgAbout: about,
      fgQty: Number(qty),
      fgPrice: Number(price),
      creationDate: creationDate,
      producer: producer,
      expiration: expirationDate,
    }),
    [about, qty, price, creationDate, producer, expirationDate]
  );

  const remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-forage/${props.id}`, {
      method: "DELETE",
    })
      .then(handleModalClose())
      .then(props.toggleEditHandler());

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

    fetch(`http://obb-api.herokuapp.com/edit-forage/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.toggleEditHandler())
      //   .then(props.sortedHandler(false))
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <StyledEditForm>
      <StyledHideButton onClick={props.toggleEditHandler}>X</StyledHideButton>
      <Form>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Data stworzenia</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={creationDate}
            onChange={(date) => setCreationDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Data ważności</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
          />
        </Form.Group>

        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Ilość</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź ilość"
            defaultValue={qty}
            onChange={(event) => setQty(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Cena</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź cenę"
            defaultValue={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Pozostałe</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz dane producenta"
            defaultValue={producer}
            onChange={(event) => setProducer(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Opis</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Podaj dodatkowe informacje"
            defaultValue={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </Form.Group>
      </Form>

      <StyledEditButtonsContainer>
        <StyledSubmitButton onClick={submitHandler}>
          POTWIERDŹ EDYCJĘ
        </StyledSubmitButton>
        <StyledDeleteButton onClick={handleModalShow}>USUŃ</StyledDeleteButton>
      </StyledEditButtonsContainer>
      <StyledModalContent show={showModal} onHide={handleModalClose}>
        <StyledModalHeader>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>
          Próba usunięcia pomiaru nr. #{props.id}
        </StyledModalBody>
        <StyledModalFooter>
          <StyledDeleteButtonMain variant="success" onClick={handleModalClose}>
            Nie
          </StyledDeleteButtonMain>
          <StyledConfirmModalButton variant="primary" onClick={remove}>
            Tak, usuń
          </StyledConfirmModalButton>
        </StyledModalFooter>
      </StyledModalContent>
    </StyledEditForm>
  );
};

export default EditForageForm;
