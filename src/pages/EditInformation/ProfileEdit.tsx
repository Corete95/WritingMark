import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loading from "components/Loading";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface Formvalues {
  nickname: string;
  email: string;
}

const ProfileEdit: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
    reset,
  } = useForm<Formvalues>();
  const [loading, setLoading] = useState<boolean | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [profileImg, setProfileImg] = useState("");
  const ImgInput = useRef<HTMLInputElement>(null);
  const [profileError, setProfileError] = useState("");
  const token = localStorage.getItem("token");
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

  return (
    <>
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
          <Button>프로필 변경하기</Button>
          <Line></Line>
        </InputUpload>
      </ProfileForm>
    </>
  );
};

const ProfileForm = styled.form``;
const Line = styled.div`
  border-top: 2px solid black;
  margin-bottom: 20px;
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
  margin-top: 20px;
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
  margin-bottom: 25px;
  cursor: pointer;
`;
const Error = styled.span`
  font-size: 12px;
  margin-top: 6px;
  color: red;
`;
export default ProfileEdit;
