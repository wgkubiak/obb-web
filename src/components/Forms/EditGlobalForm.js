import React, { useState, useMemo } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

const EditGlobalForm = props => {
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
      wetness: wet
    }),
    [measureDate, measureTime, nh, htwo, co, temp, wet]
  );

  const remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-global/${props.id}`, {
      method: "DELETE"
    })
    .then(handleModalClose())
    .then(props.toggleEditHandler())
  };

  const submitHandler = event => {
    event.preventDefault();
    console.log(data);

    fetch(`http://obb-api.herokuapp.com/edit-global/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .then(props.toggleEditHandler())
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="EditGlobalForm">
      <Button
        className="hide-selection"
        variant="dark"
        onClick={props.toggleEditHandler}
      >
        Ukryj
      </Button>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1" className="add-input">
          <Form.Label>NH3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz NH3"
            defaultValue={nh}
            onChange={event => setNh(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="add-input"
        >
          <Form.Label>H2S</Form.Label>
          <Form.Control
            as="select"
            onChange={event => setHTwo(event.target.value)}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" className="add-input">
          <Form.Label>C02</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz CO2"
            defaultValue={co}
            onChange={event => setCO(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" className="add-input">
          <Form.Label>Temperatura</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz temperature"
            defaultValue={temp}
            onChange={event => setTemp(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" className="add-input">
          <Form.Label>Wilgotność</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz wilgotność"
            defaultValue={wet}
            onChange={event => setWet(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="add-input"
        >
          <Form.Label>Data badania</Form.Label>
          <DatePicker
            className="date-picker"
            locale="pl"
            selected={measureDate}
            onChange={date => setMeasureDate(date)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="add-input"
        >
          <Form.Label>Godzina badania</Form.Label>
          <DatePicker
            selected={measureTime}
            onChange={date => setMeasureTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </Form.Group>
      </Form>

      <div className="edit--buttons-container">
        <Button variant="success" onClick={submitHandler} className="button--edit-global">
          POTWIERDŹ EDYCJĘ
        </Button>
        <Button
          variant="danger"
          className="button--delete-global"
          onClick={handleModalShow}
        >
          USUŃ
        </Button>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Próba usunięcia pomiaru nr. #{props.id}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Nie
          </Button>
          <Button variant="primary" onClick={remove}>
            Tak, usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditGlobalForm;
