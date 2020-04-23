import React, { useEffect, useMemo, useState } from "react";
import {StyledExam, StyledHeaderH2, StyledHeaderH4, StyledExamContainer, StyledExamTransparent, StyledExamContainerCards} from "./../Styles";
import ExamCard from "./../components/UI/Cards/Card";

const Exams = props => {
  const [data, setData] = useState([]);

  const getData = async (id, func, url) => {
    await fetch(`http://obb-api.herokuapp.com/exams-latest/${props.unitID}`)
    .then((res) => res.json())
    .then((res) => setData(res))
    .then((res) => console.log(res.id))
    .catch((e) => e);
  }

  useEffect(() => {
    getData();
  }, [props.reload]);

  return (
    <StyledExam>
      <StyledExamTransparent onClick={props.toggleExams}></StyledExamTransparent>
      <StyledExamContainer>
        <button onClick={props.toggleExams}>X</button>
        <StyledHeaderH2>#{props.unitID}</StyledHeaderH2>
        {data.map((data, index) => (
          <StyledHeaderH4>{data.exDate.substring(0, 10)} | {data.exTime}</StyledHeaderH4>
        ))}
        <StyledExamContainerCards>
        {data.map((data, index) => (
           
            <>
            <ExamCard examTitle="Odchody" examAbout={ data.feces || "N/A"} data={data.feces} id={props.unitID} examInNorm={true}/>
            <ExamCard examTitle="Tkanka" examAbout={data.tissue || "N/A"} data={data.tissue} id={props.unitID} examInNorm={Number(data.tissue) < 1}/>
            <ExamCard examTitle="Leki" examAbout={data.medicine || "N/A"} data={data.medicine} id={props.unitID} examInNorm={true}/>
            <ExamCard examTitle="Ilość" examAbout={data.medicineQty || "N/A"} data={data.medicineQty} id={props.unitID} examInNorm={true}/>
            <ExamCard examTitle="Rodzaj leków" examAbout={data.medicineType || "N/A"} data={data.medicineType} id={props.unitID} examInNorm={true}/>
            <ExamCard examTitle="Rozwolnienie" examAbout={data.diarrhea || "N/A"} data={data.diarrhea} id={props.unitID} examInNorm={Number(data.diarrhea) < 1}/>
            <ExamCard examTitle="Waga" examAbout={data.weight || "N/A"} data={data.weight} id={props.unitID} examInNorm={Number(data.weight) < 100}/>
            <ExamCard examTitle="Temperatura" examAbout={data.temperature || "N/A"} data={data.temperature} id={props.unitID} examInNorm={Number(data.temperature) < 38}/>
            <ExamCard examTitle="Kulawizna" examAbout={data.lameness || "N/A"} data={data.lameness} id={props.unitID} examInNorm={Number(data.lameness) < 1}/>
            <ExamCard examTitle="Układ oddechowy" examAbout={data.respiratorySys || "N/A"} data={data.respiratorySys} id={props.unitID} examInNorm={Number(data.respiratorySys) < 1}/>
            <ExamCard examTitle="Zmiany naskórne" examAbout={data.skinChanges || "N/A"} data={data.skinChanges} id={props.unitID} examInNorm={true}/>
            <ExamCard examTitle="Wynik egzaminu" examAbout={data.exResult || "N/A"} data={data.exResult} id={props.unitID} examInNorm={true} mode="long"/>
            </>
           
        ))}
        </StyledExamContainerCards>
      </StyledExamContainer>
    </StyledExam>
  );
};

export default Exams;
