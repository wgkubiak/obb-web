import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import {
  StyledContainerCardsData,
  StyledCardTitle,
  StyledCardText,
} from "./../../../Styles";
import EditExamForm from "./../Forms/EditExamForm";

const ExamCard = (props) => {
  const [showForm, setShowForm] = useState(false);
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

  const showFormHandler = () => setShowForm(!showForm);
  
  const alertData = () => {
    alert(`${props.id} ${props.data}`)
  }

  return (
    <>
      <StyledContainerCardsData style={styleHandler(props.examInNorm)} onClick={showFormHandler}>
        <Card.Body>
          <StyledCardTitle>{props.examTitle}</StyledCardTitle>
          <StyledCardText>
            {props.examAbout}
          </StyledCardText>
        </Card.Body>
      </StyledContainerCardsData>
      {showForm && (
        <EditExamForm mode={props.mode} id={props.id} data={props.data} title={props.examTitle}/>
      )}
    </>
  );
};

export default ExamCard;
