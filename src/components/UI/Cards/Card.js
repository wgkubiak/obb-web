import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import {
  StyledContainerCardsData,
  StyledCardTitle,
  StyledCardText,
} from "./../../../Styles";

const ExamCard = (props) => {
  let norm = {}, long = {};

  const styleHandler = (eq) => {
    if(!eq) {
      norm = { backgroundColor: "#ff373b" };
    }

    if(props.mode) {
      long = { height: "auto"}
    }

    return {...norm, ...long};
  };

  const alertData = () => {
    alert(`${props.id} ${props.data}`)
  }

  return (
    <>
      <StyledContainerCardsData style={styleHandler(props.examInNorm)} onClick={() => alertData()}>
        <Card.Body>
          <StyledCardTitle>{props.examTitle}</StyledCardTitle>
          <StyledCardText>
            {props.examAbout}
          </StyledCardText>
        </Card.Body>
      </StyledContainerCardsData>
    </>
  );
};

export default ExamCard;
