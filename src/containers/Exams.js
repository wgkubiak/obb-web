import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import {StyledExam, StyledHeaderH2, StyledHeaderH4, StyledCardTitle, StyledCardText, StyledExamContainer, StyledExamTransparent, StyledExamContainerCards, StyledContainerCardsData} from "./../Styles";
import ExamCard from "./../components/UI/Cards/Card";

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
        <StyledHeaderH2>#{props.unitID}</StyledHeaderH2>
        <StyledHeaderH4>2020-03-19 | 12:00:00</StyledHeaderH4>
        <StyledExamContainerCards>
          <ExamCard examTitle="Odchody" examAbout="N/A"/>
          <ExamCard examTitle="Tkanka" examAbout={false}/>
          <ExamCard examTitle="Leki" examAbout={false}/>
          <ExamCard examTitle="Ilość" examAbout="N/A"/>
          <ExamCard examTitle="Rodzaj leków" examAbout="N/A"/>
          <ExamCard examTitle="Rozwolnienie" examAbout={false}/>
          <ExamCard examTitle="Waga" examAbout="N/A"/>
          <ExamCard examTitle="Temperatura" examAbout="N/A"/>
          <ExamCard examTitle="Kulawizna" examAbout="N/A"/>
          <ExamCard examTitle="Układ oddechowy" examAbout={true}/>
          <ExamCard examTitle="Zmiany naskórne" examAbout={true}/>
          <ExamCard examTitle="Wynik egzaminu" examAbout={false}/>
        </StyledExamContainerCards>
      </StyledExamContainer>
    </StyledExam>
  );
};

export default Exams;
