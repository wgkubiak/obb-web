import React, { useState, useMemo, useEffect } from "react";
import { Form } from "react-bootstrap";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import {
  StyledSelect,
  StyledFormLabel,
  StyledFormControl,
  StyledDatePicker,
  StyledConfirmButton,
  StyledEditForm,
  StyledHideButton,
  StyledEditInput
} from "./../../../Styles";

registerLocale("pl", pl);

const EditUnitForm = (props) => {
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
      pigShoppingPrice: Number(price)
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

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

    fetch(
      `http://obb-api.herokuapp.com/edit-pig/${props.idPig.replace(/ /g, "")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.showEditHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <StyledEditForm>
      <StyledHideButton variant="dark" onClick={props.showEditHandler}>
        X
      </StyledHideButton>
      <Form>
        <StyledEditInput>
          <StyledFormLabel>Kojec</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={(event) => setPen(event.target.value)}
          >
            <option>Kojec (Domyślnie: bez zmian)</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </StyledSelect>
        </StyledEditInput>
        <StyledEditInput>
          <StyledFormLabel>Płeć</StyledFormLabel>
          <StyledSelect
            as="select"
            onChange={(event) => setGender(event.target.value)}
            defaultValue={gender === "m"}
          >
            <option value={true}>Samiec</option>
            <option value={false}>Samica</option>
          </StyledSelect>
        </StyledEditInput>
        <StyledEditInput>
          <StyledFormLabel>Cena</StyledFormLabel>
          <StyledFormControl
            type="number"
            placeholder="Wprowadź cenę"
            onChange={(event) => setPrice(event.target.value)}
            defaultValue={price}
          />
        </StyledEditInput>
        <StyledEditInput>
          <StyledFormLabel>Data zakupu</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={shoppingDate}
            onChange={(date) => setShoppingDate(date)}
          />
        </StyledEditInput>
      </Form>

      <StyledConfirmButton onClick={submitHandler}>
        POTWIERDŹ
      </StyledConfirmButton>
    </StyledEditForm>
  );
};

export default EditUnitForm;
