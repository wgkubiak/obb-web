import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

import {
  StyledFormControlShort,
  StyledEditForm,
  StyledHideButton,
  StyledFormLabel,
  StyledDatePicker,
  StyledSelectShort,
  StyledConfirmButton,
} from "./../../../Styles";

registerLocale("pl", pl);

const AddGlobalForm = (props) => {
  let defaultDate = new Date();

  const [date, setDate] = useState(defaultDate);
  const [hour, setHour] = useState(defaultDate);
  const [nHThree, setNHThree] = useState(0);
  const [hTwoS, setHTwoS] = useState("0");
  const [cOTwo, setCOTwo] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [wetness, setWetness] = useState(0);

  const data = useMemo(
    () => ({
      measureDate: date,
      measureTime: hour.toString().substring(16, 31),
      nhThree: Number(nHThree),
      hTwoS: Number(hTwoS),
      coTwo: Number(cOTwo),
      temperature: Number(temperature),
      wetness: Number(wetness)
    }),
    [date, hour, nHThree, hTwoS, cOTwo, temperature, wetness]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://obb-api.herokuapp.com/add-global", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(data),
      token: token
    })
      .then((response) => response.json())
      .then((data) => {
       console.log("Success:", data);
      })
      .then(props.showAddGlobalHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
      props.sortHandler();
    }, 500);
  };

  return (
    <StyledEditForm>
      <StyledHideButton variant="dark" onClick={props.showAddGlobalHandler}>
        X
      </StyledHideButton>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <StyledFormLabel>NH3</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź NH3"
            onChange={(event) => setNHThree(event.target.value)}
            defaultValue={nHThree}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <StyledFormLabel>H2S</StyledFormLabel>
          <StyledSelectShort
            as="select"
            onChange={(event) => setHTwoS(event.target.value)}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </StyledSelectShort>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <StyledFormLabel>C02</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź CO2"
            onChange={(event) => setCOTwo(event.target.value)}
            defaultValue={cOTwo}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <StyledFormLabel>Temperatura</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź temperaturę"
            onChange={(event) => setTemperature(event.target.value)}
            defaultValue={temperature}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <StyledFormLabel>Wilgotność</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź wilgotność"
            onChange={(event) => setWetness(event.target.value)}
            defaultValue={wetness}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <StyledFormLabel>Data badania</StyledFormLabel>
          <StyledDatePicker
            className="date-picker"
            locale="pl"
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <StyledFormLabel>Godzina badania</StyledFormLabel>
          <StyledDatePicker
            selected={hour}
            onChange={(date) => setHour(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
          />
        </Form.Group>
      </Form>

      <StyledConfirmButton variant="success" onClick={submitHandler}>
        POTWIERDŹ
      </StyledConfirmButton>
    </StyledEditForm>
  );
};

export default AddGlobalForm;
