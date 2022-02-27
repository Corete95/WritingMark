import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  informationCheck: boolean;
  informationCheckHandler: () => void;
  title: string;
  onChangeTitle: () => void;
  url: string;
  onChangeUrl: () => void;
}

const TextInformation: FC<Props> = ({
  informationCheckHandler,
  informationCheck,
  title,
  onChangeTitle,
  url,
  onChangeUrl,
}) => {
  return (
    <Information>
      {!informationCheck ? (
        <>
          <div className="informationText" onClick={informationCheckHandler}>
            추가 정보 ▼
          </div>
          <div className="line"></div>
          <InputDiv>
            <Label>제목</Label>
            <Input type="text" value={title} onChange={onChangeTitle} />
          </InputDiv>
          <InputDiv>
            <Label>관련 URL</Label>
            <Input
              type="text"
              value={url}
              onChange={onChangeUrl}
              placeholder="https://naver.com ❌ naver.com ⭕️ "
            />
          </InputDiv>
        </>
      ) : (
        <>
          <div className="informationText" onClick={informationCheckHandler}>
            추가 정보 ▲
          </div>
          <div className="line"></div>
        </>
      )}
    </Information>
  );
};

const Information = styled.div`
  margin-top: 30px;
  .informationText {
    width: 100px;
    height: 30px;
    border: 1px solid black;
    padding-top: 7px;
    text-align: center;
    cursor: pointer;
  }
  .line {
    margin-top: -1px;
    border: 1px solid black;
    margin-bottom: 30px;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
`;
const Input = styled.input`
  font-size: 14px;
  line-height: 23px;
  width: 100%;
  height: 30px;
  border: 1px solid black;
  padding: 10px 15px;
  :focus {
    outline: none;
  }
`;
export default TextInformation;
