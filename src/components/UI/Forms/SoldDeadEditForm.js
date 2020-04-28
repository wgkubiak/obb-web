import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

import {
  StyledDatePicker,
  StyledConfirmButton,
  StyledHideButton,
  StyledFormControl,
  StyledEditForm,
  StyledFormLabel,
} from "./../../../Styles";

registerLocale("pl", pl);

const SoldDeadEditForm = (props) => {
  const _date = new Date();
  const [date, setDate] = useState(_date);
  const [price, setPrice] = useState(props.price || null);

  const data = useMemo(
    () => ({
      pigSaleDate: date,
      pigSellingCost: Number(price),
    }),
    [date, price]
  );

  const _data = useMemo(
    () => ({
      pigDeathDate: date,
    }),
    [date]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch(
      `http://obb-api.herokuapp.com/pig-${props.mode}/${props.id.replace(
        / /g,
        ""
      )}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body:
          props.mode === "sold" ? JSON.stringify(data) : JSON.stringify(_data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.showHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500); //TODO doesnt work for dead mode
  };

  return (
    <StyledEditForm>
      {props.mode === "sold" && (
        <>
          <StyledHideButton onClick={props.showHandler}>X</StyledHideButton>
          <Form>
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="edit-input"
            >
              <StyledFormLabel>Kwota sprzedaży</StyledFormLabel>
              <StyledFormControl
                type="number"
                placeholder="Wprowadź cenę"
                onChange={(event) => setPrice(event.target.value)}
                defaultValue={price}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              className="edit-input"
            >
              <StyledFormLabel>Data sprzedaży</StyledFormLabel>
              <StyledDatePicker
                className="date-picker"
                locale="pl"
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </Form.Group>
          </Form>

          <StyledConfirmButton variant="success" onClick={submitHandler}>
            POTWIERDŹ
          </StyledConfirmButton>
        </>
      )}
      {props.mode === "dead" && (
        <>
          <StyledHideButton variant="dark" onClick={props.showHandler}>
            X
          </StyledHideButton>
          <Form>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              className="edit-input"
            >
              <StyledFormLabel>Data zgonu</StyledFormLabel>
              <StyledDatePicker
                locale="pl"
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </Form.Group>
          </Form>

          <StyledConfirmButton variant="success" onClick={submitHandler}>
            POTWIERDŹ
          </StyledConfirmButton>
        </>
      )}
    </StyledEditForm>
  );
};

export default SoldDeadEditForm;
