import React, { useEffect, useState } from "react";
import {Button} from "react-bootstrap";
import {StyledExam, StyledHeaderH2, StyledHeaderH4, StyledExamAddIcon, StyledExamEditIcon, StyledExamContainer, StyledExamTransparent, StyledExamContainerCards} from "./../Styles";
import ExamCard from "./../components/UI/Cards/Card";
import EditExamForm from "./../components/UI/Forms/EditExamForm";

const Exams = props => {
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reload, setReload] = useState(false);

  const getData = async (id, func, url) => {
    await fetch(`http://obb-api.herokuapp.com/exams-latest/${props.unitID}`)
    .then((res) => res.json())
    .then((res) => setData(res))
    .then((res) => console.log(res.id))
    .catch((e) => e);
  }

  useEffect(() => {
    getData();
  }, [reload]);

  const showEditHandler = () => {
    setShowEditForm(!showEditForm);
    const container = document.querySelector(".exam--container");
    setTimeout(() => {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }, 500)
  }

  const reloadHandler = () => {
    setReload(!reload);
  }

  return (
    <StyledExam>
      <StyledExamTransparent onClick={props.toggleExams}></StyledExamTransparent>
      <StyledExamContainer className="exam--container">
        <Button onClick={props.toggleExams}>X</Button>
        <StyledHeaderH2>#{props.unitID}</StyledHeaderH2>
        {data.map((data, index) => (
          <StyledHeaderH4 onClick={() => alert(`${data.exDate} ${data.exTime}`)}>{data.exDate.substring(0, 10)} | {data.exTime}</StyledHeaderH4>
        ))}
        <StyledExamContainerCards>
        {data.map((data, index) => (           
            <>
            <ExamCard examTitle="Odchody" examAbout={ data.feces || "N/A"} examInNorm={true}/>
            <ExamCard examTitle="Tkanka" examAbout={data.tissue || "N/A"} examInNorm={Number(data.tissue) < 1}/>
            <ExamCard examTitle="Leki" examAbout={data.medicine || "N/A"} examInNorm={true}/>
            <ExamCard examTitle="Ilość" examAbout={data.medicineQty || "N/A"} examInNorm={true}/>
            <ExamCard examTitle="Rodzaj leków" examAbout={data.medicineType || "N/A"} examInNorm={true}/>
            <ExamCard examTitle="Rozwolnienie" examAbout={data.diarrhea || "N/A"} examInNorm={Number(data.diarrhea) < 1}/>
            <ExamCard examTitle="Waga" examAbout={data.pigWeight || "N/A"} examInNorm={Number(data.pigWeight) < 100}/>
            <ExamCard examTitle="Temperatura" examAbout={data.temperature || "N/A"} examInNorm={Number(data.temperature) < 38}/>
            <ExamCard examTitle="Kulawizna" examAbout={data.lameness || "N/A"} examInNorm={Number(data.lameness) < 1}/>
            <ExamCard examTitle="Układ oddechowy" examAbout={data.respiratorySys || "N/A"} examInNorm={Number(data.respiratorySys) < 1}/>
            <ExamCard examTitle="Zmiany naskórne" examAbout={data.skinChanges || "N/A"} examInNorm={true}/>
            <ExamCard examTitle="Wynik egzaminu" examAbout={data.exResult || "N/A"} examInNorm={true} mode="long"/>
            </>
        ))}
        </StyledExamContainerCards>
        <div className="buttons-container">
          <Button className="buttons-button">
            <StyledExamAddIcon size={32}/>
          </Button>
          <Button className="buttons-button" onClick={() => showEditHandler()}>
            <StyledExamEditIcon size={32}/>
          </Button>
        </div>
        {showEditForm && (
          <button style={{position: "relative", border: "1px solid #424242", width: "auto"}} onClick={showEditHandler}>Schowaj</button>
        )}
        {showEditForm && (
          data.map((data) => {
            return <EditExamForm data={data} reloadHandler={reloadHandler} toggleEditHandler={showEditHandler}/>
          })
        )}
        <h1 style={{display: "none"}}>{reload.toString()}</h1>
      </StyledExamContainer>
     
    </StyledExam>
  );
};

export default Exams;
