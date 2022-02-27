import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <ErrorContainer>
      <div className="goHome">
        <Link to="/">목록 돌아가기</Link>
      </div>
      <img src="/images/page_not_found.png" />
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 100px;
  text-align: center;

  .goHome {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    a {
      background-color: black;
      text-align: center;
      height: 32px;
      width: 150px;
      border-radius: 24px 24px;
      color: white;
      padding-top: 9px;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

export default PageNotFound;
