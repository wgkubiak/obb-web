import React, { useState, useEffect } from "react";
import GlobalChart from "./../components/Charts/GlobalChart";
import { Table, Button, Spinner } from "react-bootstrap";
import Body from "./../components/Table/Body";
import Head from "./../components/Table/Head";
import AddButton from "./../components/Buttons/AddButton";
import AddGlobalForm from "./../components/Forms/AddGlobalForm";
import EditGlobalForm from "./../components/Forms/EditGlobalForm";
import GeneratePDF from "../components/Actions/GeneratePDF";
import shortid from "shortid";

const GlobalDataContainer = props => {
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
  const [showChart, setShowChart] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [datesData, setDatesData] = useState([]);
  const [nhData, setNHData] = useState([]);
  const [htwoData, setHTwoData] = useState([]);
  const [coData, setCOData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [wetData, setWetData] = useState([]);

  const [sorted, setSorted] = useState(false);

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
    setShowEdit(!showEdit);
  };

  return (
    <div className="UnitsContainer" style={{ marginTop: "1em" }}>
      <AddButton toggleHandler={toggleAddForm} />
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
                    data.temperature,
                    data.wetness
                  )}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <GeneratePDF
          header={["ID", "Data", "Godz", "NH3", "H2S", "CO2", "Temp", "Wilg"]}
          fileheader="Raport globalnych pomiarow"
          mode="global"
          unlData={unlData}
          filename={`RaportGlobalny-${new Date()
            .toString()
            .substring(0, 10)
            .replace(/\s/g, "")}`}
        />
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
            reload={props.reload}
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
            reload={props.reload}
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
            reload={props.reload}
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
            reload={props.reload}
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
            reload={props.reload}
          />
        </div>
      )}

      {showForm && <AddGlobalForm showAddGlobalHandler={toggleAddForm} />}
      {showEdit && <EditGlobalForm id={id} nh={nh} htwo={htwo} co={co} temp={temp} wet={wet} toggleEditHandler={toggleForm}/>}
    </div>
  );
};

export default GlobalDataContainer;
