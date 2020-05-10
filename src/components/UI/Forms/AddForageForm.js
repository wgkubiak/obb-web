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
  StyledConfirmButton,
} from "./../../../Styles";

registerLocale("pl", pl);

const AddForageForm = (props) => {
  let defaultDate = new Date();
  const [creationDate, setCreationDate] = useState(defaultDate);
  const [expirationDate, setExpirationDate] = useState(defaultDate);
  const [about, setAbout] = useState(props.about);
  const [qty, setQty] = useState(props.qty);
  const [price, setPrice] = useState(props.price);
  const [producer, setProducer] = useState(props.producer);

  const data = useMemo(
    () => ({
      idPen: props.id,
      fgAbout: about,
      fgQty: Number(qty),
      fgPrice: Number(price),
      creationDate: creationDate,
      producer: producer,
      expiration: expirationDate,
    }),
    [props.id, about, qty, price, creationDate, producer, expirationDate]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`https://obb-api.herokuapp.com/add-forage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify(data),
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
      <StyledHideButton onClick={props.toggleAddHandler}>X</StyledHideButton>
      <Form>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Data stworzenia</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={creationDate}
            onChange={(date) => setCreationDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Data ważności</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
          />
        </Form.Group>

        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Ilość</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź ilość"
            defaultValue={qty}
            onChange={(event) => setQty(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Cena</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wprowadź cenę"
            defaultValue={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Producent</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz dane producenta"
            defaultValue={producer}
            onChange={(event) => setProducer(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Opis</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Podaj dodatkowe informacje"
            defaultValue={about}
            onChange={(event) => setAbout(event.target.value)}
          />
        </Form.Group>
      </Form>

      <div className="Add--buttons-container">
        <StyledConfirmButton onClick={submitHandler}>
          POTWIERDŹ EDYCJĘ
        </StyledConfirmButton>
      </div>
    </StyledEditForm>
  );
};

export default AddForageForm;
