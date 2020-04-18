import React from "react";
import shortid from "shortid";
import styled from "styled-components";

const StyledTableRow = styled.tr`
  background-color: #424242;
  
&:hover {
  background-color: #30d158;
}
`;

const Body = props => {
  return (
    <StyledTableRow
      key={`${props.data.id}${shortid.generate()}key`}
      onClick={props.showForm}
    >
      {Object.keys(props.data).map(item => {
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
          if (item.includes("Date")) {
            return (
              <td key={`${shortid.generate()}`}>
                {props.data[item].substring(0, 10)}
              </td>
            );
          } else if (item.includes("Gender")) {
            return (
              <td key={`${shortid.generate()}`}>
                {props.data[item] === "m" ? "Samiec" : "Samica"}
              </td>
            );
          } else {
            return <td key={`${shortid.generate()}`}>{props.data[item]}</td>;
          }
        } else {
          return null;
        }
      })}
    </StyledTableRow>
  );
};

export default Body;
