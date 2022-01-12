import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BookMark from "./BookMark";
import { API } from "Config";

interface Props {
  color: string;
  background: string;
  border: string;
}

const MyPage = () => {
  const [test, setTest] = useState();

  useEffect(() => {
    axios
      .get(`${API}/user/info`)
      .then((res: any) => {
        setTest(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <h1>회원 정보</h1>
      <MyPageContainer>
        <ProfileImg>
          <div>
            <img src="5.png" />
          </div>
        </ProfileImg>
        <ProfileInformation>
          <span>김정현님 </span>
          <br />
          <span>반갑습니다</span>
          <EditBtn>
            <Link to="EditInformation">
              <Button color="white" background="red" border="red">
                회원정보 수정
              </Button>
            </Link>
            <Button color="black" background="yellow" border="yellow">
              로그아웃
            </Button>
          </EditBtn>
        </ProfileInformation>
      </MyPageContainer>
      <BookMark />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;

  ${({ theme }) => theme.media.mobile`
    margin:0px 16px;
  `}
  h1 {
    font-weight: bold;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 60px;
  }
`;

const MyPageContainer = styled.div`
  display: flex;
  margin: 0px 30px;

  ${({ theme }) => theme.media.mobile`
    margin:0px 0px;
  `}
`;
const ProfileImg = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  /* width: 130px;
  min-width: 130px;
  height: 130px;
  border-radius: 70%;
  overflow: hidden;
  margin-right: 60px; */
  ${({ theme }) => theme.media.mobile`
  margin-right: 15px;
  `}
  div {
    width: 130px;
    min-width: 130px;
    height: 130px;
    border-radius: 70%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ProfileInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin: auto 0;
  ${({ theme }) => theme.media.mobile`
   text-align:center;
  `}
  span {
    font-size: 25px;
    font-weight: bold;
    line-height: 14px;
    ${({ theme }) => theme.media.mobile`
   font-size: 21px;
   line-height: 10px;
  `}
  }
`;
const EditBtn = styled.div`
  margin-top: 40px;

  ${({ theme }) => theme.media.mobile`
   text-align: center;
   margin: 20px 20px 0px 20px;
  `}
`;
const Button = styled.button<Props>`
  width: 110px;
  height: 35px;
  margin-right: 10px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.border};
  cursor: pointer;
  ${({ theme }) => theme.media.mobile`
  margin-bottom:10px;
  `}
`;
export default MyPage;
