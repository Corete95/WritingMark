import Loading from "components/Loading";
import useInput from "hooks/useInput";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { USER_INFO_EDIT_REQUEST } from "redux/userTypes";
import axios, { AxiosResponse } from "axios";

const EditInformation = () => {
  const dispatch = useDispatch();
  const { test, user } = useSelector((state: any) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const ImgInput = useRef<HTMLInputElement>(null);
  const [email, onChangeEmail, setEmail] = useInput("");
  const [nickname, onChangeNickname, setNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   dispatch({
  //     type: USER_INFO_EDIT_REQUEST,
  //     payload: token,
  //   });
  //   setEmail(user.email);
  // }, [dispatch]);

  useEffect(() => {
    const config: any = {
      headers: {},
    };
    if (token) {
      config.headers["authorization"] = token;
    }
    axios.get("user/info/edit", config).then((res) => {
      setEmail(res.data.userinfo.email);
      setNickname(res.data.userinfo.nickname);
      setImgSrc(
        "https://writingmark.s3.ap-northeast-2.amazonaws.com/user/" +
          res.data.userinfo.profileImage,
      );
    });
  }, []);
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
  // console.log("email:", email);
  // console.log("nickname:", nickname);
  // console.log("password:", password);
  // console.log("Newpassword:", newPassword);
  // console.log("NewpasswordCheck:", newPasswordCheck);
  // console.log("img:", imgSrc);

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
              <Input
                type="text"
                value={nickname || ""}
                onChange={onChangeNickname}
              />
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
              {newPasswordError && newPasswordCheck.length > 6 && (
                <Error>비밀번호가 일치하지 않습니다.</Error>
              )}
            </InputDiv>
            <Button>변경하기</Button>
          </InputUpload>
        </InformationForm>
        <MemberSecession>
          <h2 className="secessionText">회원 탈퇴</h2>
          <p>탈퇴 시 작성한 글 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
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
    cursor: pointer;
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
