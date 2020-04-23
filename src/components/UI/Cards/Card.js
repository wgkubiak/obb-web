import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import {
  StyledContainerCardsData,
  StyledCardTitle,
  StyledCardText,
} from "./../../../Styles";

const ExamCard = (props) => {
  const styleHandler = (eq) => {
    if (eq) {
      return {
        backgroundColor: "#30d158",
      };
    } else {
      return { backgroundColor: "#ff373b" };
    }
  };

  const showPartOfString = (str, l) => {
    const string = str.toString();

    if (string.length <= l) {
      return string;
    }

    return string.substr(0, string.lastIndexOf(" ", l));
  };

  return (
    <>
      <StyledContainerCardsData style={styleHandler(props.examAbout)}>
        <Card.Body>
          <StyledCardTitle>{props.examTitle}</StyledCardTitle>
          <StyledCardText>
            {showPartOfString(props.examAbout, 50)}
          </StyledCardText>
        </Card.Body>
      </StyledContainerCardsData>
    </>
  );
};

export default ExamCard;
