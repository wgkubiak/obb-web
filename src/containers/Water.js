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
    const [reload, setReload] = useState([]);

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
        getData(2, setSecWater);
        getData(3, setTrdWater);
        getData(4, setFthWater);
        getData(5, setFifWater);
        getData(6, setSthWater);
    }, [reload])

    return (
        <StyledUnitsContainer style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "auto", marginBottom: "5em" }}>
                 {fstWater.map(data => (
                    <WaterContainer id={data.idPen} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} />
                ))}
                  {secWater.map(data => (
                    <WaterContainer id={data.idPen} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} />
                ))}
                  {trdWater.map(data => (
                    <WaterContainer id={data.idPen} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} />
                ))}
                  {fthWater.map(data => (
                    <WaterContainer id={data.idPen} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} />
                ))}
                  {fifWater.map(data => (
                    <WaterContainer id={data.idPen} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} />
                ))}
                  {sthWater.map(data => (
                    <WaterContainer id={data.idPen} waterInit={data.waterInit} waterUsed={data.waterUsed} date={data.measureDate} time={data.measureTime} />
                ))}
        </StyledUnitsContainer>
    )
}

export default Water;