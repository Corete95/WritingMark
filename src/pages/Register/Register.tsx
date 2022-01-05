import React from "react";
import styled from "styled-components";
import SocialKakao from "components/Kakao/SocialKakao";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { API } from "Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";

interface Formvalues {
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
}
const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm<Formvalues>();
  const history = useHistory();

  const onSubmit: SubmitHandler<Formvalues> = (data) => {
    const { nickname, email, password } = data;
    axios
      .post(`${API}/user/register`, { email, nickname, password })
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("회원가입을 축하드려요!", {
            position: "bottom-center",
            autoClose: 1500,
          });
          setTimeout(() => {
            history.push("/login");
          }, 1500);
        } else {
          toast.error(res.data.message, {
            position: "bottom-center",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message, {
          position: "bottom-center",
        });
        console.log(
          "회원가입 통신이 원활하지 않습니다.",
          err.response?.data?.message,
        );
      });
  };

  //console.log(watch());
  return (
    <Container>
      <RegisterContainer>
        <h1>회원가입</h1>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <InputDiv>
            <Label>닉네임</Label>
            <Input
              type="text"
              {...register("nickname")}
              placeholder="미 입력시 랜덤 생성 됩니다."
            />
          </InputDiv>
          <InputDiv>
            <Label>이메일</Label>
            <Input
              {...register("email", {
                required: "필수 응답 항목입니다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
            />
            {errors.email && <Error>{errors.email.message}</Error>}
          </InputDiv>
          <InputDiv>
            <Label>비밀번호</Label>
            <Input
              type="password"
              {...register("password", {
                required: "필수 응답 항목입니다.",
                minLength: {
                  value: 7,
                  message: "비밀번호는 7자 이상이여야 합니다,",
                },
              })}
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </InputDiv>
          <InputDiv>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              {...register("passwordCheck", {
                required: "필수 응답 항목입니다.",
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "비밀번호가 맞지않습니다.";
                  },
                },
              })}
            />
            {errors.passwordCheck && (
              <Error>{errors.passwordCheck.message}</Error>
            )}
          </InputDiv>
          <ButtonDiv>
            <Button type="submit">가입하기</Button>
          </ButtonDiv>
          <ButtonDiv>
            <SocialKakao />
          </ButtonDiv>
        </RegisterForm>
      </RegisterContainer>
      <ToastContainer />
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
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 40px;
  }
`;
const RegisterForm = styled.form`
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
const Error = styled.span`
  font-size: 12px;
  margin-top: 7px;
  color: red;
`;
export default Register;
