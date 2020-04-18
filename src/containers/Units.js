import React, { useState, useEffect, useRef } from "react";
import { Jumbotron, Container, Table, Button } from "react-bootstrap";
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
import { MdAdd, MdEdit} from "react-icons/md";
import styled from "styled-components";
import ArrowKeysReact from "arrow-keys-react";

const StyledButton = styled(Button)`
  margin-top: 1em;
  margin-right: 1em;
  margin-left: 1em;
  border-radius: 0.5;
  border: none;
  background-color: #30d158 !important;
  outline: none;

  &:hover {
    background-color: #29b64c !important;
  }
`;

const StyledUnitsContainer = styled.div`
  top: 8%;
  width: 88%;
  height: 90%;
  position: absolute;
  right: 1%;
  transform: translate(0%, 0%);
  margin-bottom: 1em !important;
  outline: none;
`;

const StyledUnitsTable = styled.div`
  position: relative;
  top: 2em;
  padding-top: 0em;
  padding-bottom: 0em;
  margin: 0 auto;
  margin-bottom: 4em !important;
  margin-top: 1em !important;
  background-color: #424242;
  width: 100%;
  transition-duration: 0.5s;
  border-radius: 0.25em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  font-size: 1em;
`;

const StyledTableContent = styled.div`
  background-color: transparent !important;
  padding: 1em;
`;

const Units = (props, { initId = 1, initForm = false }) => {
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
  }, [id, props.reload]); //..,data] makes loop //id should change only on select

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
      setAddition(value.addition)
    })

    setShowEditPenMeasure(true);
  }

  const showAddPenMeasureHandler = () => {
    setShowAddPenMeasure(true);
  }

  const hidePenMeasure = () => {
    setShowEditPenMeasure(false);
  }


  const hideAddPenMeasure = () => {
    setShowAddPenMeasure(false);
  }

  return (
    <StyledUnitsContainer {...ArrowKeysReact.events} tabIndex="1">
      <div>
        <StyledButton onClick={idDecrease}>&larr;</StyledButton>
        <StyledButton onClick={idIncrease}>&rarr;</StyledButton>
      </div>
      <div style={{display: "flex", flexDirection: "row", width: "100%", height: "auto"}}>
      <Jumbotron
        style={{
          backgroundColor: "#424242",
          marginTop: "1em",
          height: "auto",
          width: "49%",
          marginRight: "1%",
          borderRadius: ".3em",
          padding: "1em",
          marginBottom: "0em"
        }}
        fluid
      >
        <div style={{width: "100%", position: "relative", height: "auto", display: "flex", flexDirection: "row", alignContent: "right"}}>
           <div style={{width: "auto", position: "absolute", right: "0"}}>
            <button style={{backgroundColor: "#424242", border: "none", boxShadow: "none"}} onClick={() => measureIdHandler()}><MdEdit style={{color: "rgba(255, 255, 255, 0.87)"}}/></button>
            <button style={{backgroundColor: "#424242", border: "none", boxShadow: "none"}} onClick={() => showAddPenMeasureHandler()}><MdAdd style={{color: "rgba(255, 255, 255, 0.87)"}}/></button>
           </div>
         </div>
        <Container>
         

          <h3
            style={{
              marginTop: "1em",
              color: "rgba(255, 255, 255, 0.87)",
              textAlign: "center",
            }}
          >
            Pomiary kojca
          </h3>
          {dataPens.map((data, index) => (
            <>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  textAlign: "center",
                  width: "auto",
                }}
              >
                <span>
                  Data: {data.measureDate.substring(0, 10)} {data.measureTime}
                </span>
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  textAlign: "center",
                  width: "auto",
                }}
              >
                <span>
                  Dozownik: {data.dosatron || "N/A"} Wprowadzono: {data.forage || "0"}{" "}
                  Pozostałe: {data.forageQtyUsed || "0"}
                </span>
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  textAlign: "center",
                  width: "auto",
                }}
              >
                Awaria: {data.breakdown || "N/A"}
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  textAlign: "center",
                  width: "auto",
                  paddingBottom: "2em",
                }}
              >
                Dodatki: {data.addition || "N/A"}
              </p>
            </>
          ))}
        </Container>
        {<GenerateButton/>}
      </Jumbotron>
      <UnitChart
            chartClass="chart--forageqty"
            chartID="global-chart"
            mode="line"
            chartLabel="Wprowadzone"
            chartLabel2="Pozostałe"
            miny={0}
            maxy={200}
            dates={["18-04", "19-04", "20-04", "21-04", "22-04", "23-04", "24-04"]}
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
          dos={dosatron} //dozatron
          inp={forage} //wlozono
          out={forageQtyUsed} //wyciagnieto
          breaks={breakdown} //break
          additions={addition} //dodatki
          
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
