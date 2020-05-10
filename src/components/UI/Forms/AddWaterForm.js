import React, { useState, useEffect, useMemo } from "react";
import { Form } from "react-bootstrap";
import {
  StyledFormLabel,
  StyledDatePicker,
  StyledConfirmButton,
  StyledEditForm,
  StyledHideButton,
  StyledFormControlShort,
} from "./../../../Styles";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

const AddWaterForm = (props) => {
  const currentTime = new Date();
  const [measureDate, setMeasureDate] = useState(currentTime);
  const [measureTime, setMeasureTime] = useState(currentTime);
  const [waterInit, setWaterInit] = useState(0);
  const [waterUsed, setWaterUsed] = useState(0);

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
    console.log(data);

    const token = localStorage.getItem("token");

    fetch(`https://obb-api.herokuapp.com/water-add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success", data);
      })
      .then(props.toggleAddHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <StyledEditForm>
      <StyledHideButton variant="dark" onClick={props.toggleAddHandler}>
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

      <StyledConfirmButton variant="success" onClick={submitHandler}>
        POTWIERDŹ
      </StyledConfirmButton>
    </StyledEditForm>
  );
};

export default AddWaterForm;
