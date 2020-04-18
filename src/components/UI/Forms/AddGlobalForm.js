import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import styled from "styled-components";

registerLocale("pl", pl);

const StyledAddGlobalForm = styled.div`
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
  font-family: 'Roboto', sans-serif;
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
  background-color: #424242!important;
  width: auto;
  font-size: small;
  color: rgba(255, 255, 255, 0.87) !important;
  
  &:hover {
    color: #000000 !important
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
  border-bottom: 1px solid #30d158
`;

const StyledButton = styled(Button)`
  position: relative;
  width: 100%;
  margin-top: 0.2em;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #30d158 !important;
  
  &:hover {
    background-color: #29b64c !important;
  }
`;

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
    <StyledAddGlobalForm>
      <StyledHideButton
        variant="dark"
        onClick={props.showAddGlobalHandler}
      >
        X
      </StyledHideButton>
      <Form>     
        <Form.Group controlId="exampleForm.ControlInput1" >
          <StyledFormLabel>NH3</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz NH3"
            onChange={event => setNHThree(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          
        >
          <StyledFormLabel>H2S</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={event => setHTwoS(event.target.value)}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </StyledSelect>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" >
          <StyledFormLabel>C02</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz CO2"
            onChange={event => setCOTwo(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" >
          <StyledFormLabel>Temperatura</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz temperature"
            onChange={event => setTemperature(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1" >
          <StyledFormLabel>Wilgotność</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz wilgotność"
            onChange={event => setWetness(event.target.value)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          
        >
          <StyledFormLabel>Data badania</StyledFormLabel>
          <StyledDatePicker
            className="date-picker"
            locale="pl"
            selected={date}
            onChange={date => setDate(date)}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          
        >
          <StyledFormLabel>Godzina badania</StyledFormLabel>
          <StyledDatePicker
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

      <StyledButton variant="success" onClick={submitHandler}>
        POTWIERDŹ
      </StyledButton>
    </StyledAddGlobalForm>
  );
};

export default AddGlobalForm;
