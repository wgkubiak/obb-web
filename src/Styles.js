import styled, { createGlobalStyle, css } from "styled-components";
import {
  Button,
  Card,
  Form,
  Jumbotron,
  ListGroup,
  Modal,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { MdDns, MdWeb, MdEqualizer, MdEdit, MdAdd } from "react-icons/md";
import {
  RiFileAddLine,
  RiEditBoxLine,
  RiFolderDownloadLine,
  RiDeleteBin2Line,
} from "react-icons/ri";
import { GiWaterDrop } from "react-icons/gi";
import { FaShoppingCart, FaRegSadTear, FaRegSmileBeam } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { FiEdit3 } from "react-icons/fi";

/*
NAVBARS
 */

export const StyledExamAddIcon = styled(RiFileAddLine)`
  width: auto !important;
  height: auto !important;
  color: rgba(255, 255, 255, 0.87) !important;
`;

export const StyledExamEditIcon = styled(RiEditBoxLine)`
  width: auto !important;
  height: auto !important;
  color: rgba(255, 255, 255, 0.87) !important;
`;

export const StyledExamDeleteIcon = styled(RiDeleteBin2Line)`
  width: auto !important;
  height: auto !important;
  color: rgba(255, 255, 255, 0.87) !important;
`;

export const StyledExamDownloadIcon = styled(RiFolderDownloadLine)`
  width: auto !important;
  height: auto !important;
  color: rgba(255, 255, 255, 0.87) !important;
`;

export const StyledGlobal = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  };
  body {
    background-color: #1b1b1b;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  };
  a {
    text-decoration: none !important;
    border-bottom: 1px solid rgba(71, 71, 71, 0.24);
  };
  .chart--temperature {
    order: 1
  };
  .chart--wetness {
    order: 2
  };
  .chart--nhthree {
    order: 3
  };
  .chart--htwos {
    order: 4
  };
  .chart--cotwo {
    order: 5
  };
  .chart--forageqty {
    background-color: #424242;
    border-radius: .3em;
    width: 49%;
    margin-top: 1em !important;
    margin-left: 1%;
  };
  .chartjs-render-monitor {
    margin-top: 0
  };
  .chart--temperature, .chart--wetness, .chart--nhthree, .chart--htwos, .chart--cotwo {
    width: 40em;
    height: auto;
    margin-top: 2em !important;
    margin-left: 1em;
    margin-right: 1em;
    margin: 0 auto;
    background-color: #424242;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: .3em;
  };
  .list-header {
    text-align: left;
    padding-left: 0.5em;
  };
  .list-group-item {
    background-color: #424242;
  };
  .list-group-item:hover {
    background-color: #1b1b1b !important;
    color: rgba(255, 255, 255, 0.87) !important;
  };
  strong {
    color: rgba(255, 255, 255, 0.87) !important
  };
  .table-dark th, .table-dark thead th {
    width: 12.5%
  }
`;

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
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  outline: none;
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

export const StyledMenuIcon = styled(FiEdit3)`
  width: 2em;
  height: 2em;
  margin-top: 1em;
  color: rgba(255, 255, 255, 0.87) !important;
  margin-bottom: 1em;
`;

export const StyledSadIcon = styled(FaRegSadTear)`
  padding-top: 2em;
  width: 5em;
  height: 5em;
  color: #30d158;
`;

export const StyledHappyIcon = styled(FaRegSmileBeam)`
  padding-top: 2em;
  width: 5em;
  height: 5em;
  color: #30d158;
`;

export const StyledJumbotron = styled(Jumbotron)`
  position: relative;
  background-color: #424242;
  margin-top: 1em;
  height: auto;
  width: 49%;
  margin-right: 1%;
  border-radius: 0.3em;
  padding: 1em;
  margin-bottom: 0em;
`;

export const StyledJumbotronWhite = styled(Jumbotron)`
  position: relative;
  background-color: #1b1b1b;
  margin-top: 1em;
  height: auto;
  width: 49%;
  margin-right: 0%;
  padding: 1em;
  margin-bottom: 0em;
  margin-left: 1em;
`;

export const StyledJumbotronHeader = styled.h3`
  margin-top: 1em;
  margin-bottom: 2em;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
`;

export const StyledJumbotronParagraphs = styled.p`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  width: auto;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
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
  width: 100% !important;
  background-color: transparent !important;
  padding: 1em;
`;

export const StyledTableRow = styled.tr`
  background-color: #424242;

  &:hover {
    background-color: #1b1b1b !important;
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

export const StyledErrorFigcaption = styled.figcaption`
  color: #ff373b
`;

export const StyledFormControl = styled(Form.Control)`
  width: 80%;
  text-align-last: center;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
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

  & > input {
    text-align: center !important;
  }
`;

export const StyledSearch = styled.input`
  background-color: #424242;
  margin-top: 1em;
  position: absolute;
  right: 0em;
  border: none;
  border-bottom: 1px solid #30d158;
  color: rgba(255, 255, 255, 0.87);
  text-align: right;
  padding-right: 0.5em;
`;

export const StyledFormLabel = styled(Form.Label)`
  color: rgba(255, 255, 255, 0.87);
  font-family: "Roboto", sans-serif;
  display: block;
  font-weight: 500;
`;

export const StyledSelect = styled(Form.Control)`
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
  padding-top: 1em;
  width: 20em;
  height: auto;
  z-index: 2;
  position: fixed;
  background-color: #424242;
  color: rgba(255, 255, 255, 0.87);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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

export const StyledJumbotronGenerateHeader = styled.h3`
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  padding-bottom: 1em;
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
  position: absolute;
  width: 100%;
  border: none !important;
  bottom: 0;
  left: 0;
  border-radius: 0;
  position: relative;
  margin-top: 2em;
  outline: none;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  background-color: #1b1b1b !important;

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

export const StyledSoldDeadPriceInput = styled(Form.Group)`
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  position: relative;
  margin-top: 1em;
`;

export const StyledExam = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 20;
`;

export const StyledExamTransparent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #212121a9;
  z-index: 25;
`;

export const StyledExamContainer = styled.div`
  position: absolute;
  background-color: #1b1b1b;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 100vh;
  z-index: 30;
  overflow: scroll;

  & > h1 {
    margin-top: 2vh;
    color: rgba(255, 255, 255, 0.87);
  }

  & > button {
    position: absolute;
    right: 0;
    top: 0;
    width: 5%;
    height: 3em !important;
    color: #ffffff;
    background-color: #1b1b1b !important;
    border: none;
    outline: none;

    &:hover {
      background-color: #1b1b1b !important;
    }
  }

  & > .buttons-container {
    position: absolute;
    left: 0;
    top: 0;
    width: auto;
    height: auto;
    color: #ffffff;
    background-color: #1b1b1b !important;
    border: none;
    outline: none;

    &:hover {
      background-color: #1b1b1b !important;
    }

    & > .buttons-button {
      height: auto;
      width: auto;
      padding: 0 !auto;
      background-color: #1b1b1b !important;
      border: 1px solid #1b1b1b !important;

      &:hover {
        background-color: #1b1b1b !important;
      }
    }
  }
`;

export const StyledExamContainerCards = styled.div`
  position: relative;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StyledContainerCardsData = styled(Card)`
  text-align: left;
  align-self: auto;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.6);
  background-color: #424242;
  transition: 100ms;
  width: 14vw;
  height: 16vh;
`;

export const StyledTableTD = styled.td`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6) !important;
  border: none !important;
  border-bottom: 1px solid #6d6d6d !important;
