import React, { useState, useEffect } from "react";
import GlobalChart from "./../components/Charts/GlobalChart";
import {Table} from "react-bootstrap";
import Body from "./../components/Table/Body";
import Head from "./../components/Table/Head";
import AddButton from "./../components/Buttons/AddButton";
import GeneratePDFButton from "./../components/Buttons/GeneratePDFButton";
import shortid from "shortid";

const GlobalDataContainer = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await fetch(`https://obb-api.herokuapp.com/global`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(e => e);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleAddForm = () => alert("Tutaj będzie form");

  return (
    <div className="UnitsContainer" style={{marginTop: "1em" }}>
      <AddButton toggleHandler={toggleAddForm}/>
      {/* TODO toggleAddForm - Add global measure */}
      <div className="UnitsTable">
        <div className="TableContent">
          <Table bordered hover variant="dark">
            <thead>
              <Head
                data={[
                  "ID pomiaru",               
                  "Data pomiaru",
                  "Czas",
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
                  // showForm={showForm.bind(
                  //   this,
                  //   data.measureDate,
                  //   data.measureTime,
                  //   data.temperature,
                  //   data.wetness,
                  //   data.nhThree,
                  //   data.hTwoS,
                  //   data.coTwo
                  // )}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <GeneratePDFButton generatePDFHandler={() => alert("Tutaj wygeneruje pdf")} />  
        {/* generatePDF */}
        {/* {showMenu && (
          <Menu
            mode="sold"
            id={idPig}
            price={price}
            showMenu={toggleMenu}
            showEdit={toggleEdit}
            hideMenu={hideMenu}
            show={showEdit}
            reloadHandler={props.reloadHandler}
          />
        )} */}
      </div>
      <div className="chart">
        <GlobalChart
          chartClass="chart--temperature"
          chartID="global-chart"
          mode="line"
          chartLabel="Temperatura"
          dates={["2020-01-01", "2020-01-02", "2020-01-03"]}
          data={[21.2, 22.1, 21.9]}
        />
        <GlobalChart
          chartClass="chart--wetness"
          chartID="global-chart"
          mode="line"
          chartLabel="Wilgotność (55-70)"
          dates={[
            "2020-01-02",
            "2020-01-03",
            "2020-01-04",
            "2020-01-05",
            "2020-01-06",
            "2020-01-07"
          ]}
          data={[53, 68, 69, 64, 61, 60]}
        />
        <GlobalChart
          chartClass="chart--nhthree"
          chartID="global-chart"
          mode="line"
          chartLabel="NH3 (0 - 20)"
          dates={[
            "2020-01-02",
            "2020-01-03",
            "2020-01-04",
            "2020-01-05",
            "2020-01-06",
            "2020-01-07"
          ]}
          data={[2, 15, 4, 11, 14, 14]}
        />
        <GlobalChart
          chartClass="chart--htwos"
          chartID="global-chart"
          mode="line"
          chartLabel="H2S (0-2)"
          dates={[
            "2020-01-02",
            "2020-01-03",
            "2020-01-04",
            "2020-01-05",
            "2020-01-06",
            "2020-01-07"
          ]}
          data={[0, 0, 1, 2, 0, 2]}
        />
        <GlobalChart
          chartClass="chart--cotwo"
          chartID="global-chart"
          mode="line"
          chartLabel="CO2 (500-3000)"
          dates={["2020-01-01", "2020-01-02", "2020-01-03"]}
          data={[1500, 4500, 3000, 1500, 1500, 2000]}
        />
      </div>
    </div>
  );
};

export default GlobalDataContainer;
