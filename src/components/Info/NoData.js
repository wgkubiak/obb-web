import React from "react";
import {
  StyledHappyIcon,
  StyledSadIcon,
  StyledNoDataHeader,
} from "./../../Styles";

const NoData = (props) => {
  const emote = () => {
    if (props.mode === "neg") {
      return <StyledHappyIcon />;
    } else {
      return <StyledSadIcon />;
    }
  };

  return (
    <>
      {emote()}
      <StyledNoDataHeader>Brak danych</StyledNoDataHeader>
    </>
  );
};

export default NoData;
