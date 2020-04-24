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
  StyledSelectShort,
  StyledConfirmButton,
  StyledEditButtonsContainer,
  StyledDeleteButtonMain,
} from "./../../../Styles";

registerLocale("pl", pl);

const EditGlobalForm = (props) => {
  let defaultDate = new Date();

  const [measureDate, setMeasureDate] = useState(defaultDate);
  const [measureTime, setMeasureTime] = useState(defaultDate);
  const [nh, setNh] = useState(props.nh);
  const [htwo, setHTwo] = useState("0");
  const [co, setCO] = useState(props.co);
  const [temp, setTemp] = useState(props.temp);
  const [wet, setWet] = useState(props.wet);
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const data = useMemo(
    () => ({
      measureDate: measureDate,
      measureTime: measureTime.toString().substring(16, 31),
      nhThree: nh,
      hTwoS: htwo,
      coTwo: co,
      temperature: temp,
      wetness: wet,
    }),
    [measureDate, measureTime, nh, htwo, co, temp, wet]
  );

  const remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-global/${props.id}`, {
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

    fetch(`http://obb-api.herokuapp.com/edit-global/${props.id}`, {
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
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>NH3</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz NH3"
            defaultValue={nh}
            onChange={(event) => setNh(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>H2S</StyledFormLabel>
          <StyledSelectShort
            as="select"
            onChange={(event) => setHTwo(event.target.value)}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </StyledSelectShort>
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>C02</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz CO2"
            defaultValue={co}
            onChange={(event) => setCO(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Temperatura</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz temperature"
            defaultValue={temp}
            onChange={(event) => setTemp(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Wilgotność</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz wilgotność"
            defaultValue={wet}
            onChange={(event) => setWet(event.target.value)}
          />
        </Form.Group>
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
          Próba usunięcia pomiaru nr. #{props.id}
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

export default EditGlobalForm;
