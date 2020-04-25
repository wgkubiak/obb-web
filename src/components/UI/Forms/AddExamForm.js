import React, { useState, useMemo } from "react";
import {
  StyledEditExamInput,
  StyledFormLabel,
  StyledFormControl,
  StyledConfirmButton,
  StyledDatePicker,
  StyledHeaderH2,
} from "./../../../Styles";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

const AddExamForm = (props) => {
  const currentTime = new Date();
  const [exDate, setExDate] = useState(currentTime);
  const [exTime, setExTime] = useState(currentTime);
  const [feces, setFeces] = useState("");
  const [tissue, setTissue] = useState("");
  const [medicine, setMedicine] = useState("");
  const [medicineQty, setMedicineQty] = useState(0);
  const [medicineType, setMedicineType] = useState("");
  const [diarrhea, setDiarrhea] = useState("");
  const [pigWeight, setPigWeight] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [lameness, setLameness] = useState("");
  const [respiratorySys, setRespiratorySys] = useState("");
  const [skinChanges, setSkinChanges] = useState("");
  const [exResult, setExResult] = useState("");
  const [reload, setReload] = useState(false);

  const data = useMemo(
    () => ({
      idPig: props.id,
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
      props.id,
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

    fetch(`http://obb-api.herokuapp.com/add-exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .then(props.toggleAddHandler())
      //   .then(props.sortedHandler(false))
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
          placeholder="Wpisz dane (0-2)"
          onChange={(event) => setFeces(event.target.value)}
          defaultValue={feces}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Tkanka</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane (0-2)"
          onChange={(event) => setTissue(event.target.value)}
          defaultValue={tissue}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Leki</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane (Tak/Nie)"
          onChange={(event) => setMedicine(event.target.value)}
          defaultValue={medicine}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Ilość</StyledFormLabel>
        <StyledFormControl
          type="number"
          placeholder="Wprowadź ilość"
          onChange={(event) => setMedicineQty(event.target.value)}
          defaultValue={medicineQty}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Rodzaj leków</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz typ leków"
          onChange={(event) => setMedicineType(event.target.value)}
          defaultValue={medicineType}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Rozwolnienie</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz dane (0-1)"
          onChange={(event) => setDiarrhea(event.target.value)}
          defaultValue={diarrhea}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Waga</StyledFormLabel>
        <StyledFormControl
          type="number"
          placeholder="Wprowadź wagę"
          onChange={(event) => setPigWeight(event.target.value)}
          defaultValue={pigWeight}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Temperatura</StyledFormLabel>
        <StyledFormControl
          type="number"
          placeholder="Wprowadź temp."
          onChange={(event) => setTemperature(event.target.value)}
          defaultValue={temperature}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Kulawizna</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wprowadź dane (0-2)"
          onChange={(event) => setLameness(event.target.value)}
          defaultValue={lameness}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Układ oddechowy</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wprowadź dane (0-2)"
          onChange={(event) => setRespiratorySys(event.target.value)}
          defaultValue={respiratorySys}
        />
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Zmiany naskórne</StyledFormLabel>
        <StyledFormControl
          type="text"
          placeholder="Wpisz rodzaj"
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

export default AddExamForm;
