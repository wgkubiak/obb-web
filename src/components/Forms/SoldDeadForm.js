import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

const SoldDeadForm = props => {
  let defaultDate = new Date();

  const [date, setDate] = useState(defaultDate);
  const [price, setPrice] = useState("0");
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
      pigSellingCost: price
    }),
    [date, price]
  );

  const submitHandler = event => {
    event.preventDefault();
    console.log(`MODE: ${mode}, DEATH/SOLD DATE: ${date}, PRICE: ${price}`);

    fetch(`http://obb-api.herokuapp.com/pig-${mode}/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: mode === "dead" ? JSON.stringify(data) : JSON.stringify(_data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
      })
      .then(
        props.hideEverythingHandler()
      )
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="SoldDeadForm">
      <Button
        className="hide-selection"
        variant="dark"
        style= {{width: "100%"}}
        onClick={props.showHandler}
      >
        Ukryj
      </Button>
      <Form>
        <Form.Group controlId="sold-dead--selection">
          <Form.Label>Tryb</Form.Label>
          <Form.Control
            as="select"
            onChange={event => {
                setMode(event.target.value === "Zgon" ? "dead" : "sold");
                console.log(event.target.value)
            }       
            }
          >
            <option>Zgon</option>
            <option>Sprzedaż</option>
          </Form.Control>
        </Form.Group>
        {mode === "sold" && (
          <Form.Group controlId="sold-dead--price-input">
            <Form.Label>Cena</Form.Label>
            <Form.Control
              type="text"
              placeholder="0"
              onChange={event => setPrice(event.target.value)}
            />
          </Form.Group>
        )}
        <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Data {mode === "dead" ? "zgonu" : "sprzedaży"}</Form.Label>
          <DatePicker
            className="date-picker"
            locale="pl"
            selected={date}
            onChange={date => setDate(date)}
          />
        </Form.Group>
      </Form>

      <Button variant="success" onClick={submitHandler}>
        POTWIERDŹ
      </Button>
    </div>
  );
};

export default SoldDeadForm;
