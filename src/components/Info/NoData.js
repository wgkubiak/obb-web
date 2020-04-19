import React from "react";
import { StyledHappyIcon, StyledSadIcon } from "./../../Styles";

const NoData = (props) => {
  const emote = () => {
    if (props.mode === "neg") {
      return (
        <StyledHappyIcon/>
      );
    } else {
      return (
        <StyledSadIcon/>
      );
    }
  };

  return (
    <>
      {emote()}
      <h3 style={{ color: "rgba(255, 255, 255, 0.87)" }}>
        Brak danych
      </h3>
    </>
  );
};

export default NoData;
