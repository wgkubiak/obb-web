import React from "react";
import TableContent from "./../components/DeadUnits/TableContent";

const DeadUnitsContainer = props => {
    return(
        <div className="UnitsContainer">
            <TableContent mode="dead" isOn={props.isOn}/>
        </div>
    )
}

export default DeadUnitsContainer