import React, { useEffect, useState } from "react";
import { StyledUnitsContainer } from "./../Styles";
import WaterContainer from "./../components/UI/Jumbotron/Water";

const Water = props => {
    useEffect(() => {
        props.headerHandler("water");
    }, []);

    return (
        <StyledUnitsContainer style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <WaterContainer id={1} val={0} />
            <WaterContainer id={2} val={45} />
            <WaterContainer id={3} val={35} />
            <WaterContainer id={4} val={20} />
            <WaterContainer id={5} val={15} />
            <WaterContainer id={6} val={85} />
        </StyledUnitsContainer>
    )
}

export default Water;