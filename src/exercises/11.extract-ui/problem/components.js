import styled from "styled-components";

export const GameArea = styled.div`
  height: 220px;
  width: 120px;
  border: "1px solid black";
`;

export const Box = styled.div`
  width: 50px;
  height: 100px;
  background-color: ${(props) => props.color};
  text-align: center;
  opacity: ${(props) => (props.isActive ? "30%" : "100%")};
  display: inline-block;
  border: 3px solid ${(props) => (props.isActive ? 'black' : props.color)};
`;
