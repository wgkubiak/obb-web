import React, { useEffect, useState } from "react";
import { StyledAddIcon, StyledButtonNextPrev, StyledJumbotronHeader, StyledJumbotronParagraphs, StyledJumbotron, StyledJumbotronAltContainer, StyledJumbotronMainContainer, StyledEditIcon } from "./../../../Styles";
import { Container } from "react-bootstrap";

const Water = props => {
   const [divColor, setDivColor] = useState({});
   const divStyle = {position: "absolute", bottom: "0", left: "0", width: "100%", borderRadius: "0.2em", border: "3px solid #424242", height: `${Number(props.waterUsed / props.waterInit * 100)}%`};

   useEffect(() => {
    if(Number(props.waterUsed / props.waterInit * 100) < 50) {
        setDivColor({backgroundColor: "#ff373b"})
    } else {
        setDivColor({backgroundColor: "#1e88e5"})
    }
   }, []);

   return (
    <StyledJumbotron fluid >
    <div style={{...divStyle, ...divColor}}></div>
    <StyledJumbotronMainContainer>
        <StyledJumbotronAltContainer>
            <StyledButtonNextPrev>
                <StyledEditIcon />
            </StyledButtonNextPrev>
            <StyledButtonNextPrev>
                <StyledAddIcon />
            </StyledButtonNextPrev>
        </StyledJumbotronAltContainer>
    </StyledJumbotronMainContainer>
    <Container style={{zIndex: "100", position: "relative"}}>
        <StyledJumbotronHeader>{props.id}</StyledJumbotronHeader>
        <StyledJumbotronParagraphs>Dane z dnia: {props.date.substring(0, 10)} / Godz.: {props.time}</StyledJumbotronParagraphs>
       <StyledJumbotronParagraphs>Wprowadzono: {props.waterInit}L / Stan aktualny: {props.waterUsed}L</StyledJumbotronParagraphs>
    </Container>
    </StyledJumbotron>
   )
}

export default Water;