import React, {useEffect} from "react";

const ExamContainer = props => {

    useEffect(() => {
        console.log(props.unitID)
    })

    return (
        <div className="exam">
            <div className="exam--transparent"></div>
            <div className="exam--container">
                <button onClick={props.toggleExams}>SCHOWAJ</button>
                <h1>{props.unitID}</h1>
            </div>
        </div>
    )
}

export default ExamContainer;