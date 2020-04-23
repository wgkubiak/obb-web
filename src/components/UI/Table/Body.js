import React from "react";
import shortid from "shortid";
import {StyledTableRow, StyledTableTD } from "./../../../Styles";

const Body = props => {

  const checkIfContainer = text => {
    if(props.mode !== "global") {
      return text.includes(props.text)
    }
  }

  return (
    <StyledTableRow
      key={`${props.data.id}${shortid.generate()}key`}
      onClick={props.showForm}
    >
      {Object.keys(props.data).map((item, index) => {
        if (
          props.data[item] !== null &&
          item !== "createdAt" &&
          item !== "updatedAt" &&
          item !== "penId" &&
          (item !== "idPen" || (props.mode === "sold" || props.mode === "dead")) &&
          (item !== "id" && props.mode !== undefined) ||
          (item === "id" && props.mode === "standard") ||
          (item === "id" && (props.mode === "sold"  || props.mode === "dead" ))
        ) {
         if(checkIfContainer(props.data.id) || props.mode === "standard" || props.mode === "global") {
          if (item.includes("Date")) {
            return (
              <StyledTableTD key={`${shortid.generate()}`}>
                {props.data[item].substring(0, 10)}
              </StyledTableTD>
            );
          } else if (item.includes("Gender")) {
            return (
              <StyledTableTD key={`${shortid.generate()}`}>
                {props.data[item] === "m" ? "Samiec" : "Samica"}
              </StyledTableTD>
            );
          } else {
            return <StyledTableTD key={`${shortid.generate()}`}>{props.data[item]}</StyledTableTD>;
          }
         }
        } else {
          return null;
        }
      })}
    </StyledTableRow>
  );
};

export default Body;
