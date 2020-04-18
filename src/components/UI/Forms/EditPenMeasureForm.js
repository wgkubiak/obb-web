import React, { useState, useMemo } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import styled from "styled-components";

registerLocale("pl", pl);

const StyledEditPenMeasureForm = styled.div`
  width: 20em;
  height: auto;
  z-index: 2;
  position: fixed;
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-left: auto;
  margin-right: auto;
  border-radius: 0em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

const StyledFormLabel = styled(Form.Label)`
  color: rgba(255, 255, 255, 0.87);
  font-family: "Roboto", sans-serif;
  font-weight: 500;
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
  background-color: #424242 !important;
  width: auto;
  font-size: small;
  color: rgba(255, 255, 255, 0.87) !important;

  &:hover {
    color: rgba(255, 255, 255, 0.87);
  }
`;

const StyledFormControl = styled(Form.Control)`
  position: relative;
  width: 80%;
  left: 10%;
  text-align-last: center;
  text-align: center;
  background-color: #424242;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #30d158;
  border-radius: 0em !important;
  color: rgba(255, 255, 255, 0.87);
`;

const StyledSelect = styled(Form.Control)`
  width: 80%;
  height: calc(1.5em + 0.75rem + 2px);
  text-align-last: center;
  text-align: center;
  background-color: #424242;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #30d158;
  border-radius: 0em !important;
  color: rgba(255, 255, 255, 0.87);
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  text-align: center;
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  border: none;
  border-bottom: 1px solid #30d158;
`;

const StyledButton = styled(Button)`
  position: relative;
  width: 100%;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #30d158 !important;

  &:hover {
    background-color: #29b64c !important;
  }
`;

const StyledDeleteButton = styled(Button)`
  margin-top: 0.2em;
  position: relative;
  width: 100%;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #ff373b !important;

  &:hover {
    background-color: #ff262b !important;
  }
`;

const StyledModalContent = styled(Modal)`
  color: rgba(255, 255, 255, 0.87) !important;
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
      dosatron: dosatron,
      addition: additions,
      forage: forage,
      forageQtyUsed: forageQtyUsed
    }),
    [measureDate, measureTime, breaks, dosatron, additions, forage, forageQtyUsed]
  );

  const remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-pen-measure/${props.id}`, {
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

    fetch(`http://obb-api.herokuapp.com/edit-pen-measure/${props.id}`, {
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
    <StyledEditPenMeasureForm>
      <StyledHideButton onClick={props.toggleEditHandler}>X</StyledHideButton>
      <Form>
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
        
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>Awaria</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Rodzaj awarii"
            defaultValue={breaks}
            onChange={(event) => setBreaks(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlSelect1">
          <StyledFormLabel>Dozownik</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={(event) => setDosatron(event.target.value)}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </StyledSelect>
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>Dodatki</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz dodatki"
            defaultValue={additions}
            onChange={(event) => setAdditions(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>Ilość wprowadzona</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz ilość"
            defaultValue={forage}
            onChange={(event) => setForage(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>Ubytek</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz ilość"
            defaultValue={forageQtyUsed}
            onChange={(event) => setForageQtyUsed(event.target.value)}
          />
        </Form.Group>
      </Form>

      <div className="edit--buttons-container">
        <StyledButton onClick={submitHandler}>POTWIERDŹ EDYCJĘ</StyledButton>
        <StyledDeleteButton style={{backgroundColor: "#ff373b"}} onClick={handleModalShow}>USUŃ</StyledDeleteButton>
      </div>
      <StyledModalContent show={showModal} onHide={handleModalClose}>
        <StyledModalHeader>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </StyledModalHeader>
        <StyledModalBody>
          Próba usunięcia pomiaru nr. #{props.id}
        </StyledModalBody>
        <StyledModalFooter>
          <Button variant="success" style={{backgroundColor: "#30d158", height: "auto"}} onClick={handleModalClose}>
            Nie
          </Button>
          <StyledConfirmButton variant="primary" onClick={remove}>
            Tak, usuń
          </StyledConfirmButton>
        </StyledModalFooter>
      </StyledModalContent>
    </StyledEditPenMeasureForm>
  );
};

export default EditPenMeasureForm;
