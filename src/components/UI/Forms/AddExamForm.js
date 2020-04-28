import React, { useState, useMemo } from "react";
import {
  StyledEditExamInput,
  StyledFormLabel,
  StyledFormControl,
  StyledConfirmButton,
  StyledDatePicker,
  StyledSelect,
  StyledOption
} from "./../../../Styles";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);

const AddExamForm = (props) => {
  const currentTime = new Date();
  const [exDate, setExDate] = useState(currentTime);
  const [exTime, setExTime] = useState(currentTime);
  const [feces, setFeces] = useState("0");
  const [tissue, setTissue] = useState("0");
  const [medicine, setMedicine] = useState("");
  const [medicineQty, setMedicineQty] = useState(0);
  const [medicineType, setMedicineType] = useState("");
  const [diarrhea, setDiarrhea] = useState("0");
  const [pigWeight, setPigWeight] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [lameness, setLameness] = useState("0");
  const [respiratorySys, setRespiratorySys] = useState("0");
  const [skinChanges, setSkinChanges] = useState("");
  const [exResult, setExResult] = useState("");

  const data = useMemo(
    () => ({
      idPig: props.id,
      exDate: exDate,
      exTime: exTime.toString().substring(16, 31),
      feces: Number(feces),
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
    const token = localStorage.getItem("token");
    fetch(`http://obb-api.herokuapp.com/add-exam`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
        <StyledSelect
          as="select"
          onChange={(event) => setFeces(event.target.value)}
        >
          <StyledOption value="0">Normalne</StyledOption>
          <StyledOption value="1">Małe zmiany</StyledOption>
          <StyledOption value="2">Znaczne</StyledOption>
        </StyledSelect>
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Tkanka</StyledFormLabel>
        <StyledSelect
          as="select"
          onChange={(event) => setTissue(event.target.value)}
        >
          <StyledOption value="0">Dobra</StyledOption>
          <StyledOption value="1">Mierna</StyledOption>
          <StyledOption value="2">Zła</StyledOption>
        </StyledSelect>
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
        <StyledSelect
          as="select"
          onChange={(event) => setDiarrhea(event.target.value)}
        >
          <StyledOption value="0">Brak</StyledOption>
          <StyledOption value="1">Znikome</StyledOption>
          <StyledOption value="2">Znaczne</StyledOption>
        </StyledSelect>
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
        <StyledSelect
          as="select"
          onChange={(event) => setLameness(event.target.value)}
        >
          <StyledOption value="0">Brak</StyledOption>
          <StyledOption value="1">Znikome</StyledOption>
          <StyledOption value="2">Znaczne</StyledOption>
        </StyledSelect>
      </StyledEditExamInput>
      <StyledEditExamInput>
        <StyledFormLabel>Układ oddechowy</StyledFormLabel>
        <StyledSelect
          as="select"
          onChange={(event) => setRespiratorySys(event.target.value)}
        >
          <StyledOption value="0">Brak</StyledOption>
          <StyledOption value="1">Znikome</StyledOption>
          <StyledOption value="2">Znaczne</StyledOption>
        </StyledSelect>
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
