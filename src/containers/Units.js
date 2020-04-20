import React, { useState, useEffect } from "react";
import {Container, Spinner, Table} from "react-bootstrap";
import shortid from "shortid";
import AddForm from "../components/UI/Forms/AddForm";
import Head from "../components/UI/Table/Head";
import Body from "../components/UI/Table/Body";
import GeneratePDF from "../components/Actions/GeneratePDF";
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
  StyledSpinnerButton
} from "./../Styles";

//TODO: API - order pen measures DESC


const Units = (props, { initId = 1 }) => {
  const _date = new Date();

  const [dataUnits, setDataUnits] = useState([]);
  const [dataPens, setDataPens] = useState([]);
  const [dataPensUnlimited, setDataPensUnlimited] = useState([]);
  const [forageData, setForageData] = useState([]);
  const [forageOutData, setForageOutData] = useState([]);
  const [datesData, setDatesData] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showChart, setShowChart] = useState(false);
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
  const [showSpinner, setShowSpinner] = useState(true);

  const getData = async (id, func, url) => {
    await fetch(`${url}${id}`)
    .then((res) => res.json())
    .then((res) => func(res))
    .then((res) => console.log(res.id))
    .catch((e) => e);
  }

  
  useEffect(() => {
    getData(id, setDataUnits, "https://obb-api.herokuapp.com/active-pigs/");
    getData(id, setDataPens, "https://obb-api.herokuapp.com/pen-measures-last/");
    getData(id, setDataPensUnlimited, "https://obb-api.herokuapp.com/pen-measures/");
    
    sortData();
    
    props.headerHandler("standard", id);

    ArrowKeysReact.config({
      left: () => idDecrease(),
      right: () => idIncrease(),
    });
  }, [id, props.reload, sorted]);

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
    setSorted(false);
    setShowChart(false);
  };

  const idDecrease = () => {
    if (id === 1) {
      setId(6);
    } else {
      let identifier = id;
      identifier--;
      setId(identifier);
    }
    setSorted(false);
    setShowChart(false);
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

  const sortData = () => {
    const datesContainer = [];
    const forageContainer = [];
    const forageOutContainer = [];

    Object.keys(dataPensUnlimited).map((item) => {
      Object.keys(dataPensUnlimited[item]).map((element) => {
        switch (element) {
          case "measureDate":
            datesContainer.push(dataPensUnlimited[item][element].substring(5, 10));
            break;
          case "forage":
            forageContainer.push(dataPensUnlimited[item][element]);
            break;
          case "forageQtyUsed":
            forageOutContainer.push(dataPensUnlimited[item][element]);
            break;
          default:
            break;
        }
      });
    });

    replaceNulls(forageContainer);
    replaceNulls(forageOutContainer);

    setDatesData(datesContainer);
    setForageData(forageContainer);
    setForageOutData(forageOutContainer); //reverse() if data gonna be DESC/ASC

    console.log(datesContainer);
    console.log(forageContainer);
    console.log(forageOutContainer)
    // TODO: make it a little bit better
    setTimeout(() => {
      setSorted(true);
      setShowChart(sorted);
    }, 2000);
  };

  const replaceNulls = (arr) => {
    arr.forEach((e, index) => {
      if(e === null) {
        arr[index] = 0;
      }
    })
  }

  const sortedHandler = () => setSorted(false);

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
          {<GeneratePDF
            header={["Kojec", "Data", "Godz", "Awarie", "Dozownik", "Dodatki", "Wklad", "Ubytek"]}
            fileheader="Raport pomiarow kojca"
            mode="pen-measures"
            unlData={dataPensUnlimited}
            filename={`RaportPomiarowKojcaNr${id}-${new Date()
              .toString()
              .substring(0, 10)
              .replace(/\s/g, "")}`}
          />}
        </StyledJumbotron>
        {!sorted && (
        <StyledSpinnerButton
          disabled
        >
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Ładowanie wykresu...
        </StyledSpinnerButton>
        )}
        {showChart && (
          <UnitChart
          chartClass="chart--forageqty"
          chartID="global-chart"
          mode="line"
          chartLabel="Wprowadzone"
          chartLabel2="Pozostałe"
          miny={0}
          maxy={200}
          dates={datesData}
          data={forageData}
          data2={forageOutData}
          reload={props.reload}
          units="units"
          step={50}
          />
        )}
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
