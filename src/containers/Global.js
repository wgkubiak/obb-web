import React, { useState, useEffect } from "react";
import GlobalChart from "../components/UI/Charts/GlobalChart";
import { Table, Spinner } from "react-bootstrap";
import Body from "../components/UI/Table/Body";
import Head from "../components/UI/Table/Head";
import AddGlobalForm from "../components/UI/Forms/AddGlobalForm";
import EditGlobalForm from "../components/UI/Forms/EditGlobalForm";
import GeneratePDF from "../components/Actions/GeneratePDF";
import {
  StyledChartContainer,
  StyledUnitsTable,
  StyledUnitsContainer,
  StyledTableContent,
  StyledSpinnerButton,
} from "./../Styles";
import shortid from "shortid";

const Global = (props) => {
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

  const getData = () => {
    fetch(`https://obb-api.herokuapp.com/global-latest`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((e) => e);
  };

  const getUnlimitedData = () => {
    fetch(`https://obb-api.herokuapp.com/global`)
      .then((res) => res.json())
      .then((res) => setUnlData(res))
      .catch((e) => e);
  };

  useEffect(() => {
    setShowChart(false);
    getData();
    getUnlimitedData();
    sortData();
    setShowChart(sorted);
    props.headerHandler("global");
  }, [props.reload, sorted]);

  const sortData = () => {
    const datesContainer = [];
    const nhContainer = [];
    const htwoContainer = [];
    const coContainer = [];
    const tempContainer = [];
    const wetContainer = [];

    Object.keys(data).map((item) => {
      Object.keys(data[item]).map((element) => {
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
    }, 2000);
  };

  const sortedHandler = () => setSorted(false);

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
    setShowForm(false);
  };

  return (
    <StyledUnitsContainer>
      <StyledUnitsTable>
        <StyledTableContent>
          <Table bordered hover variant="dark">
            <thead>
              <Head
                data={[
                  "Data pomiaru",
                  "Godzina",
                  "NH3",
                  "H2S",
                  "CO2",
                  "Temperatura",
                  "Wilgotność",
                ]}
                divider={8}
              />
            </thead>
            <tbody>
              {data.map((data, index) => (
                <Body
                  key={`${data.id}${shortid.generate()}`}
                  data={data}
                  divider={8}
                  mode="global"
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
        </StyledTableContent>
        {sorted && (
          <GeneratePDF
            text="Wygeneruj raport PDF"
            header={["ID", "Data", "Godz", "NH3", "H2S", "CO2", "Temp", "Wilg"]}
            fileheader="Raport globalnych pomiarow"
            mode="global"
            unlData={unlData}
            filename={`RaportGlobalny-${new Date()
              .toString()
              .substring(0, 10)
              .replace(/\s/g, "")}`}
          />
        )}
      </StyledUnitsTable>

      {!sorted && (
        <StyledSpinnerButton disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Wczytuję dane...
        </StyledSpinnerButton>
      )}
      {showChart && (
        <StyledChartContainer>
          <GlobalChart
            chartClass="chart--temperature"
            chartID="global-chart"
            mode="line"
            chartLabel="Temperatura"
            miny={18}
            maxy={25}
            dates={datesData}
            data={tempData}
            reload={sorted}
            step={1}
          />
          <GlobalChart
            chartClass="chart--wetness"
            chartID="global-chart"
            mode="line"
            chartLabel="Wilgotność (55-70)"
            miny={50}
            maxy={70}
            dates={datesData}
            data={wetData}
            reload={props.reload}
            step={5}
          />
          <GlobalChart
            chartClass="chart--nhthree"
            chartID="global-chart"
            mode="line"
            chartLabel="NH3 (0 - 20)"
            miny={0}
            maxy={20}
            dates={datesData}
            data={nhData}
            reload={props.reload}
            step={5}
          />
          <GlobalChart
            chartClass="chart--htwos"
            chartID="global-chart"
            mode="line"
            chartLabel="H2S (0-2)"
            miny={0}
            maxy={2}
            dates={datesData}
            data={htwoData}
            reload={props.reload}
            step={1}
          />
          <GlobalChart
            chartClass="chart--cotwo"
            chartID="global-chart"
            mode="line"
            chartLabel="CO2 (500-3000)"
            miny={0}
            maxy={3000}
            dates={datesData}
            data={coData}
            reload={props.reload}
            step={500}
          />
        </StyledChartContainer>
      )}
      {props.showAddForm && (
        <AddGlobalForm
          showAddGlobalHandler={props.hideAddForm}
          reloadHandler={props.reloadHandler}
          sortHandler={sortedHandler}
        />
      )}
      {showEdit && (
        <EditGlobalForm
          id={id}
          nh={nh}
          htwo={htwo}
          co={co}
          temp={temp}
          wet={wet}
          toggleEditHandler={toggleForm}
          reloadHandler={sortedHandler}
        />
      )}
    </StyledUnitsContainer>
  );
};

export default Global;
