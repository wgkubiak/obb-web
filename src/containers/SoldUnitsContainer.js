import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import GeneratePDF from "./../components/Actions/GeneratePDF";
import Head from "./../components/Table/Head";
import Body from "./../components/Table/Body";
import Menu from "./../components/Menu/Menu";
import NoData from "./../components/Info/NoData";
import shortid from "shortid";
import _ from "underscore";

const DeadUnitsContainer = props => {
  const [data, setData] = useState([]);
  const [unlimitedData, setUnlimitedData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [idPig, setIdPig] = useState("");
  const [price, setPrice] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const [showNoData, setShowNoData] = useState(true);

  const getData = () => {
    fetch(`https://obb-api.herokuapp.com/sold-pigs-limited`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(e => e);
  };

  const getUnlimitedData = () => {
    fetch(`https://obb-api.herokuapp.com/sold-pigs`)
      .then(res => res.json())
      .then(res => setUnlimitedData(res))
      .catch(e => e);
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

  useEffect(() => {
    getData();
    getUnlimitedData();

    console.log(_.first(data) !== undefined , !_.isEmpty(data));
    
    //TODO: some weird logic
    setTimeout(() => {
      if (_.first(data) !== undefined || !_.isEmpty(data)) {
        setShowNoData(true);
      } else {
        setShowNoData(false);
      }
    }, 1000);
  }, [props.reload, showNoData]);

  return (
    <div className="UnitsContainer">
      {!showNoData && (
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
                    "Kwota sprzedaży"
                  ]}
                />
              </thead>
              <tbody>
                {data.map((data, index) => (
                  <Body
                    key={`${data.id}${shortid.generate()}`}
                    data={data}
                    showForm={showForm.bind(this, data.id, data.pigSellingCost)}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <GeneratePDF
            header={[
              "Data sprzedazy",
              "Kwota sprzedazy",
              "Data zakupu",
              "Cena",
              "ID",
              "Plec",
              "Kojec"
            ]}
            fileheader="Raport sprzedazy"
            mode="sold"
            unlData={unlimitedData}
            filename={`RaportSprzedazy-${new Date()
              .toString()
              .substring(0, 10)
              .replace(/\s/g, "")}`}
          />
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
      {showNoData && <NoData />}
    </div>
  );
};

export default DeadUnitsContainer;
