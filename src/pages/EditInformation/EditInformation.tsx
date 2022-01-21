import Loading from "components/Loading";
import useInput from "hooks/useInput";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { USER_INFO_EDIT_REQUEST } from "redux/userTypes";
import axios, { AxiosResponse } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { profile } from "console";
import { API } from "Config";

interface Formvalues {
  profile: string;
  nickname: any;
  email: any;
  password: string;
  passwordCheck: string;
}

const EditInformation = () => {
  const dispatch = useDispatch();
  const { test, user } = useSelector((state: any) => state.user);
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [profileImg, setProfileImg] = useState("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const ImgInput = useRef<HTMLInputElement>(null);
  // const [email, onChangeEmail, setEmail] = useInput("");
  // const [nickname, onChangeNickname, setNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [profileError, setProfileError] = useState("");
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm<Formvalues>();
  const config: any = {
    headers: {},
  };
  if (token) {
    config.headers["authorization"] = token;
  }

  useEffect(() => {
    const profileEdit = async () => {
      try {
        const result = await axios.get("user/info/edit", config);
        setImgSrc(
          "https://writingmark.s3.ap-northeast-2.amazonaws.com/user/" +
            result.data.userinfo.profileImage,
        );
        setProfileImg(result.data.userinfo.profileImage);
        setTimeout(() => {
          reset({
            email: result.data.userinfo.email,
            nickname: result.data.userinfo.nickname,
          });
        }, 0);
      } catch (error: any) {
        console.log(error);
      }
    };
    profileEdit();
  }, []);
  const imageHandler = (e: any) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    setProfileImg(imageFile);
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
    setImgSrc(
      "https://writingmark.s3.ap-northeast-2.amazonaws.com/user/basicProfileImage.png",
    );
    setProfileImg("basicProfileImage.png");
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
  const profileSubmit: SubmitHandler<Formvalues> = async (data) => {
    try {
      const { nickname, email } = data;
      const test = nickname.trim();
      const formData = new FormData();
      formData.append("email", email);
      formData.append("nickname", test);
      formData.append("user_profile", profileImg);
      console.log("1111", email, nickname);
      const result = await axios.patch("user/info/edit", formData, config);

      console.log("data", result);
    } catch (error: any) {
      console.log("test", error.response);
      setProfileError(error.response.data?.message);
    }
  };

  const passwordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("test123");
  };

  // console.log("email:", email);
  // console.log("nickname:", nickname);
  // console.log("password:", password);
  // console.log("Newpassword:", newPassword);
  // console.log("NewpasswordCheck:", newPasswordCheck);
  console.log("profileImg:", profileImg);
  console.log(watch("nickname"));
  return (
    <Container>
      <InformationContaniner>
        <h1>회원정보 수정</h1>
        <InformationDiv>
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
          <ProfileForm onSubmit={handleSubmit(profileSubmit)}>
            <InputUpload>
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
                <Label>닉네임</Label>
                <Input
                  type="text"
                  {...register("nickname", {
                    required: "필수 응답 항목입니다.",
                    maxLength: {
                      value: 7,
                      message: "최대 7자 까지 가능합니다.",
                    },
                  })}
                />
                {errors.nickname && <Error>{errors.nickname.message}</Error>}
              </InputDiv>
              {<Error>{profileError}</Error>}
              <Button profile={true}>프로필 변경하기</Button>
              <Line></Line>
            </InputUpload>
          </ProfileForm>
          <PasswordForm onSubmit={passwordSubmit}>
            <h1>비밀번호 수정</h1>
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
            <Button profile={false}>비밀번호 변경하기</Button>
          </PasswordForm>
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
const PasswordForm = styled.form``;
const ProfileForm = styled.form``;
const Line = styled.div`
  border-top: 2px solid black;
  margin-bottom: 20px;
`;
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
    margin-bottom: 30px;
  }
`;

const InformationDiv = styled.div`
  ${({ theme }) => theme.media.mobile`
  margin:0px 15px;
  `}
`;
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
const Button = styled.button<{ profile: boolean }>`
  width: 100%;
  height: 30px;
  background-color: red;
  border: 1px solid red;
  color: white;
  ${({ profile }) => {
    return profile ? `margin-bottom:25px` : "";
  }}
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
