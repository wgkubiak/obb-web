import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import styled from "styled-components";

registerLocale("pl", pl);

const StyledAddUnitForm = styled.div`
  background-color: #ffffff;
  color: #eeeeee;
  position: fixed;
  width: 20em;
  height: auto;
  left: 0;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
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
  background-color: #ffffff !important;
  width: auto;
  font-size: small;
  color: #292930 !important;
  
  &:hover {
    color: #000000
  }
`;

const StyledAddInputForm = styled(Form.Group)`
  width: 80%;
  left: 50%;
  transform: translate(-50%, 0%);
  position: relative;
  color: #019199;
  margin-top: 2em;
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
  height: auto;
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

const StyledFormLabel = styled(Form.Label)`
  color: #000000;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
`;

const StyledButton = styled(Button)`
  position: relative;
  width: 100%;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #546e7a !important;
  
  &:hover {
    background-color: #29434e !important;
  }
`;

const StyledOption = styled.option`
  background-color:  #eeeeee ;
  color: #212121
`;

const AddForm = (props) => {
  let defaultDate = new Date();
  const [identifier, setIdentifier] = useState("");
  const [gender, setGender] = useState("Samiec");
  const [shoppingDate, setShoppingDate] = useState(defaultDate);
  const [price, setPrice] = useState("0");

  const data = useMemo(
    () => ({
      idPen: props.id,
      id: identifier,
      pigGender: gender === "Samiec" ? "m" : "f",
      pigShoppingDate: shoppingDate,
      pigShoppingPrice: price,
    }),
    [props.id, identifier, gender, shoppingDate, price]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

    fetch("http://obb-api.herokuapp.com/add-pig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.showAddUnitHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <StyledAddUnitForm>
      <StyledHideButton
        variant="dark"
        onClick={props.showAddUnitHandler}
      >
        X
      </StyledHideButton>
      <Form>
        <StyledAddInputForm controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>ID</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="Wpisz ID jednostki"
            onChange={(event) => setIdentifier(event.target.value)}
          />
        </StyledAddInputForm>
        <StyledAddInputForm
          controlId="exampleStyledFormControlSelect1"
        >
          <StyledFormLabel>Płeć</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={(event) => setGender(event.target.value)}
          >
            <StyledOption>Samiec</StyledOption>
            <StyledOption>Samica</StyledOption>
          </StyledSelect>
        </StyledAddInputForm>
        <StyledAddInputForm controlId="exampleStyledFormControlInput1">
          <StyledFormLabel>Cena</StyledFormLabel>
          <StyledFormControl
            type="text"
            placeholder="0"
            onChange={(event) => setPrice(event.target.value)}
          />
        </StyledAddInputForm>
        <StyledAddInputForm
          controlId="exampleStyledFormControlSelect1"
        >
          <StyledFormLabel>Data zakupu</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={shoppingDate}
            onChange={(date) => setShoppingDate(date)}
          />
        </StyledAddInputForm>
      </Form>

      <StyledButton onClick={submitHandler}>
        POTWIERDŹ
      </StyledButton>
    </StyledAddUnitForm>
  );
};

export default AddForm;
