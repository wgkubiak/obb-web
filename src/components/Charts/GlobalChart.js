import React, {useEffect} from "react";
import Chart from "chart.js";

const GlobalChart = props => {
  const ref = React.createRef();

  useEffect(() => {  
    const _ref = ref.current.getContext("2d");
    new Chart(_ref, {
      type: props.mode,
      data: {
        labels: Object.values(props.dates),
        datasets: [
          {
            label: props.chartLabel,
            data: Object.values(props.data),
            backgroundColor: "#00adb5"
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
              ticks: {
                  suggestedMin: props.miny,
                  suggestedMax: props.maxy
              }
          }]
      }
      }
    });
  }, [ref, props.chartLabel, props.data, props.dates, props.mode, props.miny, props.maxy, props.reload]);


  return (
        <div className={props.chartClass}>
          <canvas id={props.chartID} ref={ref} />
        </div>
    )
}

export default GlobalChart;