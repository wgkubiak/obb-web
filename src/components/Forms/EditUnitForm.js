import React, { useState, useMemo, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import styled from "styled-components";

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

const StyledFormLabel = styled(Form.Label)`
  color: #000000
`;

const StyledEditUnitForm = styled.div`
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


const StyledConfirmButton = styled(Button)`
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  text-align: center;
  background-color: #eeeeee;
  color: #212121
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

const StyledSelect = styled(Form.Control)`
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  text-align-last:center;
  text-align: center;
  background-color: #eeeeee;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0em !important;
  color: #000000
`;

registerLocale("pl", pl);

const EditUnitForm = props => {
  let defaultDate = new Date();
  const [pen, setPen] = useState(props.id);
  const [gender, setGender] = useState(props.gender);
  const [shoppingDate, setShoppingDate] = useState(defaultDate);
  const [price, setPrice] = useState(props.price);

  const data = useMemo(
    () => ({
      idPen: pen,
      pigGender: gender.toString() === "true" ? "m" : "f",
      pigShoppingDate: shoppingDate,
      pigShoppingPrice: price
    }),
    [pen, gender, shoppingDate, price]
  );

  useEffect(() => {
    console.log(
      `${pen}, ${
        gender.toString() === "true" ? "m" : "f"
      }, ${shoppingDate}, ${price}`
    );
  }, [pen, gender, shoppingDate, price]);

  const submitHandler = event => {
    event.preventDefault();
    console.log(data);

    fetch(
      `http://obb-api.herokuapp.com/edit-pig/${props.idPig.replace(/ /g, "")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .then(props.showEditHandler())
      .catch(error => {
        console.error("Error:", error);
      });

      setTimeout(() => {
        props.reloadHandler()
      }, 500)
  };

  return (
    <StyledEditUnitForm>
      <StyledHideButton
        variant="dark"
        onClick={props.showEditHandler}
      >
        X
      </StyledHideButton>
      <Form>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="edit-input"
        >
          <StyledFormLabel>Kojec</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={event => setPen(event.target.value)}
          >
            <option>Kojec (Domyślnie: bez zmian)</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </StyledSelect>
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="edit-input"
        >
          <StyledFormLabel>Płeć</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={event => setGender(event.target.value)}
            defaultValue={gender === "m"}
          >
            <option value={true}>Samiec</option>
            <option value={false}>Samica</option>
          </StyledSelect>
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlInput1"
          className="edit-input"
        >
          <StyledFormLabel>Cena</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="0"
            onChange={event => setPrice(event.target.value)}
            defaultValue={price}
          />
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
        >
          <StyledFormLabel>Data zakupu</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={shoppingDate}
            onChange={date => setShoppingDate(date)}
          />
        </Form.Group>
      </Form>

      <StyledConfirmButton onClick={submitHandler}>
        POTWIERDŹ
      </StyledConfirmButton>
    </StyledEditUnitForm>
  );
};

export default EditUnitForm;
