import React from "react";
import GlobalChart from "./../components/Charts/GlobalChart";

const GlobalDataContainer = () => {
  return (
    <div className="UnitsContainer">
      <div className="UnitsTable">
        <h1>Miejsce na tabele</h1>
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
          dates={["2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06", "2020-01-07"]}
          data={[53, 68, 69, 64, 61, 60]} 
        />
        <GlobalChart
          chartClass="chart--nhthree"
          chartID="global-chart"
          mode="line"
          chartLabel="NH3 (0 - 20)"
          dates={["2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06", "2020-01-07"]}
          data={[2, 15, 4, 11, 14, 14]}
        />
        <GlobalChart
          chartClass="chart--htwos"
          chartID="global-chart"
          mode="line"
          chartLabel="H2S (0-2)"
          dates={["2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06", "2020-01-07"]}
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
