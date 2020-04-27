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
  StyledSelectShort,
  StyledConfirmButton,
} from "./../../../Styles";

registerLocale("pl", pl);

const AddPenMeasureForm = (props) => {
  let defaultDate = new Date();

  const [measureDate, setMeasureDate] = useState(defaultDate);
  const [measureTime, setMeasureTime] = useState(defaultDate);
  const [dosatron, setDosatron] = useState(0);
  const [forage, setForage] = useState(0);
  const [forageQtyUsed, setForageQtyUsed] = useState(0);
  const [breaks, setBreaks] = useState("");
  const [additions, setAdditions] = useState("");

  const data = useMemo(
    () => ({
      idPen: props.id,
      measureDate: measureDate,
      measureTime: measureTime.toString().substring(16, 31),
      breakdown: breaks,
      dosatron: Number(dosatron),
      addition: additions,
      forage: Number(forage),
      forageQtyUsed: Number(forageQtyUsed)
    }),
    [
      props.id,
      measureDate,
      measureTime,
      breaks,
      dosatron,
      additions,
      forage,
      forageQtyUsed,
    ]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

    fetch(`http://obb-api.herokuapp.com/add-pen-measure`, {
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
      .then(props.toggleAddHandler())
      .then(props.sortedHandler(false))
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
          <StyledFormLabel>Data badania</StyledFormLabel>
          <StyledDatePicker
            locale="pl"
            selected={measureDate}
            onChange={(date) => setMeasureDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Godzina badania</StyledFormLabel>
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

        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Awaria</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Rodzaj awarii"
            defaultValue={breaks}
            onChange={(event) => setBreaks(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortSelect1">
          <StyledFormLabel>Dozownik</StyledFormLabel>
          <StyledSelectShort
            as="select"
            onChange={(event) => setDosatron(event.target.value)}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
          </StyledSelectShort>
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Dodatki</StyledFormLabel>
          <StyledFormControlShort
            type="text"
            placeholder="Wpisz dodatki"
            defaultValue={additions}
            onChange={(event) => setAdditions(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Ilość wprowadzona</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wpisz ilość"
            defaultValue={forage}
            onChange={(event) => setForage(event.target.value)}
            defaultValue={forage}
          />
        </Form.Group>
        <Form.Group controlId="exampleStyledFormControlShortInput1">
          <StyledFormLabel>Pozostałe</StyledFormLabel>
          <StyledFormControlShort
            type="number"
            placeholder="Wpisz ilość"
            defaultValue={forageQtyUsed}
            onChange={(event) => setForageQtyUsed(event.target.value)}
            defaultValue={forageQtyUsed}
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

export default AddPenMeasureForm;
