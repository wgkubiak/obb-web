import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import "./AddUnitForm.css";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

class AddUnitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      defaultDate: new Date()
    };
  }

  handleDateChange = date => {
    this.setState({ defaultDate: date})
  }
  
  render() {
    return (
      <div className="AddUnitForm">
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Wpisz ID jednostki" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Płeć</Form.Label>
            <Form.Control as="select">
              <option></option>
              <option>Samiec</option>
              <option>Samica</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Data zakupu</Form.Label>
            <DatePicker className="date-picker"
              locale="pl"
              selected={this.state.defaultDate}
              onChange={this.handleDateChange}
            />
          </Form.Group>
        </Form>
        
        <Button variant="success">POTWIERDŹ</Button>
      </div>
    );
  }
}

export default AddUnitForm;
