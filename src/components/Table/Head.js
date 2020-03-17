import React from "react";
import shortid from "shortid";

const Head = props => {
  return (
    <tr key={`tr${shortid.generate()}`}>
      {Object.keys(props.data).map(item => {
        return <th key={`th${shortid.generate()}`}>{props.data[item]}</th>;
      })}
    </tr>
  );
};

export default Head;
