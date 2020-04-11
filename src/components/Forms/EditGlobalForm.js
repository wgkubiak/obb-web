import React, { useState, useMemo } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import styled from "styled-components";

registerLocale("pl", pl);

const StyledEditGlobalForm = styled.div`
  width: 20em;
  height: auto;
  z-index: 2;
  position: fixed;
  background-color: #ffffff;
  color: #eeeeee;
  left: 50%;
  right: 0;
  top: 0%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.3em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

const StyledFormLabel = styled(Form.Label)`
  color: #000000;
`;

const StyledHideButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  height: auto;
  margin-right: auto;
  border-radius: 0;
  text-transform: uppercase;
  border: none !important;
  outline: none;
  background-color: #ffffff !important;
  width: auto;
  font-size: small;
  color: #292930 !important;
  
  &:hover {
    color: #000000
  }
`;

const StyledFormControl = styled(Form.Control)`
  position: relative;
  width: 80%;
  left: 10%;
  text-align-last: center;
  text-align: center;
  background-color: #eeeeee;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0em !important;
  color: #000000;
`;

const StyledSelect = styled(Form.Control)`
  width: 80%;
  height: calc(1.5em + 0.75rem + 2px);
  text-align-last: center;
  text-align: center;
  background-color: #eeeeee;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0em !important;
  color: #000000;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  text-align: center;
  background-color: #eeeeee;
  color: #212121;
`;

const StyledButton = styled(Button)`
  position: relative;
  width: 100%;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #546e7a !important;

  &:hover {
    background-color: #29434e !important;
  }
`;

const StyledModalHeader = styled(Modal.Header)`
  background-color: #546e7a !important;
`;

const StyledModalButton = styled(Button)`
  border: none !important;
  outline: none;
  background-color: #546e7a !important;

  &:hover {
    background-color: #29434e !important;
  }
`;

const StyledModalContent = styled(Modal)`
  color: #eeeeee !important;
`;

const StyledModalBody = styled(Modal.Body)`
  border-bottom: none;
  background-color: #eeeeee !important;
  color: #000000;
`;

const StyledModalFooter = styled(Modal.Footer)`
  border-top: none;
  background-color: #eeeeee !important;
  color: #000000;
`;

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
    <StyledEditGlobalForm>
      <StyledHideButton onClick={props.toggleEditHandler}>X</StyledHideButton>
      <Form>
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>NH3</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz NH3"
            defaultValue={nh}
            onChange={(event) => setNh(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlSelect1">
          <StyledFormLabel>H2S</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={(event) => setHTwo(event.target.value)}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </StyledSelect>
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>C02</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz CO2"
            defaultValue={co}
            onChange={(event) => setCO(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>Temperatura</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz temperature"
            defaultValue={temp}
            onChange={(event) => setTemp(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>Wilgotność</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz wilgotność"
            defaultValue={wet}
            onChange={(event) => setWet(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlSelect1">
          <StyledFormLabel>Data badania</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={measureDate}
            onChange={(date) => setMeasureDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlSelect1">
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

      <div className="edit--buttons-container">
        <StyledButton onClick={submitHandler}>POTWIERDŹ EDYCJĘ</StyledButton>
        <StyledButton onClick={handleModalShow}>USUŃ</StyledButton>
      </div>
      <StyledModalContent show={showModal} onHide={handleModalClose}>
        <StyledModalHeader>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>
          Próba usunięcia pomiaru nr. #{props.id}
        </StyledModalBody>
        <StyledModalFooter>
          <Button variant="secondary" onClick={handleModalClose}>
            Nie
          </Button>
          <StyledModalButton variant="primary" onClick={remove}>
            Tak, usuń
          </StyledModalButton>
        </StyledModalFooter>
      </StyledModalContent>
    </StyledEditGlobalForm>
  );
};

export default EditGlobalForm;
