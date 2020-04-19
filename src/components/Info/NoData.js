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
      <h2 style={{ color: "rgba(255, 255, 255, 0.87)" }}>
        Brak danych
      </h2>
    </>
  );
};

export default NoData;
