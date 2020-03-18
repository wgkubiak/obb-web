import React, { useEffect } from "react";
import Chart from "chart.js";

const GlobalDataContainer = () => {
  //TODO: create few references and move over them by show state
  const temperatureRef = React.createRef();
  const wetnessRef = React.createRef();
  const nhThreeRef = React.createRef();
  const hTwoSRef = React.createRef();
  const coTwoRef = React.createRef();

  useEffect(() => {
    const _temperatureRef = temperatureRef.current.getContext("2d");
    const _wetnessRef = wetnessRef.current.getContext("2d");
    const _nhThreeRef = nhThreeRef.current.getContext("2d");
    const _hTwoSRef = hTwoSRef.current.getContext("2d");
    const _coTwoRef = coTwoRef.current.getContext("2d");

    new Chart(_temperatureRef, {
      type: "line",
      data: {
        labels: [
          "2020-01-02",
          "2020-01-03",
          "2020-01-04",
          "2020-01-05",
          "2020-01-06",
          "2020-01-07"
        ],
        datasets: [
          {
            label: "Temperatura",
            data: [21.1, 22.1, 21.9, 21.1, 22.9, 21.9],
            backgroundColor: "#ec625f"
          }
        ]
      },
      options: {}
    });

    new Chart(_wetnessRef, {
      type: "line",
      data: {
        labels: [
          "2020-01-02",
          "2020-01-03",
          "2020-01-04",
          "2020-01-05",
          "2020-01-06",
          "2020-01-07"
        ],
        datasets: [
          {
            label: "Wilgotność (55-70)",
            data: [53, 68, 69, 64, 61, 60],
            backgroundColor: "#ec625f"
          }
        ]
      },
      options: {
        responsive: true
      }
    });

    new Chart(_nhThreeRef, {
      type: "line",
      data: {
        labels: [
          "2020-01-02",
          "2020-01-03",
          "2020-01-04",
          "2020-01-05",
          "2020-01-06",
          "2020-01-07"
        ],
        datasets: [
          {
            label: "NH3 (0 - 20)",
            data: [2, 15, 4, 11, 14, 14],
            backgroundColor: "#ec625f"
          }
        ]
      },
      options: {}
    });

    new Chart(_hTwoSRef, {
      type: "bar",
      data: {
        labels: [
          "2020-01-02",
          "2020-01-03",
          "2020-01-04",
          "2020-01-05",
          "2020-01-06",
          "2020-01-07"
        ],
        datasets: [
          {
            label: "H2S (0-2)",
            data: [0, 0, 1, 2, 0, 2],
            backgroundColor: "#ec625f"
          }
        ]
      },
      options: {}
    });

    new Chart(_coTwoRef, {
      type: "line",
      data: {
        labels: [
          "2020-01-02",
          "2020-01-03",
          "2020-01-04",
          "2020-01-05",
          "2020-01-06",
          "2020-01-07"
        ],
        datasets: [
          {
            label: "CO2 (500-3000)",
            data: [1500, 4500, 3000, 1500, 1500, 2000],
            backgroundColor: "#ec625f"
          }
        ]
      },
      options: {}
    });
  }, [temperatureRef, wetnessRef, nhThreeRef, hTwoSRef, coTwoRef]);

  return (
    <div className="UnitsContainer">
      <div className="UnitsTable">
        <h1>Miejsce na tabele</h1>
      </div>
      <div className="chart">
        <div className="chart--temperature">
          <canvas id="global-chart" ref={temperatureRef} />
        </div>
        <div className="chart--wetness">
          <canvas id="global-chart" ref={wetnessRef} />
        </div>
        <div className="chart--nhthree">
          <canvas id="global-chart" ref={nhThreeRef} />
        </div>
        <div className="chart--htwos">
          <canvas id="global-chart" ref={hTwoSRef} />
        </div>
        <div className="chart--cotwo">
          <canvas id="global-chart" ref={coTwoRef} />
        </div>
      </div>
    </div>
  );
};

export default GlobalDataContainer;
