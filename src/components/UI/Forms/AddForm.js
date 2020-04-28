import React, { useState, useMemo } from "react";
import { Form } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import {
  StyledFormLabel,
  StyledFormControl,
  StyledAddInputForm,
  StyledDatePicker,
  StyledConfirmButton,
  StyledAddForm,
  StyledHideButton,
  StyledSelect,
  StyledOption,
  StyledErrorFigcaption
} from "./../../../Styles";

registerLocale("pl", pl);

const AddForm = (props) => {
  let defaultDate = new Date();
  const [identifier, setIdentifier] = useState("");
  const [gender, setGender] = useState("Samiec");
  const [shoppingDate, setShoppingDate] = useState(defaultDate);
  const [price, setPrice] = useState(0);
  const [validationStyle, setValidationStyle] = useState({});
  const [showError, setShowError] = useState(false);
  const errorInfo = "Wprowadź ID jednostki";

  const data = useMemo(
    () => ({
      idPen: props.id,
      id: identifier,
      pigGender: gender === "Samiec" ? "m" : "f",
      pigShoppingDate: shoppingDate,
      pigShoppingPrice: Number(price)
    }),
    [props.id, identifier, gender, shoppingDate, price]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.token;

    if(data.id === "" || data.id === undefined || (data.id).length < 5) {
      setValidationStyle({borderBottomColor: "#ff373b", color: "#ff373b"})
      setShowError(true);
    } else {
      fetch("http://obb-api.herokuapp.com/add-pig", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
    }
  };

  const idHandler = event => {
    setIdentifier(event.target.value);
    setValidationStyle({borderBottomColor: "#30d158", color: ""})
    setShowError(false);
  }

  return (
    <StyledAddForm>
      <StyledHideButton variant="dark" onClick={props.showAddUnitHandler}>
        X
      </StyledHideButton>
      <Form>
        <StyledAddInputForm controlId="exampleStyledFormControlInput1">
        <StyledFormLabel>ID</StyledFormLabel>
         <figure>
         
          <StyledFormControl
            type="text"
            placeholder={errorInfo}
            onChange={(event) => idHandler(event)}
            style={validationStyle}
          />
          {showError && (
            <StyledErrorFigcaption>Zły typ danych</StyledErrorFigcaption>
          )}
         </figure>
        </StyledAddInputForm>
        <StyledAddInputForm controlId="exampleStyledFormControlSelect1">
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
            type="number"
            placeholder="Wprowadź cenę"
            onChange={(event) => setPrice(event.target.value)}
            defaultValue={price}
          />
        </StyledAddInputForm>
        <StyledAddInputForm controlId="exampleStyledFormControlSelect1">
          <StyledFormLabel>Data zakupu</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={shoppingDate}
            onChange={(date) => setShoppingDate(date)}
          />
        </StyledAddInputForm>
      </Form>

      <StyledConfirmButton onClick={submitHandler}>
        POTWIERDŹ
      </StyledConfirmButton>
    </StyledAddForm>
  );
};

export default AddForm;
