import React, { useEffect, useState } from "react";
import { StyledAddIcon, StyledButtonNextPrev, StyledJumbotronHeader, StyledJumbotronParagraphs, StyledJumbotron, StyledJumbotronAltContainer, StyledJumbotronMainContainer, StyledEditIcon } from "./../../../Styles";
import { Container } from "react-bootstrap";

const Water = props => {
   const [divColor, setDivColor] = useState({});
   const divStyle = {position: "absolute", bottom: "0", left: "0", width: "100%", borderRadius: "0.1em", height: `${props.val}%`};

   useEffect(() => {
    if(props.val < 50) {
        setDivColor({backgroundColor: "#ff373b"})
    } else {
        setDivColor({backgroundColor: "#1e88e5"})
    }
   }, []);

   return (
    <StyledJumbotron fluid>
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
       <StyledJumbotronParagraphs>Stan wody: {props.val}L</StyledJumbotronParagraphs>
    </Container>
</StyledJumbotron>
   )
}

export default Water;