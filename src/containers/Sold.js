import React, { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import GeneratePDF from "../components/Actions/GeneratePDF";
import Head from "../components/UI/Table/Head";
import Body from "../components/UI/Table/Body";
import Menu from "../components/Menu/Menu";
import NoData from "../components/Info/NoData";
import _ from "underscore";

import shortid from "shortid";

const DeadUnits = (props) => {
  const [data, setData] = useState([]);
  const [unlimitedData, setUnlimitedData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [idPig, setIdPig] = useState("");
  const [price, setPrice] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showNoDataInfo, setShowNoDataInfo] = useState(false);

  const getData = () => {
    fetch(`https://obb-api.herokuapp.com/sold-pigs-limited`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((e) => e);
  };

  const getUnlimitedData = () => {
    fetch(`https://obb-api.herokuapp.com/sold-pigs`)
      .then((res) => res.json())
      .then((res) => setUnlimitedData(res))
      .catch((e) => e);
  };

  const showForm = (id, price) => {
    setIdPig(id);
    setPrice(price);
    toggleMenu();
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
    setShowEdit(false);
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const show = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
        setShowSpinner(false);
      }, 2000)
    })
  }

  const showHandler = async () => {
    const res = await show();
    console.log(typeof res);
    if(_.isObject(res) && !_.isEmpty(res)) {
      setShowTable(true);
      setShowNoDataInfo(false);
    } else {
      setShowNoDataInfo(true);
      setShowTable(false);
    }
  }
  
  useEffect(() => {
    getData();
    getUnlimitedData();
    props.headerHandler("sold");

    showHandler();
  }, [props.reload]);

  showHandler();
  return (
    <div className="UnitsContainer">
      {showSpinner && (
        <Button
          variant="primary"
          style={{ backgroundColor: "#30d158", border: "none", top: "10%", position: "relative" }}
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
        </Button>
      )}
      {showTable && (
        <div className="UnitsTable">
          <div className="TableContent">
            <Table bordered hover variant="dark">
              <thead>
                <Head
                  data={[
                    "Kojec",
                    "ID",
                    "Płeć",
                    "Data zakupu",
                    "Cena",
                    "Data sprzedaży",
                    "Kwota sprzedaży",
                  ]}
                  divider={7}
                />
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <Body
                    mode="sold"
                    key={`${data.id}${shortid.generate()}`}
                    data={data}
                    showForm={showForm.bind(this, data.id, data.pigSellingCost)}
                  />
                ))}
              </tbody>
            </Table>
          </div>

          {showMenu && (
            <Menu
              mode="sold"
              id={idPig}
              price={price}
              showMenu={toggleMenu}
              showEdit={toggleEdit}
              hideMenu={hideMenu}
              url="https://obb-api.herokuapp.com/delete-pig/"
              show={showEdit}
              reloadHandler={props.reloadHandler}
            />
          )}
        </div>
      )}
      {showTable && (
        <GeneratePDF
          header={[
            "Data sprzedazy",
            "Kwota sprzedazy",
            "Data zakupu",
            "Cena",
            "ID",
            "Plec",
            "Kojec",
          ]}
          fileheader="Raport sprzedazy"
          mode="sold"
          unlData={unlimitedData}
          filename={`RaportSprzedazy-${new Date()
            .toString()
            .substring(0, 10)
            .replace(/\s/g, "")}`}
        />
      )}
      {showNoDataInfo && (
        <NoData mode="pos"/>
      )}
    </div>
  );
};

export default DeadUnits;
