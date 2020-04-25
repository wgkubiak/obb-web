import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  StyledExam,
  StyledModalBody,
  StyledModalFooter,
  StyledModalContent,
  StyledModalHeader,
  StyledDeleteButtonMain,
  StyledConfirmModalButton,
  StyledHeaderH2,
  StyledHeaderH4,
  StyledExamAddIcon,
  StyledExamDeleteIcon,
  StyledExamEditIcon,
  StyledExamContainer,
  StyledExamTransparent,
  StyledExamContainerCards,
} from "./../Styles";
import ExamCard from "./../components/UI/Cards/Card";
import AddExamForm from "./../components/UI/Forms/AddExamForm";
import EditExamForm from "./../components/UI/Forms/EditExamForm";
import GeneratePDF from "./../components/Actions/GeneratePDF";

const Exams = (props) => {
  const [data, setData] = useState([]);
  const [unlData, setUnlData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const getData = async (id, func, url) => {
    await fetch(`http://obb-api.herokuapp.com/exams-latest/${props.unitID}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .then((res) => console.log(res.id))
      .catch((e) => e);
  };

  const getUnlimitedData = async (id, func, url) => {
    await fetch(`http://obb-api.herokuapp.com/exams/${props.unitID}`)
      .then((res) => res.json())
      .then((res) => setUnlData(res))
      .then((res) => console.log(res.id))
      .catch((e) => e);
  };

  const remove = id => {
    fetch(`https://obb-api.herokuapp.com/delete-exam/${id}`, {
      method: "DELETE",
    })
      .then(handleModalClose())

    setTimeout(() => {
      reloadHandler();
    }, 500);
  };

  useEffect(() => {
    getData();
    getUnlimitedData();
  }, [reload]);

  const showEditHandler = () => {
    setShowEditForm(!showEditForm);
    setShowAddForm(false);
    const container = document.querySelector(".exam--container");
    setTimeout(() => {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }, 500);
  };

  const showAddHandler = () => {
    setShowAddForm(!showAddForm);
    setShowEditForm(false);
    const container = document.querySelector(".exam--container");
    setTimeout(() => {
      container.scrollTop = container.scrollHeight - container.clientHeight;
    }, 500);
  };


  const reloadHandler = () => {
    setReload(!reload);
  };

  return (
    <StyledExam>
      <StyledExamTransparent
        onClick={props.toggleExams}
      ></StyledExamTransparent>
      <StyledExamContainer className="exam--container">
        <Button variant="success" onClick={props.toggleExams}>
          X
        </Button>
        <StyledHeaderH2>#{props.unitID}</StyledHeaderH2>
        {data.map((data, index) => (
          <StyledHeaderH4>
            {data.exDate.substring(0, 10)} | {data.exTime}
          </StyledHeaderH4>
        ))}
        <StyledExamContainerCards>
          {data.map((data, index) => (
            <>
              <ExamCard
                examTitle="Odchody"
                examAbout={data.feces || "N/A"}
                examInNorm={true}
              />
              <ExamCard
                examTitle="Tkanka"
                examAbout={data.tissue || "N/A"}
                examInNorm={Number(data.tissue) < 1}
              />
              <ExamCard
                examTitle="Leki"
                examAbout={data.medicine || "N/A"}
                examInNorm={true}
              />
              <ExamCard
                examTitle="Ilość"
                examAbout={data.medicineQty || "N/A"}
                examInNorm={true}
              />
              <ExamCard
                examTitle="Rodzaj leków"
                examAbout={data.medicineType || "N/A"}
                examInNorm={true}
              />
              <ExamCard
                examTitle="Rozwolnienie"
                examAbout={data.diarrhea || "N/A"}
                examInNorm={Number(data.diarrhea) < 1}
              />
              <ExamCard
                examTitle="Waga"
                examAbout={data.pigWeight || "N/A"}
                examInNorm={Number(data.pigWeight) < 100}
              />
              <ExamCard
                examTitle="Temperatura"
                examAbout={data.temperature || "N/A"}
                examInNorm={Number(data.temperature) < 38}
              />
              <ExamCard
                examTitle="Kulawizna"
                examAbout={data.lameness || "N/A"}
                examInNorm={Number(data.lameness) < 1}
              />
              <ExamCard
                examTitle="Układ oddechowy"
                examAbout={data.respiratorySys || "N/A"}
                examInNorm={Number(data.respiratorySys) < 1}
              />
              <ExamCard
                examTitle="Zmiany naskórne"
                examAbout={data.skinChanges || "N/A"}
                examInNorm={true}
              />
              <ExamCard
                examTitle="Wynik egzaminu"
                examAbout={data.exResult || "N/A"}
                examInNorm={true}
                mode="long"
              />
            </>
          ))}
        </StyledExamContainerCards>
        <div className="buttons-container">
          {props.unitsMode && (
            <>
              <Button variant="success" className="buttons-button"
              onClick={() => showAddHandler()}
              >
                <StyledExamAddIcon size={32} />
              </Button>
              <Button
                variant="success"
                className="buttons-button"
                onClick={() => showEditHandler()}
              >
                <StyledExamEditIcon size={32} />
              </Button>
            </>
          )}
          <GeneratePDF
            text="Wygeneruj raport PDF"
            header={[
              "ID",
              "Data",
              "Godz",
              "Odch",
              "Sk",
              "Rezultat",
              "Med",
              "Qty",
              "Typ",
              "Roz",
              "Waga",
              "Temp",
              "Kul",
              "Odd",
              "Zmiany",
            ]}
            fileheader="Raport badan"
            mode="exams"
            unlData={unlData}
            filename={`RaportBadanJednostki-${
              props.unitID
            }-${new Date().toString().substring(0, 10).replace(/\s/g, "")}`}
          />
          {props.unitsMode && (
            <Button variant="success" className="buttons-button" onClick={handleModalShow}>
              <StyledExamDeleteIcon size={32} />
            </Button>
          )}
           <StyledModalContent show={showModal} onHide={handleModalClose}>
          <StyledModalHeader>
            <Modal.Title>Czy jesteś pewna/y?!</Modal.Title>
          </StyledModalHeader>
          <StyledModalBody>
            Próba usunięcia badania jednostki #{props.unitID}
          </StyledModalBody>
          <StyledModalFooter>
            <StyledDeleteButtonMain
              variant="success"
              onClick={handleModalClose}
            >
              Nie
            </StyledDeleteButtonMain>
            {
              data.map((data) => (
                <StyledConfirmModalButton onClick={() => remove(data.id)}>
                  Tak, usuń
                </StyledConfirmModalButton>
              ))
            }
          </StyledModalFooter>
        </StyledModalContent>
        </div>

        {showEditForm && (
          <button
            style={{
              position: "relative",
              border: "1px solid #424242",
              width: "auto",
            }}
            onClick={showEditHandler}
          >
            Schowaj
          </button>
        )}
        {showEditForm &&
          data.map((data) => {
            return (
              <EditExamForm
                data={data}
                reloadHandler={reloadHandler}
                toggleEditHandler={showEditHandler}
              />
            );
          })}
          {showAddForm && (
            <AddExamForm id={props.unitID} reloadHandler={reloadHandler} toggleAddHandler={showAddHandler}/>
          )}
        <h1 style={{ display: "none" }}>{reload.toString()}</h1>
      </StyledExamContainer>
    </StyledExam>
  );
};

export default Exams;
