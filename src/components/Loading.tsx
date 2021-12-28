import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <Loader
        type="Oval"
        color="#3d66ba"
        height={50}
        width={50}
        timeout={1000}
      />
    </LoadingContainer>
  );
};
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 30px;
`;
export default Loading;
