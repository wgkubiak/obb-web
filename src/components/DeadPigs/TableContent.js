import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TableContent = ({ initId = 1 }) => {
  const [data, setData] = useState([]);

  const getData = id => {
    fetch(`https://obb-api.herokuapp.com/out-pigs`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(e => e);
  };

  useEffect(() => {
    getData();
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date();

    doc.text(`Zgony - ${date.toString().substring(0, 15)}`, 10, 20);
    doc.autoTable({
      startY: 25,
      head: [["Data zgonu", "Kojec", "ID", "Plec", "Data zakupu", "Cena"]],
      body: data.map((data, index) => [
        `${data.pigDeathDate.substring(0, 10)}`,
        `${data.idPen}`,
        `${data.id}`,
        `${data.pigGender === "m" ? "Samiec" : "Samica"}`,
        `${data.pigShoppingDate.substring(0, 10)}`,
        `${data.pigShoppingPrice}`
      ])
    });

    doc.save("dead-units.pdf");
  };

  //TODO: API deaths descending, limit 25
  return (
    <div className="UnitsTable">
      <div className="TableContent">
        <Table bordered variant="dark">
          <thead>
            <tr>
              <th>Data zgonu</th>
              <th>Kojec</th>
              <th>ID</th>
              <th>Płeć</th>
              <th>Data zakupu</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={`${data.idPen}key`}>
                <td>{data.pigDeathDate.substring(0, 10)}</td>
                <td>{data.idPen}</td>
                <td>{data.id}</td>
                <td>{data.pigGender === "m" ? "Samiec" : "Samica"}</td>
                <td>{data.pigShoppingDate.substring(0, 10)}</td>
                <td>{data.pigShoppingPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button onClick={generatePDF} variant="dark">
        Wygeneruj PDF z większą ilością danych
      </Button>
    </div>
  );
};

export default TableContent;