`;

export const StyledTableTH = styled.th`
font-family: 'Roboto', sans-serif;
  font-weight: 500;
  background-color: #424242 !important;
  color: rgba(255, 255, 255, 0.87); !important;
  border: none !important;
  &:hover {
    background-color: #000000;
  }
`;

export const StyledTableTR = styled.tr`
  width: 100% !important;
  border: none !important;
  border-bottom: 3px solid #6d6d6d !important;
  &:hover {
    background-color: #1b1b1b !important;
  }
`;

export const StyledEditButtonsContainer = styled.div`
  position: relative;
`;

export const StyledCardTitle = styled(Card.Title)`
  color: rgba(255, 255, 255, 1);
  font-size: 1em;
`;

export const StyledCardText = styled(Card.Text)`
  font-size: 0.8em;
  color: rgba(255, 255, 255, 1);
`;

export const StyledChartContainer = styled.div`
  position: relative;
  width: 100% !important;
  height: auto;
  display: flex;
  margin-bottom: 2em;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const StyledDeleteInfo = styled.h4`
  color: rgb(230, 59, 59);
`;

export const StyledNoDataHeader = styled.h3`
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledHeaderH2 = styled.h2`
  font-weight: 400;
  margin-top: 1em;
  color: rgba(255, 255, 255, 0.87);
`;

export const StyledHeaderH4 = styled.h4`
  font-weight: 300;
  margin-top: 1em;
  margin-bottom: 1em;
  color: rgba(255, 255, 255, 0.6);
`;

export const StyledEditInput = styled(Form.Group)`
  width: 100%;
  left: 50%;
  transform: translate(-50%, 0%);
  position: relative;

  margin-top: 1em;
`;

export const StyledEditExamInput = styled(Form.Group)`
  width: calc(25% - 2em);
  left: 50%;
  margin: 1em;
`;

export const StyledDeleteButtonMain = styled(Button)`
  background-color: #30d158;
  height: auto;
`;

export const StyledSpinnerButton = styled(Button)`
  margin-top: 1em;
  background-color: #30d158 !important;
  border: none;
  top: 10%;
  position: relative;
`;

export const StyledUnitSpinnerButton = styled(Button)`
  margin-top: 1em;
  background-color: #30d158 !important;
  border: none;
  width: 49%;
  margin-left: 1%;
  position: relative;
`;

export const StyledJumbotronMainContainer = styled.div`
  width: 100%;
  position: relative;
  height: auto;
  display: flex;
  flex-direction: row;
  align-content: right;
`;

export const StyledJumbotronAltContainer = styled.div`
  width: auto;
  position: absolute;
  right: 0;
`;
