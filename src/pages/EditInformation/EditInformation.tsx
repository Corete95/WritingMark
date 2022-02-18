import React from "react";
import styled from "styled-components";
import ProfileEdit from "./ProfileEdit";
import PasswordEdit from "./PasswordEdit";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const EditInformation = () => {
  const { user } = useSelector((state: any) => state.user);
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const token = localStorage.getItem("token");
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  const secession = () => {
    MySwal.fire({
      confirmButtonColor: "black",
      title: "비밀번호를 입력해주세요",
      input: "password",
      showCancelButton: true,
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post("/user/withdrawal", { password: result.value }, config)
          .then((res) => {
            MySwal.fire({
              confirmButtonColor: "black",
              title: "탈퇴 완료",
              confirmButtonText: "확인",
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("token");
                if (window.Kakao.Auth.getAccessToken()) {
                  console.log("카카오 인증 엑세스 토큰 존재");
                  window.Kakao.Auth.logout(() => {
                    console.log("카카오 로그아웃 완료");
                  });
                }
                setTimeout(() => {
                  history.push("/");
                  window.location.reload();
                }, 500);
              }
            });
          })
          .catch((err: any) => {
            console.log(err.response);
            MySwal.fire({
              confirmButtonColor: "black",
              title: `${err.response.data.message}`,
              confirmButtonText: "확인",
            });
          });
      }
    });
  };
  if (!user?._id) {
    return <Redirect to="/" />;
  }

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
          <button onClick={secession}>탈퇴하기</button>
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
    background-color: black;
    border: 1px solid black;
    border-radius: 24px 24px;
    cursor: pointer;
  }
`;
export default EditInformation;
