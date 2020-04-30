import React, { useState, useEffect, useMemo } from "react";
import { Form, Modal} from "react-bootstrap";
import {
  StyledFormLabel,
  StyledDatePicker,
  StyledConfirmButton,
  StyledEditForm,
  StyledHideButton,
  StyledFormControlShort,
  StyledEditButtonsContainer,
  StyledDeleteButton,
  StyledModalContent,
  StyledModalHeader, 
  StyledModalBody,
  StyledModalFooter,
  StyledDeleteButtonMain,
  StyledConfirmModalButton,
  
} from "./../../../Styles";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

const EditWaterForm = (props) => {
  const currentTime = new Date();
  const [measureDate, setMeasureDate] = useState(currentTime);
  const [measureTime, setMeasureTime] = useState(currentTime);
  const [waterInit, setWaterInit] = useState(props.waterInit);
  const [waterUsed, setWaterUsed] = useState(props.waterUsed);

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const data = useMemo(
    () => ({
      idPen: props.id,
      measureDate: measureDate,
      measureTime: measureTime.toString().substring(16, 31),
      waterInit: Number(waterInit),
      waterUsed: Number(waterUsed),
    }),
    [props.id, measureDate, measureTime, waterInit, waterUsed]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`http://obb-api.herokuapp.com/water-edit/${props.unit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(props.toggleEditHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };


  const remove = () => {
    const token = localStorage.getItem("token");
    fetch(`https://obb-api.herokuapp.com/water-delete/${props.unit}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`
      }
    })
      .then(handleModalClose())
      .then(props.toggleEditHandler());

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <StyledEditForm>
      <StyledHideButton variant="dark" onClick={props.toggleEditHandler}>
        X
      </StyledHideButton>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <StyledFormLabel>Wprowadzono</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź ilość wody"
            onChange={(event) => setWaterInit(event.target.value)}
            defaultValue={waterInit}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <StyledFormLabel>Aktualny stan</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź aktualny stan wody"
            onChange={(event) => setWaterUsed(event.target.value)}
            defaultValue={waterUsed}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <StyledFormLabel>Data</StyledFormLabel>
          <StyledDatePicker
            className="date-picker"
            locale="pl"
            selected={measureDate}
            onChange={(date) => setMeasureDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <StyledFormLabel>Godzina</StyledFormLabel>
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
      </Form>

      <StyledEditButtonsContainer>
        <StyledConfirmButton onClick={submitHandler}>
          POTWIERDŹ EDYCJĘ
        </StyledConfirmButton>
        <StyledDeleteButton onClick={handleModalShow}>USUŃ</StyledDeleteButton>
      </StyledEditButtonsContainer>
      <StyledModalContent show={showModal} onHide={handleModalClose}>
        <StyledModalHeader>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>
          Próba usunięcia pomiaru nr. #{props.unit}
        </StyledModalBody>
        <StyledModalFooter>
          <StyledDeleteButtonMain onClick={handleModalClose}>
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

export default EditWaterForm;
