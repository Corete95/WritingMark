import useInput from 'hooks/useInput';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const Register = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!passwordError && email && password) {
        alert('회원가입 가능');
      }
    },
    [email, nickname, password, passwordCheck, passwordError],
  );
  console.log(email, nickname, password, passwordCheck);
  console.log(passwordError);
  return (
    <Container>
      <RegisterContainer>
        <h1>회원가입</h1>
        <LoginForm onSubmit={onSubmit}>
          <InputDiv>
            <Label>닉네임</Label>
            <Input
              type="text"
              placeholder="미 입력시 랜덤 생성 합니다."
              value={nickname}
              onChange={onChangeNickname}
            />
          </InputDiv>
          <InputDiv>
            <Label>이메일</Label>
            <Input type="email" value={email} onChange={onChangeEmail} />
          </InputDiv>
          <InputDiv>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="6자 이상 입력해주세요."
              value={password}
              onChange={onChangePassword}
            />
          </InputDiv>
          <InputDiv>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
            {passwordError && passwordCheck.length > 6 && (
              <Error>비밀번호가 일치하지 않습니다.</Error>
            )}
          </InputDiv>
          <ButtonDiv>
            <Button type="submit">가입하기</Button>
          </ButtonDiv>
        </LoginForm>
      </RegisterContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
`;

const RegisterContainer = styled.div`
  margin: 0 auto;
  max-width: 400px;
  h1 {
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
const ButtonDiv = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const Button = styled.button`
  display: inline-block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  max-width: 150px;
  font-size: 14px;
  color: white;
  background: red;
  border: 1px solid red;
  cursor: pointer;
`;
const Error = styled.span`
  font-size: 12px;
  margin-top: 15px;
  color: red;
`;
export default Register;
