import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import styled from "styled-components";

registerLocale("pl", pl);

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
    color: rgba(255, 255, 255, 0.87)
  }
`;

const StyledFormLabel = styled(Form.Label)`
color: rgba(255, 255, 255, 0.87);
font-family: 'Roboto', sans-serif;
font-weight: 500;
`;

const StyledEditForm = styled.div`
  width: 20em;
  height: auto;
  z-index: 2;
  position: fixed;
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  left: 50%;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

const StyledConfirmButton = styled(Button)`
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  text-align: center;
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  border: none;
  border-bottom: 1px solid #30d158
`;

const StyledFormControl = styled(Form.Control)`
  text-align-last:center;
  text-align: center;
  background-color: #424242;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #30d158;
  border-radius: 0em !important;
  color: rgba(255, 255, 255, 0.87)
`;

const SoldDeadEditForm = props => {
  const _date = new Date();
  const [date, setDate] = useState(_date);
  const [price, setPrice] = useState(props.price || null);

  const data = useMemo(
    () => ({
      pigSaleDate: date,
      pigSellingCost: price
    }),
    [date, price]
  );

  const _data = useMemo(
    () => ({
      pigDeathDate: date
    }),
    [date]
  );

  const submitHandler = event => {
    event.preventDefault();
    console.log(data);

    fetch(
      `http://obb-api.herokuapp.com/pig-${props.mode}/${props.id.replace(/ /g, "")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: props.mode === "sold" ? JSON.stringify(data) : JSON.stringify(_data)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .then(props.showHandler())
      .catch(error => {
        console.error("Error:", error);
      });

      setTimeout(() => {
        props.reloadHandler()
      }, 500) //TODO doesnt work for dead mode
  };

  return (
    <StyledEditForm>
      {props.mode === "sold" && (
        <>
          <StyledHideButton
            onClick={props.showHandler}
          >
            X
          </StyledHideButton>
          <Form>
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="edit-input"
            >
              <StyledFormLabel>Kwota sprzedaży</StyledFormLabel>
              <StyledFormControl
                type="text"
                placeholder="0"
                onChange={event => setPrice(event.target.value)}
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
                onChange={date => setDate(date)}
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
          <StyledHideButton
            variant="dark"
            onClick={props.showHandler}
          >
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
                onChange={date => setDate(date)}
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
