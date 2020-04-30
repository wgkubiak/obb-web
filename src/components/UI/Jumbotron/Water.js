import React, { useEffect, useState } from "react";
import { StyledAddIcon, StyledButtonNextPrev, StyledJumbotronHeader, StyledJumbotronParagraphs, StyledJumbotron, StyledJumbotronAltContainer, StyledJumbotronMainContainer, StyledEditIcon } from "./../../../Styles";
import { Container } from "react-bootstrap";
import AddWaterForm from "./../../UI/Forms/AddWaterForm";
import EditWaterForm from "./../../UI/Forms/EditWaterForm";

const Water = props => {
   const [showAddWaterForm, setShowAddWaterForm] = useState(false);
   const [showEditWaterForm, setShowEditWaterForm] = useState(false);

   const showAddHandler = () => {
       setShowAddWaterForm(!showAddWaterForm);
   }
   const hideAddHandler = () => setShowAddWaterForm(false);

   const showEditHandler = () => {
        setShowEditWaterForm(!showEditWaterForm);
   }
   const hideEditHandler = () => setShowEditWaterForm(false);
   
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
            <StyledButtonNextPrev onClick={showEditHandler}> 
                <StyledEditIcon />
            </StyledButtonNextPrev>
            <StyledButtonNextPrev onClick={showAddHandler}>
                <StyledAddIcon />
            </StyledButtonNextPrev>
        </StyledJumbotronAltContainer>
    </StyledJumbotronMainContainer>
    <Container style={{zIndex: "100", position: "relative"}}>
        <StyledJumbotronHeader>{props.id}</StyledJumbotronHeader>
        <StyledJumbotronParagraphs>Dane z dnia: {props.date.substring(0, 10)} / Godz.: {props.time}</StyledJumbotronParagraphs>
       <StyledJumbotronParagraphs>Wprowadzono: {props.waterInit}L / Stan aktualny: {props.waterUsed}L</StyledJumbotronParagraphs>
    </Container>
    {showAddWaterForm && (
        <AddWaterForm id={props.id} toggleAddHandler={hideAddHandler} reloadHandler={props.reloadHandler}/>
    )}
    {showEditWaterForm && (
        <EditWaterForm unit={props.unit} id={props.id} toggleEditHandler={hideEditHandler} waterInit={props.waterInit} waterUsed={props.waterUsed} reloadHandler={props.reloadHandler}/>
    )}
    </StyledJumbotron>
   )
}

export default Water;