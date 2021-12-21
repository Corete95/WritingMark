import React from "react";
import styled from "styled-components";
import useInput from "hooks/useInput";

const FindPassword = () => {
  const [email, onChangeEmail] = useInput("");

  return (
    <Container>
      <FindPasswordContainer>
        <h1>비밀번호 찾기</h1>
        <FindPasswordForm>
          <InputDiv>
            <Label>이메일</Label>
            <Input type="email" value={email} onChange={onChangeEmail} />
          </InputDiv>
          <ButtonDiv>
            <Button type="submit">비밀번호 찾기</Button>
          </ButtonDiv>
        </FindPasswordForm>
      </FindPasswordContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
`;

const FindPasswordContainer = styled.div`
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
const FindPasswordForm = styled.form`
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

const ButtonDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  max-width: 190px;
  font-size: 14px;
  color: white;
  background: red;
  border: 1px solid red;
  cursor: pointer;
`;

export default FindPassword;
