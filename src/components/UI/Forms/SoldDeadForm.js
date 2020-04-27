import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

import {
  StyledSubmitButton,
  StyledEditForm,
  StyledSelect,
  StyledFormLabel,
  StyledHideButton,
  StyledDatePicker,
  StyledFormControl,
  StyledSoldDeadPriceInput,
} from "./../../../Styles";

registerLocale("pl", pl);

const SoldDeadForm = (props) => {
  let defaultDate = new Date();

  const [date, setDate] = useState(defaultDate);
  const [price, setPrice] = useState(0);
  const [mode, setMode] = useState("dead");

  const data = useMemo(
    () => ({
      pigDeathDate: date
    }),
    [date]
  );

  const _data = useMemo(
    () => ({
      pigSaleDate: date,
      pigSellingCost: Number(price)
    }),
    [date, price]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(`MODE: ${mode}, DEATH/SOLD DATE: ${date}, PRICE: ${price}`);

    fetch(`http://obb-api.herokuapp.com/pig-${mode}/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: mode === "dead" ? JSON.stringify(data) : JSON.stringify(_data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.hideEverythingHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <StyledEditForm>
      <StyledHideButton variant="dark" onClick={props.showHandler}>
        X
      </StyledHideButton>
      <Form>
        <Form.Group className="edit-input">
          <StyledFormLabel>Tryb</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={(event) => {
              setMode(event.target.value === "Zgon" ? "dead" : "sold");
            }}
          >
            <option>Zgon</option>
            <option>Sprzedaż</option>
          </StyledSelect>
        </Form.Group>
        {mode === "sold" && (
          <StyledSoldDeadPriceInput>
            <StyledFormLabel>Cena</StyledFormLabel>
            <StyledFormControl
              type="number"
              placeholder="Wprowadź cenę"
              onChange={(event) => setPrice(event.target.value)}
              defaultValue={price}
            />
          </StyledSoldDeadPriceInput>
        )}
        <Form.Group controlId="exampleForm.ControlSelect1">
          <StyledFormLabel>
            Data {mode === "dead" ? "zgonu" : "sprzedaży"}
          </StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={date}
            onChange={(date) => setDate(date)}
          />
        </Form.Group>
      </Form>

      <StyledSubmitButton onClick={submitHandler}>POTWIERDŹ</StyledSubmitButton>
    </StyledEditForm>
  );
};

export default SoldDeadForm;
