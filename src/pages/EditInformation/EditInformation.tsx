import React from "react";
import styled from "styled-components";
import ProfileEdit from "./ProfileEdit";
import PasswordEdit from "./PasswordEdit";

const EditInformation = () => {
  return (
    <Container>
      <InformationContaniner>
        <h1>회원정보 수정</h1>
        <InformationDiv>
          <ProfileEdit />
          <PasswordEdit />
        </InformationDiv>
        <MemberSecession>
          <h2 className="secessionText">회원 탈퇴</h2>
          <p>탈퇴 시 회원정보가 삭제되며 복구되지 않습니다.</p>
          <button>탈퇴하기</button>
        </MemberSecession>
      </InformationContaniner>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
`;

const InformationContaniner = styled.div`
  margin: 0 auto;
  max-width: 400px;
  h1 {
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 15px;
  }
`;

const InformationDiv = styled.div`
  ${({ theme }) => theme.media.mobile`
  margin:0px 15px;
  `}
`;
const MemberSecession = styled.div`
  margin: 30px 0px;
  border-top: 2px solid black;
  text-align: center;
  ${({ theme }) => theme.media.mobile`
    width: 91%;
    margin: 30px auto;
  `}
  .secessionText {
    margin-top: 30px;
    font-size: 23px;
    font-weight: bold;
  }
  p {
    margin: 10px 0px;
    font-size: 14px;

    ${({ theme }) => theme.media.mobile`
    font-size: 12px;
  `}
  }
  button {
    width: 100px;
    height: 30px;
    color: white;
    background-color: red;
    border: 1px solid red;
    cursor: pointer;
  }
`;
export default EditInformation;
