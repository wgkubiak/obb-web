import React from "react";
import { FaRegSadTear, FaRegSmileBeam } from "react-icons/fa";
import styled from "styled-components";

const style = {
  paddingTop: "2em",
  width: "10em",
  height: "10em",
  color: "#30d158",
}

const StyledSadEmote = styled(FaRegSadTear)`
  ${style}
`

const StyledHappyEmote = styled(FaRegSmileBeam)`
  ${style}
`

const NoData = (props) => {
  const emote = () => {
    if (props.mode === "neg") {
      return (
        <StyledHappyEmote/>
      );
    } else {
      return (
        <StyledSadEmote/>
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
