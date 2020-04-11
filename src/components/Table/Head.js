import React from "react";
import shortid from "shortid";

const Head = props => {

  const style = {
    width: `${100 / props.divider}%`
  }

  return (
    <tr key={`tr${shortid.generate()}`} style={{width: "100%"}}>
      {Object.keys(props.data).map(item => {
        return <th key={`th${shortid.generate()}`} style={style}>{props.data[item]}</th>;
      })}
    </tr>
  );
};

export default Head;
