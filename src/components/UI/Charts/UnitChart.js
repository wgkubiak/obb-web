import React, { useEffect } from "react";
import Chart from "chart.js";
let chart;

const UnitChart = (props) => {
  const ref = React.createRef();

  useEffect(() => {
    chartHandler();
  }, []);

  const chartHandler = () => {
    const _ref = ref.current.getContext("2d");

    // if(typeof chart !== undefined) chart.destroy();

    chart = new Chart(_ref, {
      type: props.mode,
      data: {
        labels: Object.values(props.dates),
        datasets: [
          {
            label: props.chartLabel,
            data: Object.values(props.data),
            borderColor: "#30d158",
            pointBackgroundColor: "rgba(255,255,255, 0.87)",
            pointBorderColor: "#424242",
            hoverBackgroundColor: "#30d158",
          },
          {
            label: props.chartLabel2,
            data: ["150", "150", "150", "125", "142", "38", "98"],
            borderColor: "#ff373b",
            pointBackgroundColor: "rgba(255,255,255, 0.87)",
            pointBorderColor: "#424242",
            hoverBackgroundColor: "#30d158",
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: "rgba(255, 255, 255, 0.6)",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: props.miny,
                suggestedMax: props.maxy,
                stepSize: props.step,
                fontColor: "rgba(255, 255, 255, 0.6)",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255, 255, 255, 0.6)",
              },
            },
          ],
        },
      },
    });
  };

  return (
    <div className={props.chartClass}>
      <canvas ref={ref} />
    </div>
  );
};

export default UnitChart;
