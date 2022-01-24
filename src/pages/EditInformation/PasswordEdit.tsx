import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

interface Formvalues {
  password: string;
  newPassword: string;
  newPasswordCheck: string;
}

const PasswordEdit = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm<Formvalues>();
  const [passwordError, setPasswordError] = useState("");
  const token = localStorage.getItem("token");

  const passwordSubmit: SubmitHandler<Formvalues> = async (data) => {
    try {
      const config: any = {
        headers: {},
      };
      if (token) {
        config.headers["authorization"] = token;
      }
      const { password, newPassword, newPasswordCheck } = data;
      const result = await axios.patch("user/info/password", data, config);
      console.log("test123", data);
    } catch (error: any) {
      console.log("err", error.response);
      setPasswordError(error.response?.data?.message);
    }
  };
  return (
    <>
      <PasswordForm onSubmit={handleSubmit(passwordSubmit)}>
        <h1>비밀번호 수정</h1>
        <InputDiv>
          <Label>현재 비밀번호</Label>
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
          <Label>새 비밀번호</Label>
          <Input
            type="password"
            {...register("newPassword", {
              required: "필수 응답 항목입니다.",
              minLength: {
                value: 7,
                message: "비밀번호는 7자 이상이여야 합니다,",
              },
            })}
          />
          {errors.newPassword && <Error>{errors.newPassword.message}</Error>}
        </InputDiv>
        <InputDiv>
          <Label>새 비밀번호 확인</Label>
          <Input
            type="password"
            {...register("newPasswordCheck", {
              required: "필수 응답 항목입니다.",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { newPassword } = getValues();
                  return newPassword === value || "비밀번호가 맞지않습니다.";
                },
              },
            })}
          />
          {errors.newPasswordCheck && (
            <Error>{errors.newPasswordCheck.message}</Error>
          )}
        </InputDiv>
        <Button>비밀번호 변경하기</Button>
      </PasswordForm>
    </>
  );
};
const PasswordForm = styled.form``;
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

const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: red;
  border: 1px solid red;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  font-size: 12px;
  margin-top: 6px;
  color: red;
`;
export default PasswordEdit;
