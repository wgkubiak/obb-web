import React, { useState, useEffect } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import GeneratePDF from "../components/Actions/GeneratePDF";
import Head from "../components/UI/Table/Head";
import Body from "../components/UI/Table/Body";
import Menu from "../components/Menu/Menu";
import NoData from "../components/Info/NoData";
import {StyledUnitsTable, StyledUnitsContainer, StyledTableContent, StyledSpinnerButton} from "./../Styles";
import _ from "underscore";

import shortid from "shortid";

const DeadUnits = (props) => {
  const [data, setData] = useState([]);
  const [unlimitedData, setUnlimitedData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [idPig, setIdPig] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showNoDataInfo, setShowNoDataInfo] = useState(false);

  const getData = () => {
    fetch(`https://obb-api.herokuapp.com/dead-pigs-limited`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((e) => e);
  };

  const getUnlimitedData = () => {
    fetch(`https://obb-api.herokuapp.com/dead-pigs`)
      .then((res) => res.json())
      .then((res) => setUnlimitedData(res))
      .catch((e) => e);
  };

  const show = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
        setShowSpinner(false);
      }, 2000);
    });
  };

  const showHandler = async () => {
    const res = await show();
    console.log(typeof res);
    if (_.isObject(res) && !_.isEmpty(res)) {
      setShowTable(true);
      setShowNoDataInfo(false);
    } else {
      setShowNoDataInfo(true);
      setShowTable(false);
    }
  };

  useEffect(() => {
    getData();
    getUnlimitedData();
    props.headerHandler("dead");
    showHandler();
  }, [props.reload]);

  showHandler();

  const showForm = (id) => {
    setIdPig(id);
    toggleMenu();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <StyledUnitsContainer>
      {showSpinner && (
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
          Wczytuję dane...
        </StyledSpinnerButton>
      )}
      {showTable && (
        <StyledUnitsTable>
          <StyledTableContent>
            <Table bordered hover variant="dark">
              <thead>
                <Head
                  data={[
                    "Kojec",
                    "ID",
                    "Płeć",
                    "Data zakupu",
                    "Cena",
                    "Data zgonu",
                  ]}
                />
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <Body
                    mode="dead"
                    key={`${data.id}${shortid.generate()}`}
                    data={data}
                    showForm={showForm.bind(this, data.id)}
                  />
                ))}
              </tbody>
            </Table>
          </StyledTableContent>

          {showMenu && (
            <Menu
              divider={6}
              mode="dead"
              url="https://obb-api.herokuapp.com/delete-pig/"
              id={idPig}
              showMenu={toggleMenu}
              showEdit={toggleEdit}
              showDead={showEdit}
              reloadHandler={props.reloadHandler}
            />
          )}
          {showTable && (
            <GeneratePDF
              header={[
                "Data zgonu",
                "Kojec",
                "ID",
                "Plec",
                "Data zakupu",
                "Cena",
              ]}
              text="Wygeneruj raport PDF"
              fileheader="Raport zgonow"
              mode="dead"
              unlData={unlimitedData}
              filename={`RaportZgonow-${new Date()
                .toString()
                .substring(0, 10)
                .replace(/\s/g, "")}`}
            />
          )}
        </StyledUnitsTable>
      )}
      {showNoDataInfo && <NoData mode="neg" />}
    </StyledUnitsContainer>
  );
};

export default DeadUnits;
