import React, {useEffect} from "react";
import Chart from "chart.js";

const GlobalDataContainer = () => {
    //TODO: create few references and move over them by show state
    const ref = React.createRef();

    useEffect(() => {
        const _ref = ref.current.getContext("2d");

        new Chart(_ref, {
            type: "line",
            data: {
                labels: ["2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06", "2020-01-07"],
                datasets: [
                    {
                        label: "Temperatura",
                        data: [28, 29.5, 30.1, 34.1, 27.9, 26.9],
                        backgroundColor: "#ec625f"
                    }
                ]
            },
            options: {

            }
        });
    }, [ref])

    return (
        <div className="UnitsContainer">
            <canvas
                id="global-chart"
                ref={ref}
            />
        </div>
    )
}

export default GlobalDataContainer;