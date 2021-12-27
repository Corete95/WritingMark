import Loading from "components/Loading";
import useInput from "hooks/useInput";
import React, { FC, useCallback, useRef, useState } from "react";
import styled from "styled-components";

const EditInformation: FC = () => {
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("/images/profile.png");
  const ImgInput = useRef<HTMLInputElement>(null);
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);

  const imageHandler = (e: any) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    setImgFile(imageFile);
    const fileReader = new FileReader();
    if (imageFile) {
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = (e: any) => setImgSrc(e.target.result);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      return setLoading(false);
    }
  };
  const imageUploadBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (ImgInput.current) ImgInput.current.click();
  };

  const imageDeleteBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setImgSrc("/images/profile.png");
  };

  const onChangeNewPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
      setNewPasswordError(e.target.value !== newPasswordCheck);
    },
    [newPasswordCheck],
  );

  const onChangeNewPasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPasswordCheck(e.target.value);
      setNewPasswordError(e.target.value !== newPassword);
    },
    [newPassword],
  );
  console.log("email:", email);
  console.log("nickname:", nickname);
  console.log("password:", password);
  console.log("Newpassword:", newPassword);
  console.log("NewpasswordCheck:", newPasswordCheck);
  return (
    <Container>
      <InformationContaniner>
        <h1>회원정보 수정</h1>
        <InformationForm>
          <ImgUpload>
            {loading ? <Loading /> : <img src={imgSrc} />}
            <UploadButton>
              <input
                type="file"
                accept="image/*"
                ref={ImgInput}
                onChange={imageHandler}
              />
              <button onClick={imageUploadBtn}>이미지 업로드</button>
              <button onClick={imageDeleteBtn}>이미지 삭제</button>
            </UploadButton>
          </ImgUpload>
          <InputUpload>
            <InputDiv>
              <Label>이메일</Label>
              <Input type="email" value={email} onChange={onChangeEmail} />
            </InputDiv>
            <InputDiv>
              <Label>닉네임</Label>
              <Input type="text" value={nickname} onChange={onChangeNickname} />
            </InputDiv>
            <InputDiv>
              <Label>현재 비밀번호</Label>
              <Input
                type="password"
                placeholder="비밀번호를 변경 하는 경우 입력하세요."
                value={password}
                onChange={onChangePassword}
              />
            </InputDiv>
            <InputDiv>
              <Label>새 비밀번호</Label>
              <Input
                type="password"
                placeholder="새로운 비밀번호를 입력하세요."
                value={newPassword}
                onChange={onChangeNewPassword}
              />
            </InputDiv>
            <InputDiv>
              <Label>새 비밀번호 확인</Label>
              <Input
                type="password"
                placeholder="새로운 비밀번호 확인을 입력하세요."
                value={newPasswordCheck}
                onChange={onChangeNewPasswordCheck}
              />
              {newPasswordError && <Error>비밀번호가 일치하지 않습니다.</Error>}
            </InputDiv>
            <Button>변경하기</Button>
          </InputUpload>
        </InformationForm>
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
    margin-bottom: 40px;
  }
`;

const InformationForm = styled.form``;
const ImgUpload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    background-color: gray;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 30px;
  }
`;
const UploadButton = styled.div`
  display: flex;
  flex-direction: column;
  input {
    display: none;
  }
  button {
    color: black;
    background-color: red;
    border: 1px solid red;
    width: 130px;
    height: 32px;
    margin-bottom: 15px;
  }
`;

const InputUpload = styled.div`
  margin-top: 40px;

  ${({ theme }) => theme.media.mobile`
  margin:40px 15px 0px 15px;
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
const Button = styled.button`
  width: 100%;
  height: 30px;
  background-color: red;
  border: 1px solid red;
  color: white;
`;
const Error = styled.span`
  font-size: 12px;
  margin-top: 15px;
  color: red;
`;
export default EditInformation;
