import styled from "styled-components";

export const GameArea = styled.div`
  height: 200px;
  width: 100px;
  border: "1px solid black";
`;

export const Box = styled.div`
  width: 50%;
  height: 50%;
  background-color: ${(props) => props.color};
  text-align: center;
  opacity: ${(props) => (props.isActive ? "50%" : "100%")};
  display: inline-block;
`;