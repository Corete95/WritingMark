import React, { useRef, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { CATEGORY_OPTIONS } from "Config";

interface SelectProps {
  id: number;
  value: string;
  label: string;
}
type SelectValue = SelectProps | SelectProps[] | null | undefined;

const Writing = () => {
  const [select, setSelect] = useState<SelectValue>(null);
  const [imgUrl, setImgUrl] = useState<string>();
  const ImgInput = useRef<HTMLInputElement>(null);

  const selectHandleChange = (selectedOption: SelectValue) => {
    setSelect(selectedOption);
  };
  const imageUploadBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (ImgInput.current) ImgInput.current.click();
  };

  const imageHandler = (e: any) => {
    const imageFile = e.target.files[0];
    const fileReader = new FileReader();
    if (imageFile) {
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = (e: any) => setImgUrl(e.target.result);
    } else {
      return;
    }
  };

  console.log(imgUrl);
  return (
    <Container>
      <Category>
        <h1>카테고리</h1>
        <Select
          options={CATEGORY_OPTIONS}
          onChange={selectHandleChange}
          value={select}
          placeholder="카테고리를 정해주세요."
          className="selectStyles"
          styles={{ menu: (provided) => ({ ...provided, zIndex: 999 }) }}
        />
      </Category>
      <Contents>
        <h1>내용</h1>
        <textarea></textarea>
        <ImgUpload>
          <img src="/images/camera.png" onClick={imageUploadBtn} />
          <input
            type="file"
            accept="image/*"
            ref={ImgInput}
            onChange={imageHandler}
          />
          {imgUrl && (
            <Test img={imgUrl}>
              <p>삭제</p>
            </Test>
          )}
        </ImgUpload>
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 640px;
  min-width: 320px;
  padding-top: 80px;
  ${({ theme }) => theme.media.mobile`
  margin:0px 15px;
  `}
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  h1 {
    width: 22%;
    font-size: 20px;
    font-weight: bold;
  }
  .selectStyles {
    width: 78%;
    text-align: center;
    font-size: 18px;
    ${({ theme }) => theme.media.mobile`
   margin-left:20px;
  `}
  }
`;

const Contents = styled.div`
  margin-top: 40px;
  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  textarea {
    width: 100%;
    height: 300px;
    padding: 20px 20px;
    font-size: 14px;
  }
`;

const ImgUpload = styled.div`
  display: flex;
  margin-top: 15px;
  img {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

const Test = styled.div<{ img: any }>`
  width: 50px;
  height: 50px;
  background-size: cover;
  background-image: url(${(props) => props.img});
`;
export default Writing;
