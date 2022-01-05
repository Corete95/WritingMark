import useInput from "hooks/useInput";
import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import SocialKakao from "components/Kakao/SocialKakao";
import axios, { AxiosResponse } from "axios";
import { API } from "Config";
import { toast, ToastContainer } from "react-toastify";

interface Props {
  color: string;
  background: string;
  border: string;
}

interface LoginProps {
  status: string;
  token: string;
}
const Login = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const history = useHistory();

  const loginHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      axios
        .post<LoginProps>(`${API}/user/login`, { email, password })
        .then((res) => {
          console.log(res);
          if (res.data.status === "success")
            localStorage.setItem("token", res.data.token);
          alert("로그인 성공!");
          history.push("/");
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data.message);
        });
    },
    [email, password],
  );

  return (
    <Container>
      <LoginContainer>
        <h1>로그인</h1>
        <LoginForm onSubmit={loginHandler}>
          <InputDiv>
            <Label>이메일</Label>
            <Input type="email" value={email} onChange={onChangeEmail}></Input>
          </InputDiv>
          <InputDiv>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={onChangePassword}
            ></Input>
          </InputDiv>
          <SaveBtnDiv>
            <div>
              <input type="checkbox" id="check" />
              <label htmlFor="check">로그인 유지</label>
            </div>
            <Link to="/FindPassword">비밀번호 찾기</Link>
          </SaveBtnDiv>
          <ButtonDiv>
            <Button type="submit" color="white" background="red" border="red">
              로그인하기
            </Button>
          </ButtonDiv>
          <ButtonDiv>
            <ButtonLink
              to="/register"
              color="red"
              background="white"
              border="red"
            >
              회원가입 하기
            </ButtonLink>
          </ButtonDiv>
          <ButtonDiv>
            <SocialKakao />
          </ButtonDiv>
        </LoginForm>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
`;

const LoginContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  h1 {
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 40px;
  }
`;

const LoginForm = styled.form`
  ${({ theme }) => theme.media.mobile`
    margin:0px 16px;
    margin-bottom: 20px;
  `}
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;
const Input = styled.input`
  font-size: 14px;
  line-height: 23px;
  width: 100%;
  height: 45px;
  border: 1px solid #ddd;
  padding: 10px 15px;
`;
const SaveBtnDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-size: 14px;
  margin-bottom: 50px;

  a:link {
    color: black;
  }
  a:visited {
    color: black;
  }
  a:hover {
    color: black;
  }
`;

const ButtonDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button<Props>`
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  max-width: 190px;
  font-size: 14px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.border};
  cursor: pointer;
`;

const ButtonLink = styled(Link)<Props>`
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  max-width: 190px;
  font-size: 14px;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  border: 1px solid ${(props) => props.border};
  cursor: pointer;
`;
export default Login;
