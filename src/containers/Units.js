import React, { useState, useEffect } from "react";
import {Container, Table} from "react-bootstrap";
import shortid from "shortid";
import AddForm from "../components/UI/Forms/AddForm";
import Head from "../components/UI/Table/Head";
import Body from "../components/UI/Table/Body";
import GenerateButton from "../components/UI/Buttons/GenerateButton";
import UnitChart from "../components/UI/Charts/UnitChart";
import Menu from "../components/Menu/Menu";
import EditUnitForm from "../components/UI/Forms/EditUnitForm";
import EditPenMeasureForm from "../components/UI/Forms/EditPenMeasureForm";
import AddPenMeasureForm from "../components/UI/Forms/AddPenMeasureForm";
import ArrowKeysReact from "arrow-keys-react";
import {
  StyledButtonNextPrev,
  StyledAddIcon,
  StyledEditIcon,
  StyledJumbotron,
  StyledJumbotronHeader,
  StyledJumbotronParagraphs,
  StyledJumbotronMainContainer,
  StyledJumbotronAltContainer,
  StyledUnitsTable,
  StyledUnitsContainer,
  StyledButton,
  StyledTableContent,
} from "./../Styles";

const Units = (props, { initId = 1 }) => {
  const _date = new Date();

  const [dataUnits, setDataUnits] = useState([]);
  const [dataPens, setDataPens] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [id, setId] = useState(initId);
  const [idPig, setIdPig] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(_date);
  const [price, setPrice] = useState("0");
  const [editMenu, setEditMenu] = useState(false);
  const [showDeadSoldForm, setShowDeadSoldForm] = useState(false);
  const [showEditPenMeasure, setShowEditPenMeasure] = useState(false);
  const [showAddPenMeasure, setShowAddPenMeasure] = useState(false);
  const [measureId, setMeasureId] = useState(0);
  const [dosatron, setDosatron] = useState("");
  const [forage, setForage] = useState("");
  const [forageQtyUsed, setForageQtyUsed] = useState("");
  const [breakdown, setBreakdown] = useState("");
  const [addition, setAddition] = useState("");

  const getUnitsData = async (id) => {
    await fetch(`https://obb-api.herokuapp.com/active-pigs/${id}`)
      .then((res) => res.json())
      .then((res) => setDataUnits(res))
      .catch((e) => e);
  };

  const getPenMeasuresData = async (id) => {
    await fetch(`https://obb-api.herokuapp.com/pen-measures-last/${id}`)
      .then((res) => res.json())
      .then((res) => setDataPens(res))
      .then((res) => console.log(res.id))
      .catch((e) => e);
  };

  useEffect(() => {
    getUnitsData(id);
    getPenMeasuresData(id);
    props.headerHandler("standard", id);

    ArrowKeysReact.config({
      left: () => idDecrease(),
      right: () => idIncrease(),
    });
  }, [id, props.reload]);

  const showForm = (pen, id, gender, date, price) => {
    setId(pen);
    setIdPig(id);
    props.setUnitID(id);
    setGender(gender);
    setDate(date);
    setPrice(price);

    toggleMenu();
  };

  const toggleEdit = () => {
    setEditMenu(!editMenu);
  };

  const hideEdit = () => {
    setEditMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const showDeadSoldHandler = () => {
    setShowDeadSoldForm(!showDeadSoldForm);
    hideEdit();
  };

  const idIncrease = () => {
    if (id === 6) {
      setId(1);
    } else {
      let identifier = id;
      identifier++;
      setId(identifier);
    }
  };

  const idDecrease = () => {
    if (id === 1) {
      setId(6);
    } else {
      let identifier = id;
      identifier--;
      setId(identifier);
    }
  };

  const measureIdHandler = () => {
    dataPens.map((value) => {
      setMeasureId(value.id);
      setDosatron(value.dosatron);
      setForage(value.forage);
      setForageQtyUsed(value.forageQtyUsed);
      setBreakdown(value.breakdown);
      setAddition(value.addition);
    });

    setShowEditPenMeasure(true);
  };

  const showAddPenMeasureHandler = () => {
    setShowAddPenMeasure(true);
  };

  const hidePenMeasure = () => {
    setShowEditPenMeasure(false);
  };

  const hideAddPenMeasure = () => {
    setShowAddPenMeasure(false);
  };

  return (
    <StyledUnitsContainer {...ArrowKeysReact.events} tabIndex="1">
      <div>
        <StyledButton onClick={idDecrease}>&larr;</StyledButton>
        <StyledButton onClick={idIncrease}>&rarr;</StyledButton>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
        }}
      >
        <StyledJumbotron fluid>
          <StyledJumbotronMainContainer>
            <StyledJumbotronAltContainer>
              <StyledButtonNextPrev onClick={() => measureIdHandler()}>
                <StyledEditIcon />
              </StyledButtonNextPrev>
              <StyledButtonNextPrev onClick={() => showAddPenMeasureHandler()}>
                <StyledAddIcon />
              </StyledButtonNextPrev>
            </StyledJumbotronAltContainer>
          </StyledJumbotronMainContainer>
          <Container>
            <StyledJumbotronHeader>Pomiary kojca</StyledJumbotronHeader>
            {dataPens.map((data, index) => (
              <>
                <StyledJumbotronParagraphs>
                  <span>
                    Data: {data.measureDate.substring(0, 10)} {data.measureTime}
                  </span>
                </StyledJumbotronParagraphs>
                <StyledJumbotronParagraphs>
                  <span>
                    Dozownik: {data.dosatron || "N/A"} Wprowadzono:{" "}
                    {data.forage || "0"} Pozostałe: {data.forageQtyUsed || "0"}
                  </span>
                </StyledJumbotronParagraphs>
                <StyledJumbotronParagraphs>
                  Awaria: {data.breakdown || "N/A"}
                </StyledJumbotronParagraphs>
                <StyledJumbotronParagraphs
                >
                  Dodatki: {data.addition || "N/A"}
                </StyledJumbotronParagraphs>
              </>
            ))}
          </Container>
          {<GenerateButton />}
        </StyledJumbotron>
        <UnitChart
          chartClass="chart--forageqty"
          chartID="global-chart"
          mode="line"
          chartLabel="Wprowadzone"
          chartLabel2="Pozostałe"
          miny={0}
          maxy={200}
          dates={[
            "18-04",
            "19-04",
            "20-04",
            "21-04",
            "22-04",
            "23-04",
            "24-04",
          ]}
          data={["100", "125", "145", "148", "114", "58", "42"]}
          reload={props.reload}
          units="units"
          step={50}
        />
      </div>
      <StyledUnitsTable>
        <StyledTableContent>
          <Table bordered hover variant="dark">
            <thead>
              <Head data={["ID", "Płeć", "Data zakupu", "Cena"]} divider={5} />
            </thead>
            <tbody>
              {dataUnits.map((data, index) => (
                <Body
                  mode="standard"
                  key={`${data.id}${shortid.generate()}`}
                  data={data}
                  divider={5}
                  showForm={showForm.bind(
                    this,
                    data.idPen,
                    data.id,
                    data.pigGender,
                    data.pigShoppingDate,
                    data.pigShoppingPrice
                  )}
                />
              ))}
            </tbody>
          </Table>
          {showMenu && (
            <Menu
              mode="pigs"
              id={idPig}
              idPen={id}
              url="https://obb-api.herokuapp.com/delete-pig/"
              deadSoldMode={showDeadSoldForm}
              showExams={props.toggleExams}
              showMenu={toggleMenu}
              showDeadSoldHandler={showDeadSoldHandler}
              reloadHandler={props.reloadHandler}
              showEditHandler={toggleEdit}
              hideEditHandler={hideEdit}
            />
          )}
        </StyledTableContent>
      </StyledUnitsTable>
      {props.showAddForm && (
        <AddForm
          id={id}
          showAddUnitHandler={props.hideAddForm}
          reloadHandler={props.reloadHandler}
        />
      )}
      {editMenu && (
        <EditUnitForm
          id={id}
          idPig={idPig}
          gender={gender}
          date={date}
          price={price}
          showEditHandler={toggleEdit}
          reloadHandler={props.reloadHandler}
          showMenuHandler={toggleMenu}
          showDeadSoldHandler={showDeadSoldHandler}
        />
      )}
      {showEditPenMeasure && (
        <EditPenMeasureForm
          id={measureId}
          dos={dosatron}
          inp={forage}
          out={forageQtyUsed}
          breaks={breakdown}
          additions={addition}
          toggleEditHandler={hidePenMeasure}
          reloadHandler={props.reloadHandler}
        />
      )}
      {showAddPenMeasure && (
        <AddPenMeasureForm
          id={id}
          toggleAddHandler={hideAddPenMeasure}
          reloadHandler={props.reloadHandler}
        />
      )}
    </StyledUnitsContainer>
  );
};

export default Units;
