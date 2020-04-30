import React, { useEffect, useState } from "react";
import { StyledUnitsContainer } from "./../Styles";
import WaterContainer from "./../components/UI/Jumbotron/Water";

const Water = props => {
    const [fstWater, setFstWater] = useState([]);
    const [secWater, setSecWater] = useState([]);
    const [trdWater, setTrdWater] = useState([]);
    const [fthWater, setFthWater] = useState([]);
    const [fifWater, setFifWater] = useState([]);
    const [sthWater, setSthWater] = useState([]);
    const [reload1, setReload1] = useState([]);
    const [reload2, setReload2] = useState([]);
    const [reload3, setReload3] = useState([]);
    const [reload4, setReload4] = useState([]);
    const [reload5, setReload5] = useState([]);
    const [reload6, setReload6] = useState([]);

    const getData = async (id, func) => {
        await fetch(`https://obb-api.herokuapp.com/water-last/${id}`)
          .then((res) => res.json())
          .then((res) => func(res))
          .catch((e) => e);
    };

    useEffect(() => {
        props.headerHandler("water");
    }, []);

    useEffect(() => {
        getData(1, setFstWater);
    }, [reload1])

    useEffect(() => {
      getData(2, setSecWater);  
    }, [reload2]);

    useEffect(() => {
      getData(3, setTrdWater);
    }, [reload3]);

    useEffect(() => {
      getData(4, setFthWater);
    }, [reload4]);

    useEffect(() => {
      getData(5, setFifWater);
    }, [reload5]);

    useEffect(() => {
      getData(6, setSthWater);
    }, [reload6]);

    const reloadHandler1 = () => setReload1(!reload1);
    const reloadHandler2 = () => setReload2(!reload2);
    const reloadHandler3 = () => setReload3(!reload3);
    const reloadHandler4 = () => setReload4(!reload4);
    const reloadHandler5 = () => setReload5(!reload5);
    const reloadHandler6 = () => setReload6(!reload6);

    return (
        <StyledUnitsContainer style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "auto", marginBottom: "5em" }}>
                 {fstWater.map(data => (
                    <WaterContainer key={`${data.id}${data.idPen}`} id={data.idPen} unit={data.id} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} reloadHandler={reloadHandler1}/>
                ))}
                  {secWater.map(data => (
                    <WaterContainer key={`${data.id}${data.idPen}`} id={data.idPen} unit={data.id} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} reloadHandler={reloadHandler2}/>
                ))}
                  {trdWater.map(data => (
                    <WaterContainer key={`${data.id}${data.idPen}`} id={data.idPen} unit={data.id} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} reloadHandler={reloadHandler3}/>
                ))}
                  {fthWater.map(data => (
                    <WaterContainer key={`${data.id}${data.idPen}`} id={data.idPen} unit={data.id} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} reloadHandler={reloadHandler4}/>
                ))}
                  {fifWater.map(data => (
                    <WaterContainer key={`${data.id}${data.idPen}`} id={data.idPen} unit={data.id} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} reloadHandler={reloadHandler5}/>
                ))}
                  {sthWater.map(data => (
                    <WaterContainer key={`${data.id}${data.idPen}`} id={data.idPen} unit={data.id} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} reloadHandler={reloadHandler6}/>
                ))}
        </StyledUnitsContainer>
    )
}

export default Water;