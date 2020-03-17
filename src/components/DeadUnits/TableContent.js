import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import GeneratePDFButton from "./../Buttons/GeneratePDFButton";
import Menu from "./../Menu/Menu";

import shortid from "shortid";

import jsPDF from "jspdf";
import "jspdf-autotable";

const TableContent = props => {
  const [data, setData] = useState([]);
  const [unlimitedData, setUnlimitedData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [idPig, setIdPig] = useState("");

  const getData = () => {
    fetch(`https://obb-api.herokuapp.com/dead-pigs-limited`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(e => e);
  };

  const getUnlimitedData = () => {
    fetch(`https://obb-api.herokuapp.com/dead-pigs`)
      .then(res => res.json())
      .then(res => setUnlimitedData(res))
      .catch(e => e);
  };

  useEffect(() => {
    getData();
    getUnlimitedData();
  }, [props.isOn]);

  const showForm = id => {
    setIdPig(id);
    toggleMenu();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date();

    doc.text(`Zgony - ${date.toString().substring(0, 15)}`, 10, 20);
    doc.autoTable({
      startY: 25,
      head: [["Data zgonu", "Kojec", "ID", "Plec", "Data zakupu", "Cena"]],
      body: unlimitedData.map(data => [
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

  return (
    <div className="UnitsTable">
      <div className="TableContent">
        <Table bordered hover variant="dark">
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
              <tr
                key={`${data.idPen}${shortid.generate()}key`}
                onClick={showForm.bind(this, data.id)}
              >
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
      <GeneratePDFButton generatePDFHandler={generatePDF} />
      {showMenu && (
        <Menu
          mode="dead"
          id={idPig}
          showMenu={toggleMenu}
          reloadHandler={props.reloadHandler}
        />
      )}
    </div>
  );
};

export default TableContent;
