import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

const AddGlobalForm = props => {
  let defaultDate = new Date();

  const [date, setDate] = useState(defaultDate);
  const [hour, setHour] = useState(defaultDate);
  const [nHThree, setNHThree] = useState("");
  const [hTwoS, setHTwoS] = useState("0");
  const [cOTwo, setCOTwo] = useState("");
  const [temperature, setTemperature] = useState("");
  const [wetness, setWetness] = useState("");

  const data = useMemo(
    () => ({
      measureDate: date,
      measureTime: hour.toString().substring(16, 31),
      nhThree: nHThree,
      hTwoS: hTwoS,
      coTwo: cOTwo,
      temperature: temperature,
      wetness: wetness
    }),
    [date, hour, nHThree, hTwoS, cOTwo, temperature, wetness]
  );

  const submitHandler = event => {
    event.preventDefault();
    console.log(data);

    fetch("http://obb-api.herokuapp.com/add-global", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .then(props.showAddGlobalHandler())
      .catch(error => {
        console.error("Error:", error);
      });

      setTimeout(() => {
        props.reloadHandler();
        props.sortHandler();
      }, 500)
  };

  return (
    <div className="AddGlobalForm">
      <Button
        className="hide-selection"
        variant="dark"
        onClick={props.showAddGlobalHandler}
      >
        Ukryj
      </Button>
      <Form>
        
        <Form.Group controlId="exampleForm.ControlInput1" className="add-input">
          <Form.Label>NH3</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz NH3"
            onChange={event => setNHThree(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="add-input"
        >
          <Form.Label>H2S</Form.Label>
          <Form.Control
            as="select"
            onChange={event => setHTwoS(event.target.value)}
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
            onChange={event => setCOTwo(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" className="add-input">
          <Form.Label>Temperatura</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz temperature"
            onChange={event => setTemperature(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" className="add-input">
          <Form.Label>Wilgotność</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wpisz wilgotność"
            onChange={event => setWetness(event.target.value)}
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
            selected={date}
            onChange={date => setDate(date)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="add-input"
        >
          <Form.Label>Godzina badania</Form.Label>
          <DatePicker
            selected={hour}
            onChange={date => setHour(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </Form.Group>
      </Form>

      <Button variant="success" onClick={submitHandler}>
        POTWIERDŹ
      </Button>
    </div>
  );
};

export default AddGlobalForm;
