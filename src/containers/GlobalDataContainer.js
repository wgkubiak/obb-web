import React, { useState, useEffect } from "react";
import GlobalChart from "./../components/Charts/GlobalChart";
import { Table, Modal, Button, Spinner } from "react-bootstrap";
import Body from "./../components/Table/Body";
import Head from "./../components/Table/Head";
import AddButton from "./../components/Buttons/AddButton";
import AddGlobalForm from "./../components/Forms/AddGlobalForm";
import GeneratePDFButton from "./../components/Buttons/GeneratePDFButton";
import shortid from "shortid";
import jsPDF from "jspdf";
import "jspdf-autotable";

const GlobalDataContainer = () => {
  const [data, setData] = useState([]);
  const [unlData, setUnlData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState("");
  const [measureDate, setMeasureDate] = useState("");
  const [measureTime, setMeasureTime] = useState("");
  const [nh, setNh] = useState("");
  const [htwo, setHTwo] = useState("");
  const [co, setCO] = useState("");
  const [temp, setTemp] = useState("");
  const [wet, setWet] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [datesData, setDatesData] = useState([]);
  const [nhData, setNHData] = useState([]);
  const [htwoData, setHTwoData] = useState([]);
  const [coData, setCOData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [wetData, setWetData] = useState([]);

  const [sorted, setSorted] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const getData = async () => {
    await fetch(`https://obb-api.herokuapp.com/global-latest`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(e => e);
  };

  const getUnlimitedData = () => {
    fetch(`https://obb-api.herokuapp.com/global`)
    .then(res => res.json())
    .then(res => setUnlData(res))
    .catch(e => e);
  }

  const remove = () => {
    fetch(`https://obb-api.herokuapp.com/delete-global/${id}`, {
      method: "DELETE"
    })
      .then(handleModalClose())
      .then(setShowForm(false));
  };

  useEffect(() => {
    getData();
    getUnlimitedData();
    sortData();
    setShowChart(true);
  }, [sorted]);

  const toggleAddForm = () => {
    setShowForm(!showForm);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const date = new Date();

    doc.text(`Raport pomiarow`, 10, 20);
    doc.autoTable({
      startY: 25,
      head: [["ID", "Data", "Godz", "NH3", "H2S", "CO2", "Temp", "Wilg"]],
      body: unlData.map(data => [
        `${data.id}`,
        `${data.measureDate.substring(0, 10)}`,
        `${data.measureTime}`,
        `${data.nhThree}`,
        `${data.hTwoS}`,
        `${data.coTwo}`,
        `${data.temperature}`,
        `${data.wetness}`
      ])
    });

    doc.save("global-data-units.pdf");
  };

  const sortData = () => {
    const datesContainer = [];
    const nhContainer = [];
    const htwoContainer = [];
    const coContainer = [];
    const tempContainer = [];
    const wetContainer = [];

    Object.keys(data).map(item => {
      Object.keys(data[item]).map(element => {
        switch (element) {
          case "measureDate":
            datesContainer.push(data[item][element].substring(5, 10));
            break;
          case "nhThree":
            nhContainer.push(data[item][element]);
            break;
          case "hTwoS":
            htwoContainer.push(data[item][element]);
            break;
          case "coTwo":
            coContainer.push(data[item][element]);
            break;
          case "temperature":
            tempContainer.push(data[item][element]);
            break;
          case "wetness":
            wetContainer.push(data[item][element]);
            break;
          default:
            break;
        }
      });
    });

    setDatesData(datesContainer.reverse());
    setNHData(nhContainer.reverse());
    setHTwoData(htwoContainer.reverse());
    setCOData(coContainer.reverse());
    setTempData(tempContainer.reverse());
    setWetData(wetContainer.reverse());

    // TODO: make it a little bit better
    setTimeout(() => {
      setSorted(true);
      console.log(sorted);
    }, 4000);
  };

  const showFormHandler = (id, mDate, mTime, nh, htwo, co, temp, wet) => {
    setId(id);
    setMeasureDate(mDate);
    setMeasureTime(mTime);
    setNh(nh);
    setHTwo(htwo);
    setCO(co);
    setTemp(temp);
    setWet(wet);

    toggleForm();
  };

  const toggleForm = () => {
    setShowButtons(!showButtons);
  };
  return (
    <div className="UnitsContainer" style={{ marginTop: "1em" }}>
      <AddButton toggleHandler={toggleAddForm} />
      {/* TODO toggleAddForm - Add global measure */}
      <div className="UnitsTable">
        <div className="TableContent">
          <Table bordered hover variant="dark">
            <thead>
              <Head
                data={[
                  "ID pomiaru",
                  "Data pomiaru",
                  "Godzina",
                  "NH3",
                  "H2S",
                  "CO2",
                  "Temperatura",
                  "Wilgotność"
                ]}
              />
            </thead>
            <tbody>
              {data.map((data, index) => (
                <Body
                  key={`${data.id}${shortid.generate()}`}
                  data={data}
                  showForm={showFormHandler.bind(
                    this,
                    data.id,
                    data.measureDate,
                    data.measureTime,
                    data.nhThree,
                    data.hTwoS,
                    data.coTwo,
                    data.remperature,
                    data.wetness
                  )}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <GeneratePDFButton
          generatePDFHandler={generatePDF}
        />
        {/* generatePDF */}
        {showButtons && (
          <>
            <Button
              variant="danger"
              className="button--delete"
              onClick={handleModalShow}
            >
              Usuń pomiar #{id}
            </Button>
            <Button
              variant="danger"
              className="button--delete"
              onClick={handleModalShow}
            >
              Edytuj pomiar #{id}
            </Button>

            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header>
                <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
              </Modal.Header>
              <Modal.Body>Próba usunięcia pomiaru nr. #{id}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Nie
                </Button>
                <Button variant="primary" onClick={remove}>
                  Tak, usuń
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
      {!sorted && (
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Wczytuję dane...
        </Button>
      )}
      {showChart && (
        <div className="chart">
          <GlobalChart
            chartClass="chart--temperature"
            chartID="global-chart"
            mode="bar"
            chartLabel="Temperatura"
            miny={18}
            maxy={25}
            dates={datesData}
            data={tempData}
          />
          <GlobalChart
            chartClass="chart--wetness"
            chartID="global-chart"
            mode="bar"
            chartLabel="Wilgotność (55-70)"
            miny={50}
            maxy={70}
            dates={datesData}
            data={wetData}
          />
          <GlobalChart
            chartClass="chart--nhthree"
            chartID="global-chart"
            mode="bar"
            chartLabel="NH3 (0 - 20)"
            miny={0}
            maxy={20}
            dates={datesData}
            data={nhData}
          />
          <GlobalChart
            chartClass="chart--htwos"
            chartID="global-chart"
            mode="bar"
            chartLabel="H2S (0-2)"
            miny={0}
            maxy={2}
            dates={datesData}
            data={htwoData}
          />
          <GlobalChart
            chartClass="chart--cotwo"
            chartID="global-chart"
            mode="bar"
            chartLabel="CO2 (500-3000)"
            miny={0}
            maxy={3000}
            dates={datesData}
            data={coData}
          />
        </div>
      )}

      {showForm && <AddGlobalForm showAddGlobalHandler={toggleAddForm}/>}
    </div>
  );
};

export default GlobalDataContainer;
