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
          <TextDiv>
            <TextIcon onClick={informationCheckHandler}>
              <h1>글 정보</h1>
              <img src={"/images/up-arrow.png"} />
            </TextIcon>
            <Text>
              <p>글과 관련된 정보를 입력하는 칸 입니다.</p>
              <p>
                글 정보를 입력해주시면 보다 더 많은 사용자들에게 도움이 됩니다:)
              </p>
            </Text>
          </TextDiv>
        </>
      ) : (
        <>
          <TextDiv>
            <TextIcon onClick={informationCheckHandler}>
              <h1>글 정보</h1>
              <img src={"/images/down-arrow.png"} />
            </TextIcon>
            <Text>
              <p>글과 관련된 정보를 입력하는 칸 입니다.</p>
              <p>
                글 정보를 입력해주시면 보다 더 많은 사용자들에게 도움이 됩니다:)
              </p>
            </Text>
          </TextDiv>
          <InputDiv>
            <Label>제목</Label>
            <Input type="text" value={title} onChange={onChangeTitle} />
          </InputDiv>
          <InputDiv>
            <Label>관련 URL</Label>
            <Input type="text" value={url} onChange={onChangeUrl} />
          </InputDiv>
        </>
      )}
    </Information>
  );
};
const Information = styled.div`
  margin-top: 40px;
`;
const TextDiv = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const TextIcon = styled.div`
  display: flex;
  align-items: center;
  width: 160px;
  cursor: pointer;
  h1 {
    font-size: 20px;
    font-weight: bold;
    margin-right: 15px;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
const Text = styled.div`
  margin-left: 40px;
  font-size: 14px;
  line-height: 15px;
  ${({ theme }) => theme.media.mobile`
  margin-left: 25px;
  `}
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
