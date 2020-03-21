import React, { useState, useMemo, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

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
    <div className="EditUnitForm">
      <Button
        className="hide-selection"
        variant="dark"
        onClick={props.showEditHandler}
      >
        Ukryj
      </Button>
      <Form>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="edit-input"
        >
          <Form.Label>Kojec</Form.Label>
          <Form.Control
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
          </Form.Control>
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlSelect1"
          className="edit-input"
        >
          <Form.Label>Płeć</Form.Label>
          <Form.Control
            as="select"
            onChange={event => setGender(event.target.value)}
            defaultValue={gender === "m"}
          >
            <option value={true}>Samiec</option>
            <option value={false}>Samica</option>
          </Form.Control>
        </Form.Group>
        <Form.Group
          controlId="exampleForm.ControlInput1"
          className="edit-input"
        >
          <Form.Label>Cena</Form.Label>
          <Form.Control
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
          <Form.Label>Data zakupu</Form.Label>
          <DatePicker
            className="date-picker"
            locale="pl"
            selected={shoppingDate}
            onChange={date => setShoppingDate(date)}
          />
        </Form.Group>
      </Form>

      <Button variant="success" onClick={submitHandler}>
        POTWIERDŹ
      </Button>
    </div>
  );
};

export default EditUnitForm;
