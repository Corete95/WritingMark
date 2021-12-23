import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  id: number;
  name: string;
  img: string;
  time: string;
  contents: string;
  contents_img: string;
  bookmark: number;
  comments: number;
}
const ListBox: FC<Props> = ({
  id,
  name,
  img,
  time,
  contents,
  contents_img,
  bookmark,
  comments,
}) => {
  return (
    <ListBoxContainer>
      <TopBottom>
        <ImgName>
          <div className="imgDiv">
            <img src={img} />
          </div>
          <div className="nameDiv">
            <p>{name}</p>
            <p>{time}</p>
          </div>
        </ImgName>
        <EditDelete>
          <span className="edit">수정</span>
          <span className="delete">삭제</span>
        </EditDelete>
      </TopBottom>
      <BoxCenter>
        <ContentsText>{contents}</ContentsText>
        <img src={contents_img} />
      </BoxCenter>
      <TopBottom>
        <div className="likeComments">
          <img src="/images/bookmarkfull.png" />
          <span>
            글갈피 {bookmark}개
            <span className="comments">댓글{comments}개 </span>
          </span>
        </div>
        <div className="link">
          <pre>asdasdasdas sdadad</pre>
        </div>
      </TopBottom>
    </ListBoxContainer>
  );
};

const ListBoxContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 40px;
`;

const TopBottom = styled.div`
  display: flex;
  justify-content: space-between;

  .likeComments {
    display: flex;
    align-items: center;
    margin-left: 15px;
    img {
      width: 20px;
      cursor: pointer;
    }
    span {
      font-size: 14px;
    }
    .comments {
      margin-left: 7px;
    }
  }
`;

const ImgName = styled.div`
  display: flex;
  .imgDiv {
    width: 50px;
    height: 50px;
    border-radius: 70%;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      image-rendering: -webkit-optimize-contrast;
    }
  }

  .nameDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;

    p {
      line-height: 23px;
    }
  }
`;

const EditDelete = styled.div`
  margin: auto 0;
  color: gray;
  span {
    cursor: pointer;
  }
  .edit {
    margin-right: 13px;
  }
`;

const BoxCenter = styled.div`
  display: flex;
  border: 1px solid #c4c4c4;
  margin: 7px 0px;
  max-height: 150px;
  img {
    width: 30%;
  }
`;
const ContentsText = styled.div`
  width: 70%;
  padding: 20px 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.media.mobile`
   padding: 10px 14px;
  `}
`;

export default ListBox;
