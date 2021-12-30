import React, { useRef, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { CATEGORY_OPTIONS } from "Config";
import TextInformation from "./TextInformation";
import useInput from "hooks/useInput";

interface SelectProps {
  id: number;
  value: string;
  label: string;
}
type SelectValue = SelectProps | SelectProps[] | null | undefined;

const Writing = () => {
  const [select, setSelect] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [informationCheck, setInformationCheck] = useState(false);
  const [contents, onChangeContents] = useInput("");
  const [title, onChangeTitle] = useInput("");
  const [url, onChangeUrl] = useInput("");
  const ImgInput = useRef<HTMLInputElement>(null);

  const selectHandleChange = (selectedOption: SelectValue) => {
    setSelect(selectedOption);
  };
  const imageUploadBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (ImgInput.current) {
      ImgInput.current.click();
    }
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
  const deleteImg = () => {
    const check = confirm("이미지를 삭제 하시겠습니까?");
    if (check == true) {
      setImgUrl("");
    }
  };

  const informationCheckHandler = () => {
    setInformationCheck(!informationCheck);
  };

  const test = () => {
    if (select === null) return alert("카테고리를 설정해주세요!");

    console.log(select.value);
    console.log(contents);
    console.log(imgUrl);
    console.log(title);
    console.log(url);
  };

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
        <textarea
          // wrap="hard"
          value={contents}
          onChange={onChangeContents}
        ></textarea>
        <ImgUpload>
          <img src="/images/camera.png" onClick={imageUploadBtn} />
          <input
            type="file"
            accept="image/*"
            ref={ImgInput}
            onChange={imageHandler}
          />
          {imgUrl && (
            <DeleteImg img={imgUrl}>
              <p onClick={deleteImg}>&times;</p>
            </DeleteImg>
          )}
        </ImgUpload>
      </Contents>
      <TextInformation
        informationCheckHandler={informationCheckHandler}
        informationCheck={informationCheck}
        title={title}
        onChangeTitle={onChangeTitle}
        url={url}
        onChangeUrl={onChangeUrl}
      />
      <Button onClick={test}>글쓰기</Button>
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
    resize: none;
  }
`;

const ImgUpload = styled.div`
  display: flex;
  margin-top: 15px;
  img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
    cursor: pointer;
  }
  input {
    display: none;
  }
`;

const DeleteImg = styled.div<{ img: string }>`
  width: 40px;
  height: 40px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.img});

  p {
    float: right;
    position: relative;
    left: 7px;
    bottom: 8px;
    background: transparent;
    border: none;
    font-size: 22px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  float: right;
  margin-top: 30px;
  width: 100px;
  height: 30px;
  color: white;
  background-color: red;
  border: 1px solid red;
  cursor: pointer;
`;
export default Writing;
