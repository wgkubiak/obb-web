import React from "react";
import "./UnitsTable.css";
import UnitsContent from "./../UnitsContent/UnitsContent";

const UnitsTable = props => {
  return (
    <div className="UnitsTable">
      <UnitsContent
        id={props.index}
        idPen={props.idPen}
        reloadHandler={props.reloadHandler}
      />
    </div>
  );
};

export default UnitsTable;
