import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Category = () => {
  const test = useParams<Record<string, string | undefined>>();
  return (
    <Container>
      <Link to="/Writing">{test.path}</Link>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
`;
export default Category;
