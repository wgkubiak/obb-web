import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import {StyledExam, StyledCardTitle, StyledCardText, StyledExamContainer, StyledExamTransparent, StyledExamContainerCards, StyledContainerCardsData} from "./../Styles";

const Exams = props => {

let longtext = "N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A";

const showPartOfString = (string, l) => {
    if(string.length <= l) {
        return string;
    }
        
    return string.substr(0, string.lastIndexOf(' ', l));
}

  useEffect(() => {
    console.log(props.unitID);
  });

  return (
    <StyledExam>
      <StyledExamTransparent onClick={props.toggleExams}></StyledExamTransparent>
      <StyledExamContainer>
        <button onClick={props.toggleExams}>X</button>
        <h1>#{props.unitID}</h1>
        <StyledExamContainerCards>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Odchody</StyledCardTitle>
              <StyledCardText>2020-03-19 | 12:00:00</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Tkanka</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Leki</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Ilość</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Rodzaj leków</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Rozwolnienie</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>

          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Waga</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>

          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Temperatura</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>

          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Kulawizna</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>

          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Układ oddechowy</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Zmiany naskórne</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>N/A</StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
          <StyledContainerCardsData>
            <Card.Body>
              <StyledCardTitle>Wynik egzaminu</StyledCardTitle>
              <StyledCardText>2020-03-19</StyledCardText>
              <StyledCardText>
                {showPartOfString(longtext, 50)} ...
              </StyledCardText>
            </Card.Body>
          </StyledContainerCardsData>
        </StyledExamContainerCards>
      </StyledExamContainer>
    </StyledExam>
  );
};

export default Exams;
