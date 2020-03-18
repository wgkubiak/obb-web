import React, { useState, useMemo } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

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
  };

  return (
    <div className="EditDeadUnitForm">
      {props.mode === "sold" && (
        <>
          <Button
            className="hide-selection"
            variant="dark"
            onClick={props.showHandler}
          >
            Ukryj
          </Button>
          <Form>
            <Form.Group
              controlId="exampleForm.ControlInput1"
              className="edit-input"
            >
              <Form.Label>Kwota sprzedaży</Form.Label>
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
              <Form.Label>Data sprzedaży</Form.Label>
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
        </>
      )}
      {props.mode === "dead" && (
        <>
          <Button
            className="hide-selection"
            variant="dark"
            onClick={props.showHandler}
          >
            Ukryj
          </Button>
          <Form>
            <Form.Group
              controlId="exampleForm.ControlSelect1"
              className="edit-input"
            >
              <Form.Label>Data zgonu</Form.Label>
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
        </>
      )}
    </div>
  );
};

export default SoldDeadEditForm;
