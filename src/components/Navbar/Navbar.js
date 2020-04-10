import React from "react";
import { ListGroup } from "react-bootstrap";
import { MdDns, MdWeb, MdEqualizer } from "react-icons/md";
import { GiWaterDrop } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";

import styled from "styled-components";

const StyledFigure = styled.figure`
  margin: 0 0 0.1rem !important;
`;

const StyledHeader = styled.header`
  width: auto;
  height: 100%;
  position: fixed;
  background-color: #546e7a;
  color: #000000;
  box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.25), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  font-family: "Ubuntu", sans-serif;
`;

const StyledListGroup = styled(ListGroup)`
  top: 10%;
  position: relative;
  width: auto;
`;

const StyledListGroupItem = styled(ListGroup.Item)`
  justify-content: left;
  display: flex;
  flex-direction: column;
  outline: 0;
`;

const Navbar = (props) => {
  return (
    <StyledHeader>
      <StyledListGroup
        variant="flush"
        defaultActiveKey="#obb-groups"
      >
        <StyledListGroupItem
          action
          href="#obb-groups"
          variant="dark"
          onClick={props.unitsHandler}
        >
          <StyledFigure>
            <MdDns size={24} />
          </StyledFigure>
          <figcaption>Kojce</figcaption>
        </StyledListGroupItem>
        <StyledListGroupItem
          action
          href="#obb-global"
          variant="dark"
          onClick={props.globalHandler}
        >
          <StyledFigure>
            <MdEqualizer size={24} />
          </StyledFigure>
          <figcaption>Globalne</figcaption>
        </StyledListGroupItem>
        <StyledListGroupItem
          action
          href="#obb-forage"
          variant="dark"
          onClick={props.forageHandler}
        >
          <StyledFigure>
            <MdWeb size={24} />
          </StyledFigure>
          <figcaption>Paśnik</figcaption>
        </StyledListGroupItem>
        <StyledListGroupItem
          action
          href="#obb-water"
          variant="dark"
          onClick={props.waterHandler}
        >
          <StyledFigure>
            <GiWaterDrop size={24} />
          </StyledFigure>
          <figcaption>Woda</figcaption>
        </StyledListGroupItem>

        <StyledListGroupItem
          action
          href="#obb-sold"
          variant="dark"
          onClick={props.soldHandler}
        >
          <StyledFigure>
            <FaShoppingCart size={24} />
          </StyledFigure>
          <figcaption>Sprzedaż</figcaption>
        </StyledListGroupItem>
        <StyledListGroupItem
          action
          href="#obb-death"
          variant="dark"
          onClick={props.deadHandler}
        >
          <StyledFigure>
            <TiUserDelete size={24} />
          </StyledFigure>
          <figcaption>Zgon</figcaption>
        </StyledListGroupItem>
      </StyledListGroup>
    </StyledHeader>
  );
};

export default Navbar;
