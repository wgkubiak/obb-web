import React from "react";
import shortid from "shortid";

const Body = props => {
  return (
    <tr
      key={`${props.data.id}${shortid.generate()}key`}
      onClick={props.showForm}
    >
      {Object.keys(props.data).map(item => {
        if (
          props.data[item] !== null &&
          item !== "createdAt" &&
          item !== "updatedAt" &&
          item !== "penId"
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
    </tr>
  );
};

export default Body;
