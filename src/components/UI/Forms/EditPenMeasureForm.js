import React, { useState, useMemo } from "react";
import { Form, Button, Modal } from "react-bootstrap";
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
  StyledSelectShort,
  StyledEditButtonsContainer,
  StyledDeleteButtonMain,
} from "./../../../Styles";

registerLocale("pl", pl);

const EditPenMeasureForm = (props) => {
  let defaultDate = new Date();

  const [measureDate, setMeasureDate] = useState(defaultDate);
  const [measureTime, setMeasureTime] = useState(defaultDate);
  const [dosatron, setDosatron] = useState(props.dos);
  const [forage, setForage] = useState(props.inp);
  const [forageQtyUsed, setForageQtyUsed] = useState(props.out);
  const [breaks, setBreaks] = useState(props.breaks);
  const [additions, setAdditions] = useState(props.additions);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const data = useMemo(
    () => ({
      measureDate: measureDate,
      measureTime: measureTime.toString().substring(16, 31),
      breakdown: breaks,
      dosatron: Number(dosatron),
      addition: additions,
      forage: Number(forage),
      forageQtyUsed: Number(forageQtyUsed),
    }),
    [
      measureDate,
      measureTime,
      breaks,
      dosatron,
      additions,
      forage,
      forageQtyUsed,
    ]
  );

  const remove = () => {
    const token = localStorage("token")
    fetch(`https://obb-api.herokuapp.com/delete-pen-measure/${props.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`
      }
    })
      .then(handleModalClose())
      .then(props.toggleEditHandler());

    setTimeout(() => {
      props.reloadHandler();
      props.sortedHandler(false);
    }, 500);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`http://obb-api.herokuapp.com/edit-pen-measure/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.toggleEditHandler())
      .then(props.sortedHandler(false))
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
          <StyledFormLabel>Data badania</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={measureDate}
            onChange={(date) => setMeasureDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Godzina badania</StyledFormLabel>
          <StyledDatePicker
            selected={measureTime}
            onChange={(date) => setMeasureTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </Form.Group>

        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Awaria</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Rodzaj awarii"
            defaultValue={breaks}
            onChange={(event) => setBreaks(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Dozownik</StyledFormLabel>
          <StyledSelectShort
            as="select"
            onChange={(event) => setDosatron(event.target.value)}
          >
            <option value="">Bez zmian</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </StyledSelectShort>
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Dodatki</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz dodatki"
            defaultValue={additions}
            onChange={(event) => setAdditions(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Ilość wprowadzona</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź ilość"
            defaultValue={forage}
            onChange={(event) => setForage(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Pozostałe</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź ilość"
            defaultValue={forageQtyUsed}
            onChange={(event) => setForageQtyUsed(event.target.value)}
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

export default EditPenMeasureForm;
