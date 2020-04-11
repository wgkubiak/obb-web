import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import styled from "styled-components";

const StyledSoldDeadForm = styled.div`
  width: 20em;
  height: auto;
  z-index: 2;
  position: fixed;
  background-color: #ffffff;
  color: #eeeeee;
  left: 50%;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.3em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

const StyledHideButton = styled(Button)`
  position: absolute;
  top: 0;
  width: 10%;
  right: 0;
  background-color: #651FFF !important;
  height: auto;
  margin-right: auto;
  border-radius: 0;
  text-transform: uppercase;
  border: none !important;
  outline: none;

  &:hover {
    background-color: #6200EA !important;
  }
`;

const StyledButton = styled(Button)`
  position: relative;
  width: 100%;
  border-radius: 0;
  background-color: #651FFF !important;
  height: auto;
  border: none !important;
  outline: none;

  &:hover {
    background-color: #6200EA !important;
  }
`;

const StyledFormControl = styled(Form.Control)`
  text-align-last:center;
  text-align: center;
  background-color: #eeeeee;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0em !important;
  color: #000000
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  text-align: center;
  background-color: #eeeeee;
  color: #212121
`;

const StyledFormLabel = styled(Form.Label)`
  color: #000000;
`;

const StyledSelect = styled(Form.Control)`
  width: 100%;
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

registerLocale("pl", pl);

const SoldDeadForm = (props) => {
  let defaultDate = new Date();

  const [date, setDate] = useState(defaultDate);
  const [price, setPrice] = useState("0");
  const [mode, setMode] = useState("dead");

  const data = useMemo(
    () => ({
      pigDeathDate: date,
    }),
    [date]
  );

  const _data = useMemo(
    () => ({
      pigSaleDate: date,
      pigSellingCost: price,
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
    <StyledSoldDeadForm>
      <StyledHideButton variant="dark" onClick={props.showHandler}>
        X
      </StyledHideButton>
      <Form>
        <Form.Group
        className="edit-input">
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
          <Form.Group controlId="sold-dead--price-input">
            <StyledFormLabel>Cena</StyledFormLabel>
            <StyledFormControl
              type="text"
              placeholder="0"
              onChange={(event) => setPrice(event.target.value)}
            />
          </Form.Group>
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

      <StyledButton onClick={submitHandler}>POTWIERDŹ</StyledButton>
    </StyledSoldDeadForm>
  );
};

export default SoldDeadForm;
