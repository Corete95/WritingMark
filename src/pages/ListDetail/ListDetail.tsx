import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ListDetail = () => {
  const id = useParams<any>();
  console.log(id);
  return <Container>ListDetail aa{id.id}aa</Container>;
};
const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
  ${({ theme }) => theme.media.mobile`
  margin:0px 16px;
  `}
`;

export default ListDetail;
