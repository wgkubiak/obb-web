import React, { useState, useMemo } from "react";
import {
  StyledEditExamInput,
  StyledFormLabel,
  StyledFormControl,
  StyledConfirmButton,
  StyledDatePicker,
} from "./../../../Styles";

const EditExamForm = (props) => {
  const currentTime = new Date();
  const [exDate, setExDate] = useState(currentTime);
  const [exTime, setExTime] = useState(currentTime);
  const [feces, setFeces] = useState(props.data.feces || 0);
  const [tissue, setTissue] = useState(props.data.tissue || "");
  const [medicine, setMedicine] = useState(props.data.medicine || "");
  const [medicineQty, setMedicineQty] = useState(props.data.medicineQty || 0);
  const [medicineType, setMedicineType] = useState(
    props.data.medicineType || ""
  );
  const [diarrhea, setDiarrhea] = useState(props.data.diarrhea || "");
  const [pigWeight, setPigWeight] = useState(props.data.pigWeight || 0);
  const [temperature, setTemperature] = useState(props.data.temperature || 0);
  const [lameness, setLameness] = useState(props.data.lameness || "");
  const [respiratorySys, setRespiratorySys] = useState(
    props.data.respiratorySys || ""
  );
  const [skinChanges, setSkinChanges] = useState(props.data.skinChanges || "");
  const [exResult, setExResult] = useState(props.data.exResult || "");
  const [reload, setReload] = useState(false);

  const data = useMemo(
    () => ({
      exDate: exDate,
      exTime: exTime.toString().substring(16, 31),
      feces: feces,
      tissue: tissue,
      exResult: exResult,
      medicine: medicine,
      medicineQty: Number(medicineQty),
      medicineType: medicineType,
      diarrhea: diarrhea,
      pigWeight: Number(pigWeight),
      temperature: Number(temperature),
      lameness: lameness,
      respiratorySys: respiratorySys,
      skinChanges: skinChanges,
    }),
    [
      exDate,
      exTime,
      feces,
      tissue,
      exResult,
      medicine,
      medicineQty,
      medicineType,
      diarrhea,
      pigWeight,
      temperature,
      lameness,
      respiratorySys,
      skinChanges,
    ]
  );

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);

    fetch(`http://obb-api.herokuapp.com/edit-exam/${props.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.toggleEditHandler())
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      props.reloadHandler();
    }, 500);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <StyledEditExamInput>
        <StyledFormLabel>Data</StyledFormLabel>
        <StyledDatePicker
          locale="pl"
          selected={exDate}
          onChange={(date) => setExDate(date)}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Godzina</StyledFormLabel>
        <StyledDatePicker
          selected={exTime}
          onChange={(date) => setExTime(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Odchody</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane"
          onChange={(event) => setFeces(event.target.value)}
          defaultValue={feces}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Tkanka</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="0"
          onChange={(event) => setTissue(event.target.value)}
          defaultValue={tissue}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Leki</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane"
          onChange={(event) => setMedicine(event.target.value)}
          defaultValue={medicine}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Ilość</StyledFormLabel>
        <StyledFormControl
          type="number"
          placeholder="0"
          onChange={(event) => setMedicineQty(event.target.value)}
          defaultValue={medicineQty}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Rodzaj leków</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane"
          onChange={(event) => setMedicineType(event.target.value)}
          defaultValue={medicineType}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Rozwolnienie</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="0"
          onChange={(event) => setDiarrhea(event.target.value)}
          defaultValue={diarrhea}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Waga</StyledFormLabel>
        <StyledFormControl
          type="number"
          placeholder="0"
          onChange={(event) => setPigWeight(event.target.value)}
          defaultValue={pigWeight}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Temperatura</StyledFormLabel>
        <StyledFormControl
          type="number"
          placeholder="0"
          onChange={(event) => setTemperature(event.target.value)}
          defaultValue={temperature}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Kulawizna</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="0"
          onChange={(event) => setLameness(event.target.value)}
          defaultValue={lameness}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Układ oddechowy</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="0"
          onChange={(event) => setRespiratorySys(event.target.value)}
          defaultValue={respiratorySys}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Zmiany naskórne</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane"
          onChange={(event) => setSkinChanges(event.target.value)}
          defaultValue={skinChanges}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Wynik badania</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane"
          onChange={(event) => setExResult(event.target.value)}
          defaultValue={exResult}
        />
      </StyledEditExamInput>

      <StyledConfirmButton
        variant="success"
        onClick={(event) => submitHandler(event)}
      >
        POTWIERDŹ
      </StyledConfirmButton>
    </div>
  );
};

export default EditExamForm;
