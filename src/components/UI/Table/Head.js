import React from "react";
import shortid from "shortid";
import { StyledTableTR, StyledTableTH } from "./../../../Styles";

const Head = (props) => {
  const style = {
    width: `${100 / props.divider}% !important`,
  };

  return (
    <StyledTableTR key={`tr${shortid.generate()}`}>
      {Object.keys(props.data).map((item) => {
        return (
          <StyledTableTH key={`th${shortid.generate()}`} style={style}>
            {props.data[item]}
          </StyledTableTH>
        );
      })}
    </StyledTableTR>
  );
};

export default Head;
