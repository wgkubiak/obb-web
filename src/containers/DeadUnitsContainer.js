import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import GeneratePDF from "../components/Actions/GeneratePDF";
import Head from "./../components/Table/Head";
import Body from "./../components/Table/Body";
import Menu from "./../components/Menu/Menu";
import shortid from "shortid";

const DeadUnitsContainer = props => {
  const [data, setData] = useState([]);
  const [unlimitedData, setUnlimitedData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [idPig, setIdPig] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const getData = () => {
    fetch(`https://obb-api.herokuapp.com/dead-pigs-limited`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(e => e);
  };

  const getUnlimitedData = () => {
    fetch(`https://obb-api.herokuapp.com/dead-pigs`)
      .then(res => res.json())
      .then(res => setUnlimitedData(res))
      .catch(e => e);
  };

  useEffect(() => {
    getData();
    getUnlimitedData();
  }, []);

  const showForm = id => {
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
    <div className="UnitsContainer">
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
                  "Data zgonu"
                ]}
              />
            </thead>
            <tbody>
              {data.map((data, index) => (
                <Body
                  key={`${data.id}${shortid.generate()}`}
                  data={data}
                  showForm={showForm.bind(this, data.id)}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <GeneratePDF
          header={["Data zgonu", "Kojec", "ID", "Plec", "Data zakupu", "Cena"]}
          fileheader="Raport zgonow"
          mode="dead"
          unlData={unlimitedData}
          filename={`RaportZgonow-${new Date()
            .toString()
            .substring(0, 10)
            .replace(/\s/g, "")}`}
        />
        {showMenu && (
          <Menu
            mode="dead"
            url="https://obb-api.herokuapp.com/delete-pig/"
            id={idPig}
            showMenu={toggleMenu}
            showEdit={toggleEdit}
            showDead={showEdit}
            reloadHandler={props.reloadHandler}
          />
        )}
      </div>
    </div>
  );
};

export default DeadUnitsContainer;
