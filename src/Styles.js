import styled, { css } from "styled-components";
import { Button, Form, Jumbotron, ListGroup, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { MdDns, MdWeb, MdEqualizer, MdEdit, MdAdd } from "react-icons/md";
import { GiWaterDrop } from "react-icons/gi";
import { FaShoppingCart, FaRegSadTear, FaRegSmileBeam } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";

/*
NAVBARS
 */
export const StyledApp = styled.div`
  text-align: center;
`;

export const StyledFigure = styled.figure`
  margin: 0 0 0.1rem !important;
`;

export const StyledHeader = styled.header`
  top: 4em;
  width: 10%;
  height: 100%;
  position: fixed;
  background-color: #424242;
  color: #000000;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
`;

export const StyledListGroup = styled(ListGroup)`
  top: 0%;
  position: relative;
  width: auto;
`;

export const StyledListGroupItem = styled(ListGroup.Item)`
  justify-content: left;
  display: flex;
  flex-direction: column;
  outline: none;
`;

export const StyledFigcaption = styled.figcaption`
  fontsize: calc(0.8vw + 0.2vh);
  color: rgba(255, 255, 255, 0.87);
  fontweight: 500;
`;

export const StyledDivTop = styled.div`
  width: 100%;
  height: 4em;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #424242;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.075);

  z-index: 20;
`;

export const StyledParagraphTop = styled.div`
  position: relative;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  width: 10%;
  top: 50%;
  left: 0%;
  transform: translate(0%, -50%);
  font-size: calc(2vh + 1vw);
  height: 100%;
  text-align: center;
  background-color: #1b1b1b;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledParagraphMid = styled.div`
  position: absolute;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  top: 0%;
  width: 10%;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  font-size: 1em;
  text-align: center;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledHiddenReload = styled.h1`
  display: none;
`;

export const StyledForageIcon = styled(MdWeb)`
  color: #30d158;
`;

export const StyledGlobalIcon = styled(MdEqualizer)`
  color: #30d158;
`;

export const StyledPastureIcon = styled(MdDns)`
  color: #30d158;
`;

export const StyledWaterIcon = styled(GiWaterDrop)`
  color: #30d158;
`;

export const StyledSoldIcon = styled(FaShoppingCart)`
  color: #30d158;
`;

export const StyledDeadIcon = styled(TiUserDelete)`
  color: #30d158;
`;

export const StyledEditIcon = styled(MdEdit)`
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledAddIcon = styled(MdAdd)`
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledSadIcon = styled(FaRegSadTear)`
  paddingTop: "2em",
  width: "10em",
  height: "10em",
  color: "#30d158",
`;

export const StyledHappyIcon = styled(FaRegSmileBeam)`
  paddingTop: "2em",
  width: "10em",
  height: "10em",
  color: "#30d158",
`;

export const StyledJumbotron = styled(Jumbotron)`
  background-color: #424242;
  margin-top: 1em;
  height: auto;
  width: 49%;
  margin-right: 1%;
  border-radius: 0.3em;
  padding: 1em;
  margin-bottom: 0em;
`;

export const StyledJumbotronHeader = styled.h3`
  margin-top: 1em;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
`;

export const StyledJumbotronParagraphs = styled.p`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  width: auto;
`;

export const StyledButtonNextPrev = styled.button`
  background-color: #424242;
  border: none;
  box-shadow: none;
`;

export const StyledButton = styled(Button)`
  margin-top: 1em;
  margin-right: 1em;
  margin-left: 1em;
  border-radius: 0.5;
  border: none;
  background-color: #30d158 !important;
  outline: none;

  &:hover {
    background-color: #29b64c !important;
  }
`;

export const StyledUnitsContainer = styled.div`
  top: 8%;
  width: 88%;
  height: 90%;
  position: absolute;
  right: 1%;
  transform: translate(0%, 0%);
  margin-bottom: 1em !important;
  outline: none;
`;

export const StyledUnitsTable = styled.div`
  position: relative;
  top: 2em;
  padding-top: 0em;
  padding-bottom: 0em;
  margin: 0 auto;
  margin-bottom: 4em !important;
  margin-top: 1em !important;
  background-color: #424242;
  width: 100%;
  transition-duration: 0.5s;
  border-radius: 0.25em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  font-size: 1em;
`;

export const StyledTableContent = styled.div`
  background-color: transparent !important;
  padding: 1em;
`;

export const StyledTableRow = styled.tr`
  background-color: #424242;

  &:hover {
    background-color: #30d158;
  }
`;

export const StyledSubmitButton = styled(Button)`
  position: relative;
  width: 100%;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #30d158 !important;

  &:hover {
    background-color: #29b64c !important;
  }
`;

export const StyledHideButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  height: auto;
  margin-right: auto;
  border-radius: 0;
  text-transform: uppercase;
  border: none !important;
  outline: none;
  background-color: #424242 !important;
  width: auto;
  font-size: small;
  color: rgba(255, 255, 255, 0.87) !important;

  &:hover {
    color: rgba(255, 255, 255, 0.87);
  }
`;

export const StyledFormControl = styled(Form.Control)`
  text-align-last: center;
  text-align: center;
  background-color: #424242;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #30d158;
  border-radius: 0em !important;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  text-align: center;
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  border: none;
  border-bottom: 1px solid #30d158;
`;

export const StyledFormLabel = styled(Form.Label)`
  color: rgba(255, 255, 255, 0.87);
  font-family: "Roboto", sans-serif;
  font-weight: 500;
`;

export const StyledSelect = styled(Form.Control)`
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  text-align-last: center;
  text-align: center;
  background-color: #424242;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #30d158;
  border-radius: 0em !important;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledSelectShort = styled(Form.Control)`
  width: 80%;
  height: calc(1.5em + 0.75rem + 2px);
  text-align-last: center;
  text-align: center;
  background-color: #424242;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #30d158;
  border-radius: 0em !important;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledEditForm = styled.div`
  width: 20em;
  height: auto;
  z-index: 2;
  position: fixed;
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  left: 50%;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

export const StyledConfirmButton = styled(Button)`
  position: relative;
  width: 100%;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #30d158 !important;

  &:hover {
    background-color: #29b64c !important;
  }
`;

export const StyledFormControlShort = styled(Form.Control)`
  position: relative;
  width: 80%;
  left: 10%;
  text-align-last: center;
  text-align: center;
  background-color: #424242;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #30d158;
  border-radius: 0em !important;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledDeleteButtonDiv = styled.div`
  position: relative;
  right: 0px;
  width: 100%;
  margin-top: 0.5em;
  outline: none;
`;

export const StyledDeleteButton = styled(Button)`
  margin-top: 0.2em;
  position: relative;
  width: 100%;
  border-radius: 0;
  height: auto;
  border: none !important;
  outline: none;
  background-color: #ff373b !important;

  &:hover {
    background-color: #ff262b !important;
  }
`;

/*
 Modals
 */

export const StyledModalContent = styled(Modal)`
  color: rgba(255, 255, 255, 0.87) !important;
`;

export const StyledModalBody = styled(Modal.Body)`
  border-bottom: none;
  background-color: #1b1b1b !important;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledModalHeader = styled(Modal.Header)`
  background-color: #424242 !important;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledConfirmModalButton = styled(Button)`
  background-color: #ff373b !important;
  border: none !important;
  outline: none;
  height: "auto";

  &:hover {
    background-color: #ff262b !important;
  }
`;

export const StyledModalFooter = styled(Modal.Footer)`
  border-top: none;
  background-color: #1b1b1b !important;
  border-radius: 0;
`;

export const StyledAddForm = styled.div`
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  position: fixed;
  width: 20em;
  height: auto;
  left: 0;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

export const StyledAddInputForm = styled(Form.Group)`
  width: 80%;
  left: 50%;
  transform: translate(-50%, 0%);
  position: relative;
  color: rgba(255, 255, 255, 0.87);
  margin-top: 2em;
`;

export const StyledOption = styled.option`
  background-color: rgba(255, 255, 255, 0.87);
  color: #424242;
`;

export const StyledOptionButton = styled(Button)`
  color: #ffffff;
  width: 80%;
  margin-top: 0.5em;
  border: none !important;
  outline: none;
  background-color: #424242 !important;
  font-family: "Roboto", sans-serif;
  font-weight: 400;

  &:hover {
    background-color: #30d158 !important;
  }
`;

export const StyledAddButton = styled(Button)`
  position: fixed;
  bottom: 5%;
  right: 2%;
  margin-left: 2px;
  height: 4em;
  width: 4em;
  border: none;
  color: #ffffff !important;
  border-radius: 50%;
  background-color: #30d158 !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);

  z-index: 10;

  &:hover {
    background-color: #29b64c !important;
  }
`;

export const StyledGenerateButton = styled(Button)`
  width: 100%;
  border: none !important;
  border-radius: 0;
  position: relative;
  margin-top: 2em;
  outline: none;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  background-color: #30d158 !important;

  &:hover {
    background-color: #29b64c !important;
  }
`;

export const StyledMenu = styled.div`
  width: 20em;
  z-index: 2;
  position: fixed;
  background-color: #424242;
  left: 0;
  right: 0;
  top: 20%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`;

export const StyledButtonContainer = styled.div`
  position: relative;
  height: 100%;
`;
